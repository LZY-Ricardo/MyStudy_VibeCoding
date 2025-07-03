- 单页应用: 整个项目只有唯一的一个 html 文件, 所有的页面都做成组件的样子, 被添加到这个 html 文件中进行渲染

# 组件
1. class 组件
2. function 组件

# hooks (钩子函数)
- 由 react 官方封装好的一些列函数, 它们的用法和作用
1. useState -- 定义一个响应式变量, 提供专门的方法修改变量值
2. useEffect -- 副作用函数
   1. 组件每次加载(挂载)触发
   2. useEffect 第二个参数为一个空数组时, 只会在初次渲染时触发
   3. useEffect 第二个参数为一个数组, 数组中传入一个变量时, 该变量每次修改变更都会带来 uesEffect 的重新执行
   4. useEffect 第一个参数是一个函数, 该函数内部返回出来一个新的函数, 新函数会在组件不展示(卸载)时才触发
3. useLayoutEffect -- 中的 effect 函数是作为同步函数来执行
4. useReducer -- 当修改的 state 的逻辑比较复杂时, 用useReducer
  1. 传入的  reducer 函数中不能直接修改原 state, 必须要返回一个新对象
  2. useReducer + immer
5. useRef -- 获取 DOM 结构
6. useContext -- 跨多层组件进行数据传递

# UI框架


# todo
1. 初次加载页面, 展示后端返回的所有数据 get http://localhost:3001/data
2. 搜索某一条数据的功能 get http://localhost:3001/data/?name=xxx
3. 删除表格中某一条数据的功能 delete http://localhost:3001/data/${id}