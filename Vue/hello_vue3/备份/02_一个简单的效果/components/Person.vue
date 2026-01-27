<template>
    <div class="person">
        <h2>姓名: {{ name }}</h2>
        <h2>年龄: {{ age }}</h2>
        <button @click="changeName">修改名字</button>
        <button @click="changeAge">修改年龄</button>
        <button @click="showTel">查看联系方式</button>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Person',
        data() {
            return {
                name: '张三',
                age: 18,
                tel: '12345678901'
            }
        },
        methods: {
            showTel() {
                alert(this.tel);
            },
            changeName() {
                this.name = '李四';
            },
            changeAge() {
                this.age += 1;
            }
        }
    }
</script>

<style scoped>  
    .person {
        width: 200px;
        height: 200px;
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