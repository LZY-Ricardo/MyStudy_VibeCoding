import { cache } from 'react'
import 'server-only'

export const preloadArticle = (id) => {
    void getArticle(id)
}

export const getArticle = cache(async (id) => {
    // ...
})