<template>
  <div>
    <n-card>
      <div flex items-center>
        <img width="60" style="border-radius: 50%" :src="userStore.avatar" />
        <div ml20>
          <p text-16>Hello, {{ userStore.name }}</p>
          <p op80 text-12 mt5>今天又是元气满满的一天</p>
        </div>
        <div flex ml-auto>
          <n-statistic label="待办" :value="4">
            <template #suffix> / 10 </template>
          </n-statistic>
          <n-statistic ml80 label="Score">
            <n-number-animation ref="starsNumberRef" show-separator :from="0" :to="999" />
          </n-statistic>
          <!-- <n-statistic ml80 label="Forks">
            <n-number-animation ref="starsNumberRef" show-separator :from="0" :to="299" />
          </n-statistic> -->
        </div>
      </div>
    </n-card>

    <div p15 flex>
      <n-card title="项目" size="small" :segmented="true">
        <template #header-extra>
          <n-button text type="primary" @click="router.push('/project/project_list')">更多</n-button>
        </template>
        <div class="card-list">
          <!-- <div v-for="i in dataRef"> -->
          <!-- <n-card  :key="i" :title=i.title size="small">
            <template #cover>
              <img
                :src=i.img
                style="max-width: 300px; max-height: 150px"
              />
            </template>
            <p op60>{{i.content}}</p>
          </n-card> -->
          <n-card  :key="i" title="Lenovo Go Mouse" size="small">
            <template #cover>
              <img
                src="@/assets/images/go_mouse.jpeg"
                style="max-width: 300px; max-height: 150px"
              />
            </template>
            <p op60>Lenovo Go Mouse</p>
          </n-card>
          <n-card  :key="i" title="Lenovo Go Speaker" size="small">
            <template #cover>
              <img
                src="@/assets/images/go_speak.jpeg"
                style="max-width: 300px; max-height: 150px"
              />
            </template>
            <p op60>Lenovo Go Speaker</p>
          </n-card>
          <n-card  :key="i" title="Lenovo Go Ergonomic Keyboard & Mouse" size="small">
            <template #cover>
              <img
                src="@/assets/images/go_keyboard.jpeg"
                style="max-width: 300px; max-height: 150px"
              />
            </template>
            <p op60>Lenovo Go Ergonomic Keyboard & Mouse</p>
          </n-card>
          <n-card  :key="i" title="Lenovo Go Package" size="small">
            <template #cover>
              <img
                src="@/assets/images/go_package.jpeg"
                style="max-width: 300px; max-height: 150px"
              />
            </template>
            <p op60>Lenovo Go Package</p>
          </n-card>
          <!-- </div> -->
          <div class="blank"></div>
          <div class="blank"></div>
          <div class="blank"></div>
          <div class="blank"></div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { defineComponent,ref } from "vue";
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()

let dataRef=[
  {
    title: "Lenovo Go Mouse",
    content: "Lenovo Go Mouse",
    img: "http://192.168.50.46/images/go_mouse.png"
  },
  {
    title: "Lenovo Go Speak",
    content: "Lenovo Go Speak",
    img: "http://192.168.50.46/images/go_speak.png"
  },
  {
    title: "Lenovo Go Keyboard",
    content: "Lenovo Go Keyboard",
    img: "http://192.168.50.46/images/go_keyboard.png"
  },
  {
    title: "Lenovo Go Package",
    content: "Lenovo Go Package",
    img: "http://192.168.50.46/images/go_package.png"
  },
]
</script>

<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .n-card {
    width: 300px;
    flex-shrink: 0;
    margin: 10px 0;
    cursor: pointer;
    &:hover {
      box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017;
    }
  }
  .blank {
    width: 300px;
    height: 0;
  }
}
</style>
