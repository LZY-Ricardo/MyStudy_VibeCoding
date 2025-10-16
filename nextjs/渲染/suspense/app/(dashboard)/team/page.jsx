const sleep = (ms) => new Promise(r => setTimeout(r, ms))

export default async function Team() {
    await sleep(2000)
    return (
        <div className="h-60 flex-1 rounded-xl bg-pink-400 text-white flex items-center justify-center">
            Hello, Team!
        </div>
    )
}