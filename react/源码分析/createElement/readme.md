# JSX 到真实 DOM 的完整流程

## 1. JSX 语法转换
浏览器无法直接理解 JSX 语法，需要通过 **Babel** 编译器将 JSX 转换成标准的 JavaScript 代码。

### JSX 示例：
```jsx
<div className="title">hello world</div>
```

### Babel 编译后：
```javascript
React.createElement('div', { className: 'title' }, 'hello world')
```

## 2. React.createElement 函数详解

### 2.1 函数调用过程
1. **Babel** 调用 `React.createElement('div', { className: 'title' }, 'hello world')`
2. **React.createElement** 处理参数并调用 **ReactElement** 方法
3. 返回一个描述虚拟 DOM 节点的 JavaScript 对象

### 2.2 createElement 参数处理
```javascript
// createElement 函数签名
function createElement(type, config, ...children)
```

**参数处理逻辑：**
- 提取保留属性：`key`, `ref`, `__self`, `__source`
- 过滤普通 props 到 props 对象
- 处理 children 参数
- 合并组件的 defaultProps

### 2.3 返回的 ReactElement 对象
```javascript
{
    // React 元素标识符，用于安全防护（防止 XSS 攻击）
    $$typeof: Symbol('react.element'),
    
    // 元素类型：字符串（原生DOM）或函数（组件）
    type: 'div',
    
    // React 特殊属性
    key: null,
    ref: null,
    
    // 所有传递给元素的属性和子元素
    props: {
        className: 'title',
        children: 'hello world'
    },
    
    // 创建该元素的组件实例（用于开发工具）
    _owner: null
}
```

## 3. 虚拟 DOM 到真实 DOM

**注意：** React 不会直接使用 `document.createElement` 来渲染元素。实际的渲染过程由 **React 渲染器**（如 ReactDOM）负责：

1. **React 渲染器** 接收 ReactElement 对象
2. 通过 **Reconciliation（协调）** 算法比较虚拟 DOM 树
3. 计算出需要更新的最小变更集
4. 批量更新真实 DOM

### 简化的渲染过程：
```javascript
// 这是简化示例，实际过程更复杂
function renderElement(element) {
    if (typeof element.type === 'string') {
        // 原生 DOM 元素
        const domNode = document.createElement(element.type);
        
        // 设置属性
        Object.keys(element.props).forEach(prop => {
            if (prop === 'children') {
                // 递归处理子元素
                domNode.textContent = element.props.children;
            } else if (prop === 'className') {
                domNode.className = element.props[prop];
            }
            // ... 其他属性处理
        });
        
        return domNode;
    }
    // 组件元素的处理...
}
```

## 4. 完整示例对比

### 复杂 JSX：
```jsx
<div id="container" className="wrapper">
    <h1>标题</h1>
    <p>段落内容</p>
</div>
```

### 编译后的 createElement 调用：
```javascript
React.createElement(
    'div',
    { id: 'container', className: 'wrapper' },
    React.createElement('h1', null, '标题'),
    React.createElement('p', null, '段落内容')
)
```

### 生成的虚拟 DOM 结构：
```javascript
{
    $$typeof: Symbol('react.element'),
    type: 'div',
    props: {
        id: 'container',
        className: 'wrapper',
        children: [
            {
                $$typeof: Symbol('react.element'),
                type: 'h1',
                props: { children: '标题' }
            },
            {
                $$typeof: Symbol('react.element'),
                type: 'p',
                props: { children: '段落内容' }
            }
        ]
    }
}
```

## 5. 关键概念总结

- **JSX** → **Babel编译** → **createElement调用** → **ReactElement对象** → **React渲染器处理** → **真实DOM**
- `$$typeof` 是 React 的安全机制，防止注入攻击
- React 使用虚拟 DOM 和 Diff 算法优化性能
- 实际的 DOM 操作由 React 渲染器统一管理，而非直接操作
