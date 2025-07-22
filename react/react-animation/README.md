# 动画
1. 过渡动画 
 transition: width 2s ease-in-out;
 控制容器某个属性值 发生变更时 施加一个过渡时间

2. 复杂动画(自定义动画)
 @keyframes xxx 定义一个动画时间
 animation: xxx 2s linear infinite; 让自定义动画生效

3. 项目开发中一些特别复杂的交互动画
 - css 动画库 animate.css
 - @react-spring/web 实现弹簧动画效果
