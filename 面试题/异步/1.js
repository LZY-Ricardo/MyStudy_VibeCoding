function A() {
    try {
        setTimeout(() => {
            console.log('A');
            // B()
            throw new Error('A错误')
        }, 1000)
    } catch (error) {
        console.log('error:', error);
    }
}
function B() {
    setTimeout(() => {
        console.log(B)
        throw new Error('B错误')
    }, 1000)
}
A()
// B()