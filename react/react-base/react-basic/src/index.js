import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // 代码块

// 获取到 html 文件中的 id 为 root 的那个 div 元素
// 将 获取到的 div 元素进行修饰, 让它能盛放 react 中的组件
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

