# IntersectionObserver 详细讲解

## 一、什么是 IntersectionObserver？

`IntersectionObserver` 是浏览器提供的原生 API，用于**异步监听目标元素与其祖先元素或视口（viewport）的交叉状态**。

简单说：**它可以告诉我们某个元素是否进入了可视区域**。

## 二、为什么需要 IntersectionObserver？

### 传统方式的缺点

在 IntersectionObserver 出现之前，要实现元素可见性检测，通常需要：

```javascript
// 传统方式：监听 scroll 事件
window.addEventListener('scroll', () => {
  const rect = element.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
  // 处理可见性逻辑
});
```

**问题：**
1. ❌ 性能差：scroll 事件触发频繁，需要节流/防抖
2. ❌ 可能触发回流（reflow）：`getBoundingClientRect()` 会强制浏览器重新计算布局
3. ❌ 代码复杂：需要手动计算位置
4. ❌ 不够精确：难以处理复杂的嵌套滚动

### IntersectionObserver 的优势

1. ✅ **性能好**：浏览器原生优化，不会触发回流
2. ✅ **异步执行**：不阻塞主线程
3. ✅ **自动计算**：无需手动计算元素位置
4. ✅ **支持预加载**：可以提前触发（rootMargin）
5. ✅ **简单易用**：API 简洁

## 三、基本用法

### 1. 创建观察器

```javascript
const observer = new IntersectionObserver(callback, options);
```

**参数说明：**

#### callback（回调函数）
当目标元素的可见性发生变化时触发

```javascript
const callback = (entries, observer) => {
  entries.forEach(entry => {
    // entry 包含目标元素的信息
    console.log(entry.isIntersecting); // 是否在可视区域内
    console.log(entry.intersectionRatio); // 交叉比例 (0-1)
    console.log(entry.target); // 目标元素
  });
};
```

#### options（配置对象，可选）

```javascript
const options = {
  root: null,              // 根元素，null 表示视口（viewport）
  rootMargin: '0px',      // 根元素的边距，类似 CSS margin
  threshold: 0             // 触发阈值，可以是数组 [0, 0.5, 1]
};
```

**options 详细说明：**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `root` | Element \| null | `null` | 用作视口的元素，`null` 表示浏览器视口 |
| `rootMargin` | string | `'0px'` | 根元素的边距，可以提前或延后触发 |
| `threshold` | number \| number[] | `0` | 交叉比例阈值，0-1 之间 |

### 2. 观察目标元素

```javascript
const target = document.querySelector('.target');
observer.observe(target); // 开始观察
```

### 3. 停止观察

```javascript
observer.unobserve(target); // 停止观察某个元素
observer.disconnect();       // 停止所有观察
```

## 四、entry 对象详解

回调函数接收的 `entry` 对象包含以下属性：

```javascript
{
  // 基础信息
  target: Element,              // 被观察的目标元素
  time: DOMHighResTimeStamp,   // 时间戳
  
  // 交叉信息
  isIntersecting: boolean,      // 是否正在交叉（进入可视区域）
  intersectionRatio: number,    // 交叉比例 (0-1)
  
  // 位置信息
  rootBounds: DOMRectReadOnly,      // 根元素的边界矩形
  boundingClientRect: DOMRectReadOnly, // 目标元素的边界矩形
  intersectionRect: DOMRectReadOnly    // 交叉区域的边界矩形
}
```

### 重要属性说明

- **`isIntersecting`**：最常用，表示元素是否进入可视区域
- **`intersectionRatio`**：交叉比例，0 表示完全不可见，1 表示完全可见
- **`target`**：目标元素 DOM 节点

## 五、实际应用场景

### 场景 1：图片懒加载

```javascript
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // 加载真实图片
      img.removeAttribute('data-src');
      imageObserver.unobserve(img); // 取消观察
    }
  });
}, {
  rootMargin: '50px' // 提前50px开始加载
});

images.forEach(img => imageObserver.observe(img));
```

### 场景 2：无限滚动

```javascript
const sentinel = document.querySelector('#sentinel'); // 底部哨兵元素
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMore(); // 加载更多内容
  }
});

observer.observe(sentinel);
```

### 场景 3：广告曝光统计

```javascript
const adObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
      // 广告被看到超过50%，记录曝光
      trackAdView(entry.target);
    }
  });
}, {
  threshold: [0, 0.5, 1] // 多个阈值
});

document.querySelectorAll('.ad').forEach(ad => {
  adObserver.observe(ad);
});
```

### 场景 4：动画触发

```javascript
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      animateObserver.unobserve(entry.target); // 只触发一次
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => {
  animateObserver.observe(el);
});
```

## 六、React 中使用示例

### 基础用法

```jsx
import { useEffect, useRef, useState } from 'react';

function LazyImage({ src, alt }) {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ''}
      alt={alt}
    />
  );
}
```

### 自定义 Hook

```jsx
function useIntersectionObserver(options = {}) {
  const [entry, setEntry] = useState(null);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      options
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [options.root, options.rootMargin, options.threshold]);

  return [elementRef, entry];
}

// 使用
function MyComponent() {
  const [ref, entry] = useIntersectionObserver({ threshold: 0.5 });
  
  return (
    <div ref={ref}>
      {entry?.isIntersecting ? '可见' : '不可见'}
    </div>
  );
}
```

