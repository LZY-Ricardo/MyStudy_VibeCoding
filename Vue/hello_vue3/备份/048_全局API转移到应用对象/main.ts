import { createApp } from 'vue'
import App from './App.vue'
import Hello from './Hello.vue'
const app = createApp(App)

app.component('Hello', Hello)
app.config.globalProperties.msg = 'hello vue3'

declare module 'vue' {
  interface ComponentCustomProperties {
    msg: string
  }
}

app.directive('beauty', (element, {value}) => {
  element.innerText += value
  element.style.color = 'red'
  element.style.backgroundColor = 'yellow'
})

app.mount('#app')

// setTimeout(() => {
//   app.unmount()
// }, 2000)