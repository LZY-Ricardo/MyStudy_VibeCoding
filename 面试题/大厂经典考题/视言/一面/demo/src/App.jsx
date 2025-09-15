import React, { useState } from 'react'
import Count from './Components/Count.jsx'
import CountClass from './Components/CountClass.jsx'
import Num from './Components/Num.jsx'

export default function App() {
  const [flag, setFlag] = useState(true)
  return (
      <div>
          {/* {
              flag ? <Count val={666} /> : <CountClass val={666} />
          }
          <button onClick={() => setFlag(!flag)}>切换</button> */}
          <Num />
    </div>
  )
}
