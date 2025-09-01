"use strict";
function Title() {
    return (MiniReact.createElement("div", null,
        MiniReact.createElement("h1", null, "\u6807\u9898"),
        MiniReact.createElement("p", null, "\u5185\u5BB9"),
        MiniReact.createElement("h2", null, "\u4E8C\u7EA7\u6807\u9898")));
}
const content = MiniReact.createElement("div", { className: "container", id: 'wrap', onClick: () => { } },
    MiniReact.createElement(Title, null, "title"));
MiniReact.render(content, document.getElementById('root'));
