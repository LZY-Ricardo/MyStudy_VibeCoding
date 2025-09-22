<script setup lang="js">
import { ref, onBeforeMount, onMounted } from 'vue';
const h2Ref = ref(null)
// fetch()
onBeforeMount(() => {
    console.log('onBeforeMount', h2Ref.value);
})
onMounted(() => {
    console.log('onMounted', h2Ref.value);
})
</script>

<template>
    <div>
        <h2 ref="h2Ref">hello</h2>
    </div>
</template>

<style lang="css" scoped>

</style>