# img 标签原生 Lazy Loading 详解

## 一、什么是 loading="lazy"？

`loading="lazy"` 是浏览器**原生支持的图片懒加载属性**，无需 JavaScript 即可实现图片懒加载。

这是最简单、最轻量的懒加载方案！

## 二、基本用法

### 最简单的用法

```html
<img src="image.jpg" alt="描述" loading="lazy" />
```

```jsx
<img src="image.jpg" alt="描述" loading="lazy" />
```

就这么简单！浏览器会自动处理懒加载。

## 三、loading 属性的值

`loading` 属性有两个值：

| 值 | 说明 | 使用场景 |
|---|------|---------|
| `lazy` | 延迟加载 | 图片在可视区域附近时才开始加载 |
| `eager` | 立即加载（默认） | 页面加载时立即加载图片 |

### 示例

```html
<!-- 懒加载 -->
<img src="image.jpg" loading="lazy" />

<!-- 立即加载（默认行为） -->
<img src="image.jpg" loading="eager" />
<!-- 或者不写 loading 属性 -->
<img src="image.jpg" />
```

## 四、工作原理

1. **初始状态**：图片不加载，不占用带宽
2. **滚动触发**：当图片接近可视区域时（浏览器自动计算），开始加载
3. **加载完成**：图片显示

**浏览器会自动：**
- 计算图片与视口的距离
- 在合适的时机开始加载
- 避免重复加载

## 五、完整示例

### HTML 示例

```html
<!DOCTYPE html>
<html>
<head>
    <title>原生懒加载示例</title>
</head>
<body>
    <h1>图片懒加载示例</h1>
    
    <!-- 第一张图片：立即加载 -->
    <img src="image1.jpg" alt="图片1" loading="eager" />
    
    <!-- 后面的图片：懒加载 -->
    <img src="image2.jpg" alt="图片2" loading="lazy" />
    <img src="image3.jpg" alt="图片3" loading="lazy" />
    <img src="image4.jpg" alt="图片4" loading="lazy" />
    
    <!-- 不写 loading 默认是 eager -->
    <img src="image5.jpg" alt="图片5" />
</body>
</html>
```

### React 示例

```jsx
function ImageGallery({ images }) {
  return (
    <div>
      {images.map((img, index) => (
        <img
          key={img.id}
          src={img.url}
          alt={img.alt}
          loading={index === 0 ? "eager" : "lazy"} // 第一张立即加载
          width={img.width}
          height={img.height}
        />
      ))}
    </div>
  );
}
```

## 六、最佳实践

### 1. 首屏图片用 eager，其他用 lazy

```jsx
function Article({ images }) {
  return (
    <div>
      {/* 首屏图片：立即加载 */}
      <img 
        src={images[0]} 
        alt="封面" 
        loading="eager"
        width={800}
        height={600}
      />
      
      {/* 其他图片：懒加载 */}
      {images.slice(1).map((src, i) => (
        <img 
          key={i}
          src={src} 
          alt={`图片${i + 2}`}
          loading="lazy"
          width={800}
          height={600}
        />
      ))}
    </div>
  );
}
```

### 2. 必须设置 width 和 height

**为什么？**
- 避免布局抖动（CLS - Cumulative Layout Shift）
- 浏览器可以提前预留空间
- 提升用户体验

```jsx
// ✅ 好的做法
<img 
  src="image.jpg" 
  loading="lazy"
  width={800}
  height={600}
  alt="描述"
/>

// ❌ 不好的做法（会导致布局抖动）
<img 
  src="image.jpg" 
  loading="lazy"
  alt="描述"
/>
```

### 3. 结合占位图使用

虽然 `loading="lazy"` 可以单独使用，但结合占位图可以避免空白：

```jsx
function LazyImage({ src, alt, width, height }) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div style={{ width, height, backgroundColor: '#f0f0f0' }}>
      <img
        src={loaded ? src : ''}
        alt={alt}
        loading="lazy"
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}
```

## 七、与 IntersectionObserver 对比

### 原生 loading="lazy" 的优势

| 特性 | loading="lazy" | IntersectionObserver |
|------|----------------|---------------------|
| **简单程度** | ⭐⭐⭐⭐⭐ 非常简单 | ⭐⭐⭐ 需要写代码 |
| **性能** | ⭐⭐⭐⭐⭐ 浏览器优化 | ⭐⭐⭐⭐ 性能好 |
| **代码量** | 1个属性 | 10+ 行代码 |
| **兼容性** | Chrome 76+, Firefox 75+, Safari 15.4+ | 更广泛 |

### IntersectionObserver 的优势

| 特性 | IntersectionObserver | loading="lazy" |
|------|---------------------|----------------|
| **灵活性** | ⭐⭐⭐⭐⭐ 完全可控 | ⭐⭐⭐ 浏览器控制 |
| **自定义** | ⭐⭐⭐⭐⭐ 可自定义阈值 | ⭐⭐ 固定行为 |
| **兼容性** | ⭐⭐⭐⭐⭐ 可 polyfill | ⭐⭐⭐ 新浏览器 |
| **复杂场景** | ⭐⭐⭐⭐⭐ 支持 | ⭐⭐ 简单场景 |

## 八、什么时候用哪种方案？

### 使用 `loading="lazy"` 的场景（推荐）

✅ **简单的图片懒加载**
```jsx
<img src="image.jpg" loading="lazy" />
```

✅ **图片列表、画廊**
```jsx
{images.map(img => (
  <img key={img.id} src={img.url} loading="lazy" />
))}
```

✅ **文章中的图片**
```jsx
<article>
  <img src="cover.jpg" loading="eager" />
  {contentImages.map(img => (
    <img src={img} loading="lazy" />
  ))}
</article>
```

