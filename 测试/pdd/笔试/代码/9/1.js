/**
 * @param fn 要节流的函数
 * @param delay 节流间隔，单位毫秒
 * @returns 返回一个新的节流函数
 */
function throttleWithTrailing(fn, delay) {
    // TODO: 实现
    let timer = null // 尾流定时器
    let preTime = 0 // 上次执行时间
    return function throttled(...args) {
        let nowTime = Date.now() // 当前时间

        // 清除上一次的尾流定时器
        if (timer) {
            clearTimeout(timer)
        }

        if (nowTime - preTime >= delay) { // 超过节流间隔，立即执行
            fn.apply(this, args)
            preTime = nowTime
        } else { // 未超过节流间隔，设置尾流定时器
            timer = setTimeout(() => { // 未超过节流间隔，delay 到时间后执行
                fn.apply(this, args)
                preTime = Date.now() // 更新上次执行时间
                timer = null
            }, delay - (nowTime - preTime))
        }
    }
}

const log = throttleWithTrailing(console.log, 1000);

// log("A"); // 立即执行，输出 "A"
// log("B"); // 忽略
// log("C"); // 输出 "C"（delay 到时间后补偿执行）

setTimeout(() => log("D"), 1100); // 立即执行，输出 "D"
setTimeout(() => log("E"), 1500); // 输出 "E"（delay 到时间后补偿执行）