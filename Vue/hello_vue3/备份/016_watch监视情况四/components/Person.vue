<template>
  <div class="person">
    <h2>姓名: {{ person.name }}</h2>
    <h2>年龄: {{ person.age }}</h2>
    <h2>汽车: {{ person.car.c1 }} - {{ person.car.c2 }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changeC1">修改第一台汽车</button>
    <button @click="changeC2">修改第二台汽车</button>
    <button @click="changeCar">修改整个车</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { reactive, watch } from 'vue';

// 数据
let person = reactive({
  name: '张三',
  age: 18,
  car: {
    c1: '奔驰',
    c2: '宝马',
  }
});

console.log(person);


// 方法
function changeName() {
  person.name += '!';
}
function changeAge() {
  person.age += 1;
}
function changeC1() {
  person.car.c1 = '奥迪';
}
function changeC2() {
  person.car.c2 = '大众';
}
function changeCar() {
  person.car = {
    c1: '特斯拉',
    c2: '福特',
  };
}

// 监视, 情况四： 监视响应式对象中的某个属性, 且该属性是 基本 类型的, 要写成函数式
watch(() => person.name, (newValue, oldValue) => {
  console.log('person name 变化了:', newValue, oldValue);
})
// 监视, 情况四： 监视响应式对象中的某个属性, 且该属性是 对象 类型的, 可以直接写， 也能写函数， 更推荐写函数
watch(() => person.car, (newValue, oldValue) => {
  console.log('person car 变化了:', newValue, oldValue);
}, { deep: true }
);
</script>

<style scoped>
.person {
  width: 800px;
  height: 800px;
  background-color: lightblue;
  box-shadow: 10px 5px 10px rgba(25, 48, 488, 0.8);
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
