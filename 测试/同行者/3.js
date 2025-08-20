// 1000个整数 数值范围[0, 999] 有且仅有2个相同的数, 请编写程序找出来
function findDuplicate(nums) {
  const countMap = new Map();

  // 统计每个数出现的次数
  nums.forEach(num => {
    if (countMap.has(num)) {
      countMap.set(num, countMap.get(num) + 1);
    } else {
      countMap.set(num, 1);
    }
  });

  // 找出出现次数为 2 的数
  let duplicateNum = null;
  for (const [num, count] of countMap.entries()) {
    if (count === 2) {
      duplicateNum = num;
      break;
    }
  }

  return duplicateNum;
}