# 说说你对 css 盒子模型的理解
- 是什么
 浏览器渲染页面时, 会根据标准将容器渲染成一个包含了内容, 内边距, 边框, 外边距的盒子

- 特性
  - 标准盒子模型
    - width = content宽度
  - 怪异(IE)盒子模型
    - width = content宽度 + 内边距 + 边框 

- 属性
  box-sizing: 
    - content-box: 标准盒子模型
    - border-box: 怪异(IE)盒子模型


# css 选择器有哪些? 优先级? 权重
1. id 选择器 #id
2. 类名选择器 .class
3. 标签选择器 标签名
4. 后代选择器 .xxx .yyy
5. 子代选择器 .xxx > .yyy
6. 相邻选择器 .xxx + .yyy
7. 群组选择器 xxx , yyy 里面的选择器独立计算优先级
8. 属性选择器 .xxx[属性名=属性值]

id 选择器 > 后代选择器 = 子代选择器 = 相邻选择器 = 属性选择器 > 类名选择器 > 标签选择器

9. 伪类选择器 .xxx:yyy
10. 伪元素选择器 .xxx::yyy
11. 通配符选择器 * 




# 说说 em/px/rem/vw/vh/vmax/vmin/% 单位的区别
- 是什么
  - 相对单位: em rem vw vh %
  - 绝对单位: px

- 特点
  - em: 相对单位, 相对于父元素的字体大小
  - rem: 相对单位, 相对于根元素的字体大小
  - vw: 相对单位, 相对于视口的宽度
  - vh: 相对单位, 相对于视口的高度
  - vmax: 相对单位, 相对于视口的宽度和高度的最大值
  - vmin: 相对单位, 相对于视口的宽度和高度的最小值
  - px: 绝对单位, 像素
  - %: 相对单位, 相对于父元素的宽度或高度

- 场景
  响应式布局和移动端适配中，vw/vh单位能直接与视口尺寸关联，实现元素尺寸随视口自动缩放，无需额外计算
  rem单位则通过调整根元素字体大小，实现整体等比例缩放，保持元素间的相对大小关系，适合统一协调的UI设计
  百分比单位%则基于父元素尺寸计算，适用于需要根据容器尺寸动态调整的场景，如响应式布局中的元素宽度或高度
  媒体查询(Media Queries)可针对不同屏幕宽度定制样式，精确控制布局断点处的变化，常与其他响应式方案结合使用效果更佳




# css 中有哪些隐藏元素的方法, 区别是什么
- 是什么
  - 隐藏元素: 元素在页面中不可见, 但是占用空间
    1. display: none;
    2. visibility: hidden;
    3. opacity: 0;
    4. width: 0;
       height: 0;
       overflow: hidden;
    5. clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    6. position: absolute;
      top: -9999px;
      left: -9999px;
    7. position: fixed;
      top: -9999px;
      left: -9999px;
    8. transform: rotateY(90deg);
       transform: rotateX(90deg);

  - 显示元素: 元素在页面中可见, 也占用空间

- 方法
  - display: none;
    - 隐藏元素
    - 不占用空间(从文档流中移除)
    - 不响应事件
    - 不能被点击
    - 不能被聚焦
  - visibility: hidden;
    - 隐藏元素
    - 占用空间(占据文档流位置)
    - 不响应事件
    - 不能被点击
    - 可以被聚焦
  - opacity: 0;
    - 隐藏元素
    - 占用空间(占据文档流位置)
    - 响应事件
    - 可以被点击
    - 可以被聚焦
  - width: 0; height: 0; overflow: hidden;
    - 隐藏元素
    - 不占用空间(从文档流中移除)
    - 不响应事件
    - 不能被点击
    - 不能被聚焦
  - clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    - 隐藏元素
    - 占用空间(占据文档流位置)
    - 不响应事件
    - 不能被点击
    - 不能被聚焦
  - position: absolute;
    - 隐藏元素
    - 占用空间
    - 不能被点击
    - 不能被聚焦
  - position: fixed;
    - 隐藏元素
    - 占用空间
    - 不能被点击
    - 不能被聚焦
  - transform: rotateY(90deg);
    - 隐藏元素
    - 占用空间
    - 不能被点击
    - 不能被聚焦
  - transform: rotateX(90deg);
    - 隐藏元素
    - 占用空间
    - 不能被点击
    - 不能被聚焦




# 说说你对 BFC 的理解
- 是什么
  - BFC(Block Formatting Context) 块级格式化上下文
  - 是一个独立的渲染区域, 内部拥有一套属于它自己的渲染规则, 内部元素的渲染不会影响到外部元素
  - 外部元素的渲染也不会影响到内部元素


- 特点
  1. 同普通容器一样, BFC 容器中的元素依然是垂直排列的
  2. 同普通容器一样, BFC 容器中的元素在垂直方向上同样存在 margin 重叠
  3. BFC 容器在垂直上的 margin 不会和 BFC 容器中的元素的 margin 重叠
  4. BFC 容器在计算高度时会将浮动元素的高度也计算在内

  创建 BFC 容器的方式:
  1. overflow: auto | hidden | scroll; 不为visible
  2. float: 不为 none;
  3. position: absolute | fixed;
  4. display: inline-xxxx 大多数 | table-xxxx 大多数 | flex | grid | flow-root; 

