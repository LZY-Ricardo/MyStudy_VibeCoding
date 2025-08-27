# HOOK
1. useState
2. useEffect
3. useContext (父组件向子孙组件传值)
4. useReducer (状态管理)
5. useCallback (缓存函数, 只有在依赖项变化时才会重新渲染)
6. useMemo (缓存计算结果, 只有在依赖项变化时才会重新计算, 否则返回缓存值)
7. useRef
8. useImperativeHandle
9. useLayoutEffect
10. useDebugValue

// 单独使用
useCallback: 缓存函数，只有在依赖项变化时才会重新创建函数
useMemo: 缓存计算结果，只有在依赖项变化时才会重新计算

// 组合使用的目的
React.memo + useCallback: 防止因函数引用变化导致子组件不必要的重新渲染
React.memo + useMemo: 防止因计算结果引用变化导致子组件不必要的重新渲染

React.memo 高阶组件，缓存组件并通过浅比较props，仅在props变化时重新渲染，否则跳过渲染返回上次结果，可传入自定义比较函数


# HOOK 的闭包陷阱和解决方案
1. 当 useEffect 依赖项为空数组时, 会在组件挂载时执行, 且只执行一次, 如果 useEffect 中使用了状态, 那么状态的值会被闭包保留, 不会被更新, 被更新

- 解决方案:
 1. 不让代码产生闭包, 给 setState 传递函数, 函数中可以访问到全局的最新的状态
 2. 使用 useReducer 来管理状态
 3. 将被修改的状态存入 useEffect 的依赖数组中, 当状态发生变化时, 会重新执行 useEffect
 4. 借助 useRef, 每次组件更新时, 给 ref.current 赋值最新的函数, 在 useEffect 中调用 ref.current即可


# 数据的不可变形

this.state = { 
    a: { 
        b: 1 
    } 
}
this.state.a.b = 2 
this.setState(this.state)

const [state, setState] = useState({ a: { b: 1 } }) 
state.a.b = 2 
setState(state)

1. 普通的 class 组件, 只要 setState 调用了 就会重新渲染, 无论状态是否发生了变化
2. 继承了 PureComponent 的类组件, 调用 setState, 会进行浅比较(shallowEqual) props 和 state, 先判断新老对象是不是同一个引用地址 如果是 就不会重新渲染 如果不是 就比较新老对象的属性, 比较属性值, 如果属性值发生了变化, 就会重新渲染, 否则就不会重新渲染 --- 修改原先的state的属性值 和 定义一个新对象它的引用地址和state的引用地址一样 或者 新对象的属性值和state的属性值一模一样 不会重新渲染
3. 函数组件, 调用 setState 时, 只会对比 state 本身是否变化即引用地址是否变化, 如果变化了, 就会重新渲染, 否则就不会重新渲染

# immutable
通过创建一种新的不可变的数据结构, 来规避 react 源码中对两个对象是否相同的判断规则


# 如何实现组件的缓存 keepalive
{
    component: {
        Home: {
            props: {},
            state: {}
        }
    }
}
react 执行过程中, 会将组件编译成对象, 组件之间的切换操作, 其实就是 react 移除旧的组件对象, 添加新的组件对象的行为再渲染的行为

移除组件对象的操作, 称之为卸载组件
添加组件对象的操作, 称之为挂载组件

keepalive 实现原理:
1. 当组件切换时, 会先判断组件是否在缓存中, 如果在缓存中, 就会从缓存中取出组件对象, 否则就会创建一个新的组件对象
2. 当组件卸载时, 会将组件对象缓存起来
3. 当组件挂载时, 会从缓存中取出组件对象, 渲染到页面上

缓存操作本质上就是省去组件被 重新读取并编译成对象的过程, 直接从缓存中取出组件对象, 渲染到页面上