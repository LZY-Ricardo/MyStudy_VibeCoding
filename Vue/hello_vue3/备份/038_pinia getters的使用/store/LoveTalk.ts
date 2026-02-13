import { defineStore } from 'pinia'
import axios from 'axios'
import { nanoid } from 'nanoid'

export const useLoveTalkStore = defineStore('loveTalk', {
  state() {
    return {
      talkList: [
        {
          id: '1',
          content: '你是我的小呀小苹果，怎么爱你都不嫌多',
        },
        {
          id: '2',
          content: '我想和你一起吹吹风，看看海，吃吃烧烤',
        },
        {
          id: '3',
          content: '我想和你一起看日出，吃吃早点，逛逛街',
        },
      ],
    }
  },
  actions: {
    async getATalk() {
      // 使用一言API获取情话
      let url = 'https://v1.hitokoto.cn/?c=i&encode=json'
      // 发送请求
      const res = await axios.get(url)
      console.log(res)
      // 连续结构赋值 + 重命名
      let {
        data: { hitokoto: content },
      } = res
      // 把请求回来的字符串，包装成一个对象
      let obj = {
        id: nanoid(),
        content,
      }

      this.talkList.unshift(obj)
    },
  },
})
