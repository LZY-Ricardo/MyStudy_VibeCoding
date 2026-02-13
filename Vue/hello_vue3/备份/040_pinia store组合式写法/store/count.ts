import { defineStore } from 'pinia';

export const useCountStore = defineStore('count', {
  // 真正存储数据的地方
  state() {
    return {
      sum: 6,
      school: '卡塞尔学院',
      address: '美国芝加哥',
    }
  },
  // actions 里面放置的是一个一个的方法, 用于响应组件中的动作, 通过调用这些方法来修改 state 中的数据
  actions: {
    // 加法
    increment(value: number) {
      console.log('调用了increment');
      if (this.sum < 100) {
        // 修改数据(this是当前的store)
        this.sum += value;
      }
    }
  },
  getters: {
    bigSum: state => state.sum * 10,
    translateSchool(state) {
      console.log('@this', this);
      
      if (this.school === '卡塞尔学院') {
        return 'Cassel College';
      } else {
        return '未知学校';
      }
    },
  },
})