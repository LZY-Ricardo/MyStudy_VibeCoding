<template>
  <div class="outer">
    <h2>我是App组件</h2>
    <img src="./image.png" alt="" />
    <br />
    <Modal />
  </div>
</template>

<script lang="ts" setup name="App">
import Modal from './Modal.vue'
</script>
<style scoped>
.outer {
  background-color: #ddd;
  border-radius: 10px;
  padding: 5px;
  box-shadow: 0 0 10px;
  width: 400px;
  height: 400px;
  filter: saturate(0);
}

img {
  width: 100px;
}

.app {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}
button {
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
}
</style>
