<template>
  <div class="person">
    <h2>姓名: {{ name }}</h2>
    <h2>年龄: {{ age }}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">修改年龄</button>
    <button @click="showTel">查看联系方式</button>

    <hr>
    <h2>test: {{ a }}</h2>
    <h2>c: {{ c }}</h2>
    <h2>d: {{ d }}</h2>
    <button @click="test">test</button>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Person',
  beforeCreate() {
    console.log('Person beforeCreate 生命周期被调用了')
  },
  data() {
    return {
      a: 100,
      c: this.name,
      d: 900
    }
  },

  methods: {
    test() {
      console.log('test 方法被调用了')
    },
  },

  setup() {
    console.log('Person setup 被调用了')
    // console.log('this', this); // undefined
    // Composition API 逻辑可以放在这里
    // 数据 原来写在data中 注意 此时 name,age,tel 不是响应式变量
    let name = '张三'
    let age = 18
    let tel = '123-456-7890'
    // let x = d // 报错 因为 d 是 data 中的属性 setup 中无法访问 data 中的属性

    // 方法
    function changeAge() {
      console.log('changeAge 被调用了')
      name = '李四' // 注意： 这样修改name, 页面不会发生变化
      console.log('修改后的 name:', name) // name 确实修改了，但name不是响应式
    }
    function changeName() {
      console.log('changeName 被调用了')
      age = 20
      console.log('修改后的 age:', age)
    }
    function showTel() {
      console.log('showTel 被调用了')
      alert(`联系方式: ${tel}`)
    }
    // 注意： setup 中返回的数据和方法，模板中才能使用
    return {
      name,
      age,
      changeAge,
      changeName,
      showTel,
    }
    // setup 也可以返回一个渲染函数
    // return () => '哈哈'
  },
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
