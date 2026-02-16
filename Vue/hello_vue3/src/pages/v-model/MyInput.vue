<template lang="">
 <input 
 type="text" 
 :value="modelValue" 
 @input="emit('update:modelValue', $event.target.value)"
 />
</template>
<script setup lang="ts" name="MyInput">
const props = defineProps(['modelValue'])
console.log(props.modelValue);

const emit = defineEmits(['update:modelValue'])
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