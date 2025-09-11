/**
 * 创建 React 元素（虚拟 DOM 节点）
 * 这是 JSX 转换的核心函数，类似于 React.createElement
 * @param {string|Function} type - 元素类型（HTML标签名或组件函数）
 * @param {Object} props - 元素属性
 * @param {...any} children - 子元素列表
 * @returns {Object} 虚拟 DOM 对象
 */
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      // 处理子元素：字符串和数字转换为文本节点，其他保持原样
      children: children.map(child => {
        const isTextNode = typeof child === 'string' || typeof child === "number"
        return isTextNode ? createTextNode(child) : child
      })
    }
  }
}
/**
 * 创建文本节点的虚拟 DOM 表示
 * @param {string|number} text - 文本内容
 * @returns {Object} 文本节点的虚拟 DOM 对象
 */
function createTextNode(text) {
  return {
    type: 'TEXT_ELEMENT', // 特殊类型标识文本节点
    props: {
      nodeValue: text, // 文本内容
      children: [] // 文本节点没有子元素
    }
  }
}

// ========== Fiber 架构的核心全局变量 ==========
let nextUnitOfWork = null // 下一个要处理的工作单元(Fiber节点)，实现时间分片的关键
let wipRoot = null // work in progress root，正在构建的新 Fiber 树根节点
let currentRoot = null  // 当前已渲染到页面的 Fiber 树根节点，用于 diff 比较
let deletions = null // 存储需要删除的 Fiber 节点数组

/**
 * 渲染函数 - React 应用的入口点
 * 初始化 Fiber 树的构建过程
 * @param {Object} element - 要渲染的虚拟 DOM 元素
 * @param {HTMLElement} container - 挂载的 DOM 容器
 */
function render(element, container) {
  // 创建新的 Fiber 树根节点
  wipRoot = {
    dom: container, // 对应的真实 DOM 节点
    props: {
      children: [element] // 要渲染的元素作为子节点
    },
    alternate: currentRoot // 指向旧的 Fiber 树，用于 diff 算法
  }
  deletions = [] // 重置删除列表
  nextUnitOfWork = wipRoot // 开始工作循环
}

/**
 * 工作循环 - React Fiber 架构的核心调度器
 * 实现时间分片，避免长时间阻塞主线程
 * @param {IdleDeadline} deadline - 浏览器提供的空闲时间信息
 */
function workLoop(deadline) {
  let shouldYield = false
  // 在有工作单元且时间充足时持续工作
  while (nextUnitOfWork && !shouldYield) {
    // 处理当前工作单元，返回下一个工作单元
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    // 检查剩余时间，少于1ms时让出控制权
    shouldYield = deadline.timeRemaining() < 1
  }
  
  // 所有工作单元处理完毕，开始提交阶段
  if (!nextUnitOfWork && wipRoot) {
    commitRoot()  // 将 Fiber 树的变更应用到真实 DOM
  }
  
  // 递归调度下一次工作循环
  requestIdleCallback(workLoop)
}

// 启动时间分片调度
requestIdleCallback(workLoop)


/**
 * 处理单个工作单元（Fiber 节点）
 * 实现深度优先遍历的 Fiber 树构建
 * @param {Object} fiber - 当前要处理的 Fiber 节点
 * @returns {Object|null} 下一个要处理的 Fiber 节点
 */
function performUnitOfWork(fiber) {
  // 判断是否为函数组件
  const isFunctionComponent = fiber.type instanceof Function
  if (isFunctionComponent) {
    updateFunctionComponent(fiber) // 处理函数组件
  } else {
    updateHostComponent(fiber) // 处理原生 DOM 元素
  }

  // 深度优先遍历：优先处理子节点
  if (fiber.child) {
    return fiber.child
  }
  
  // 没有子节点时，寻找兄弟节点或回到父节点
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling // 处理兄弟节点
    }
    nextFiber = nextFiber.return // 回到父节点
  }
}

/**
 * 提交阶段 - 将 Fiber 树的变更应用到真实 DOM
 * 这是 React 渲染的第二个阶段（第一阶段是 render/reconciliation）
 */
function commitRoot() {
  // 先处理所有需要删除的节点
  deletions.forEach(commitWork)
  // 递归提交所有变更到 DOM
  commitWork(wipRoot.child)
  // 更新当前树的引用
  currentRoot = wipRoot
  wipRoot = null
  deletions = []
}
/**
 * 递归提交单个 Fiber 节点的变更
 * 根据 effectTag 执行相应的 DOM 操作
 * @param {Object} fiber - 要提交的 Fiber 节点
 */
function commitWork(fiber) {
  if (!fiber) {
    return
  }

  // 向上查找有 DOM 节点的父 Fiber（函数组件没有对应的 DOM）
  let domParentFiber = fiber.return
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.return
  }
  const domParent = domParentFiber.dom

  // 根据副作用标签执行相应操作
  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    // 新增节点：添加到父节点
    domParent.appendChild(fiber.dom)
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    // 更新节点：更新属性和事件
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if (fiber.effectTag === "DELETION") {
    // 删除节点
    commitDeletion(fiber, domParent)
  }

  // 递归处理子节点和兄弟节点
  commitWork(fiber.child)
  commitWork(fiber.sibling)
}
/**
 * 处理节点删除操作
 * 需要特殊处理函数组件（没有对应 DOM 节点）
 * @param {Object} fiber - 要删除的 Fiber 节点
 * @param {HTMLElement} domParent - 父 DOM 节点
 */
function commitDeletion(fiber, domParent) {
  if (fiber.dom) {
    // 直接删除有 DOM 节点的 Fiber
    domParent.removeChild(fiber.dom)
  } else {
    // 函数组件没有 DOM，递归删除其子节点
    commitDeletion(fiber.child, domParent)
  }
}




