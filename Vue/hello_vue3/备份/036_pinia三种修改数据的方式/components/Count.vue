<template>
  <div class="count"> 
    <h2>当前求和为:{{ countStore.sum }}</h2>
    <h3>欢迎来到{{ countStore.school }}，坐落于{{ countStore.address }}</h3>
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
// 引入 useCountStore
import { useCountStore } from '@/store/count';

// 使用 countStore 得到一个专门保存count相关的store
const countStore = useCountStore();

// 数据
let n = ref(1); // 用户选择的数字

// 方法
const add = () => {
  // 第一种修改方式
  // countStore.sum += n.value;

  // 第二种修改方式
  // countStore.$patch({
  //   sum: countStore.sum + n.value,
  //   school: 'Cassel College',
  //   address: 'USA'
  // })

  // 第三种修改方式
  countStore.increment(n.value);
}
const minus = () => {
  countStore.sum -= n.value;
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