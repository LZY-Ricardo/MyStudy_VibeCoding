function renderTemplate(template, data) {
    // 1. 正则表达式：匹配所有 {{...}} 占位符
    // - /g：全局匹配（找到所有占位符，而非只找第一个）
    // - {{(.*?)}}：非贪婪匹配 {{ 和 }} 之间的内容（避免把 {{a}}{{b}} 当成一个整体）
    // - (.*?)：捕获组，提取占位符内的「变量路径」（如 user.name）
    const regex = /{{(.*?)}}/g;

    // 2. 替换匹配到的占位符：replace 接收「回调函数」处理每个匹配项
    return template.replace(regex, (match, key) => {
        // match：当前匹配的完整占位符（如 {{ user.name }}）
        // key：捕获组提取的变量路径（如 " user.name "，带空格）

        // 2.1 清理变量路径：去除前后空格（处理 {{ user.name }} 这类带空格的情况）
        key = key.trim();

        // 2.2 拆分嵌套路径：将 "user.address.city" 拆分为 ["user", "address", "city"]
        const paths = key.split('.');

        // 2.3 逐层访问数据对象的属性
        let value = data; // 从根数据开始遍历
        for (const path of paths) {
            // 安全判断：确保当前 value 存在、是对象（含数组）、且包含当前 path 属性
            if (value && typeof value === 'object' && path in value) {
                value = value[path]; // 进入下一层属性（如 value从 data → data.user）
            } else {
                value = ''; // 路径不存在时，直接置空并终止遍历
                break;
            }
        }

        // 2.4 类型过滤：仅保留字符串/数字，其他类型（布尔、对象等）置空
        return typeof value === 'string' || typeof value === 'number' ? value : '';
    });
  }