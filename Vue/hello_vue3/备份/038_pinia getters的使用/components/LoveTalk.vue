<template>
  <div class="talk">
    <button @click="getLoveTalk">获取一句土味情话</button>
    <ul>
      <li v-for="value in talkList" :key="value.id">{{ value.content }}</li>
    </ul>
  </div>
</template>
<script setup lang="ts" name="LoveTalk">
import { reactive } from 'vue';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { useLoveTalkStore } from '@/store/LoveTalk';
import { storeToRefs } from 'pinia';

interface Talk {
  id: string;
  content: string;
}

const talkStore = useLoveTalkStore();
const { talkList } = storeToRefs(talkStore);

// 方法
async function getLoveTalk() {
  talkStore.getATalk();
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