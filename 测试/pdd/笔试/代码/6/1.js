function createRouter() {
    const routes = [] // 存储所有路由规则

    return {
        // 添加路由实例
        addRoute(path, name) {
            routes.push({path, name})
        },
        // 匹配当前路径
        matchCurrentPath(path) {
            for (let route of routes) {
                if (path === route.path) {
                    return {name: route.name, params: {}}
                }
                // 路由路径分割
                const pathParts = path.split('/')
                // 当前路径分割
                const routeParts = route.path.split('/')
                
                // 检查是否包含通配符 *
                const hasWildcard = routeParts.includes('*')
                
                if (hasWildcard) {
                    // 处理通配符路由
                    const wildcardIndex = routeParts.indexOf('*')
                    // 通配符前的部分必须完全匹配
                    if (pathParts.length < wildcardIndex) {
                        continue
                    }
                    
                    let matched = true
                    const params = {}
                    
                    // 检查通配符前的路径是否匹配
                    for (let i = 0; i < wildcardIndex; i++) {
                        if (routeParts[i] !== pathParts[i]) {
                            matched = false
                            break
                        }
                    }
                    
                    if (matched) {
                        // 将通配符后的所有路径作为参数
                        const wildcardValue = pathParts.slice(wildcardIndex).join('/')
                        params['*'] = wildcardValue
                        return {name: route.name, params}
                    }
                } else {
                    // 原有的精确匹配逻辑
                    // 路由路径长度 和 当前路径长度不一样 直接跳过
                    if (pathParts.length !== routeParts.length) {
                        continue
                    }
                    const params = {} // 存储路由参数
                    let matched = true // 匹配标志位
                    // 遍历路由路径
                    for (let i = 0; i < routeParts.length; i++) {
                        let routePart = routeParts[i] // 保存当前路径路径
                        let currentPart = pathParts[i] // 保存当前路由路径
                        if (routePart.startsWith(':')) {
                            let paramName = routePart.slice(1) // 截取参数名
                            params[paramName] = currentPart    // 存储参数
                        } else if (routePart !== currentPart) {
                            matched = false
                            break
                        }
                    }
                    if (matched) {
                        return {name: route.name, params}
                    }
                }
            }
            return null
        }
    }
}


function runTest() {
    console.log('--- 测试开始 ---');
    const router = createRouter();

    // 添加路由规则，注意添加顺序
    router.addRoute('/home', 'HomePage');
    router.addRoute('/users/new', 'CreateUserPage'); // 静态路径优先
    router.addRoute('/users/:id', 'UserDetailPage');
    router.addRoute('/users/:name/posts/:postId', 'UserPostsDetailPage');
    router.addRoute('/files/*', 'FilesOverviewPage');
    router.addRoute('/about', 'AboutPage');

    const testCases = [
        '/home',
        '/about',
        '/users/123',
        '/users/new',
        '/users/456/posts/789',
        '/files/images/summer.jpg',
        '/products/123', // 未匹配
        '/users/new/profile' // 未匹配
    ];

    testCases.forEach(path => {
        const result = router.matchCurrentPath(path);
        console.log(`Matching "${path}":`, JSON.stringify(result));
    });

    console.log('--- 期望输出 ---');
    console.log('Matching "/home": {"name":"HomePage","params":{}}');
    console.log('Matching "/about": {"name":"AboutPage","params":{}}');
    console.log('Matching "/users/123": {"name":"UserDetailPage","params":{"id":"123"}}');
    console.log('Matching "/users/new": {"name":"CreateUserPage","params":{}}');
    console.log('Matching "/users/456/posts/789": {"name":"UserPostsDetailPage","params":{"name":"456","postId":"789"}}');
    console.log('Matching "/files/images/summer.jpg": {"name":"FilesOverviewPage","params":{"*":"images/summer.jpg"}}');
    console.log('Matching "/products/123": null');
    console.log('Matching "/users/new/profile": null');
}
  

runTest();