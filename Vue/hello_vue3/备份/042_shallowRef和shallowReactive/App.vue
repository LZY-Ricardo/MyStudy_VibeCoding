<template>
  <div class="app">
    <h2>求和为： {{ sum }}</h2>
    <h2>姓名： {{ person.name }}</h2>
    <h2>年龄： {{ person.age }}</h2>
    <h2>车品牌： {{ car.brand }}</h2>
    <h2>车颜色： {{ car.options.color }}</h2>
    <h2>车引擎： {{ car.options.engine }}</h2>
    <button @click="changeSum">sum + 1</button>
    <button @click="changeName">change name</button>
    <button @click="changeAge">change age</button>
    <button @click="changePerson">change person</button>|
    <button @click="changeBrand">修改品牌</button>
    <button @click="changeColor">修改颜色</button>
    <button @click="changeEngine">修改发动机</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>
<script lang="ts" setup name="App">
import { ref, shallowRef, reactive, shallowReactive } from 'vue'

let sum = shallowRef(0)
let person = shallowRef({
  name: '张三',
  age: 18,
})
let car = shallowReactive({
  brand: '奔驰',
  options: {
    color: '红色',
    engine: 'v8'
  }
})

function changeSum() {
  sum.value++
}

function changeName() {
  person.value.name = '李四'
}

function changeAge() {
  person.value.age = 20
}

function changePerson() {
  person.value = {
    name: '王五',
    age: 22,
  }
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

function changeCar() {
  car = Object.assign(car, {
    brand: '奥迪',
    options: {
      color: '黄色',
      engine: 'v6'
    }
  })
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