import { findToDos } from './actions'
import Form from './form'

/**
 * Form4 页面组件 - 演示乐观更新（Optimistic Updates）
 * 这是一个服务器组件，负责获取初始数据
 */
export default async function Page() {
    // 在服务器端获取待办事项列表
    const todos = await findToDos()

    // 将数据传递给客户端表单组件
    return (
        <Form todos={todos} />
    )
}