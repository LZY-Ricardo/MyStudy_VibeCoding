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