<template>
  <div class="person">
    <h2>一辆{{ car.brand }}车， 价值{{ car.price }}万</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
    <br>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="game in games" :key="game.id">{{ game.name }}</li>
    </ul>
    <button @click="changeGameName">修改第一个游戏的名字</button>
    <br>
    <h2>响应式对象obj的x属性值：{{ obj.x }}</h2>
  </div>
</template>

<script setup lang="ts" name="Person">
import { ref, reactive} from 'vue'

// 数据
let car = ref({
  brand: '迈巴赫',
  price: 600,
  color: '黑色'
})
console.log('car', car)
let games = ref([
  { name: '王者荣耀', id: 0},
  { name: '和平精英', id: 1 },
  { name: '原神', id: 2 }
])
let obj = reactive({x: 666})
console.log('obj', obj)
// 方法
function changeCarPrice() {
  car.value.price += 100
  console.log('修改后的汽车价格：', car.value.price)
}
function changeGameName() {
  games.value[0].name = '英雄联盟'
  console.log('修改后的第一个游戏名字：', games.value[0].name)
}

</script>

<style scoped>
.person {
  width: 200px;
  height: 800px;
  background-color: lightblue;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
button {
  margin: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
