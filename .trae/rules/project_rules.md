# project_rules.md（React 项目专属规则）

## 1. 技术栈与版本约束
- React 版本：`^18.2.0`（需使用 React 18 并发特性、Hooks 等能力）；
- 核心依赖规范：
  - 路由：`react-router-dom`（优先使用**数据路由、`useNavigate`**等新版 API）；
  - 状态管理：`zustand@^4.0.0`（推荐用 Zustand 做状态管理，避免过度依赖 Context）；
  - 异步请求：`@tanstack/react-query@^5.0.0`（统一用此库做数据获取与缓存）；
  - 样式方案：`styled-components@^6.0.0`（或项目实际采用的 CSS 方案，如 Tailwind CSS）。


## 2. 禁用/推荐的 API 规则
- 禁止使用 **React 旧版生命周期**：如 `componentWillMount`、`componentWillReceiveProps`（改用 `useEffect` 等 Hooks 替代）；
- 禁止**直接操作 DOM**：优先用 React 声明式方式描述 UI；若需操作 DOM，必须通过 `useRef` + 回调 refs 实现；
- 推荐范式：仅编写 **Function Component + Hooks**，不再创建 Class Component（除非维护遗留代码）；
- 路由跳转：必须用 `react-router-dom` 的 `useNavigate`，禁止使用旧版 `history.push`。


## 3. 代码风格与规范
- 组件命名：采用**大驼峰命名法**，且与文件名保持一致（如组件文件 `UserProfile.tsx` 对应组件名 `UserProfile`）；
- Hooks 规范：
  - 严格遵循 Hooks 规则（仅在组件顶层或自定义 Hooks 中调用 Hooks）；
  - 自定义 Hooks 必须以 `use` 开头（如 `useUserAuth.ts`）；
- 格式与校验：严格遵循项目 `ESLint + Prettier` 配置（补充项目实际规则：禁止滥用 `any` 类型、Props 必须显式定义类型等）；
- 注释要求：公共组件、工具函数需添加**中文注释**，说明“组件功能、Props 含义、核心逻辑依赖”等。


## 4. 测试框架与规范
- 测试工具：使用 `vitest@^0.34.0` + `@testing-library/react@^14.0.0`；
- 测试文件命名：与被测试文件同名，后缀为 `.test.tsx`（如 `UserProfile.tsx` 对应 `UserProfile.test.tsx`）；
- 用例要求：需覆盖“组件核心渲染逻辑、交互逻辑（点击/输入等）”，且用例描述为**中文**（如 `// 测试未登录时用户卡片的渲染状态`）。


## 5. 项目特有约定
- 目录结构：
  - `src/components`：存放通用 UI 组件；
  - `src/pages`：存放页面级组件；
  - `src/hooks`：存放自定义 Hooks；
  - `src/utils`：存放工具函数（如请求封装、格式化工具等）；
- 请求封装：所有接口请求必须通过 `src/utils/request.ts` 封装的 Axios 实例（或项目指定请求工具），并统一处理“错误拦截、请求头携带、超时配置”等逻辑；
- 样式管理：全局样式写在 `src/styles/global.{ts,css}`，组件样式优先用 `styled-components` 做局部作用域，避免全局样式污染。

