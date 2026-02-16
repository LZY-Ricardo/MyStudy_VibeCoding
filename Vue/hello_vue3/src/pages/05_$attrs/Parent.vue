<template>
  <div class="parent-container">
    <div class="component-box parent-box">
      <h2>父组件</h2>
      <p class="desc">$attrs 属性透传示例</p>
      <h4>a: {{ a }}</h4>
      <h4>b: {{ b }}</h4>
      <h4>c: {{ c }}</h4>
      <h4>d: {{ d }}</h4>
      <div class="child-wrapper">
        <Child
          data-id="001"
          data-name="Vue3"
          :data-count="count"
          placeholder="透传的 placeholder"
          custom-attr="自定义属性"
          :a="a"
          :b="b"
          :c="c"
          :d="d"
          v-bind="{x: 100, y: 200}"
          :updateA="updateA"
        />
      </div>
      <div class="info-box">
        <p>传递的属性会通过 $attrs 自动透传到子组件和孙组件</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="AttrsParent">
import { ref } from 'vue'
import Child from './Child.vue'

let a = ref(1)
let b = ref(2)
let c = ref(3)
let d = ref(4)
const count = ref(42)

function updateA(value:number) {
  a.value += value
}
</script>

<style scoped>
.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  padding: 20px;
}

.component-box {
  width: 550px;
  padding: 32px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.component-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.parent-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.component-box h2 {
  margin: 0 0 8px 0;
  font-size: 26px;
  font-weight: 600;
}

.component-box h4 {
  margin: 4px 0;
  font-size: 14px;
  opacity: 0.95;
}

.desc {
  margin: 0 0 20px 0;
  font-size: 14px;
  opacity: 0.9;
}

.child-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 240px;
}

.info-box {
  margin-top: 24px;
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  backdrop-filter: blur(8px);
}
</style>
