export const dynamic = 'force-dynamic'

const sleep = ms => new Promise(r => setTimeout(r, ms));

export default async function Settings() {
    await sleep(2000)
    return (
        <div className="h-60 flex-1 rounded-xl bg-teal-400 text-white flex items-center justify-center">Hello, Settings! {new Date().toLocaleString()}</div>
    )
}