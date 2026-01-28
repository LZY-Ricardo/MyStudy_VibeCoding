<template>
  <div class="person">
    <h2>姓名：{{ person.name }}</h2>
    <h2>年龄：{{ person.age }}, {{ nl}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { reactive, ref, toRefs, toRef } from 'vue'

// 数据
let person = reactive({
  name: '张三', 
  age: 18
})

let { name, age } = toRefs(person)
let nl = toRef(person, 'age')
console.log(nl.value);


// let x = toRefs(person)
// console.log(x);


// 方法
function changeName() {
  name.value += '!'
  console.log(name.value, person.name)
}
function changeAge() {
  age.value += 1
  console.log(age.value, person.age)
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
