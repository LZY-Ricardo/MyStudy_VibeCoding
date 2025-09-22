<template>
    <!-- <div>
        <h1>{{state.count}} -- {{state.age}} -- {{state.name}}</h1>
        <button @click="handleAdd">增加</button>
    </div> -->
    <!-- <div @click="changeFlag">
        <h2 v-if="flag">的伟大我当时水水大多数大多数的</h2>
        <h2 v-else style="color: red;">的伟大我当时水水大多数大多数的</h2>
    </div>  -->
    <!-- <div>
        <h2 :class="{'red' : flag}" @click="changeClass">的伟大我当时水水大多数大多数的</h2>
    </div> -->
    <!-- <div>
        <ul>
            <li v-for="item in list" :key="item">{{item}}</li>
        </ul>
    </div> -->
    <!-- <div>
        <h2 v-show="show">hello</h2>
        <button @click="show = !show">visible</button>
    </div> -->
    <div>
        <input type="text" v-model="msg">
        <h3>{{msg}}</h3>
        <button>提交</button>
    </div>
</template>

<script setup lang="js">
import { ref, reactive } from 'vue'
// let count = ref(0)
const state = reactive({
    count: 0,
    age: 18,
    name: 'Tom'
})
const handleAdd = () => {
    console.log(state)
    state.count++
    state.age++
}
let flag = ref(true)
const changeFlag = () => {
    flag.value = !flag.value
}
const changeClass = () => {
    flag.value = !flag.value
}
const list = ['html', 'css', 'js']
const show = ref(true)
const msg = ref('hello')
</script>

<style lang="css" scoped>
.red {
    color: red;
}
</style>