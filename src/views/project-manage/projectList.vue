<template>
  <div>

    <div p15 flex>
      <n-card title="项目" size="small" :segmented="true">
        <template #header-extra>
          <n-button text type="primary" @click="router.push('/project/project_list')">更多</n-button>
        </template>
        <div class="card-list">
          <div v-for="i in dataRef" @click="push_id(i.id)">
          <!-- <n-card  :key="i" :title=i.title size="small">
            <template #cover>
              <img
                :src=i.img
                style="max-width: 300px; max-height: 150px"
              />
            </template>
            <p op60>{{i.content}}</p>
          </n-card> -->
          <n-card  :key="i" :title="i.title" size="small" 
          header-style="-webkit-line-clamp: 1;display:-webkit-box;-webkit-box-orient: vertical;overflow: hidden;line-height:2.2em">
            <template #cover>
              <img
                :src="i.img"
                style="max-width: 300px; max-height: 150px"
              />
            </template>
            <p op60 style="-webkit-line-clamp: 1;display:-webkit-box;-webkit-box-orient: vertical;overflow: hidden;">{{i.content}}</p>
          </n-card>
          <!-- <n-card  :key="i" title="Lenovo Go Speaker" size="small">
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
          </n-card> -->
          </div>
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
    id:1,
    title: "Lenovo Go Mouse",
    content: "Lenovo Go Mouse",
    img: "http://192.168.50.46/images/go_mouse.jpeg"
  },
  {
    id:2,
    title: "Lenovo Go Speaker",
    content: "Lenovo Go Speaker",
    img: "http://192.168.50.46/images/go_speak.jpeg"
  },
  {
    id:3,
    title: "Lenovo Go Ergonomic Keyboard & Mouse",
    content: "Lenovo Go Ergonomic Keyboard & Mouse",
    img: "http://192.168.50.46/images/go_keyboard.jpeg"
  },
  {
    id:4,
    title: "Lenovo Go Package",
    content: "Lenovo Go Package",
    img: "http://192.168.50.46/images/go_package.jpeg"
  },
]
function push_id(id){
    router.push('/project/project_detail/?id='+id)
}
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
