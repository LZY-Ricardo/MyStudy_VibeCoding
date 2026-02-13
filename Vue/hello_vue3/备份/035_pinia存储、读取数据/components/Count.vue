<template>
  <div class="count"> 
    <h2>当前求和为:{{ countStore.sum }}</h2>
    <select v-model.number="n">
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    <button @click="add">加</button>
    <button @click="minus">减</button>
  </div>
</template>

<script setup lang="ts" name="Count">
import { ref, reactive } from 'vue';
import { useCountStore } from '@/store/count';

// 数据
const countStore = useCountStore();
// 以下两种方式都可以拿到 state 中的数据
// console.log(countStore.sum);
// console.log(countStore.$state.sum);

// let obj = reactive({
//   a: 1,
//   b: 2,
//   c: ref(3)
// })
// let x = ref(4);
// console.log(obj.a);
// console.log(obj.b);
// console.log(obj.c);
// console.log(x.value);



let n = ref(1); // 用户选择的数字

// 方法
const add = () => {
  // sum.value += n.value;
}
const minus = () => {
  // sum.value -= n.value;
}
</script>

<style scoped>
  .count{
    border: 1px solid #ccc;
    width: 400px;
    margin: 20px auto;
    text-align: center;
    line-height: 20px;
    background-color: #eee;
    box-shadow: 2px 2px 5px #ccc;
  }

  select, button{
    margin: auto 10px;
    padding: 5px 10px;
    font-size: 16px;
  }
</style>