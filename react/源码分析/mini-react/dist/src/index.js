"use strict";
function Title() {
    return MiniReact.createElement("h1", null, "hello world");
}
const content = MiniReact.createElement("div", { className: "container", id: "container", onClick: () => {
        console.log('click');
    } },
    MiniReact.createElement("a", { href: "xxx" }, "link"),
    MiniReact.createElement(Title, null));
MiniReact.render(content, document.getElementById('root'));
console.log(content);
