<template>
  <div>
    <n-card>
   <n-data-table :columns="columns" :data="data"  />

    <n-form ref="formRef" :model="model" :rules="rules2">
    <n-grid embedded :cols="24" :x-gap="24" content-style="padding: 24px;">
    <n-form-item-gi :offset="6">
          <n-button
            
            round
            type="primary"
            @click="add_line"
          >
            添加一行
          </n-button>
          
    </n-form-item-gi>
    <n-form-item-gi :offset="6">
          <n-button
            
            round
            type="primary"
            @click="add_user()"
          >
            确定添加用户
          </n-button>
          <n-button
            
            round
            type="primary"
            @click="out_put_userInfo()"
          >
            Test
          </n-button>
    </n-form-item-gi>
    </n-grid>
  </n-form>
  </n-card>
  </div>
</template>

<script>
import { h, defineComponent, ref,computed } from 'vue'
import { NInput,NSelect,NAutoComplete } from 'naive-ui'
// import { defAxios as defaxios} from '@/utils//http'
import { getToken } from '@/utils/token'
import axios from 'axios'
import { useUserStore } from '@/store/modules/user'
const baseURL= import.meta.env.VITE_APP_GLOB_BATA_API
const userStore=useUserStore()
const createData = () => [
  {
    key: null,
    name: null,
    // age: '32',
    working_location: null,
    is_pm:null,
    email:null

  },
  
]
const working_location_options= ["上海", "北京", "深圳", "武汉"].map((v) => ({
        label: v,
        value: v
      }))
const email_back_options= ['@gmail.com', '@163.com', '@qq.com', '@lenovo.com'].map((v) => ({
        label: v,
        value: v
      }))
// const axios=defAxios()
export default defineComponent({
  setup () {
    const data = ref(createData())
    return {
      data: data,
      columns: [
        {
          title: '名字',
          key: 'name',
          render (row, index) {
            return h(NInput, {
              value: row.name,
              placeholder:"请输入名字",
              onUpdateValue (v) {
                data.value[index].name = v
              }
            })
          }
        },
        {
          title: '工作地点',
          key: 'working_location',
          render (row, index) {
            return h(NSelect, {
              value: row.working_location,
              options:working_location_options,
              placeholder:'',
              value:'深圳',
              onUpdateValue (v) {
                data.value[index].working_location = v
              }
            })
          }
        },
        {
          title: 'Email',
          key: 'email',
          render (row, index) {
            return ('div',{},[
              h(NInput, {
              value: row.email_front,
              style:'width:70%;float:left',
              placeholder:"请输入邮箱,无需后缀",
              onUpdateValue (v) {
                data.value[index].email = v
              }
            }),
            h(NSelect,{
              value: row.email_back,
              style:'width:30%;max-width:30%;float:right',
              placeholder:'',
              value:'@lenovo.com',
              options:email_back_options,
              onUpdateValue (v) {
                data.value[index].email_back = v
              }
            })
            ])

          }
        },
        {
          title: '是否PM',
          key: 'is_pm',
          render (row, index) {
            return h(NSelect, {
              value: row.is_pm,
              value:'是',
              placeholder:'',
              options:[{
                  label: '是',
                  value: 'yes'
                },
                {
                  label: '否',
                  value: 'no'
                }],
              onUpdateValue (v) {
                data.value[index].is_pm = v
              }
            })
          }
        }
      ],
      pagination:{ 
        pageSize: 10
      },
      add_line(){
        data.value.push({
          key: null,
          name: null,
          // age: null,
          working_location: null,
          is_pm:null,
          email:null
        })
      },
      add_user(){
        const token='JWT '+getToken()
        const instance=axios.create()
         instance({
            // url: 'http://192.168.50.46:5000/flask_test',
            url: baseURL+'/getUserInfo',
            method: 'post',
            data:{'user':'user'},
            headers: {
              "Content-type":"application/json",
              "Authorization":token
            }
          
         })
         .then((res)=>{
           console.log(res)
         })
      },
      out_put_userInfo(){
        const name=userStore.name
        const role=userStore.role
        const username = userStore.username
        const userID = userStore.userId
        console.log(name,role,username,userID)
      }
    }
  }
})
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
  .from_class {
    margin: 10px;
  }
}
</style>
