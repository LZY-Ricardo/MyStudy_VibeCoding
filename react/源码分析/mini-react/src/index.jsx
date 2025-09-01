function Title() {
  return (
    <div>
      <h1>标题</h1>
      <p>内容</p>
      <h2>二级标题</h2>
    </div>
  )
}


const content = <div className="container" id='wrap' onClick={() => {}}>
  <Title>title</Title>
</div>


MiniReact.render(content, document.getElementById('root'))


