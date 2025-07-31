const p = {
    a: 1
}
let aa = p.a
Object.defineProperty(p, 'a', {
    // value: 100, // 初始值
    // writable: false, // 不能修改
    // configurable: false // 不能删除
    get() {
        return aa
    },
    set(value) {
        aa = value
        console.log('set', value);       
    }
})

p.a = 2
// delete p.a
// console.log(p.a); 
