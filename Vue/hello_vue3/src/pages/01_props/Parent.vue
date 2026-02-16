<template>
  <div class="parent-container">
    <div class="component-box parent-box">
      <h2>父组件1</h2>
      <p class="desc">Props 父组件示例</p>
      <p>汽车: {{ car }}</p>
      <p v-show="toy">子给的玩具: {{ toy }}</p>
      <div class="child-wrapper">
        <Child :car="car" :sendToy="getToy"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="PropsParent">
import Child from './Child.vue'
import { ref } from 'vue'

// 数据
let car = ref('奔驰') 
let toy = ref('')

// 方法
function getToy(value:string) {
  console.log('父', value);
  toy.value = value
}

</script>

<style scoped>
.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.component-box {
  width: 500px;
  height: 400px;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.parent-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.component-box h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.desc {
  margin: 0 0 30px 0;
  font-size: 14px;
  opacity: 0.9;
}

.child-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
