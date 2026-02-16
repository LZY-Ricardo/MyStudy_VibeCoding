<template lang="">
  <input type="text" :value="ming" @input="emit('update:ming', $event.target.value)" />
  <input type="text" :value="mima" @input="emit('update:mima', $event.target.value)" />
</template>
<script setup lang="ts" name="MyInput">
const props = defineProps(['modelValue', 'ming', 'mima'])
console.log(props.modelValue)
console.log(props.ming)
console.log(props.mima)

const emit = defineEmits(['update:ming', 'update:mima'])
</script>
<style scoped>
input {
  border: 2px solid black;
  background-image: linear-gradient(45deg, red, yellow, green);
  height: 30px;
  color: white;
  font-size: 30px;
}
</style>
