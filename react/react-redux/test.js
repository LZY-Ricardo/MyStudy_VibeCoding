const arr = [1, 2, 3]

arr.map((item, index, arr) => {
    console.log(item, index, arr);
})

const newArr = arr.filter((item, index ,arr) => {
    return (
        item >= 2
    )
})