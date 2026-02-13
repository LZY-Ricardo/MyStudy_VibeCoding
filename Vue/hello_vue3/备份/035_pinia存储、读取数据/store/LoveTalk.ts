import { defineStore } from "pinia";

export const useLoveTalkStore = defineStore('loveTalk', {
  state() {
    return {
      talkList: [
        {
          id: '1',
          content: '你是我的小呀小苹果，怎么爱你都不嫌多'
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
  }
})