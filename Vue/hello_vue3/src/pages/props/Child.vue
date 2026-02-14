<template>
  <div class="child-container">
    <div class="component-box child-box">
      <h2>子组件2</h2>
      <p class="desc">Props 子组件示例</p>
      <p>玩具: {{ toy }}</p>
      <button @click="sendToy(toy)">把玩具交给父亲</button>
      <p>父亲给的车: {{ car }}</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="PropsChild">
import { ref } from 'vue';

let toy = '奥特曼'
// 声明式接受数据
let props = defineProps(['car', 'sendToy'])

</script>

<style scoped>
.child-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.component-box {
  width: 200px;
  height: 120px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.child-box {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.component-box h2 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.desc {
  margin: 0;
  font-size: 12px;
  opacity: 0.9;
}
</style>
