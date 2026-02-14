<template>
  <div class="child-container">
    <div class="component-box child-box">
      <h2>子组件</h2>
      <p class="desc">Props 子组件示例</p>
    </div>
  </div>
</template>

<script setup lang="ts" name="PropsChild">
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
