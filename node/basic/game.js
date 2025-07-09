const playerAction = process.argv[process.argv.length - 1];
// console.log(playerAction);

if (playerAction !== 'rock' && playerAction !== 'paper' && playerAction !== 'scissor') {
  console.log('请输入 rock、paper、scissor');
} else {
  const arr = ['rock', 'paper', 'scissor']
  const index = Math.floor(Math.random() * 3);
  const computerAction = arr[index];
  console.log('你出的是：' + playerAction);
  console.log('电脑出的是：' + computerAction);

  if (playerAction === computerAction) {
    console.log('平局');
  } else if (
    (playerAction == 'rock' && computerAction == 'paper') ||
    (playerAction == 'paper' && computerAction == 'scissor') ||
    (playerAction == 'scissor' && computerAction == 'rock')
  ) {
    console.log('你输了');
  } else {
    console.log('你赢了');
  }

}