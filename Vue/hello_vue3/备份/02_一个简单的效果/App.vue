<template>
    <!-- html -->
    <div class="app">
        <h1>你好啊！</h1>
        <Person />  <!-- 使用 Person 组件 -->
    </div>
</template>

<script lang="ts">
// JS 或 TS
import Person from './components/Person.vue'
export default {
    name: 'App', // 组件名称
    components: { // 注册组件
        Person,
    },
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
