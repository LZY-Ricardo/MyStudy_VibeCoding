<template>
  <div class="person">
    <h1>情况三: 监视【reactive】定义的对象类型数据</h1>
    <h2>{{ person.name }} - {{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">
      修改整个人
    </button>
    <hr>
    <h2>{{ obj.a.b.c }}</h2>
    <button @click="test">修改</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { reactive, watch } from 'vue';

// 数据
let person = reactive({
  name: '张三',
  age: 18,
});

let obj = reactive({
  a: {
    b: {
      c: 666
    }
  }
})

// 方法
function changeName() {
  person.name += '!';
} 
function changeAge() {
  person.age += 1;
}
function changePerson() {
  Object.assign(person, { name: '李四', age: 20 });
}
function test() {
  obj.a.b.c += 1;
}

// 监视, 情况三: 监视【reactive】定义的对象类型数据, 且默认开启深度监视(无法关闭)
watch(person, (newValue, oldValue) => {
  console.log('person变化了', newValue, oldValue);
});
watch(obj, (newValue, oldValue) => {
  console.log('obj变化了', newValue, oldValue);
});
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
