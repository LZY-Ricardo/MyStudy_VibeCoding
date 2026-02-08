<template>
  <div class="person">

  </div>
</template>

<script setup lang="ts" name="Person">
import type { PersonInter, Persons } from '@/types';

// let person: PersonInter = {
//   id: 'dsdaij32fji234',
//   name: '张三',
//   age: 23
// }

let personList: Persons = [
  { id: 'dsdaij32fji234', name: '张三', age: 23 },
  { id: 'dsdaij32fji235', name: '李四', age: 24 },
  { id: 'dsdaij32fji236', name: '王五', age: 25 },
]
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
</style>
