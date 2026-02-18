<template>
  <div class="parent-container">
    <div class="component-box parent-box">
      <h2>父组件</h2>
      <div class="category-wrapper">
        <Category title="热门游戏列表" >
          <ul>
            <li v-for="game in games" :key="game.id">{{game.name}}</li>
          </ul>
        </Category>
        <Category title="今日美食城市">
          <img :src="imgUrl" alt="今日美食城市" />
        </Category>
        <Category title="今日影视推荐">
          <video :src="videoUrl" controls></video>
        </Category>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="SlotsParent">
import Category from './category.vue';
import { ref, reactive } from 'vue'

let games = reactive([
  {id:'001', name: '瓦洛兰特'},
  {id:'002', name: '王者荣耀'},
  {id:'003', name: '原神'},
  {id:'004', name: ' csgo'},
])

let imgUrl = ref('https://z1.ax1x.com/2023/11/19/piNxLo4.jpg')
let videoUrl = ref('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4')
</script>

<style scoped>
.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.component-box {
  width: 500px;
  height: 400px;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  position: relative;
}

.parent-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.component-box h2 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.desc {
  margin: 0 0 30px 0;
  font-size: 14px;
  opacity: 0.9;
}

.child-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.category-wrapper{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

li {
  margin: 5px 0;
}

img, video{
  width: 100%;
  height: 100px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}
</style>
