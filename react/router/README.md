# 单页应用
只有一个html文件, 将每一个页面都开发成一个组件, 通过某一种手段来控制当前加载哪一个组件, 来实现页面的切换效果

# 路由
- 当浏览器 url 变更后, 控制加载对应的组件
const routes = [
    {
        path: '/home',
        component: Home
    },
    {
        path: '/about',
        component: About
    }
]

- npm i react-router-dom

- BrowserRouter: history 模式的路由
- Routes: 路由出口, 是一个路由列表
- Route: 路由列表项, 配置了路径和组件的映射关系