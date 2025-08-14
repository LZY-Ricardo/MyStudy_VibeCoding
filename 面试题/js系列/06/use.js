// function add() {
//     let count = 0
//     return function() {
//         count++
//         console.log(count);    
//     }
// }

// let addCount = add()
// addCount()
// addCount()
// addCount()


function getArea(width) {
    return function(height) {
        return width * height
    }
}
// 颗粒化 柯理化
const getTenWidthArea = getArea(10)
const area1 = getTenWidthArea(10)
const area2 = getTenWidthArea(20)
console.log(area1);
console.log(area2);
