<template>
  <div class="parent-container">
    <div class="component-box parent-box">
      <h2>父组件</h2>
      <h4>房产: {{ house }}</h4>
      <div class="child-wrapper">
        <button @click="changeToy">修改child1的玩具</button>
        <button @click="changeComputer">修改child2的电脑</button>
        <button @click="getAllChild($refs)">让所有孩子的书变多</button>
        <Child1 ref="c1" />
        <Child2 ref="c2"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="RefsParent">
import Child2 from './Child2.vue'
import Child1 from './Child1.vue'
import { ref } from 'vue'

let c1 = ref()
let c2 = ref()

// 数据
let house = ref(4)

// 方法
function changeToy() {
  console.log(c1.value)
  c1.value.toy='小猪佩奇'
}

function changeComputer() {
  console.log(c2.value)
  c2.value.computer='苹果'
}

function getAllChild(refs: Record<string, any>) {
  for (let key in refs) {
    console.log(key, refs[key]);
    refs[key].book += 3    
  }
}

// 将数据交给外部
defineExpose({house})
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