- 场景
1. 清除浮动带来的高度塌陷问题
2. 防止 margin 重叠




# 元素水平垂直居中的方法
1. 弹性
2. 定位 + margin负值 (需要知道元素的宽度和高度)
3. 定位 + transform translate
4. grid 布局
5. table 布局  (垂直居中 display: table-cell;vertical-align: middle;  水平居中将子元素设置为 inline-block 父元素text-align: center; 可以将非块级元素水平居中) 



# 如何实现多栏布局
## 双栏布局
 1. 弹性
 2. calc() 计算右侧宽度
 3. 浮动

## 三栏布局
 1. 弹性 + order (主体内容优先加载)
 2. grid 布局
 3. 圣杯布局  (浮动 + 定位 + 负 margin)
 4. 双飞翼布局 (浮动 + 负 margin)



# css 中的常见的动画有哪些, 实现方式有什么区别
1. 过渡动画
  - 实现方式: transition
  - 特点: 简单易用, 但是只能定义两个状态之间的动画, 不能定义多个状态之间的动画
2. 转变动画 
  - 实现方式: transform
  - 特点: 简单易用, 但是只能定义两个状态之间的动画, 不能定义多个状态之间的动画
  - 常用属性: translate, rotate, scale, skew
3. 关键帧动画
  - 实现方式: @keyframes
  - 特点: 可以定义多个状态之间的动画, 但是使用起来比较复杂
  - 常用属性: from, to, 百分比
4. 动画库
  - 实现方式: 动画库
  - 特点: 功能强大, 但是使用起来比较复杂



# 解释一下回流重绘
 - 从输入 url 到页面渲染的完整过程
  1. 网络层
  2. 浏览器层 
    

  - 浏览器层 (得到数据包之后):
   1. 解析 html 数据得到 DOM 树
   2. 解析 css 数据得到 CSSOM 树
   3. 合并 DOM 树和 CSSOM 树得到 渲染树(Render Tree 只包含需要显示的元素, 不包含隐藏的元素)
   4. 浏览器的布局引擎在CPU上计算页面布局 (得到渲染树中的每一个元素的几何属性不包括在文档流中消失的元素) (回流)
      - 回流(Reflow) ：元素几何属性变化时重新计算布局
   5. 浏览器将布局信息传递给GPU, GPU根据布局信息将渲染树中的元素绘制成像素 (根据渲染树和几何属性绘制页面) (重绘)
      - 重绘(Repaint) ：元素外观变化时重新绘制，不影响布局
   6. 合成图层
      - 浏览器会将页面中的元素分成多个图层, 每个图层都有自己的渲染树, 浏览器会根据图层的 z-index 来确定图层的渲染顺序, 图层的渲染顺序确定了元素的绘制顺序, 因此, 元素的绘制顺序会影响到元素的重绘和回流
      - 浏览器会将图层合成到一起, 形成最终的页面


  - 发生回流的操作:
  1. 刷新浏览器页面
  2. 容器的几何属性变更 (宽度, 高度, 位置)
  3. 增加或者删除可见的DOM元素
  4. 浏览器尺寸改变


  - 浏览器的优化策略:
    由于每一次回流重绘都会带来额外的性能消耗, 因此大多数浏览器会通过队列来优化回流重绘的次数, 浏览器将会导致回流的操作都放到队列中, 直到队列中的操作达到了一个阈值, 或者浏览器的事件循环机制触发了, 浏览器才会执行队列中的操作, 执行完成后, 队列会被清空, 等待下一次的操作


  - 特殊的属性和方法:
  offsetWidth, offsetHeight, offsetTop, offsetLeft
  scrollWidth, scrollHeight, scrollTop, scrollLeft
  clientWidth, clientHeight, clientTop, clientLeft
  getBoundingClientRect()
  getComputedStyle()
  getClientRects()
  scrollIntoView()
  以上这些属性会强制刷新优化队列

  - 如何尽量减少回流重绘
  1. 将要发生回流操作的 dom 先从文档流中剔除, 待所有的操作完毕后再添加回文档流中
  2. 使用文档碎片
  3. 使用克隆节点



# 用 css 画一个三角形
1. 裁剪
2. 边框


# 聊一聊响应式布局
- 是什么
页面上的容器会根据屏幕尺寸的变换而自适应的调整布局位置和大小

- 实现方式
 1. 媒体查询
 2. 百分比
 3. vw/vh
 4. rem + 媒体查询 || js




 # 画一条 0.5px 的线
 1. transform: scaleY(0.5)



 # 让浏览器支持小于 12px 的文字的方式
 1. 新版本已经适配
 2. 老版本 zoom: xx; (变焦)


 # 聊一聊 css 的预编译语言 (预处理器)
 - 是什么
    扩充了 css 语法, 增加了变量、 函数、 混合、 继承等功能 让 css 更好维护书写更高效
 - 有哪些
    1. sass
    2. less
    3. stylus -- 基于 nodejs 运行的一种预处理器, 可以将 stylus 代码编译成 css 代码
