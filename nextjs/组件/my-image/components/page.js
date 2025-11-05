// components/page.js
import Image from 'next/image'

export default function Page({ photoUrl }) {
    return (
        <Image
            src={photoUrl}
            alt="Picture of the author"
            sizes="100vw"
            style={{
                width: '100%',
                height: 'auto',
            }}
            width={500}
            height={300}
        />
    )
}