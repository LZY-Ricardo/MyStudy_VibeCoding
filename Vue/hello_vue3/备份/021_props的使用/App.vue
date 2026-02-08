<template>
    <!--务必看懂下面这一行代码-->
    <!-- <h2 a="1+1" :b="1+1" c="x" :d="x" ref="qwe">测试</h2> -->
    <Person a="哈哈" :list="personList"/>  
</template>

<script lang="ts" setup name="App">
import Person from './components/Person.vue'
import { reactive } from 'vue';
import type { Persons } from './types';

let personList = reactive<Persons>([
    { id: 'dsdaij32fji234', name: '张三', age: 23},
    { id: 'dsdaij32fji235', name: '李四', age: 24},
    { id: 'dsdaij32fji236', name: '王五', age: 25},
])

let x = 9
console.log(personList);
</script>

<style>
/* CSS */
.app {
    text-align: center;
    margin-top: 60px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.1);
}
</style>
