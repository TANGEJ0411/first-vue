import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from 'pinia'
import TodoPage from './view/TodoPage.vue'
import ShowExChangeRate from './view/ShowExChangeRate.vue'
import CountRate from './view/CountRate.vue'

const pinia = createPinia()

const router = createRouter({
    history: createWebHistory("/admin"),
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
        {
            path: '/countRate',
            name: 'countRate',
            component: CountRate
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
// 跑不動的範例code
const isLoginState = useHandleLogin()
const { isLogin } = storeToRefs(isLoginState)
const { checkLoginStatus } = isLoginState

router.beforeEach(async (to, from, next) => {
    // console.log(1)
    await checkLoginStatus()
    // console.log(to.name, isLogin.value)
    // if (to.name !== 'login' && !isLogin.value) {
    //     next({ name: 'login' });
    //     store.commit('setLayout', 'auth');
    // } else {
    //     next();
    // }

    if (to.name !== 'login' && !isLogin.value) {
        store.commit('setLayout', 'auth');
        next({ name: 'login' });
    }
    else if (to.meta && to.meta.layout && to.meta.layout == 'auth') {
        store.commit('setLayout', 'auth');
        next();
    } else {
        store.commit('setLayout', 'app');
        next();
    }
});

createApp(App).use(router).use(pinia).mount('#app')

