<template>
  <div class="person">
    <h1>情况二: 监视【ref】定义的对象类型数据</h1>
    <h2>{{ person.name }} - {{ person.age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="changePerson">
      修改整个人
    </button>
  </div>
</template>

<script setup lang="ts" name="Person">
import { ref, watch } from 'vue';

// 数据
let person = ref({
  name: '张三',
  age: 18,
});

// 方法
function changeName() {
  person.value.name += '!';
} 
function changeAge() {
  person.value.age += 1;
}
function changePerson() {
  person.value = {
    name: '李四',
    age: 20,
  };
}

/*
监视, 情况一: 监视【ref】定义的【对象类型】数据，监视得是对象得地址值，若想监视对象内部属性得变化，需要手动开启深度监视
watch 的第一个参数是: 被监视的数据
watch 的第一个参数是: 监视的回调
watch 的第一个参数是: 配置对象 (deep、 immediate等等...)
*/
watch(person, (newValue, oldValue) => {
  console.log('person变化了', newValue, oldValue);
}, { deep: true, immediate: true });

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
