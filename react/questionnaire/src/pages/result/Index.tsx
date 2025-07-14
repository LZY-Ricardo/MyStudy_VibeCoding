import './index.scss'
import share from '../../assets/share.png'
import retry from '../../assets/retry.png'
import { useSelector, useDispatch } from 'react-redux'
import { getResult } from '../../store/modules/questional'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// 导入RootState类型
import type { RootState } from '../../store'

export default function Index() {
  const dispatch = useDispatch()
  const result = useSelector((state: RootState) => state.questional.result)
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getResult())
  }, [])

  // 处理重试按钮点击事件
  const handleRetry = () => {
    // 可以在这里添加重置状态的逻辑，如果需要
    navigate('/question')
  }

  return (
    <div className='result-container'>
      <div className="result-container-hd">
        测试结果
      </div>
      <div className="result-container-bd">
        <div className="result-container-bd-result">
          <div className="result-container-bd-result-grade">得分：{result.grade}</div>
          <div className="result-container-bd-result-desc">{result.desc}</div>
        </div>
        <div className="result-container-bd-share">
          <img src={share} alt="分享" />
          炫耀一下
        </div>
      </div>
      <div className="result-container-ft">
        <div className="retry-button" onClick={handleRetry}>
          <img src={retry} alt="重试" />
          再来一次
        </div>
      </div>
    </div>
  )
}
