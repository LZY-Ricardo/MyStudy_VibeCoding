// ========== 演示：返回 Promise 会等待执行完毕 ==========

console.log('=== 示例1: 演示等待机制 ===\n')

function step1() {
    console.log('📍 Step 1 开始执行')
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('✅ Step 1 完成 (1秒后)')
            resolve('Step1的结果')
        }, 1000)
    })
}

function step2(previousResult) {
    console.log(`📍 Step 2 开始执行，收到: ${previousResult}`)
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('✅ Step 2 完成 (2秒后)')
            resolve('Step2的结果')
        }, 2000)
    })
}

function step3(previousResult) {
    console.log(`📍 Step 3 开始执行，收到: ${previousResult}`)
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('✅ Step 3 完成 (1秒后)')
            resolve('Step3的结果')
        }, 1000)
    })
}

const startTime = Date.now()

step1()
    .then(result1 => {
        console.log(`⏱️  已耗时: ${Date.now() - startTime}ms\n`)
        // 返回 Promise，会等待 step2 完成
        return step2(result1)  // ← 关键：返回 Promise，等待执行
    })
    .then(result2 => {
        console.log(`⏱️  已耗时: ${Date.now() - startTime}ms\n`)
        // 再返回 Promise，继续等待 step3 完成
        return step3(result2)  // ← 关键：返回 Promise，等待执行
    })
    .then(result3 => {
        console.log(`⏱️  已耗时: ${Date.now() - startTime}ms`)
        console.log(`🎉 全部完成！最终结果: ${result3}`)
        console.log(`⏰ 总耗时: ${Date.now() - startTime}ms (≈ 4000ms)\n`)
    })


// ========== 对比：不返回 Promise ==========
setTimeout(() => {
    console.log('\n=== 示例2: 不返回 Promise（错误示范）===\n')

    const startTime2 = Date.now()

    step1()
        .then(result1 => {
            console.log(`⏱️  已耗时: ${Date.now() - startTime2}ms`)
            step2(result1)  // ❌ 没有 return，不会等待！
            console.log('⚠️  没有等待 step2，直接继续了！\n')
        })
        .then(result2 => {
            console.log(`⏱️  已耗时: ${Date.now() - startTime2}ms`)
            console.log(`❌ result2 是: ${result2}`)  // undefined
            console.log(`⏰ 总耗时: ${Date.now() - startTime2}ms (≈ 1000ms，太快了！)\n`)
        })
}, 5000)


// ========== 更复杂的例子：链式依赖 ==========
setTimeout(() => {
    console.log('\n=== 示例3: 实际应用场景 ===\n')

    function 登录(username) {
        console.log(`🔐 正在登录: ${username}`)
        return new Promise(resolve => {
            setTimeout(() => {
                const token = 'token_' + Math.random().toString(36).substr(2, 9)
                console.log(`✅ 登录成功，获得 token: ${token}`)
                resolve(token)
            }, 500)
        })
    }

    function 获取用户信息(token) {
        console.log(`📱 使用 token 获取用户信息...`)
        return new Promise(resolve => {
            setTimeout(() => {
                const userInfo = { name: '张三', age: 25 }
                console.log(`✅ 获取用户信息成功:`, userInfo)
                resolve(userInfo)
            }, 800)
        })
    }

    function 获取用户权限(userInfo) {
        console.log(`🔑 获取 ${userInfo.name} 的权限...`)
        return new Promise(resolve => {
            setTimeout(() => {
                const permissions = ['read', 'write', 'delete']
                console.log(`✅ 权限获取成功:`, permissions)
                resolve(permissions)
            }, 600)
        })
    }

    // ✅ 正确写法：每一步都等待上一步完成
    登录('user123')
        .then(token => {
            // 返回 Promise，等待获取用户信息
            return 获取用户信息(token)  // ← 等待
        })
        .then(userInfo => {
            // 返回 Promise，等待获取权限
            return 获取用户权限(userInfo)  // ← 等待
        })
        .then(permissions => {
            console.log(`\n🎊 流程完成！最终权限:`, permissions)
        })
        .catch(error => {
            console.error('❌ 出错了:', error)
        })
}, 10000)


// ========== 总结 ==========
setTimeout(() => {
    console.log('\n' + '='.repeat(60))
    console.log('📚 核心总结')
    console.log('='.repeat(60))
    console.log(`
✅ 返回 Promise：
   .then(result => {
       return somePromise()  // 会等待 somePromise 执行完
   })
   .then(nextResult => {
       // 这里收到的是 somePromise 的结果
   })

❌ 不返回 Promise：
   .then(result => {
       somePromise()  // 不会等待，立即进入下一个 then
   })
   .then(nextResult => {
       // nextResult 是 undefined
   })

🔑 关键点：
   1. return Promise → 会等待这个 Promise 完成
   2. 不 return → 立即进入下一个 then，收到 undefined
   3. Promise 链会自动扁平化，不需要嵌套
   4. 每个 then 依次等待，形成串行执行
    `)
}, 13000)

