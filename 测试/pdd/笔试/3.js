/**
 * 串行执行异步任务队列，并支持对失败任务进行指定次数的重试
 * 核心特点：前一个任务成功（或重试耗尽失败）后，才执行下一个任务（串行）；失败任务重试耗尽后直接抛出错误，终止后续任务
 * @param {Array<() => Promise<any>>} tasks - 异步任务数组，每个元素必须是「无参数且返回Promise的函数」（异步任务标准形式）
 * @param {number} [retries=0] - 单个任务失败后的最大重试次数（如retries=2表示：失败后最多再试2次，共执行3次）
 * @returns {Promise<Array<any>>} - 返回Promise：成功时resolve所有任务的结果数组（顺序与tasks一致）；失败时reject最终抛出的错误
 */
function executeTasks(tasks = [], retries = 0) {
  // 存储所有任务的成功结果，顺序与tasks数组严格对应（串行执行保证顺序）
  const results = [];

  /**
   * 内部递归函数：负责单个任务的执行、重试，以及衔接下一个任务
   * @param {number} index - 当前要执行的任务在tasks数组中的索引（从0开始递增）
   * @param {number} retryCount - 当前任务剩余的重试次数（每次重试失败后减1，初始为外部传入的retries）
   * @returns {Promise<Array<any>>} - 返回Promise：完成后传递结果数组或抛出错误
   */
  async function runTask(index, retryCount) {
    // 递归终止条件：当index超过tasks长度，说明所有任务已执行完毕
    if (index >= tasks.length) {
      // 返回收集好的结果数组，结束递归（此时外部Promise会resolve这个数组）
      return results;
    }

    try {
      // 1. 执行当前任务：调用tasks[index]()（执行异步任务），并等待Promise完成
      // 注意：tasks[index]必须是函数，调用后才会触发异步逻辑（避免任务提前执行）
      const result = await tasks[index]();

      // 2. 任务成功：将结果存入results数组（顺序与任务顺序一致）
      results.push(result);

      // 3. 衔接下一个任务：递归调用runTask，index+1切换到下一个任务
      // 关键：下一个任务的重试次数重置为初始retries（每个任务的重试次数独立，不继承上一个任务的剩余次数）
      return runTask(index + 1, retries);

    } catch (error) {
      // 任务执行失败（Promise reject），进入重试逻辑

      // 检查是否还有剩余重试次数
      if (retryCount > 0) {
        // 有剩余次数：重试当前任务（index不变，仍执行当前任务），重试次数减1
        // 关键：返回重试的Promise，确保异步流程不中断（外部能追踪重试状态）
        return runTask(index, retryCount - 1);
      } else {
        // 无剩余重试次数：重试耗尽，不再重试，直接抛出错误
        // 此时递归终止，外部Promise会reject这个错误，后续任务不再执行（fail-fast原则）
        throw error;
      }
    }
  }

  // 启动任务执行：从第一个任务（index=0）开始，初始重试次数为外部传入的retries
  // 关键：返回runTask的Promise，让外部能通过await/.then()获取结果、.catch()捕获错误
  return runTask(0, retries);
}

// 1. 为什么用 “递归” 实现串行？
// 异步任务的串行执行需要 “前一个完成后再执行下一个”，递归天然适合这种 “步骤衔接” 逻辑：
// 每个runTask(index)执行完当前任务后，通过return runTask(index+1)主动衔接下一个任务
// 相比for...of + await的循环写法，递归在处理 “重试” 时更灵活（可直接复用当前 index 重试，无需额外控制循环变量）
// 2. 为什么每个runTask调用都要加return？
// runTask是async函数，调用后会返回 Promise，return的本质是 “传递异步流程的控制权”：
// 若不加return，前一个任务的异步结果无法传递到外层，外部会提前认为任务完成（导致结果丢失、错误无法捕获）
// 例如return runTask(index+1, retries)确保：只有下一个任务完成，当前任务的 Promise 才会完成
// 3. 为什么tasks元素必须是 “返回 Promise 的函数”？
// 若直接传入 Promise（如[Promise.resolve(1), Promise.resolve(2)]），任务会在executeTasks调用时提前执行（Promise 创建即执行），失去 “串行控制” 的意义
// 用函数包裹（如[() => Promise.resolve(1), () => Promise.resolve(2)]），只有当调用tasks[index]()时才会触发任务执行，确保 “前一个任务完成后再执行下一个”


// 模拟任务1：第一次失败，第二次成功（测试重试）
const task1 = () => new Promise((resolve, reject) => {
  let count = 0; // 记录执行次数
  return () => {
    count++;
    count === 2 ? resolve('task1 成功') : reject(new Error('task1 失败'));
  };
})();

// 模拟任务2：一次成功（测试正常串行）
const task2 = () => Promise.resolve('task2 成功');

// 执行任务：重试次数设为1（任务1失败后重试1次）
executeTasks([task1, task2], 1)
  .then((res) => console.log('所有任务完成：', res)) // 输出：["task1 成功", "task2 成功"]
  .catch((err) => console.log('任务失败：', err.message));