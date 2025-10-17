'use server'

import { revalidatePath } from "next/cache"

// 模拟网络延迟的工具函数
const sleep = ms => new Promise(r => setTimeout(r, ms));

// 模拟数据库 - 待办事项列表
let data = ['阅读', '写作', '冥想']

/**
 * 查询所有待办事项
 * @returns {Array} 待办事项列表
 */
export async function findToDos() {
    return data
}

/**
 * 创建新的待办事项
 * @param {Object} prevState - 之前的状态（用于 useFormState）
 * @param {FormData} formData - 表单数据
 * @returns {Object} 包含成功消息的对象
 */
export async function createToDo(prevState, formData) {
    // 故意延迟 2.5 秒，模拟慢速网络，用来展示乐观更新的效果
    await sleep(2500)

    // 从表单数据中获取待办事项内容
    const todo = formData.get('todo')

    // 添加到数据列表
    data.push(todo)

    // 重新验证 form4 路由的缓存，触发页面数据更新
    revalidatePath('form4')

    // 返回成功消息（会被 useFormState 接收）
    return {
        message: `add ${todo} success!`
    }
}