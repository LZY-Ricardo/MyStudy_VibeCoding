import { reactive, onMounted } from 'vue'
import axios from 'axios'

export default function () {
  // 数据
  let dogList = reactive<string[]>([])

  // 方法
  async function addDog() {
    try {
      const res = await axios.get('https://dog.ceo/api/breeds/image/random')
      console.log(res.data)
      dogList.push(res.data.message)
    } catch (error) {
      alert(error)
    }
  }

  // 钩子
  onMounted(() => {
      addDog()
  })
  
  // 向外部提供东西
  return {  
    dogList,
    addDog
  }
}
