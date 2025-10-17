import { NextResponse } from "next/server";

const data = ['阅读', '写作', '冥想']

export async function GET() {
    return NextResponse.json({ data })
}

export async function POST(request) {
    const formData = await request.formData()
    console.log(111, formData);

    const todo = formData.get('todo')
    console.log(todo)
    data.push(todo)
    return NextResponse.json({ data })
}