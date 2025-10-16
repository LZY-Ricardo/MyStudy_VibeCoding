import Article, { preload, checkIsAvailable } from './components/Article'

export default async function Page({ params: { id } }) {
    // 获取文章数据
    preload(id)
    // 执行另一个异步任务, 这里是伪代码, 比如判断文章是否有权访问
    const isAvailable = await checkIsAvailable()

    return isAvailable ? <Article id={id} /> : <div>No access</div>
}