## 七、rootMargin 详解

`rootMargin` 允许你**扩展或缩小根元素的边界**，类似 CSS 的 `margin`。

```javascript
// 提前触发（提前50px开始加载）
rootMargin: '50px'           // 四个方向都是50px
rootMargin: '50px 0'         // 上下50px，左右0
rootMargin: '50px 100px'     // 上下50px，左右100px
rootMargin: '50px 100px 20px 10px' // 上右下左

// 延后触发（需要完全进入可视区域后再触发）
rootMargin: '-50px'          // 缩小边界，元素需要更深入才触发
```

**示例：**

```javascript
// 图片距离视口还有100px时就开始加载
const observer = new IntersectionObserver(callback, {
  rootMargin: '100px'
});
```

## 八、threshold 详解

`threshold` 定义**交叉比例达到多少时触发回调**。

```javascript
// 单个阈值
threshold: 0      // 元素刚进入视口就触发（默认）
threshold: 0.5    // 元素50%可见时触发
threshold: 1      // 元素100%可见时触发

// 多个阈值（数组）
threshold: [0, 0.25, 0.5, 0.75, 1]  // 在多个比例时都触发
```

**示例：**

```javascript
// 元素从0%到100%可见的过程中，会在多个点触发回调
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    console.log(`可见比例: ${entry.intersectionRatio}`);
  });
}, {
  threshold: [0, 0.25, 0.5, 0.75, 1]
});
```

## 九、注意事项和最佳实践

### 1. 及时取消观察

```javascript
// ✅ 好的做法
if (entry.isIntersecting) {
  observer.unobserve(entry.target); // 加载后取消观察
}

// ❌ 不好的做法
// 忘记取消观察，导致重复触发
```

### 2. 组件卸载时清理

```javascript
useEffect(() => {
  const observer = new IntersectionObserver(callback);
  observer.observe(elementRef.current);

  return () => {
    observer.disconnect(); // 清理
  };
}, []);
```

### 3. 性能优化

```javascript
// ✅ 好的做法：使用 rootMargin 提前加载
const observer = new IntersectionObserver(callback, {
  rootMargin: '50px' // 提前50px开始加载，用户体验更好
});

// ✅ 好的做法：加载后立即取消观察
if (entry.isIntersecting) {
  loadImage();
  observer.unobserve(entry.target); // 减少观察的元素数量
}
```

### 4. 浏览器兼容性

- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 15+

**Polyfill：**
```javascript
import 'intersection-observer'; // npm install intersection-observer
```

### 5. 避免频繁创建 Observer

```javascript
// ✅ 好的做法：复用同一个 observer
const observer = new IntersectionObserver(callback);
elements.forEach(el => observer.observe(el));

// ❌ 不好的做法：为每个元素创建新的 observer
elements.forEach(el => {
  const observer = new IntersectionObserver(callback);
  observer.observe(el);
});
```

## 十、常见问题

### Q1: 为什么回调不触发？

**可能原因：**
1. 元素一开始就在可视区域内（需要在可视区域外才能触发）
2. `threshold` 设置过高，元素未达到阈值
3. `rootMargin` 设置导致边界计算错误
4. 元素被其他元素遮挡（`z-index`、`opacity: 0` 等）

### Q2: 如何检测元素离开可视区域？

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('进入可视区域');
    } else {
      console.log('离开可视区域');
    }
  });
});
```

### Q3: 如何处理嵌套滚动？

```javascript
// 指定具体的滚动容器作为 root
const scrollContainer = document.querySelector('.scroll-container');
const observer = new IntersectionObserver(callback, {
  root: scrollContainer // 指定根元素
});
```

## 十一、完整示例

```javascript
// 图片懒加载完整实现
class LazyImageLoader {
  constructor(options = {}) {
    this.options = {
      rootMargin: options.rootMargin || '50px',
      threshold: options.threshold || 0,
      placeholder: options.placeholder || 'data:image/svg+xml,...'
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        rootMargin: this.options.rootMargin,
        threshold: this.options.threshold
      }
    );
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const realSrc = img.dataset.src;
        
        if (realSrc) {
          img.src = realSrc;
          img.removeAttribute('data-src');
          this.observer.unobserve(img);
        }
      }
    });
  }

  observe(img) {
    this.observer.observe(img);
  }

  unobserve(img) {
    this.observer.unobserve(img);
  }

  disconnect() {
    this.observer.disconnect();
  }
}

// 使用
const loader = new LazyImageLoader({ rootMargin: '100px' });
document.querySelectorAll('img[data-src]').forEach(img => {
  loader.observe(img);
});
```

## 总结

IntersectionObserver 是处理元素可见性检测的**最佳方案**，特别适合：
- ✅ 图片懒加载
- ✅ 无限滚动
- ✅ 广告曝光统计
- ✅ 动画触发
- ✅ 性能监控

**核心优势：** 性能好、使用简单、不触发回流。

