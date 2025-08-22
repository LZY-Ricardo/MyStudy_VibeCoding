function showArgs() {
  // arguments 包含所有传入的参数
  console.log(arguments);

  
  console.log("参数数量：", arguments.length);
  
  // 遍历所有参数
  for (let i = 0; i < arguments.length; i++) {
    console.log(`第 ${i+1} 个参数：`, arguments[i]);
  }
}

showArgs(10, "hello", true, {name: "test"});
// 输出：
// 参数数量：4
// 第 1 个参数：10
// 第 2 个参数：hello
// 第 3 个参数：true
// 第 4 个参数：{ name: 'test' }