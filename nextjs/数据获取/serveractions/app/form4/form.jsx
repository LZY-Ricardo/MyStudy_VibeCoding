'use client'

import { useOptimistic } from "react"
import { useFormState } from "react-dom"
import { createToDo } from './actions'

/**
 * 表单组件 - 使用乐观更新提升用户体验
 * @param {Object} props
 * @param {Array} props.todos - 从服务器获取的初始待办事项列表
 */
export default function Form({ todos }) {
    // ===== 1. useFormState - 管理表单提交状态 =====
    // state: 服务器返回的状态（如成功消息）
    // sendFormAction: 触发 Server Action 的函数
    const [state, sendFormAction] = useFormState(createToDo, {
        message: '' // 初始状态
    })

    // ===== 2. useOptimistic - 实现乐观更新 =====
    // optimistiToDos: 包含乐观更新的待办事项列表
    // addOptimisticTodo: 立即添加新项到 UI 的函数
    const [optimistiToDos, addOptimisticTodo] = useOptimistic(
        // 参数1: 初始数据 - 将字符串数组转换为对象数组
        todos.map((i) => ({ text: i })),

        // 参数2: 更新函数 - 定义如何添加乐观数据
        (state, newTodo) => [
            ...state,  // 保留现有的所有项
            {
                text: newTodo,
                sending: true  // 标记为"发送中"状态
            }
        ]
    )

    // ===== 3. 表单提交处理函数 =====
    async function formAction(formData) {
        // 步骤1: 立即更新 UI（乐观更新）- 用户马上看到新项
        addOptimisticTodo(formData.get('todo'))

        // 步骤2: 发送到服务器（实际保存）- 后台处理，需要 2.5 秒
        await sendFormAction(formData)

        // 步骤3: 服务器返回后，自动移除 sending 标记，显示最终状态
    }

    // 调试输出：查看乐观更新后的数据结构
    console.log(optimistiToDos)

    return (
        <>
            {/* ===== 表单区域 ===== */}
            <form action={formAction}>
                <input type="text" name="todo" />
                <button type="submit">Add</button>

                {/* 显示服务器返回的消息（如"add 跑步 success!"） */}
                <p aria-live="polite">
                    {state?.message}
                </p>
            </form>

            {/* ===== 待办事项列表 ===== */}
            <ul>
                {optimistiToDos.map(({ text, sending }, i) => (
                    <li key={i}>
                        {text}
                        {/* 如果 sending=true，显示"发送中"提示 
                            注：这里使用 sending 或 !!sending 效果相同
                            !! 只是明确表示布尔转换，增强代码可读性 */}
                        {sending && <small>(Sending...)</small>}
                    </li>
                ))}
            </ul>
        </>
    )
}
