// app/page.js
import { inter, lora, sourceCodePro700} from '@/fonts'

export default function Page() {
  return (
    <div>
      <p className={inter.className}>Hello world using Inter font</p>
      <p style={lora.style}>Hello world using Lora font</p>
      <p className={sourceCodePro700.className}>
        Hello world using Source_Sans_3 font with weight 700
      </p>
      {/* <p className={greatVibes.className}>My title in Great Vibes font</p> */}
    </div>
  )
}