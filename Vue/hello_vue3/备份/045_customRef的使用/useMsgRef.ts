import { customRef } from 'vue'

export default function (initValue:string, delay:number = 1000) {
  // 使用 Vue 提供的customRef定义响应式数据
  let timer: number
  // track 跟踪  trigger 触发
  let msg = customRef((track, trigger) => {
    return {
      // get 何时调用? -- msg 被读取时
      get() {
        console.log('get')
        track() // 告诉Vue数据msg很重要, 你要对msg进行持续关注, 一旦msg变化,就去更新
        return initValue
      },
      // set 何时调用? -- msg 被赋值时
      set(value: string) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          console.log('set', value)
          initValue = value
          trigger() // 通知Vue一下数据msg变化了
        }, delay)
      },
    }
  })
  return {msg}
}


