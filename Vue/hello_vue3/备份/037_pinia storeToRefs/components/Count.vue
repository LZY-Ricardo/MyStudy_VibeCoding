<template>
  <div class="count"> 
    <h2>当前求和为:{{ sum }}</h2>
    <h3>欢迎来到{{ school }}，坐落于{{ address }}</h3>
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
import { ref, reactive, toRefs } from 'vue';
// 引入 useCountStore
import { useCountStore } from '@/store/count';
import { storeToRefs } from 'pinia';

// 使用 countStore 得到一个专门保存count相关的store
const countStore = useCountStore();
// storeToRefs 只会关注 store中的数据, 不会对方法进行ref包裹
const { sum, school, address } = storeToRefs(countStore); // 解构出需要使用的数据
console.log(toRefs(countStore));
console.log(storeToRefs(countStore));



// 数据
let n = ref(1); // 用户选择的数字

// 方法
const add = () => {
  countStore.increment(n.value);
}
const minus = () => {
  sum.value -= n.value;
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