let s = "()[]{}"    // 112233
// 字符串从左往右但凡是朝左的括号, 就入栈, 但凡碰到朝右的括号, 就出栈一个元素, 每一个出栈的元素都到 obj 中查找另一半
// 再和右边比较
var isValid = function(s) {
    const obj = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    let stack = []; // 栈

    // for (let i = 0; i < s.length; i++) {
    //     if (s[i] in obj) {
    //         stack.push(s[i]);
    //     } else {
    //         if (obj[stack.pop()] !== s[i]) {
    //             return false;
    //         }
    //     }
    // }
    // if (!stack.length) {
    //     return true;
    // }
    // return false;

    for (let i = 0; i < s.length; i++) {
        if (obj[s[i]] !== undefined){ //朝左的
            stack.push(s[i]);
        } else { //朝右的
            let left = stack.pop();
            if (obj[left] !== s[i]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

console.log(isValid(s)); // true