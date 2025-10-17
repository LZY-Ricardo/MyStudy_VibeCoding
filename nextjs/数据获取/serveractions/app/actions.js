'use server'

export async function createToDo(prevState, formData) {
    try {
        await createItem(formData.get('todo'))
        return revalidatePath('/')
    } catch (error) {
        return { message : 'Failed to create item'}
    }
}