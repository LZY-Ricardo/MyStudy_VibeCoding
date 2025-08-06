import React, { useState, useRef } from 'react'
import './App.css'

export default function App() {
  const [status, setStatus] = useState('ready')
  const audioRef = useRef(null)
  const [inputText, setInputText] = useState('')

  function createBlobUrl(base64AudioData) {
    let byteArrays = []
    let byteCharacters = atob(base64AudioData)
    for (let offset = 0; offset < byteCharacters.length; offset++) {
      let byteArray = byteCharacters.charCodeAt(offset)
      byteArrays.push(byteArray)
    }
    let blob = new Blob([new Uint8Array(byteArrays)], { type: 'audio/mp3' })
    console.log(URL.createObjectURL(blob));
    
    return URL.createObjectURL(blob)
    
  }

  const generateAudio = async () => {
    const token = import.meta.env.VITE_ACCESS_TOKEN
    const appId = import.meta.env.VITE_APP_ID
    const clusterId = import.meta.env.VITE_CLUSTER_ID
    const voiceName = 'zh_male_shenyeboke_moon_bigtts'

    const endpoint = '/tts/api/v1/tts'
    const headers = {
      Authorization: `Bearer;${token}`,
      'Content-Type': 'application/json',
    }
    const payload = {
      app: {
        appid: appId,
        token,
        cluster: clusterId,
      },
      user: {
        uid: 'Ricardo'
      },
      audio: {
        voice_type: voiceName,
        encoding: 'ogg_opus',
        speed_ratio: 1.0,
        emotion: 'happy',
      },
      request: {
        reqid: 'UUID',
        text: inputText,
        text_type: 'plain',
        operation: 'query'
      }
    }

    setStatus('loading')
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!data.data) {
      return setStatus('ERROR')
    }

    const url = createBlobUrl(data.data)
    audioRef.current.src = url
    audioRef.current.play()
    setStatus('success')
  }

  return (
    <div className='container'>
      <div className='input-section'>
        <div className='input-header'>
          <label>语音合成提示词</label>
          <button onClick={generateAudio}>生成 & 播放</button>
        </div>
        <textarea 
          placeholder="请输入要转换为语音的文本..."
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        ></textarea>
      </div>
      <div className="output">
        <div className={`status ${status}`}>{status === 'ready' ? '准备就绪' : status === 'loading' ? '生成中...' : status === 'success' ? '生成成功' : '生成失败'}</div>
        <div className="audio-player">
          <audio ref={audioRef} controls></audio>
        </div>
      </div>
    </div>
  )
}