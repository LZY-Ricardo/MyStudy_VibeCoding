const arr = [1, 2, 3, 4, 5]
function forOf(iterable, callback) {
    const iterator = arr[Symbol.iterator]()
    while (true) {
        const {value, done} = iterator.next() // {value: 1, done: false}
        if (done) {
            break
        }
        callback(value)
    }
}

forOf(arr, (item) => {
    console.log(item);
})
