// 串行数据获取

async function Playlists({ artistId }) {
    // 等待 playlists 数据获取
    const playlists = await getArtistPlaylists(artistId)

    return (
        <ul>
            {
                playlists.map((playlists) => (
                    <li key={playlists.id}>{playlists.name}</li>
                ))
            }
        </ul>
    )
}

export default async function Page({ params: {username}}) {
    // 等待 artist 数据
    const artist = await getArtist(username)

    return (
        <>
            <h1>{artist.name}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Playlists artistId={artist.id} />
            </Suspense>
        </>
    )
}


// 并行请求数据
import Albums from './albums'

// 组件外定义
async function getArtist(username) {
    const res = await fetch(`https://api.example.com/artist/${username}`)
    return res.json()
}

async function getArtistAlbums(username) {
    const res = await fetch(`https://api.example.com/artist/${username}/albums`)
    return res.json()
}

export default async function Page({ params: { username } }) {
    // 组件内调用，这里是并行的
    const artistData = getArtist(username)
    const albumsData = getArtistAlbums(username)

    // 等待 promise resolve
    const [artist, albums] = await Promise.all([artistData, albumsData])

    return (
        <>
            <h1>{artist.name}</h1>
            <Albums list={albums}></Albums>
        </>
    )
}