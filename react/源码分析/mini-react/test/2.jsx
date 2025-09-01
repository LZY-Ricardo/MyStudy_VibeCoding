function Title() {
    return (
        <h1>hello world</h1>
    )
}

function App() {
    return (
        <Title></Title>
    )
}

React.createElement(
    App,
    {},
    React.createElement(
        Title,
        {},
        React.createElement(
            'h1',
            {},
            'hello world'
        )
    )
)