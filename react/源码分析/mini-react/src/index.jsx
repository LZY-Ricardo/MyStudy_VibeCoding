function Title() {
    return <h1>hello world</h1>
}

const content = <div className="container" id="container" onClick={() => {
    console.log('click');
}}>
    <a href="xxx">link</a>
    <Title />
</div>
MiniReact.render(content, document.getElementById('root'))

console.log(content);
