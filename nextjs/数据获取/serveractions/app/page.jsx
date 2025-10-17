import { SubmitButton } from '@/app/submit-button'

// export default async function Home() {
//     return (
//         <form action="#">
//             <input type="text" name="field-name" />
//             <SubmitButton />
//         </form>
//     )
// }

function AddForm() {
    async function serverActionWithError() {
        'use server'
        throw new Error('This is error is in the Server Action')
    }

    return (
        <form action={serverActionWithError}>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default AddForm