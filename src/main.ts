import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
// 挂载
app.use(pinia)

app.use(router).mount('#app')
