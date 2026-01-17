import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('Vue 错误:', err)
  console.error('错误信息:', info)
  console.error('组件实例:', instance)
}

// 全局警告处理
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Vue 警告:', msg)
  console.warn('追踪:', trace)
}

app.use(router)
app.mount('#app')

console.log('应用已挂载')

