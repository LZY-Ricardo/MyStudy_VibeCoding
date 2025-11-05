'use client'

import Image from 'next/image'

const imageLoader = ({ src, width, quality }) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function Page() {
    return (
        <Image
            loader={imageLoader}
            src="me.png"
            alt="Picture of the author"
            width={500}
            height={500}
        />
    )
}