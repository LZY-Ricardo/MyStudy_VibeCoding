# 文档流
- 浏览器页面从左到右, 从上到下排列元素

# 浮动布局
- 浮动存在的意义:
    1. 文字环绕图片

- 水平布局
1. display: inline-block;   会来间隙问题    解决办法父容器：font-size：0
2. float：left;

- 浮动布局
1. 浮动元素的高度不计算在父元素的高度内, 导致父容器和后续元素重叠
2. 清除浮动:
    1. 直接设置父容器的高度 --- 不推荐
    2. 在浮动元素的末尾添加一个空的div, 设置clear：both; --- 不推荐
    3. 伪元素清楚浮动:
        - 父容器::after {
            content: '';
            display: block;
            clear: both;
        }
    4. 给被浮动影响的容器 做清除浮动 clear：both; --- 不推荐
    5. 将浮动元素的父容器设置为BFC容器 --- 推荐


# BFC - block formatting context
- 块级格式化上下文 (类比 js 中的块级作用域)

1. 默认情况下, 子容器的 margin-top 会和父容器的 margin-top 重叠
2. BFC 用来解决这个问题

- 如何创建BFC容器:
    1. overflow: hidden || auto || scroll || overlay;
    2. position: absolute || fixed;
    3. display: inline-xxx || flex || grid;
    4. float: left || right;

- BFC容器的特点:
1. 当一个容器被设置为 BFC 容器后, 它会拥有一套独特的渲染规则
2. 子容器的 margin-top 不会和父容器的margin-top 重叠
3. BFC 容器在计算高度时, 会包含浮动元素的高度