<template>
  <div class="grandchild-container">
    <div class="component-box grandchild-box" v-bind="$attrs">
      <h2>孙组件</h2>
      <p class="desc">接收透传的 $attrs</p>
      <div class="attrs-grid">
        <div class="attr-item">
          <span class="attr-label">a</span>
          <span class="attr-value">{{ a }}</span>
        </div>
        <div class="attr-item">
          <span class="attr-label">b</span>
          <span class="attr-value">{{ b }}</span>
        </div>
        <div class="attr-item">
          <span class="attr-label">c</span>
          <span class="attr-value">{{ c }}</span>
        </div>
        <div class="attr-item">
          <span class="attr-label">d</span>
          <span class="attr-value">{{ d }}</span>
        </div>
        <div class="attr-item">
          <span class="attr-label">x</span>
          <span class="attr-value">{{ x }}</span>
        </div>
        <div class="attr-item">
          <span class="attr-label">y</span>
          <span class="attr-value">{{ y }}</span>
        </div>
        <button @click="updateA(6)">点我将爷爷那的a加6</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="AttrsGrandChild">
defineProps(['a','b','c','d','x','y','updateA'])
</script>

<style scoped>
.grandchild-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.component-box {
  width: 220px;
  padding: 18px;
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

.grandchild-box {
  background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
  color: #2d3436;
}

.component-box h2 {
  margin: 0 0 6px 0;
  font-size: 18px;
  font-weight: 600;
}

.desc {
  margin: 0 0 14px 0;
  font-size: 12px;
  opacity: 0.75;
}

.attrs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  width: 100%;
}

.attr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  backdrop-filter: blur(4px);
}

.attr-label {
  font-size: 11px;
  font-weight: 600;
  opacity: 0.7;
  margin-bottom: 2px;
}

.attr-value {
  font-size: 16px;
  font-weight: 700;
  color: #2d3436;
}
</style>
