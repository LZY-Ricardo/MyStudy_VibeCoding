"use strict";
function createElement(type, props, ...children) {
    return {
        type,
        props: Object.assign(Object.assign({}, props), { children: children.map(child => {
                const isTextNode = typeof child === 'string' || typeof child === 'number';
                return isTextNode ? createTextNode(child) : child;
            }) })
    };
}
function createTextNode(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    };
}
const MiniReact = {
    createElement
};
window.MiniReact = {
    createElement
};
