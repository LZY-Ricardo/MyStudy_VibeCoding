<template>
  <div class="person">
    <h2>
      当前求和位: {{ sum  }}
    </h2>
    <button @click="add">+</button>
  </div>
</template>

<script>
 /* eslint-disable */
export default {
  name: 'Person',
  // 数据
  data() {
    return {
      sum: 1
    }
  },
  // 方法
  methods: {
    add() {
      this.sum += 1
    }
  },
  // 创建前的钩子
  beforeCreate() {
    console.log('beforeCreate');
  },
  // 创建后的钩子
  created() {
    console.log('created');
  },
  // 挂载前的钩子
  beforeMount() {
    console.log('beforeMount');
  },
  // 挂载后的钩子
  mounted() {
    console.log('mounted');
  },
  // 更新前的钩子
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  // 更新后的钩子
  updated() {
    console.log('updated');
  },
  // 销毁前的钩子
  beforeDestroy() {
    console.log('beforeDestroy');
  },
  // 销毁后的钩子
  destroyed() {
    console.log('destroyed');
  }
}
</script>

<style scoped>
  .person{
    border: 1px solid #ccc;
    width: 200px;
    line-height: 100px;
    margin: 20px auto;
    box-shadow: darkblue 1px 1px 5px;
  }
</style>
