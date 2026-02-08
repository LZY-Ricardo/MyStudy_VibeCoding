<template>
    <!-- html -->
    <h2 class="person" ref="title2">你好</h2>
    <button @click="showLog">测试</button>
    <Person ref="ren"/>  <!-- 使用 Person 组件 -->
</template>

<script lang="ts" setup name="App">
// JS 或 TS
import Person from './components/Person.vue'
import { ref } from 'vue';

let title2 = ref(null)
let ren = ref(null)
function showLog() {
  console.log(ren.value);
}
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
