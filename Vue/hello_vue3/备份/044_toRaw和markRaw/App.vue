<template>
  <div class="app">
    <h2>姓名： {{ person.name }}</h2>
    <h2>年龄： {{ person.age }}</h2>
    <button @click="person.age += 1">修改年龄</button>
    <button @click="showPerson(toRaw(person))">展示人物</button>
    ______________________________________________________________________
    <h2>车品牌： {{ car.brand }}</h2>
    <h2>车价格： {{ car.price }}</h2>
    <button @click="car.price += 10">点我价格 + 10</button>

  </div>
</template>
<script lang="ts" setup name="App">
import { reactive, toRaw, markRaw } from 'vue';
import mockjs from 'mockjs'

/* toRaw */
let person = reactive({
  name: 'tony',
  age: 18,
})

let personRaw = toRaw(person)
console.log('响应式数据',person)
console.log('原始数据', personRaw)

function showPerson(p: typeof person) {
  p.age += 10
  p.name += '!!'
  console.log(p)
}

/* markRaw */
let car = markRaw({
  brand: '奔驰',
  price: 100,
})
let car2 = reactive(car)
console.log(car);
console.log(car2);

let citys = markRaw([
  { id: 'asdda01', name: '北京' },
  { id: 'asdda02', name: '上海' },
  { id: 'asdda03', name: '天津' },
  { id: 'asdda04', name: '重庆' },
])
// 根据原始对象citys去创建响应式对象citys2-- 创建失败，因为citys被markRaw标记了
let citys2 = reactive(citys)

let mockJs = markRaw(mockjs)

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