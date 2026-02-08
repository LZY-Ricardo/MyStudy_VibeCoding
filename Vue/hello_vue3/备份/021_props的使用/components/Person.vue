<template>
  <div class="person">
    <!-- <h2>{{ a }}</h2> -->
    <ul>
      <li v-for="value in list" :key="value.id">{{ value.name }} --- {{ value.age }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts" name="Person">
import type { Persons } from '@/types'

// 只接收list
// defineProps(['list'])

// 接收list + 限制类型
// defineProps<{list:Persons}>()

// 接收list + 限制类型 + 限制必要性 + 指定默认值
withDefaults(defineProps<{ list?: Persons }>(), {
  list:() => [{id: 'dadadaa', name: '康师傅', age: 19}]
})

// 接收list 同时将 props 保存起来
// let x = defineProps(['list'])
// console.log(x.list);

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
