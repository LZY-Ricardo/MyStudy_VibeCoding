<template>
  <div class="parent-container">
    <div class="component-box parent-box">
      <h2>父组件</h2>
      <p>当前余额：{{ money }}</p>
      <p>当前车品牌：{{ car.brand }}</p>
      <p>当前车价格：{{ car.price }}</p>
      <div class="child-wrapper">
        <Child />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="ProvideInjectParent">
import Child from './Child.vue'
import { reactive, ref, provide } from 'vue'

// 数据
const money = ref(100)
const car = reactive({
  brand: '奔驰',
  price: 100,
})

// 方法
function updateMoney(value: number) {
  money.value += value
}

// 向后代提供数据
provide('moneyContext', { money, updateMoney})
provide('car', car)
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
