# 回调
 - 回调地狱:
 1. 不利于阅读和维护
 2. 函数嵌套过深, 很难处理错误
 3. 无法通过 try catch 捕获错误

 # promise
 - promise原理:
 1. promise 是一个构造函数
 2. 构造函数中传递一个执行器, 执行器中传递两个参数, 分别是 resolve 和 reject
 3. 执行器会立即执行
 4. 执行器中可以调用 resolve 和 reject
 5. resolve 和 reject 是两个函数
 6. 调用 resolve 会将 promise 的状态改为成功
 7. 调用 reject 会将 promise 的状态改为失败
 8. 调用 resolve 或 reject 后, 会调用 then 或 catch 中的函数
 9. 调用 resolve 或 reject 后, 会将 then 或 catch 中的函数取出来执行
 10. 执行器中可以调用 resolve 和 reject 多个次
 11. 调用 resolve 或 reject 后, 会将 then 或 catch 中的函数取出来执行多次

 - then 语法:
 1. 默认返回一个新的 promise 对象, 状态同 then 前面的 promise 状态
 2. then 中的回调如果存在 return promise, 那么 then 则启用 return promise 的状态, 并将 return promise 的结果作为 then 回调的参数
 3. then 中的回调如果不存在 return promise, 那么 then 则返回 undefined, 并将 undefined 作为 then 回调的参数
 4. then 中的回调如果抛出错误, 那么 then 则返回失败, 并将错误作为 then 回调的参数