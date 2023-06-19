import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from 'pinia'
import TodoPage from './view/TodoPage.vue'
import ShowExChangeRate from './view/ShowExChangeRate.vue'

const pinia = createPinia()

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'todoList',
            component: TodoPage
        },
        {
            path: '/exchangeRate',
            name: 'exchangeRate',
            component: ShowExChangeRate
        },
        // {
        //     // 動態參數
        //     path: '/product/:pic',
        //     name: 'product',
        //     component: product
        // },
        // {
        //     // 巢狀路由
        //     path: '/member',
        //     name: 'member',
        //     component: memb,
        //     children: [
        //         {
        //             path: '/login',
        //             name: 'login',
        //             component: login
        //         },
        //         {
        //             path: '/register',
        //             name: 'register',
        //             component: register
        //         },
        //     ]
        // }
    ]
})


createApp(App).use(router).use(pinia).mount('#app')

