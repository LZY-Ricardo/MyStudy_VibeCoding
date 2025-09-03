# 回调
 - 回调地狱:
 1. 不利于阅读和维护
 2. 函数嵌套过深, 很难处理错误
 3. 无法通过 try catch 捕获错误

 # Promise

 ## Promise 基本原理:
 1. Promise 是一个构造函数，用于封装异步操作
 2. 构造函数接收一个执行器函数(executor)，执行器有两个参数：resolve 和 reject
 3. 执行器会立即同步执行
 4. Promise 有三种状态：pending(待定)、fulfilled(已成功)、rejected(已失败)
 5. 状态只能从 pending 转换为 fulfilled 或 rejected，且状态一旦改变就不可逆
 6. resolve 函数用于将状态从 pending 改为 fulfilled，并传递成功的值
 7. reject 函数用于将状态从 pending 改为 rejected，并传递失败的原因
 8. then 方法用于注册成功和失败的回调函数
 9. catch 方法用于注册失败的回调函数，等价于 then(null, onRejected)
 10. then 和 catch 方法都会返回新的 Promise 对象，支持链式调用
 11. 一旦 Promise 状态确定，多次调用 resolve 或 reject 只有第一次有效
 12. Promise 解决了回调地狱问题，使异步代码更易读和维护

 ## Promise 设计原理:

 ### 1. **解决异步编程问题的设计思路**
 - **回调地狱问题**: 传统回调函数嵌套导致代码难以维护和理解
 - **错误处理困难**: 异步操作中的错误处理分散且容易遗漏
 - **控制流复杂**: 多个异步操作的协调和同步困难

 ### 2. **Promise的核心设计理念**
 - **状态机模式**: 使用三种明确的状态（pending、fulfilled、rejected）来表示异步操作的生命周期
 - **不可变性**: 状态一旦改变就不可逆转，确保了操作的可预测性
 - **链式调用**: 通过返回新Promise实现方法链，使异步代码看起来像同步代码
 - **统一接口**: 所有异步操作都遵循相同的Promise接口，提高了代码的一致性

 ### 3. **架构设计要点**
 - **执行器函数**: 构造函数接收executor函数，立即执行异步操作
 - **回调队列**: 使用数组存储多个then回调，支持一个Promise被多次订阅
 - **异步调度**: 使用setTimeout/queueMicrotask确保回调异步执行
 - **错误传播**: 建立完整的错误传播机制，未捕获的错误会沿链传播
 - **值传递**: 实现值的透明传递和类型转换（Promise解析过程）

 ## Promise 核心特性:
 - **状态不可逆**: 一旦从 pending 变为 fulfilled 或 rejected，状态就固定了
 - **异步执行**: then/catch 中的回调函数总是异步执行
 - **值穿透**: 如果 then 没有传递处理函数，值会穿透到下一个 then
 - **错误冒泡**: 错误会沿着 Promise 链向下传播，直到被 catch 捕获

 - **then 方法设计原理**:
   1. **返回新Promise**: 总是返回一个新的Promise对象，确保链式调用的安全性
   2. **回调返回Promise**: 如果回调函数返回Promise，新Promise会等待该Promise完成，并采用其状态和值
   3. **回调返回普通值**: 如果回调函数返回非Promise值（包括undefined），新Promise会以该值fulfilled
   4. **回调抛出异常**: 如果回调函数抛出错误，新Promise会以该错误rejected
   5. **无回调函数**: 如果没有提供相应的回调函数，值或错误会穿透到下一个then
   6. **异步执行**: 即使Promise已完成，回调函数也会异步执行，保证执行顺序一致性

 ## Promise 静态方法:

 ### Promise.race(promises)
 1. 接收一个Promise数组，返回一个新的Promise对象
 2. 返回的Promise状态取决于数组中**最先完成**（无论成功或失败）的Promise
 3. 一旦有任何一个Promise完成，立即以该Promise的结果resolve或reject
 4. 适用场景：超时控制、竞速请求等

 ### Promise.all(promises)
 1. 接收一个Promise数组，返回一个新的Promise对象
 2. **所有**Promise都成功时，返回所有结果组成的数组（保持原顺序）
 3. **任何一个**Promise失败时，立即reject并返回第一个失败的原因
 4. 适用场景：并发执行多个异步操作，需要所有操作都成功

 ### Promise.any(promises)
 1. 接收一个Promise数组，返回一个新的Promise对象
 2. **任何一个**Promise成功时，立即resolve并返回第一个成功的值
 3. **所有**Promise都失败时，reject并返回AggregateError（包含所有失败原因）
 4. 适用场景：多个备选方案，只要有一个成功即可

 ### Promise.allSettled(promises)
 1. 接收一个Promise数组，返回一个新的Promise对象
 2. 等待**所有**Promise完成（无论成功或失败）
 3. 返回结果数组，每个元素包含status和value/reason
 4. 永远不会reject，总是resolve
 5. 适用场景：需要知道所有操作的最终状态

 ### Promise.resolve(value) / Promise.reject(reason)
 1. 快速创建已完成状态的Promise对象
 2. resolve创建fulfilled状态的Promise
 3. reject创建rejected状态的Promise

 ## Promise 实例方法:

 ### then(onFulfilled, onRejected)
 1. 注册Promise成功和失败的回调函数
 2. 返回新的Promise对象，支持链式调用
 3. onFulfilled：Promise成功时执行的回调
 4. onRejected：Promise失败时执行的回调
 5. 如果回调不是函数，会进行值穿透

 ### catch(onRejected)
 1. 注册Promise失败的回调函数
 2. 等价于 then(null, onRejected)
 3. 返回新的Promise对象
 4. 用于捕获Promise链中的错误

 ### finally(callback)
 1. 无论Promise成功或失败都会执行的回调
 2. 不接收任何参数
 3. 返回新的Promise对象
 4. 不会改变Promise的值，只是添加清理逻辑

 ## MyPromise实现特点:
 - ✅ 支持基本的Promise功能（构造函数、then、catch）
 - ✅ 实现了所有主要静态方法（race、all、any、allSettled、resolve、reject）
 - ✅ 支持finally方法
 - ✅ 正确处理异步回调和状态管理
 - ✅ 支持链式调用和错误传播
 - ⚠️ 使用setTimeout模拟微任务（实际应该使用queueMicrotask）
 - ⚠️ 缺少Promise解析过程（处理返回值为Promise的情况）





 # Generator 函数
 - 生成器函数:
 1. 函数中可以使用 yield 关键字, yield 关键字可以暂停函数的执行
 2. 生成器函数调用后不会立即执行, 而是返回一个迭代器对象
 3. 迭代器对象包含一个 next 方法, 调用一次 next 方法, 就会执行到一个 yield 后面的表达式, next 接收参数
 4. 该对象包含 value 属性和 done 属性
 5. value 属性表示 yield 后面的表达式的值
 6. done 属性表示函数是否执行完毕


# async await
 - async await 原理:
 1. async 函数返回一个 promise 对象
 2. await 关键字只能在 async 函数中使用
 3. await 关键字后面接一个 promise 对象, 会将 promise 对象中 resolve 出来的值读取到, 也可以接一个普通的值, 但如果是普通的值, 就不具备处理异步的能力

 async await = Generator 函数 + co 库 + promise
