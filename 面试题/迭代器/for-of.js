const arr = [1, 2, 3, 4, 5]
simpleForOf(arr, (item) => {
    console.log(item);
}) // 1, 2, 3, 4, 5

function simpleForOf(iterable, callback) {
    const iterator = iterable[Symbol.iterator]()
    while (true) {
        const {value, done} = iterator.next() // {value: 1, done: false}
        if (done) {
            break
        }
        // console.log(value);
        callback(value)
    }
}