import { data } from 'react-router-dom'
import './index.scss'
import { useEffect, useState } from 'react'
import { setQuestions, setAnswersId } from '../../store/modules/questional'
import { useDispatch } from 'react-redux'
import type { Answer, Ques } from '../../store/index.ts'
import { useNavigate } from 'react-router-dom'

export default function Index() {
    const dispatch = useDispatch()
    const [ques, setQues] = useState<Ques[]>([])
    const [num, setNum] = useState(1)
    const [isSelected, setIsSelected] = useState<boolean>(false)
    const [selectedAnswer, setSelectedAnswer] = useState<Answer>()
    const navigate = useNavigate()

    const getData = async () => {
        const response = await fetch('https://mock.mengxuegu.com/mock/6767738f98077b17fe6792e2/question-naire', {
            method: 'GET',
        })
        const data = await response.json()
        console.log(data);
        dispatch(setQuestions(data.questions)) // 存数据到仓库给结果页面使用
        setQues(data.questions) // 存给页面使用
    }

    useEffect(() => { // 组件初次加载
        getData()
    }, [])

    const selectAnswer = (item: Answer) => { // 选择答案
        // 将用户选的答案 id 存起来
        setSelectedAnswer(item)
        setIsSelected(true)
    }

    const nextTopic = () => {
        setIsSelected(false)
        if (!isSelected) {
            alert('请选择答案')
            return
        }
        if (num === ques.length) { // 最后一题
            if (selectedAnswer) { // 有选择答案
                dispatch(setAnswersId(selectedAnswer.topic_answer_id))
            }
            // 跳页面
            navigate('/result')
        } else {
            if (selectedAnswer) { // 有选择答案
                dispatch(setAnswersId(selectedAnswer.topic_answer_id))
            }
            setNum(num + 1)
        }
    }

    return (
        <div className='question-container'>
            <div className="question-container-hd">
                <div className="question-container-hd-title">
                    第 {num}/{ques.length} 题
                </div>
                <div className="question-container-hd-progress">
                    <div className="question-container-hd-progress-bar" style={{ width: `${num / ques.length * 100}%` }}>
                    </div>
                </div>
            </div>
            <div className="question-container-bd">
                <div className="question-container-bd-option">
                    <div className="question-container-bd-option-card">
                        <div className="order">Q{num}</div>
                        <div className="title">{ques[num - 1]?.topic_name}</div>
                        <ul className="list">
                            {
                                ques[num - 1]?.topic_answer.map((item: Answer) => {
                                    return (
                                        <li key={item.topic_answer_id}>
                                            <input 
                                            type="radio" 
                                            name={`item${item.topic_id}`} 
                                            id={`item${item.topic_answer_id}`} 
                                            onChange={() => selectAnswer(item)}
                                            />
                                            <label htmlFor={`item${item.topic_answer_id}`}>{item.answer_name}</label>
                                        </li>
                                    )
                                })
                            }
                            {/* <li>
                                <input type="radio" name='item' id='item1'/>
                                <label htmlFor='item1'>社交媒体（微信、微博等）</label>
                            </li>
                            <li>
                                <input type="radio" name='item' id='item2'/>
                                <label htmlFor='item2'>社交媒体（微信、微博等）</label>
                            </li>
                            <li>
                                <input type="radio" name='item' id='item3'/>
                                <label htmlFor='item3'>社交媒体（微信、微博等）</label>
                            </li>
                            <li>
                                <input type="radio" name='item' id='item4'/>
                                <label htmlFor='item4'>社交媒体（微信、微博等）</label>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="question-container-ft">
                <div className="question-container-ft-btn" onClick={nextTopic}>
                    {num === ques.length ? '提交' : '下一题'}
                </div>
            </div>
        </div>
    )
}
