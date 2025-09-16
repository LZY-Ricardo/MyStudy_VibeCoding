# http 状态码
    - 2xx
        1. 200 OK 成功
        2. 204 No Content 无内容 (响应体为空)
        3. 206 Partial Content 部分内容 (范围请求)
    - 3xx   
        1. 301 Moved Permanently 永久重定向 资源永久移动到新的位置
        2. 302 Found 临时重定向
        3. 303 See Other 资源给放在另一个 url 应该用 get 请求 （重定向到 get 请求）
        4. 304 Not Modified 未修改 (协商缓存命中)
        5. 307 Temporary Redirect 临时重定向 (请求方法不被允许)
    - 4xx
        1. 400 Bad Request 客户端请求语法错误
        2. 401 Unauthorized 未授权
        3. 403 Forbidden 禁止访问
        4. 404 Not Found 资源不存在 (前端请求的路径有问题)
        5. 405 Method Not Allowed 方法不允许 (请求方法不被允许)
    - 5xx
        1. 500 Internal Server Error 服务器内部错误
        2. 501 Not Implemented 未实现 (服务器不支持请求的功能)
        3. 502 Bad Gateway 网关错误
        4. 503 Service Unavailable 服务不可用 (服务器超负荷中)
        5. 504 Gateway Timeout 网关超时 (网关或代理服务器没有及时收到来自上游服务器的响应)

