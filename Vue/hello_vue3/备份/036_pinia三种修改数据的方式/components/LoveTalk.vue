<template>
  <div class="talk">
    <button @click="getLoveTalk">获取一句土味情话</button>
    <ul>
      <li v-for="value in talkStore.talkList" :key="value.id">{{ value.content }}</li>
    </ul>
  </div>
</template>
<script setup lang="ts" name="LoveTalk">
import { reactive } from 'vue';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { useLoveTalkStore } from '@/store/LoveTalk';

interface Talk {
  id: string;
  content: string;
}

const talkStore = useLoveTalkStore();

// 方法
async function getLoveTalk() {
  // 使用一言API获取情话
  let url = 'https://v1.hitokoto.cn/?c=i&encode=json';
  // 发送请求
  const res = await axios.get(url);
  console.log(res);
  // 连续结构赋值 + 重命名
  let {data: {hitokoto: content}} = res;
  // 把请求回来的字符串，包装成一个对象
  let obj: Talk = {
    id: nanoid(),
    content
  }
  console.log(obj);

  talkStore.talkList.unshift(obj);
}

</script>
<style scoped>
  .talk{
    border: 1px solid #ccc;
    width: 400px;
    margin: 20px auto;
    text-align: center;
    line-height: 20px;
    background-color: #eee;
    box-shadow: 2px 2px 5px #ccc;
  }
</style>