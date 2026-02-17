<template>
  <div class="child-container">
    <div class="component-box child-box">
      <h2>孙组件</h2>
      <h4>余额: {{ money }}</h4>
      <p>当前车品牌：{{ car.brand }}</p>
      <p>当前车价格：{{ car.price }}</p>
      <button @click="updateMoney(-10)">花掉爷爷的钱</button>
    </div>
  </div>
</template>

<script setup lang="ts" name="ProvideInjectChild">
import { inject } from 'vue'

// 接收父组件提供的数据
const {money, updateMoney} = inject('moneyContext', {money: 0, updateMoney: (x: number) => {}})
const car = inject('car', {brand: '未知', price: 0})

// 输出接收的数据
console.log(money)
console.log(car)
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
  background: linear-gradient(135deg, #35e21e 0%, #f5576c 100%);
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
