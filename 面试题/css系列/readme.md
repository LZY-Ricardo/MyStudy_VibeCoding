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