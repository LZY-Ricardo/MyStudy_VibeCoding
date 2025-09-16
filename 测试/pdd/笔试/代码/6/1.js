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