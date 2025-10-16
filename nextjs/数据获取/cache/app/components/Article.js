// components/Article.js
import { getArticle } from '@/utils/get-article'
import { cache } from 'react'

export const getArticle = cache(async (id) => {
    // ...
})

export const preload = (id) => {
    void getArticle(id)
}

export const checkIsAvailable = (id) => {
    // ...
}

export default async function Article({ id }) {
    const result = await getArticle(id)
    // ...
}