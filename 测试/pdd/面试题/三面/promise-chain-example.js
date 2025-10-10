// ========== 情况3：在 .then() 中返回 Promise ==========

// 模拟异步请求
function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`✅ 获取用户 ${id} 信息`)
            resolve({ id, name: `User${id}` })
        }, 1000)
    })
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`✅ 获取用户 ${userId} 的帖子`)
            resolve([
                { title: '帖子1', likes: 10 },
                { title: '帖子2', likes: 20 }
            ])
        }, 1000)
    })
}

function fetchPostComments(postTitle) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`✅ 获取帖子 "${postTitle}" 的评论`)
            resolve(['评论1', '评论2', '评论3'])
        }, 1000)
    })
}

console.log('\n========== 示例1: 返回 Promise (自动扁平化) ==========\n')

// ✅ 正确写法：返回 Promise，链会自动扁平化
fetchUser(1)
    .then(user => {
        console.log('👤 用户信息:', user)
        // 返回一个新的 Promise
        return fetchUserPosts(user.id)  // ← 情况3
    })
    .then(posts => {
        console.log('📝 帖子列表:', posts)
        // 再返回一个 Promise
        return fetchPostComments(posts[0].title)  // ← 情况3
    })
    .then(comments => {
        console.log('💬 评论列表:', comments)
        console.log('✨ 完成！')
    })


setTimeout(() => {
    console.log('\n========== 示例2: 不返回 Promise (错误示范) ==========\n')

    // ❌ 错误写法：不返回，导致后续拿不到数据
    fetchUser(2)
        .then(user => {
            console.log('👤 用户信息:', user)
            fetchUserPosts(user.id)  // ← 没有 return！
        })
        .then(posts => {
            // posts 是 undefined，因为上一个 then 没有返回
            console.log('📝 帖子列表:', posts)  // undefined
        })
}, 4000)


setTimeout(() => {
    console.log('\n========== 示例3: Promise 嵌套对比 ==========\n')

    // ❌ 不推荐：Promise 嵌套（回调地狱）
    console.log('--- 嵌套写法（不推荐） ---')
    fetchUser(3).then(user => {
        fetchUserPosts(user.id).then(posts => {
            fetchPostComments(posts[0].title).then(comments => {
                console.log('💬 最终评论:', comments)
            })
        })
    })

    setTimeout(() => {
        console.log('\n--- 链式写法（推荐）---')
        // ✅ 推荐：返回 Promise，扁平化链式调用
        fetchUser(4)
            .then(user => fetchUserPosts(user.id))  // 返回 Promise
            .then(posts => fetchPostComments(posts[0].title))  // 返回 Promise
            .then(comments => {
                console.log('💬 最终评论:', comments)
            })
    }, 4000)
}, 8000)


setTimeout(() => {
    console.log('\n========== 示例4: Promise.all + 返回 Promise ==========\n')

    // 综合应用：并发获取多个用户，然后依次获取他们的帖子
    Promise.all([
        fetchUser(5),
        fetchUser(6),
        fetchUser(7)
    ])
        .then(users => {
            console.log('👥 获取到所有用户:', users.map(u => u.name))
            // 返回一个新的 Promise 数组
            return Promise.all(
                users.map(user => fetchUserPosts(user.id))
            )  // ← 情况3: 返回 Promise
        })
        .then(allPosts => {
            console.log('📚 所有用户的帖子数量:', allPosts.map(posts => posts.length))
            console.log('✨ 全部完成！')
        })
}, 16000)


// ========== 关键点总结 ==========
setTimeout(() => {
    console.log('\n========== 总结 ==========')
    console.log(`
📌 情况3：在 .then() 中返回 Promise

特点：
1. 返回的 Promise 会自动"扁平化"（不会嵌套）
2. 后续的 .then() 会等待这个 Promise 完成
3. 可以实现链式调用，避免回调地狱

对比：
┌─────────────────────────────────────────────────────┐
│ 返回值类型              │ 后续 .then() 收到的值      │
├─────────────────────────────────────────────────────┤
│ return 普通值           │ Promise.resolve(值)        │
│ return Promise          │ 这个 Promise 的结果（扁平）│
│ 不 return (undefined)   │ Promise.resolve(undefined) │
│ throw Error             │ Promise.reject(Error)      │
└─────────────────────────────────────────────────────┘

💡 这就是为什么可以写出优雅的 Promise 链！
    `)
}, 22000)

