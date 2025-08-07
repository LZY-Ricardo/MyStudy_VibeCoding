import PictureCard from './components/PictureCard'
import { useState } from 'react'
import './app.css'


export default function App() {
    const [audio, setAudio] = useState('')
    const [sentence, setSentence] = useState('')
    const [imgPreview, setImgPreview] = useState(undefined as string | undefined)
    const [detailExpand, setDetailExpand] = useState(false)


    const submit = (data: string) => {
        setImgPreview(data)
    }

    return (
        <div className='container'>
            <PictureCard word='请上传图片' submit={submit} audio={audio} />
            <div className="output">
                <div>{sentence}</div>
                <div className='detail'>
                    <button onClick={() => setDetailExpand(!detailExpand)}>Talk about it</button>

                    <div className="aaa">
                        {detailExpand ? (
                            <div className='expand'>
                                <img src={imgPreview} alt="" />
                                <div className='explaination'>
                                    <p>这是图片的解释</p>
                                </div>
                                <div className='reply'>
                                    <p>这是图片的详细解释</p>
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
