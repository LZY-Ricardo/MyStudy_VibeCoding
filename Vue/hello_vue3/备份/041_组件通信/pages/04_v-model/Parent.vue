<template>
  <div class="parent-container">
    <div class="component-box parent-box">
      <h2>父组件</h2>
      <h4>{{ username }}</h4>
      <h4>{{ password }}</h4>
      <!--v-model用在html标签上-->
      <!-- <input type="text" v-model="username"> -->
      <!-- <input type="text" :value="username" @input="username = (<HTMLInputElement>$event.target).value"> -->

      <!--v-model用在组件标签上-->
      <!-- <MyInput v-model="username" /> -->
      <!-- <MyInput :modelValue="username" @update:modelValue="username = $event"/> -->

      <!-- 修改modelValue -->
       <MyInput v-model:ming="username" v-model:mima="password" />
      <div class="child-wrapper">
        <Child />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="VModelParent">
import Child from './Child.vue'
import { ref } from 'vue'
import MyInput from './MyInput.vue'

// 数据
const username = ref('zhangsan')
const password = ref('123456')
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
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
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
