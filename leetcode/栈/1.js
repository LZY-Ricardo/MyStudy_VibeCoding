let stack = []; // 主观上说它是一个栈, 它就是一个栈

stack.push('路明非')
stack.push('楚子航')
stack.push('凯撒')
stack.push('芬格尔')
stack.push('陈墨瞳')

// for (let i = stack.length - 1; i >= 0; i--) {
//     console.log(`我喜欢的角色${stack.pop()}`);
// }

while (stack.length) {
    console.log(`我喜欢的角色${stack.pop()}`);
}