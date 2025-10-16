import { cache } from "react";

export const getItem = cache(async (id) => {
    const item = await db.item.findUnique({ id })
    return item
})