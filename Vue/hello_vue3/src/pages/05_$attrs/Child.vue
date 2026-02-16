<template>
  <div class="child-container">
    <div class="component-box child-box" v-bind="$attrs">
      <h2>子组件</h2>
      <!-- <h4>a: {{ a }}</h4> -->
      <!-- <h4>其他: {{ $attrs }}</h4> -->
      <p class="desc">$attrs 透传示例</p>
      <div class="grandchild-wrapper">
        <GrandChild v-bind="$attrs"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="AttrsChild">
import GrandChild from './GrandChild.vue'
// defineProps(['a'])
</script>

<style scoped>
.child-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.component-box {
  width: 320px;
  padding: 24px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.component-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.child-box {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.component-box h2 {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
}

.desc {
  margin: 0 0 18px 0;
  font-size: 13px;
  opacity: 0.9;
}

.grandchild-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 160px;
}
</style>
