import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Bot from './views/Bot.vue'
import Home from './views/Home.vue'

import './main.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/bot/:id', component: Bot },
    { path: '/', component: Home },
  ],
})

createApp(App).use(router).mount('#app')
