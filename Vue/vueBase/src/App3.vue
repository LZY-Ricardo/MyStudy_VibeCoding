<script setup lang="js">
import { ref, onBeforeMount, onMounted } from 'vue';
const list = ref([])
onMounted(async () => {
    const res = await fetch('https://mock.mengxuegu.com/mock/66585c4db462b81cb3916d3e/songer/songer', {
        method: 'GET',
    })
    const data = await res.json()
    console.log(data)
    list.value = data.data
})
const handleDelete = (e) => {
    console.log(e.target);
    list.value = list.value.filter(item => item.name !== e.target.id)
    
}
</script>

<template>
    <div>
        <ul @click="handleDelete">
            <li v-for="item in list" :key="item" :id="item.name">{{ item.name }}</li>
        </ul>
    </div>
</template>

<style lang="css" scoped>

</style>