### 使用 IntersectionObserver 的场景

✅ **需要自定义加载时机**
```jsx
// 提前200px加载
const observer = new IntersectionObserver(callback, {
  rootMargin: '200px'
});
```

✅ **需要加载状态和错误处理**
```jsx
// 需要显示 loading 状态
const [loading, setLoading] = useState(true);
```

✅ **需要兼容旧浏览器**
```jsx
// 使用 polyfill 支持旧浏览器
import 'intersection-observer';
```

✅ **复杂交互场景**
```jsx
// 需要图片加载完成后的回调
onLoad={() => {
  trackImageLoad();
  animateImage();
}}
```

## 九、组合使用（最佳实践）

可以**组合使用**两种方案：

```jsx
function SmartLazyImage({ src, alt, width, height }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  // 使用原生 loading="lazy" 作为基础
  // 使用 IntersectionObserver 做额外处理（如加载状态）
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // 可以在这里做额外处理
          console.log('图片开始加载');
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width, height, backgroundColor: '#f0f0f0' }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"  // 原生懒加载
        width={width}
        height={height}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0.5 }}
      />
      {!loaded && <div>加载中...</div>}
    </div>
  );
}
```

## 十、浏览器兼容性

### 支持情况

| 浏览器 | 最低版本 | 说明 |
|--------|---------|------|
| Chrome | 76+ | ✅ 完全支持 |
| Firefox | 75+ | ✅ 完全支持 |
| Safari | 15.4+ | ✅ 完全支持 |
| Edge | 79+ | ✅ 完全支持 |
| IE | ❌ | 不支持 |

### 降级方案

对于不支持的浏览器，可以：

```jsx
function LazyImage({ src, alt, loading = 'lazy', ...props }) {
  // 检查浏览器是否支持
  const supportsLazy = 'loading' in HTMLImageElement.prototype;
  
  if (supportsLazy) {
    // 使用原生懒加载
    return <img src={src} alt={alt} loading={loading} {...props} />;
  } else {
    // 降级到 IntersectionObserver
    return <IntersectionObserverLazyImage src={src} alt={alt} {...props} />;
  }
}
```

或者使用 Polyfill：
```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=HTMLImageElement.prototype.loading"></script>
```

## 十一、实际应用示例

### 示例 1：图片画廊

```jsx
function ImageGallery({ images }) {
  return (
    <div className="gallery">
      {images.map((img, index) => (
        <img
          key={img.id}
          src={img.url}
          alt={img.alt}
          loading={index < 3 ? "eager" : "lazy"} // 前3张立即加载
          width={img.width}
          height={img.height}
          className="gallery-item"
        />
      ))}
    </div>
  );
}
```

### 示例 2：文章内容

```jsx
function Article({ content, images }) {
  return (
    <article>
      {/* 封面图：立即加载 */}
      <img 
        src={images.cover} 
        alt="封面"
        loading="eager"
        width={1200}
        height={600}
      />
      
      <div dangerouslySetInnerHTML={{ __html: content }} />
      
      {/* 内容中的图片：懒加载 */}
      {images.content.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`内容图片${i + 1}`}
          loading="lazy"
          width={800}
          height={600}
        />
      ))}
    </article>
  );
}
```

### 示例 3：商品列表

```jsx
function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"  // 商品图片懒加载
            width={300}
            height={300}
          />
          <h3>{product.name}</h3>
          <p>¥{product.price}</p>
        </div>
      ))}
    </div>
  );
}
```

## 十二、注意事项

### 1. ⚠️ 必须设置 width 和 height

```jsx
// ✅ 正确
<img src="image.jpg" loading="lazy" width={800} height={600} />

// ❌ 错误：会导致布局抖动
<img src="image.jpg" loading="lazy" />
```

### 2. ⚠️ 不要与 data-src 混用

```jsx
// ❌ 错误：浏览器会忽略 loading="lazy"
<img data-src="image.jpg" loading="lazy" />

// ✅ 正确：直接使用 src
<img src="image.jpg" loading="lazy" />
```

### 3. ⚠️ iframe 也支持

```html
<!-- iframe 也支持懒加载 -->
<iframe 
  src="https://example.com" 
  loading="lazy"
  width="800"
  height="600"
></iframe>
```

### 4. ⚠️ 首屏图片不要用 lazy

```jsx
// ❌ 错误：首屏图片延迟加载，用户体验差
<img src="hero.jpg" loading="lazy" />

// ✅ 正确：首屏图片立即加载
<img src="hero.jpg" loading="eager" />
```

## 十三、性能对比

### 使用 loading="lazy" 的性能优势

1. **减少初始加载时间**：只加载可视区域的图片
2. **节省带宽**：不加载用户看不到的图片
3. **提升首屏性能**：减少首屏请求数量
4. **浏览器优化**：浏览器自动优化加载时机

### 测试示例

```html
<!-- 100张图片 -->
<!-- 不使用懒加载：初始加载 100 个请求 -->
<!-- 使用 loading="lazy"：初始只加载可视区域的图片（约5-10个请求） -->
```

## 总结

### 推荐使用场景

✅ **简单图片懒加载** → 直接用 `loading="lazy"`  
✅ **图片列表/画廊** → 用 `loading="lazy"`  
✅ **文章内容图片** → 用 `loading="lazy"`  

### 需要使用 IntersectionObserver 的场景

✅ **需要自定义加载时机**  
✅ **需要加载状态/错误处理**  
✅ **需要兼容旧浏览器**  
✅ **复杂交互场景**  

**最佳实践：优先使用 `loading="lazy"`，需要复杂功能时再用 IntersectionObserver！**

