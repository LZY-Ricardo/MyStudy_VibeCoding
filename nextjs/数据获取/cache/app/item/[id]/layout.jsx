import { getItem } from '@/utils/get-item'

export const revalidate = 3600

export default async function Layout({ params: { id } }) {
    const item = await getItem(id)
    // ...
}