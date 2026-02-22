<template>
  <div class="game">
    <h2>游戏列表</h2>
    <slot name="qwe" :games="games" x="哈哈" y="你好"></slot>
  </div>
</template>
<script setup lang="ts" name="Game">
import { reactive, ref } from 'vue'

const games = reactive([
  { id: '001', name: '瓦洛兰特' },
  { id: '002', name: '王者荣耀' },
  { id: '003', name: '原神' },
  { id: '004', name: ' csgo' },
])
</script>
<style scoped>
.game {
  width: 200px;
  height: 300px;
  background-color: skyblue;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}

ul {
  list-style-type: none;
  padding: 0;
}

h2 {
  font-size: 24px;
  margin: 0 0 10px 0;
  background-color: orange;
  text-align: center;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 800;
}

li {
  font-size: 16px;
  margin: 5px 0;
}
</style>
