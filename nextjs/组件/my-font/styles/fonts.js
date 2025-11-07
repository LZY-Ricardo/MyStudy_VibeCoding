// styles/fonts.js
import { Inter, Lora, Source_Sans_3 } from 'next/font/google'
import localFont from 'next/font/local'


const inter = Inter()
const lora = Lora()

const sourceCodePro400 = Source_Sans_3({ weight: '400' })
const sourceCodePro700 = Source_Sans_3({ weight: '700' })

// const greatVibes = localFont({ src: './GreatVibes-Regular.ttf' })

export { inter, lora, sourceCodePro400, sourceCodePro700 }