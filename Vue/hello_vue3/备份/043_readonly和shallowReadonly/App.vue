<template>
  <div class="app">
    <h2>当前sum1求和为： {{ sum }}</h2>
    <h2>当前sum2求和为： {{ sum2 }}</h2>
    <h2>car1车品牌为： {{ car.brand }}</h2>
    <h2>car1车颜色为： {{ car.options.color }}</h2> 
    <h2>car1车引擎为： {{ car.options.engine }}</h2>
    <h2>car2车品牌为： {{ car2.brand }}</h2>
    <h2>car2车颜色为： {{ car2.options.color }}</h2> 
    <h2>car2车引擎为： {{ car2.options.engine }}</h2>

    <button @click="changeSum">点我sum + 1</button>
    <button @click="changeSum2">点我sum2 + 1</button>
    <button @click="changeBrand">修改品牌（car1）</button>
    <button @click="changeColor">修改颜色（car1）</button>
    <button @click="changeEngine">修改发动机（car1）</button>
    <button @click="changeBrand2">修改品牌（car2）</button>
    <button @click="changeColor2">修改颜色（car2）</button>
    <button @click="changeEngine2">修改发动机（car2）</button>
  </div>
</template>
<script lang="ts" setup name="App">
import { readonly, ref, reactive, shallowReadonly } from 'vue'

let sum = ref(0)
let sum2 = readonly(sum)
let car = reactive({
  brand: '奔驰',
  options: {
    color: '红色',
    engine: 'v8'
  }
})

let car2 = shallowReadonly(car)

function changeSum() {
  sum.value += 1
}

function changeSum2() {
  sum2.value += 1 // sum2 是不能修改的
}

function changeBrand() {
  car.brand = '宝马'
}

function changeColor() {
  car.options.color = '蓝色'
}

function changeEngine() {
  car.options.engine = 'v6'
}

function changeBrand2() {
  car2.brand = '奥迪' // car2 是不能修改的
}

function changeColor2() {
  car2.options.color = '黄色' // car2 是不能修改的
}

function changeEngine2() {
  car2.options.engine = 'v4' // car2 是不能修改的
}
</script>
<style scoped>
  .app {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  }
  button {
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    margin: 5px;
  }
</style>