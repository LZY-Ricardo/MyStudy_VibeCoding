<template>
  <div class="person">
    <h2>当前求和为: {{ sum }}，放大十倍为: {{ bigSum }}</h2>
    <button @click="add">点我sum + 1</button>
    <hr />
    <img v-for="(dog, index) in dogList" :key="index" :src="dog" alt="" />
    <button @click="addDog">再来一只小狗</button>
  </div>
</template>

<script setup lang="ts" name="Person">
import useSum from '../hooks/useSum'
import useDog from '../hooks/useDog'

const { sum, add, bigSum } = useSum()
const { dogList, addDog } = useDog()

</script>

<style scoped>
.person {
  width: 800px;
  height: 800px;
  background-color: lightblue;
  box-shadow: 10px 5px 10px rgba(25, 48, 488, 0.8);
}
button {
  margin: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
img {
  width: 100px;
  margin-right: 10px;
}
</style>
