import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(request) {
    const tag = request.nextUrl.searchParams.get('tag')
    revalidateTag(tag)

    // 重定向回首页，这样用户就能看到新的图片
    redirect('/')
}