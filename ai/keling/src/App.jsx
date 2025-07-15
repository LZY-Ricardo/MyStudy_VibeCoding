import { useRef, useState } from 'react'
import './App.css'

export default function App() {
  const promptRef = useRef(null)
  const [imgUrl, setImgUrl] = useState(null)

  const generateImage = async () => {
    const negative_prompt = 'Blurry, Bad, Bad anatomy, Bad proportions, Deformed, Disconnected limbs, Disfigured, Extra arms, Extra limbs, Extra hands, Fused fingers, Gross proportions, Long neck, Malformed limbs, Mutated, Mutated hands, Mutated limbs, Missing arms, Missing fingers, Poorly drawn hands, Poorly drawn face.'
    const endpoint = '/klingai/v1/images/generations'
    const token = await (await fetch('/api/jwt-auth')).text()
    console.log(token);
    const payload = {
      prompt: promptRef.current.value,
      negative_prompt,
      model_name: 'kling-v1',
      aspect_ratio: '4:3',
    }
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    const data = await response.json()
    setImgUrl(data.data[0].url)
  }

  return (
    <div className='container'>
      <div>
        <label>Prompt:</label>
      <button onClick={generateImage}>生成</button>
      <textarea className='prompt-textarea' ref={promptRef}></textarea>
      </div>
      <div className='output'>
        <img src={imgUrl} alt="" />
      </div>
    </div>
  )
}
