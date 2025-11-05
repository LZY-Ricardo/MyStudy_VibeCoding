// app/page.js
import Image from 'next/image'
import pic from './pic.jpg'

export default function Page() {
  return (
    <div style={{
      width: '200px',
      height: '200px',
      backgroundColor: "#ccc",
      position: 'relative'
    }}>
    <Image
      src={pic}
      alt="Picture of the author"
        fill={true}
        style={{ objectFit: "contain" }}
      // width={500} 
      // height={500} 
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
      />
    </div>
  )
}