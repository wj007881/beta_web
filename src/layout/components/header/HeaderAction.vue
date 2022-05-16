<template>
  <div style="display: flex;">
    <n-dropdown :options="option1" @select="langSelect">
    <div class="lang">
      <n-icon :component="Language" size="25">
      </n-icon>
    </div>
      </n-dropdown>
  <n-dropdown :options="options" @select="handleSelect">
    <div class="avatar">
      <img :src="userStore.avatar" />
      <span>{{ userStore.name }}</span>
    </div>
  </n-dropdown>

  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import { resetRouter } from '@/router'
import { usePermissionStore } from '@/store/modules/permission'
import { NOT_FOUND_ROUTE } from '@/router/routes'
import {Language} from '@vicons/fa'
import { zhCN, dateZhCN } from 'naive-ui'
// import axios from 'axios'


const options = [
  {
    label: '退出登录',
    key: 'logout',
  },
]
const option1 = [
  {
    label: '中文',
    key: 'chinese',
  },
  {
    label: 'English',
    key: 'english',
  },
]
export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    return {
      zhCN,
      dateZhCN,
      Language,
      option1:option1,
      options:options,
      userStore,
      locale: ref(null),
      dateLocale: ref(null),
      langSelect(key) {
            if (key === 'chinese') {

                        this.locale = zhCN
                        this.dateLocale = dateZhCN

            } else if (key === 'english') {

                        this.locale = null
                        this.dateLocale = null

            }
        },
      handleSelect(key) {
        if (key === 'logout') {
          logout()
        } else if (key === 'switchRole') {
          switchRole()
        }
      },
      logout() {
        userStore.logout()
        $message.success('已退出登录')
        router.push({ path: '/login' })
      }
    };
  }
});

</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  cursor: pointer;
  // margin-top:10px;
  img {
    width: 100%;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
.lang{
    margin-top:5\0px;
    width: 100%;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-right: 10px;
}
</style>
