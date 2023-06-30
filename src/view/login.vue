<!-- 跑不動的範例code -->
<template>
  <div class="form full-form auth-cover">
    <div class="form-container">
      <div class="form-form">
        <div class="form-form-wrap">
          <div class="form-container">
            <div class="form-content">
              <h1 class="">
                Log In to
                <router-link to="/"
                  ><span class="brand-name">CORK</span></router-link
                >
              </h1>
              <p class="signup-link">
                New Here?
                <router-link to="/auth/register">Create an account</router-link>
              </p>
              <form class="text-start" @submit.prevent="handleLogin(loginData)">
                <div class="form">
                  <div id="username-field" class="field-wrapper input">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-user"
                    >
                      <path
                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                      ></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      v-model="loginData.email"
                    />
                  </div>

                  <div id="password-field" class="field-wrapper input mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-lock"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <input
                      :type="`${showPwd ? 'text' : 'password'}`"
                      class="form-control"
                      placeholder="Password"
                      v-model="loginData.pwd"
                    />
                  </div>
                  <p v-if="loginFail">帳號或密碼錯誤</p>
                  <div class="d-sm-flex justify-content-between">
                    <div
                      class="field-wrapper toggle-pass d-flex align-items-center"
                    >
                      <p class="d-inline-block">Show Password</p>
                      <label class="switch s-primary mx-2">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          @click="toogleShowPwd"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                    <div class="field-wrapper">
                      <button type="submit" class="btn btn-primary">
                        Log In
                      </button>
                    </div>
                  </div>

                  <div class="field-wrapper text-center keep-logged-in">
                    <div
                      class="checkbox-outline-primary custom-control custom-checkbox"
                    >
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        value="true"
                        id="chkRemember"
                      />
                      <label class="custom-control-label" for="chkRemember"
                        >Keep me logged in</label
                      >
                    </div>
                  </div>

                  <div class="field-wrapper">
                    <router-link
                      to="/auth/pass-recovery"
                      class="forgot-pass-link"
                      >Forgot Password?</router-link
                    >
                  </div>
                </div>
              </form>
              <p class="terms-conditions">
                © 2020 All Rights Reserved.
                <router-link to="/">CORK</router-link> is a product of Arrangic
                Solutions LLP.
                <a href="javascript:void(0);">Cookie Preferences</a>,
                <a href="javascript:void(0);">Privacy</a>, and
                <a href="javascript:void(0);">Terms</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="form-image">
        <div class="l-image"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/sass/authentication/auth.scss";

import { useMeta } from "@/composables/use-meta";
import { reactive, ref, watch } from "vue";
import { useHandleLogin } from "../stores/login";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();

useMeta({ title: "Login Cover" });
const loginData = reactive({
  email: "",
  pwd: "",
});
const showPwd = ref(false);
const loginStore = useHandleLogin();
const { isLogin, loginFail } = storeToRefs(loginStore);
const { handleLogin } = loginStore;

const toogleShowPwd = (e) => {
  e.stopPropagation();
  showPwd.value = !showPwd.value;
};

watch(loginFail, () => {
  console.log(loginFail, "watch");
});
watch(isLogin, () => {
  // console.log("isLogin 變了!!");
  if (isLogin.value) {
    // console.log(isLogin, "vue");
    router.push({ name: "Home" });
  }
});
</script>
