<template>
  <div class="person">
    姓：<input type="text" v-model="firstName"> <br>
    名：<input type="text" v-model="lastName"> <br>
    <button @click="changeFullName">将全名改为li-si</button><br>
    全名：<span>{{ fullName }}</span><br>
    全名：<span>{{ fullName }}</span><br>
    全名：<span>{{ fullName }}</span><br>
    全名：<span>{{ fullName2() }}</span><br>
    全名：<span>{{ fullName2() }}</span><br>
    全名：<span>{{ fullName2() }}</span><br>
</div>
</template>

<script setup lang="ts" name="Person">
import { ref, computed } from 'vue'

let firstName = ref('zhang')
let lastName = ref('san')

function fullName2() {
  console.log('计算fullName2')
    return firstName.value.slice(0,1).toUpperCase()+ firstName.value.slice(1) + '-' + lastName.value
}

// 这么定义的计算属性 fullName 具有缓存功能，且是只读的
// let fullName = computed(() => {
//   console.log('计算fullName')
//   return firstName.value.slice(0,1).toUpperCase()+ firstName.value.slice(1) + '-' + lastName.value
// })

// 这么定义的计算属性 fullName 具有缓存功能，可读可写
let fullName = computed({
  get() {
    return firstName.value.slice(0,1).toUpperCase()+ firstName.value.slice(1) + '-' + lastName.value
  },
  set(val) {
    const [str1, str2] = val.split('-')
    firstName.value = str1 
    lastName.value = str2
    console.log('set', val)
  }
})

function changeFullName() {
  // console.log(fullName.value)
  // fullName.value = 'li-si'  // 这一行会报错，因为 computed 定义的属性是只读的

  // firstName.value = 'li'
  // lastName.value = 'si'

  fullName.value = 'li-si'  
}
</script>

<style scoped>
.person {
  width: 200px;
  height: 800px;
  background-color: lightblue;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
