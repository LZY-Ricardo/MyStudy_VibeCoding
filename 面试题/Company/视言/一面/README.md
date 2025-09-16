# 视言一面

自我介绍

低代码平台
1. 介绍一下这个项目
 - 为什么会开发这个项目
    学长推荐的项目 他在公司里面负责这个项目 推荐我们也可以做这个项目 遇到困难可以找他 后面也到网上了解到这个项目的一些背景和具体内容, 也对此比较感兴趣, 开发这个项目的时候, 主要是对照百度开源的低代码平台, 
    实现了一些基本的功能, 比如物料区的组件拖拽, 画布区的组件拖拽, 组件的属性配置, 事件配置, 样式配置, 预览模式, 编辑模式等
 - 项目结构梳理 
    整个项目分为上下两部分 一个头部区域 一个整体区域 整体区域又分为物料区 画布区 设置属性区 借助了allotment库实现了分屏拖动
    全局状态管理用的zustand仓库, 搭建了两个库, 一个存放整个画布展示的html页面的JSON树, 一个存放所有组件的信息
 - 画布区域, 借助 React.createElement 函数将JSON对象树递归渲染成对应的React元素展示在画布区
 
 - 借助 react-dnd 封装了一个 useMaterialDrop 钩子函数, 用于处理物料区的组件拖拽事件

 - 选中画布上的组件, 右侧可以配置组件的属性, 样式和事件, 配置的内容统一处理成对象植入到对应的 json 中, 并更新到全局状态管理的仓库中, 通过 React.createElement 函数渲染

 - 项目需要编辑模式与预览模式, 预览模式也是通过递归渲染的页面, 不一样的是, 编辑模式下组件上的事件是不触发的

2. tailwind相比于传统写CSS文件有什么区别
 - 开发效率高, 减少了文件切换的时间
 - 不用考虑样式冲突, 也不用纠结命名问题
 - 更小的 CSS 体积, 不同的地方用的都是同一个原子类, 打包时只会打包你使用到的类, 没有使用到的类不会打包进去
 - 维护性高, 因为它的类名都是语义化, 所以维护起来比较方便, 同时也没有繁杂的CSS代码

3. 组件拖拽当中遇到的层级覆盖问题
 1. 选中组件并开始拖拽时, 给它添加一个z-index属性, 并将它的值设置为一个较大的数, 确保它能够覆盖在其他组件上面
 2. 拖拽过程中, 实时更新组件的位置, 并实时更新全局状态管理的仓库中的位置信息
 3. 拖拽结束后, 移除组件的z-index属性, 并将它的位置信息更新到全局状态管理的仓库中

4. 当你选中某一个组件，如何让它层级最高
5. react18和react19的区别
 - 增加了许多钩子函数 actions 的更新
 - 19 中新增了 useTransition 这个钩子, 比如在 form 表单提交时, 不需要再人为处理 loading 状态, 只需要调用 useTransition 这个钩子, 它会返回一个状态和一个函数, 调用函数后, 会将状态设置为 true, 进行异步的提交完成后, 会将状态设置为 false
 - 新增 useActionState 来处理表单提交的常见的状态变更
 - 可以直接将 ref 作为 props 接收
 - 对 html 原生标签的支持和增强
 - 通过移除不再需要的 API 和 压缩代码, React19 的包体积比 React18 更小
6. **webpack 和 vite 的区别**

CSS

1. 垂直水平居中的方式
 - 定位 + 平移 (负margin / transform)
 - flex 布局
 - grid 布局
 - text-align: center; line-height: 父容器高度; （子容器非块级元素）
 - 父容器 display: table-cell; vertical-align: middle; （子容器为块级元素 margin: 0 auto, 子容器非块级: 父容器 text-align: center）

2. CSS的选择器以及它们的优先级，优先级最高的为
!important > 行内样式 > id选择器 > 类选择器 > 标签选择器 

3. rem 和 em 的区别
 - rem 是相对根元素的字体大小, 而 em 是相对父元素的字体大小

4. 场景题（margin 塌陷问题）
垂直方向上的 margin 塌陷问题

JS

1. JS中的数据类型以及类型判断

2. 如何阻止事件的冒泡事件，不使用监听器如果阻止事件的冒泡事件
 - 事件对象的 stopPropagation 方法
 - 事件对象的 stopImmediatePropagation 方法 可以取消同一个dom元素重复的监听

 - 给 dom 元素添加onclick事件传递event参数, 并在事件处理函数中调用事件对象的 stopPropagation 方法

3. 场景题：

   - 一个函数的形参为一个数组，返回的一个新的数组，内容是原数组内容的Double
   - 数组去重

4. 浏览器事件循环

5. ```JS 
   setTimeout(() => {
     console.log(1);
   }, 20);
   
   console.log(2);
   
   setTimeout(() => {
     console.log(3);
   }, 10);
   
   console.log(4);
   
   for (let i = 0; i < 90000000; i++) {
     // do soming 80ms左右
   }
   
   console.log(5);
   
   setTimeout(() => {
     console.log(6);
   }, 8);
   
   console.log(7);
   
   setTimeout(() => {
     console.log(8);
   }, 15);
   
   console.log(9);
   
   ```

6. Promise ，async await的区别

   

7. Promise,asycn await 的错误捕获机制

React

1. 类组件和函数组件的区别
 > 类组件有生命周期函数, 函数组件有 useEffect 钩子
 > 类组件有状态管理, 函数组件有 useState 钩子
 > 类组件可以使用 this 关键字, 函数组件不能使用 this 关键字
 > 类组件可以使用 setState 方法来修改状态导致组件更新, 函数组件使用 useState 提供的 setState 方法
 > 类组件需要继承 React.Component, 函数组件只需要定义一个函数, 函数组件的返回值就是组件的内容

2. 介绍useEffect 钩子
3. 怎么样让useState提供的 setState 方法的执行变成同步

4. react16和react18的区别，它们的diff算法的区别

其它

1. 你使用coze工作流的详细介绍
 > 用思维导图规划步骤
 > 编排节点
 > 在提示词优化平台优化完再 LLM 节点输入
 > 对每一个步骤节点进行测试
 > 对整个工作流进行测试
 > 对工作流进行优化

2. 为什么选择前端，平时专门学习的
 
3. 有看过什么技术类的书

算法

1. 回文字符串