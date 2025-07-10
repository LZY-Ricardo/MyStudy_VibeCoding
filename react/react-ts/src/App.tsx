import React from "react"

interface PersonProps{
  name: string
  content?: React.ReactNode // jsx 类型
}

function Person(props: PersonProps) {
  console.log(props);
  
  return (
    <div>
      <h3>你好我是 {props.name}</h3>
      {props.content}
    </div>
  )
}

const Animal: React.FunctionComponent<PersonProps> = (props) => {
  return (
    <div>
      <h2>我是动物 {props.name}</h2>
    </div>
  )
}

function App() {
  return (
    <div>
      <h1>hello world</h1>
      <Person name='Ricardo' content={<button>提交</button>} />
      <Animal name="tiger" />
    </div>
  )
}
export default App
