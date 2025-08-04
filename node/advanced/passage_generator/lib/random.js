export function randomInt(min, max) { // 生成一个 >= min 且 < max 之间的随机整数
    const p = Math.random()
    // p = 0.5 => 0.5 * (1 - 0.5) + 0.5 * 0.5 = 0.75
    // 当 p = 0时，min * (1 - 0) + max * 0 = min
    // 当 p = 1时，min * (1 - 1) + max * 1 = max
    return Math.floor(min * (1 - p) + max * p)
}
// const articleLength = randomInt(100, 300)
// const sectionLength = randomInt(10, 30)

export function createRandomPick(arr) {
  arr = [...arr]
  function randomPick() {
    const len = arr.length - 1
    const index = randomInt(0, len)
    const picked = arr[index];
    [arr[index], arr[len]] = [arr[len], arr[index]]
    return picked
  }
  randomPick()  // 抛弃第一次的选中结果
  return randomPick
}

// const myrandom = createRandomPick([1, 2, 3, 4, 5])
// console.log(myrandom);
