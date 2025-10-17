'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { createToDo } from './actions'

const initialState = {
    message: null
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button type='submit' aria-disabled={pending}>
            {pending ? 'Adding' : 'Add'}
        </button>
    )
}
 
export function AddForm() {
    const [state, formAction] = useFormState(createToDo, initialState)

    return (
        <form action={formAction}>
            <input type="text" name="todo" required/>
            <SubmitButton />
            <p aria-live='polite'>
                {state?.message}
            </p>
        </form>
    )
}