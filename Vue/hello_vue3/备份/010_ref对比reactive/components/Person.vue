<template>
  <div class="person">
    <h2>一辆{{ car.brand }}车， 价值{{ car.price }}万</h2>
    <button @click="changeCarBrand">修改汽车品牌</button>
    <button @click="changeCarPrice">修改汽车价格</button>
    <button @click="changeCar">修改汽车</button>
    <br>
    <h2>当前求和为:{{ sum }}</h2>
    <button @click="addOne">点击加一</button>
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
let sum = ref(0)

// 方法
function changeCarBrand() {
  car.value.brand = '劳斯莱斯'
  console.log('修改后的汽车品牌：', car.value.brand)
}
function changeCarPrice() {
  car.value.price += 100
  console.log('修改后的汽车价格：', car.value.price)
}
function changeCar() {
  // car = {
  //   brand: '宾利',
  //   price: 800,
  //   color: '白色'
  // } // 这么写页面不更新
  // car = reactive({
  //   brand: '宾利',
  //   price: 800,
  //   color: '白色'
  // }) // 这么写页面也不更新
  // Object.assign(car, {
  //   brand: '宾利',
  //   price: 800,
  //   color: '白色'
  // }) // 该写法正确
  car.value = {
    brand: '宾利',
    price: 800,
    color: '白色'
  } // ref类型变量要通过.value赋值，页面才会更新
  console.log('修改后的汽车：', car)
}
function addOne() {
  sum.value += 1
  console.log('当前求和为:', sum.value)
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
