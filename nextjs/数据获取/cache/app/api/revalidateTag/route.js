import { revalidateTag } from "next/cache";

export async function GET(request) {
    const tag = request.nextUrl.searchParams.get('tag')
    revalidateTag(tag)
    return Response.json({ revalidated: true, now: Date.now() })
}