// 跑不動的範例code

import axios from "axios";
import { defineStore } from "pinia";
import { onMounted, ref, watch } from "vue";

const bcrypt = require('bcryptjs')
//bcrypt.genSalt的promise
function hashGenSalt(rounds) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
//bcrypt.hash的promise
function hashPassword(password, salt) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
//bcrypt.compare的promise
function comparePasswords(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
}
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
//定義pinia兩個參數第一個是唯一命名string，後面是setup寫法
export const useHandleLogin = defineStore('login', () => {
    //儲存access_token
    let auth = ref("")
    let connTime = ref()
    //判斷登入是否成功
    let loginFail = ref(false)
    //保存登入的state
    let isLogin = ref(false)
    //控制登入
    const handleLogin = async (loginData) => {
        const url = route('admin.login');
        try {
            // console.log(loginData);
            const response = await axios.post(url, { data: loginData });
            // console.log(response, 'loginresponse')
            const resToken = response.data.data.token;
            const resConnTime = response.data.data.connTime
            if (!response.data.status) {
                loginFail.value = true
            } else {
                loginFail.value = false
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(`${auth.value + connTime.value}`, salt, function (err, hash) {
                        localStorage.setItem('lo_hash', hash)
                    });
                });
                const salt = await hashGenSalt(10)
                const hash = await hashPassword(`${resToken + resConnTime}`, salt)
                localStorage.setItem('access_token', resToken)
                localStorage.setItem('time_stamp', resConnTime)
                localStorage.setItem('lo_hash', hash)
                connTime.value = resConnTime
                auth.value = resToken
            }
        } catch (error) {
            console.error(error);
        }
    }

    //check session是否有效保留登入狀態
    const checkLoginStatus = async () => {
        let FEChecked = false
        // console.log(localStorage.getItem('access_token'), localStorage.getItem('time_stamp'), localStorage.getItem('lo_hash'))
        try {
            if (localStorage.getItem('access_token') && localStorage.getItem('time_stamp') && localStorage.getItem('lo_hash')) {
                const res = await comparePasswords(`${localStorage.getItem('access_token') +
                    localStorage.getItem('time_stamp')}`, localStorage.getItem('lo_hash'))
                // console.log(res, 123456)
                FEChecked = res
            } else {
                FEChecked = false
            }
            // console.log(FEChecked, 7891011)
            if (!FEChecked) {
                console.log('滾去登入頁吧')
                isLogin.value = false
            } else {
                console.log('還需要後端驗證喔')
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`
                try {
                    const testRes = await axios.post(route('admin.auth'),
                        { data: { timeStamp: localStorage.getItem('time_stamp') } })
                    console.log(testRes);
                    if (!testRes.data.status) {
                        isLogin.value = false
                        // console.log(isLogin.value, 'adminApifail')
                    }
                    if (testRes.data.status === 1) {
                        isLogin.value = true
                        // console.log(isLogin.value, 'success')
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.error(error)
        }
    };
    const redirectToLogin = (router) => {
        if (!isLogin.value) {
            router.push('/auth/login')
        }
    }
    onMounted(async () => { await checkLoginStatus() })
    watch(auth, () => {
        console.log("auth 變了!!");
        checkLoginStatus()
    });
    return { isLogin, loginFail, handleLogin, redirectToLogin, checkLoginStatus }
})