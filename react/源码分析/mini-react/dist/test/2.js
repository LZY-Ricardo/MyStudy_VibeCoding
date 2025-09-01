"use strict";
function Title() {
    return (MiniReact.createElement("h1", null, "hello world"));
}
function App() {
    return (MiniReact.createElement(Title, null));
}
React.createElement(App, {}, React.createElement(Title, {}, React.createElement('h1', {}, 'hello world')));
