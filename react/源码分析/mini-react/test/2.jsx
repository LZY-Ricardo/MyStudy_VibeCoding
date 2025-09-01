function Title() {
  return (
    <>
      <h1>标题</h1>
      <p>内容</p>
    </>
  )
}

function App() {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    console.log(count)
  }, [count])

  return (
    <Title></Title>
  )
}

React.createElement(
  App, 
  {}, 
  React.createElement(Title, {}, 
    React.createElement('h1', {}, '标题'),
    React.createElement('p', {}, '内容')
  )
)



