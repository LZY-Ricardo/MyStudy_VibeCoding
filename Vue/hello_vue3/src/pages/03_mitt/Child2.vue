<template>
  <div class="child-container">
    <div class="component-box child-box">
      <h2>子组件2</h2>
      <p>电脑: {{ computer }}</p>
      <p>哥哥给的玩具: {{ toy }}</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="MittChild">
import { ref, onUnmounted } from 'vue'
import emitter from '@/utils/emitter';

// 数据
let computer = ref('联想')
let toy = ref('')
// 给 emitter 绑定send-toy事件
emitter.on('send-toy', (value:any) => {
  console.log('send-toy', value);
  toy.value = value
})

// 在组件卸载时 解绑send-toy事件
onUnmounted(() => {
  emitter.off('send-toy')
})
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
