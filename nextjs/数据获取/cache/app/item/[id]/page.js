// app/item/[id]/page.js
import { getItem } from '@/utils/get-item'

export const revalidate = 3600

export default async function Page({ params: { id } }) {
    const item = await getItem(id)
    // ...
}