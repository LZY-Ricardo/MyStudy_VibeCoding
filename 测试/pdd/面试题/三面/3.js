/**实现一个函数 `printReponse`，接收一个 `url` 字符串数组作为参数，并发请求每个 `url`，并尽可能快的按照数组顺序打印每个 `url` 返回值。
例如：假设有三个 `url`：`url1`、`url2`、`url3`，三个 `url` 的请求响应值分别为：`'url1'`、`'url2'`、`'url3'`，响应时间分别为：200ms、100ms、300ms；调用该函数输入为 `[url1, url2, url3]`，则 200ms 时打印 `url1`、`url2`，300ms 时打印 `url3`。 */

import { resolve } from "path"

function printResponse(urls) {
    const startTime = Date.now()

    // 结果数组
    const result = new Array(urls.length)
    // 当前应该打印的索引
    let printIndex = 0

    // 并发执行所有任务
    const promises = urls.map((url, index) => {
        return url().then(response => {
            result[index] = response

            // 尽可能快地按顺序打印
            while (printIndex < result.length && result[printIndex] !== undefined) {
                const elapsed = Date.now() - startTime
                console.log(`[${elapsed}ms] 打印 ${printIndex}:`, result[printIndex])
                printIndex++
            }

            return response  // ✅ 返回响应值
        }).catch(error => {
            result[index] = error

            while (printIndex < result.length && result[printIndex] !== undefined) {
                const elapsed = Date.now() - startTime
                console.log(`[${elapsed}ms] 打印 ${printIndex}:`, result[printIndex])
                printIndex++
            }

            return error  // ✅ 返回错误（或者 throw error）
        })
    })
    // promises.forEach(promise => {
    //     console.log(promise);
    // })
    return Promise.all(promises)
}

// 测试用例
function task(delay, name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(name)
        }, delay)
    })
}
let tasks = [() => task(2000, 'url1'), () => task(1000, 'url2'), () => task(3000, 'url3')]
printResponse(tasks)
    .then((value) => {
        console.log(value);

    })