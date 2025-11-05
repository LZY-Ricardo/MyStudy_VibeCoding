// components/author.js
import Image from 'next/image'
import me from '../photos/me.jpg'

export default function Author() {
    return (
        <Image
            src={me}
            alt="Picture of the author"
            sizes="100vw"
            style={{
                width: '100%',
                height: 'auto',
            }}
        />
    )
}