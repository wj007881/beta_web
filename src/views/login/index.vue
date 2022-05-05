<template>
  <div class="login-page">
    <div class="wrapper">
      <div class="left">
        <img src="@/assets/images/login_banner.png" height="380" alt="login_banner" />
      </div>

      <div class="form-wrapper">
        <h5 class="brand">
          <img src="@/assets/images/logo.svg" width="45" mr-15 alt="logo" />
          {{ title }}
        </h5>
        <div class="form-item" mt-35>
          <input
            v-model="loginInfo.username"
            autofocus
            type="text"
            class="input"
            placeholder="username"
            @keydown.enter="handleLogin"
          />
        </div>
        <div class="form-item" mt-35>
          <input
            v-model="loginInfo.password"
            type="password"
            class="input"
            placeholder="password"
            @keydown.enter="handleLogin"
          />
        </div>
        <div class="form-item" mt-35>
          <button class="submit-btn" @click="handleLogin">登录</button>
        </div>
      </div>
    </div>
    <!-- <div class="form-wrapper">
      <h2 class="title">{{ title }}</h2>
      <div class="form-item" mt-20>
        <input
          v-model="loginInfo.name"
          autofocus
          type="text"
          class="input"
          placeholder="username"
          @keydown.enter="handleLogin"
        />
      </div>
      <div class="form-item" mt-20>
        <input
          v-model="loginInfo.password"
          type="password"
          class="input"
          placeholder="password"
          @keydown.enter="handleLogin"
        />
      </div>
      <div class="form-item" mt-20>
        <button class="submit-btn" @click="handleLogin">登录</button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, unref } from 'vue'
import { useRouter } from 'vue-router'

import { login } from '@/api/auth'
import { createLocalStorage } from '@/utils/cache'
import { setToken,setUserID } from '@/utils/token'

const title = import.meta.env.VITE_APP_TITLE

const router = useRouter()
const query = unref(router.currentRoute).query

const loginInfo = ref({
  username: 'admin',
  password: 123456,
  userID:1
})

const ls = createLocalStorage({ prefixKey: 'login_' })
const lsLoginInfo = ls.get('loginInfo')
if (lsLoginInfo) {
  loginInfo.value.username = lsLoginInfo.username || ''
  loginInfo.value.password = lsLoginInfo.password || ''
  loginInfo.value.userID = lsLoginInfo.userID || ''
}

async function handleLogin() {
  const { username, password } = loginInfo.value
  if (!username || !password) {
    $message.warning('请输入用户名和密码')
    return
  }
  try {
    $message.loading('正在验证...')
    login({ username, password: password.toString() }).then((res) => {
      console.log(res)
      if (res.data.code === 200) {
        $message.success('登录成功')
        // let token=res.data.token
        let userID=res.data.id
        ls.set('loginInfo', { username, password, userID})
        setToken(res.data.token)
        setUserID(res.data.id)
        if (query.redirect) {
          const path = query.redirect
          Reflect.deleteProperty(query, 'redirect')
          router.push({ path, query })
        } else {
          console.log('跳转首页')
          router.push('/')
        }
      } else {
        console.log('登录出错')
        $message.warning(res.data.message)
      }
    })
  } catch (error) {
    console.log('捕获错误')
    $message.error(error.message)
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  background-image: url(@/assets/images/login_bg.jpg);
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper {
  width: 100%;
  max-width: 1020px;
  box-shadow: 1.5px 3.99px 27px 0px rgb(0 0 0 / 10%);
  background-color: rgba(255, 255, 255, 0.3);

  display: flex;
  .left {
    padding: 40px;
    border-right: 1px solid #cccccc5e;
  }
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  .brand {
    width: 100%;
    padding: 15px;
    color: #6a6a6a;
    font-size: 24px;
    font-weight: normal;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-item {
    width: 100%;
    max-width: 360px;
    height: 50px;
    input {
      width: 100%;
      height: 100%;
      padding: 0 20px;
      border: 1px solid #6a6a6a;
      border-radius: 5px;
      color: $primaryColor;
      font-size: 16px;
      transition: 0.5s;
      &:focus {
        border-color: $primaryColor;
        box-shadow: 0 0 5px $primaryColor;
      }
    }
    button {
      width: 100%;
      height: 100%;

      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 5px;
      background-color: $primaryColor;

      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
