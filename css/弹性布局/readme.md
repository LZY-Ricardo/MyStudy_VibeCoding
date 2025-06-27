# 弹性布局
- flexBox
- 简便、完整的响应式的实现各种页面布局

# 子元素
1. 弹性容器有主轴和交叉轴之分, 默认主轴是水平方向, 交叉轴是垂直方向
2. 弹性容器的子元素默认都是沿着主轴排列的
3. 子容器可以设置 order 属性来改变它们的排列顺序, 值越小越靠前
4. 子容器默认不放大, 但可以设置flex-grow: 1; 来允许子容器放大
5. 子容器默认可以缩小, 但可以设置flex-shrink: 0; 来设置子元素不缩小 
6. flex-basis: 100px; 设置子容器的初始尺寸
7. flex: 1 0 100px; 是上述4、5、6 属性的简写
8. 子容器可以设置 align-self 属性来设置单个子容器的对齐方式

# 弹性容器本身
1. justify-content: center; 控制所有子元素在主轴上居中
2. align-items: center; 控制所有子元素在交叉轴上居中
3. flex-direction: column; 弹性容器主轴方向改为垂直方向
4. flex-wrap: wrap; 允许子容器在主轴上换行
5. flex-flow: row wrap; 弹性容器 flex-direction 主轴方向和 flex-wrap 换行方式的简写
6. align-content: center; 当存在多根主轴时, 控制所有子元素在交叉轴上居中

# 多栏目布局
1. 两栏布局 --- 左侧固定宽度, 右侧自适应宽度(two.html)
2. 三栏布局 --- 左侧固定宽度, 中间自适应宽度, 右侧固定宽度(three.html)