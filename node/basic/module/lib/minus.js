function minus(a, b) {
  return a - b;
}

// exports.minus = minus // 抛出的一定是对象


// 抛出的是一个函数 还是一个对象取决于自己的写法
// module.exports = minus 
// module.exports = {
//     minus
// }

