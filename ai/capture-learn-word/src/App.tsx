import PictureCard from './components/PictureCard'
import { useState } from 'react'
import './app.css'
import { generateAudio } from './lib/audio'


const userPrompt = `请分析图片中的内容,找出最能描述图片中的内容的一个英文单词,尽量选择更简单的A1~A2级别的单词。返回 JSON 数据:
{
    "img_description": "图片的描述",
    "representative_word": "最难描述图片的单词",
    "example_sentence": "结合英文单词和图片描述, 给出一个简单的例句",
    "explanation": "结合图片解释英文单词, 段落以 Look at ... 开头, 将段落分句, 每句单独一行, 解释的最后给一个日常生活有关的问句",
    "example_replys": ["根据explanation给出的回复 1", "根据explanation给出的回复 2"],
}
`

export default function App() {
    const [audio, setAudio] = useState('')
    const [sentence, setSentence] = useState('')
    const [imgPreview, setImgPreview] = useState(undefined as string | undefined)
    const [detailExpand, setDetailExpand] = useState(false)
    const [word, setWord] = useState('请上传图片')
    const [explaination, setExplaination] = useState('') //解析
    const [replys, setReplys] = useState([]) // 回答



    const submit = async (data: string) => {
        setImgPreview(data)
        // 图片分析
        const endpoint = "https://api.moonshot.cn/v1/chat/completions"

        const headers = {
            "Authorization": `Bearer ${import.meta.env.VITE_KIMI_API_KEY}`,
            "Content-Type": "application/json"
        }
        setWord('分析中...')
        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                model: "moonshot-v1-8k-vision-preview",
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'image_url',
                                image_url: {
                                    url: data
                                }
                            },
                            {
                                type: 'text',
                                text: userPrompt
                            }
                        ]
                    }
                ]
            })
        })
        const res = await response.json()
        // console.log(res.choices[0].message.content);
        const replyData = JSON.parse(res.choices[0].message.content)
        setWord(replyData.representative_word)
        setSentence(replyData.example_sentence)
        setExplaination(replyData.explanation)
        setReplys(replyData.example_replys)

        // 获取音频
        const audioUrl = await generateAudio(replyData.representative_word)
        setAudio(audioUrl)

    }

    return (
        <div className='container'>
            <PictureCard word={word} submit={submit} audio={audio} />
            <div className="output">
                <div>{sentence}</div>
                <div className='detail'>
                    <button onClick={() => setDetailExpand(!detailExpand)}>Talk about it</button>

                    <div className="aaa">
                        {detailExpand ? (
                            <div className='expand'>
                                <img src={imgPreview} alt="" />
                                <div className='explaination'>
                                    {
                                        explaination.split('\n').map((item, index) => (
                                            <p key={index}>{item}</p>
                                        ))
                                    }
                                </div>
                                <div className='reply'>
                                    {replys.map((item, index) => (
                                        <p key={index}>{item}</p>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className='fold'></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
