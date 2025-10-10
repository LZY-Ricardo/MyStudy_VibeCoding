/**
 * 实现一个名为 getAllHTMLTags 的函数，要求获取当前页面中所有节点的标签名字，以数组形式输出，重复的标签仅输出一次。
 */

function getAllHTMLTags() {
    const tags = document.querySelectorAll('*')
    const tagsName = [...tags].map(tag => tag.tagName.toLowerCase())
    const set = new Set(tagsName)
    return Array.from(set)
}