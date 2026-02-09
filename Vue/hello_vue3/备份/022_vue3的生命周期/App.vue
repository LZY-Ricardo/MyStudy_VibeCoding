<template>
    <Person v-if="isShow"/>  
</template>

<script lang="ts" setup name="App">
import { ref, onMounted } from 'vue';
import Person from './components/Person.vue';

let isShow = ref(true);

// 挂载完毕
onMounted(() => {
  console.log('父挂载完毕');
})

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