// ========== 函数组件处理相关 ==========
let wipFiber = null // 当前正在工作的 fiber 节点（用于 Hooks）
let stateHookIndex = null // 状态钩子的索引（用于 useState 等 Hooks）

/**
 * 更新函数组件
 * 执行函数组件并处理其返回的 JSX
 * @param {Object} fiber - 函数组件对应的 Fiber 节点
 */
function updateFunctionComponent(fiber) {
  wipFiber = fiber // 设置当前工作的 Fiber（Hooks 需要）
  stateHookIndex = 0 // 重置 Hook 索引
  wipFiber.stateHooks = [] // 初始化状态 Hooks 数组
  wipFiber.effectHooks = [] // 初始化副作用 Hooks 数组

  // 执行函数组件，获取其返回的 JSX
  const children = [fiber.type(fiber.props)]
  reconcileChildren(fiber, children)  // 将函数组件的子元素集成到 Fiber 树中
}

/**
 * 更新原生 DOM 元素组件
 * 为 Fiber 节点创建对应的 DOM 节点
 * @param {Object} fiber - 原生元素对应的 Fiber 节点
 */
function updateHostComponent(fiber) {
  // 如果还没有创建 DOM 节点，则创建
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }
  // 处理子元素的协调
  reconcileChildren(fiber, fiber.props.children)
}

/**
 * 根据 Fiber 节点创建对应的 DOM 节点
 * @param {Object} fiber - Fiber 节点
 * @returns {HTMLElement|Text} 创建的 DOM 节点
 */
function createDom(fiber) {
  // 根据类型创建相应的 DOM 节点
  const dom = fiber.type === 'TEXT_ELEMENT' ?
    document.createTextNode('') : // 文本节点
    document.createElement(fiber.type) // 普通元素节点

  // 更新 DOM 节点的属性和事件
  updateDom(dom, {}, fiber.props)

  return dom
}

// ========== DOM 属性处理的辅助函数 ==========
const isEvent = key => key.startsWith('on') // 判断是否为事件属性
const isProperty = key => key !== 'children' && !isEvent(key) // 判断是否为普通属性
const isNew = (prevProps, newProps) => (key) => prevProps[key] !== newProps[key] // 判断属性是否有变化
const isGone = (prevProps, newProps) => (key) => !(key in newProps) // 判断属性是否被删除

/**
 * 更新 DOM 节点的属性和事件监听器
 * 比较新旧 props，只更新发生变化的部分
 * @param {HTMLElement|Text} dom - 要更新的 DOM 节点
 * @param {Object} prevProps - 旧的属性对象
 * @param {Object} newProps - 新的属性对象
 */
function updateDom(dom, prevProps, newProps) {
  // 防止 props 为 null 或 undefined
  prevProps = prevProps || {}
  newProps = newProps || {}
  
  // 移除旧的事件监听器
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(
      key => !(key in newProps) || isNew(prevProps, newProps)(key)
    )
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2) // 去掉 'on' 前缀
      dom.removeEventListener(eventType, prevProps[name])
    })

  // 移除不再需要的属性
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, newProps))
    .forEach(name => {
      dom[name] = ''
    })

  // 设置新的或更新的属性
  Object.keys(newProps)
    .filter(isProperty)
    .filter(isNew(prevProps, newProps))
    .forEach(name => {
      dom[name] = newProps[name]
    })

  // 添加新的事件监听器
  Object.keys(newProps)
    .filter(isEvent)
    .filter(isNew(prevProps, newProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2) // 去掉 'on' 前缀
      dom.addEventListener(eventType, newProps[name])
    })
}

// ========== Diff 算法实现 ==========
/**
 * 协调子元素 - React 的核心 Diff 算法
 * 比较新旧子元素，决定哪些需要更新、新增或删除
 * @param {Object} wipFiber - 当前工作中的 Fiber 节点
 * @param {Array} elements - 新的子元素数组
 */
function reconcileChildren(wipFiber, elements) {
  let index = 0
  let oldFiber = wipFiber.alternate?.child // 获取旧 Fiber 树的对应子节点
  let prevSibling = null // 用于构建兄弟节点链表

  // 同时遍历新元素和旧 Fiber 节点
  while (index < elements.length || oldFiber != null) {
    const element = elements[index] // 当前新元素
    let newFiber = null

    // 比较新旧元素的类型是否相同
    const sameType = element?.type == oldFiber?.type

    // 类型相同：复用 DOM 节点，只更新属性
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props, // 使用新的 props
        dom: oldFiber.dom, // 复用旧的 DOM 节点
        return: wipFiber, // 指向父节点
        alternate: oldFiber, // 指向旧节点，用于比较
        effectTag: "UPDATE", // 标记为更新操作
      }
    }
    
    // 有新元素但类型不同：需要创建新节点
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null, // 新节点，DOM 稍后创建
        return: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT", // 标记为新增操作
      }
    }
    
    // 有旧节点但类型不同：需要删除旧节点
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION" // 标记为删除操作
      deletions.push(oldFiber) // 加入删除队列
    }

    // 移动到下一个旧节点
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    // 构建新的 Fiber 树结构
    if (index === 0) {
      wipFiber.child = newFiber // 第一个子节点
    } else if (element) {
      prevSibling.sibling = newFiber // 兄弟节点
    }

    prevSibling = newFiber
    index++
  }
}



// ========== 模块导出 ==========
/**
 * MiniReact 对象 - 暴露给外部使用的 API
 * 包含创建元素和渲染的核心功能
 */
const MiniReact = {
  createElement, // 用于 JSX 转换
  render // 渲染入口函数
}

// 将 MiniReact 挂载到全局对象，方便在浏览器中使用
window.MiniReact = MiniReact