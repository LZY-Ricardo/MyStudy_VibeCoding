// 当用户点击提交按钮时, 执行以下操作
// 1. 获取用户输入的内容
// 2. 将内容添加到 ul 列表中

// 监听提交按钮的点击事件
// 获取 form 表单元素
const form = document.querySelector('.form');
const input = document.querySelector('.form_input');
const ul = document.querySelector('.todo_list');

const toDoListArray = []; // 存储待办事项的数组

form.addEventListener('submit', function(e){ // 用户点击提交按钮时, 执行以下操作
    e.preventDefault(); // 阻止表单默认行为
    
    let itemId = String(Date.now()); // 生成一个唯一的ID
    let toDoItem = input.value; // 获取用户输入的内容

    // 有一个函数, 可以帮我把内容添加进数组中
    // 再有一个函数, 将数组进行渲染
    addItemToArray(itemId, toDoItem);
    addItemToDom(itemId, toDoItem);
})

function addItemToArray (id, item) {
    toDoListArray.push({
        itemId: id,
        todoItem: item
    })
}

// function renderToDoList (arr) {
//     for (let i = 0; i < arr.length; i++) {
//         // arr[i]
//         // 1. 生成一个 li 元素
//         const li = document.createElement('li');
//         // 2. 给 li 元素添加内容
//         li.textContent = arr[i].todoItem;
//         // 3. 将 li 元素添加到 ul 列表中
//         ul.appendChild(li);
//     }
// }

function addItemToDom (id, item) {
    const li = document.createElement('li');
    li.textContent = item;
    li.setAttribute('data-id', id);
    ul.appendChild(li);
}

// 移除待办事项
ul.addEventListener('click', function(e) {
    console.log(e.target.getAttribute('data-id'));
    // 获取到被点击的 li 元素, 并且读取它的 data-id 属性
    // 根据这个 id 从数组中删除对应的元素
    // 从页面中删除对应的 li 元素
    removeItemFromArray(e.target.getAttribute('data-id'));
    removeItemFromDom(e.target.getAttribute('data-id'));
})

function removeItemFromArray (id) {
    for (let i = 0; i < toDoListArray.length; i++) {
        if (toDoListArray[i].itemId === id) {
            toDoListArray.splice(i, 1);
        }
    }
}

function removeItemFromDom (id) {
    const li = document.querySelector(`[data-id="${id}"]`);
    ul.removeChild(li);
}
