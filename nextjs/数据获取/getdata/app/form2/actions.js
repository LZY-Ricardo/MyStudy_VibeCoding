'use server'

import { revalidatePath } from 'next/cache';

const data = ['阅读', '写作', '冥想']

export async function findToDos() {
    return data
}

export async function createToDo(formData) {
    const todo = formData.get('todo')
    data.push(todo)
    revalidatePath('/form2')
    return data
}

export async function createToDoDirectly(value) {
    const form = new FormData()
    form.append("todo", value)
    return createToDo(form)
}