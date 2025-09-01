"use strict";
function Title() {
    return (MiniReact.createElement(React.Fragment, null,
        MiniReact.createElement("h1", null, "\u6807\u9898"),
        MiniReact.createElement("p", null, "\u5185\u5BB9")));
}
function App() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log(count);
    }, [count]);
    return (MiniReact.createElement(Title, null));
}
React.createElement(App, {}, React.createElement(Title, {}, React.createElement('h1', {}, '标题'), React.createElement('p', {}, '内容')));
