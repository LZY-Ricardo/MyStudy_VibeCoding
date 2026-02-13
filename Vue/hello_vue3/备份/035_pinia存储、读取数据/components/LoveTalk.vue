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

// let talkList = reactive < Talk[] > ([
//   { id: '1',
//     content: '你是我的小呀小苹果，怎么爱你都不嫌多'
//   },
//   {
//     id: '2',
//     content: '我想和你一起吹吹风，看看海，吃吃烧烤'
//   },
//   {
//     id: '3',
//     content: '我想和你一起看日出，吃吃早点，逛逛街'
//   }
// ]);

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