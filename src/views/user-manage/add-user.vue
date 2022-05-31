<template>
  <div>
    <n-loading-bar-provider>
    <n-card>
   <n-data-table :columns="columns" :data="data"  />

    <n-form ref="formRef" inline :model="model">
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
          <!-- <n-button
            
            round
            type="primary"
            @click="upload_action()"
          >
            Test
          </n-button> -->
    </n-form-item-gi>
    </n-grid>
  </n-form>
  </n-card>

  </n-loading-bar-provider>
  </div>
</template>

<script >
import { h, defineComponent, ref,computed } from 'vue'
import { NInput,NSelect,NIcon,NButton,useMessage,useLoadingBar,useDialog, NAutoComplete } from 'naive-ui'
// import { defAxios as defaxios} from '@/utils//http'
import { getToken,getUserID } from '@/utils/token'
import axios from 'axios'
import { useUserStore } from '@/store/modules/user'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { isNull } from '@/utils/is'
import { stringify } from 'json5'
import { getUser } from '@/api/user'
import { Delete16Regular } from '@vicons/fluent'

const createData = () => [
  {
    name: null,
    // age: '32',
    working_location: '深圳',
    is_pm:"否",
    email:'',
    create_state:false,
    error_msg:'',
    create_user:getUserID()
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



export default defineComponent({
  setup () {
    const data = ref(createData())
    const baseURL= import.meta.env.VITE_APP_GLOB_BATA_API
    const userStore=useUserStore()
    const message=useMessage()
    const loadingBar = useLoadingBar()
    const upload_url=baseURL+'/post_avatar'
    const dialog = useDialog();
    return {
      data: data,
      upload_url:upload_url,
      columns: [
        {
          title: '名字',
          key: 'name',
          render (row, index) {
            return h(NInput, {
              value: row.name,
              placeholder:"请输入名字",
              onBlur(v){
                if (! data.value[index].name) {
                  message.error("第"+stringify(index+1)+"行名字不能为空");
                } else if ( data.value[index].name.length > 7) {
                  message.error("第"+stringify(index+1)+"行名字最多为七个字符");
                } else if ( data.value[index].name.length < 2) {
                  message.error("第"+stringify(index+1)+"行名字最少需要两个字符");
                }
              },
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
              h(NAutoComplete, {
              value: row.email_front,
              style:'width:70%;float:left',
              placeholder:"请输入邮箱",
              options:email_back_options,
              onBlur(v){
                if (! data.value[index].email) {
                  message.error("第"+stringify(index+1)+"行邮箱不能为空");
                } else if ( data.value[index].email.length < 2) {
                  message.error("第"+stringify(index+1)+"行邮箱最少需要两个字符");
                }
              },
              onUpdateValue (v) {
                data.value[index].email = v
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
              defaultValue:false,
              placeholder:'',
              options:[{
                  label: '是',
                  value: true
                },
                {
                  label: '否',
                  value: false
                }],
              onUpdateValue (v) {
                data.value[index].is_pm = v
              }
            })
          }
        },
        {
          title: '',
          key: 'is_pm',
          render (row, index) {
            return h('div',{},[
              h(NButton,{
                type:"error",
                onClick:()=>{
                  data.value.splice(index,1)
                }
                },[
                h(NIcon,{size:'20px'},[
                  h(Delete16Regular,{size:'30px'},[])
                ])
              ])
            ])
              
            
          }
        }
      ],
      pagination:{ 
        pageSize: 10
      },
      // rules:rules,
      add_line(){
        data.value.push({
          name: null,
          working_location: null,
          is_pm:'否',
          email:null,
          create_state:false,
          create_user:getUserID()
        })
      },
      upload_action(){
        loadingBar.start()
        setTimeout(()=>{
          loadingBar.finish()
        },20000)
      },
      add_user(){
        const token='JWT '+getToken()
        // const instance=axios.create()

        //  instance({
        //     // url: 'http://192.168.50.46:5000/flask_test',
        //     url: baseURL+'/getUserInfo',
        //     method: 'post',
        //     data:{'user':'user'},
        //     headers: {
        //       "Content-type":"application/json",
        //       "Authorization":token
        //     }
          
        //  })
        //  .then((res)=>{
        //    console.log(res)
        //  })
        let add_content=''
        for (let i=0;i<data.value.length;i++){
          if(isNull(data.value[i].email)&isNull(data.value[i].name)){
            dialog.error({
              title: "批量添加出错",
              content: "请检查第"+stringify(i+1)+"行数据",
              positiveText: "确定",
              maskClosable: false,
              onMaskClick: () => {
                message.error("请查看原因后点击确认按钮");
              }
            })
            return
          }
          loadingBar.start()
          axios({
            //  url: 'http://192.168.50.46:5000/flask_test',
            url: baseURL+'/add_user',
            method: 'post',
            data:data.value[i],
            headers: {
              "Content-type":"application/json",
              "Authorization":token
            }
          })
          .then((res)=>{
            if(res.data.code==200){
              data.value[i].create_state=true
            }
            else{
              data.value[i].create_state=false
              data.value[i].error_msg=res.data.msg
              add_content+=res.data.msg+'\n'
              console.log('error')
            }
          })
          .catch(()=>{})
        }
        if(add_content!=''){
          dialog.error({
              title: "批量添加出错",
              content: add_content,
              positiveText: "确定",
              maskClosable: false,
              onMaskClick: () => {
                message.error("请查看原因后点击确认按钮");
              }
            })
        }
        else{
          setTimeout(()=>{
            loadingBar.finish()
            message.success('用户已全部添加，请通知用户登录系统使用')
          },2000)
        } 
      },
      out_put_userInfo(){
        const name=userStore.name
        const role=userStore.role
        const username = userStore.username
        const userID = userStore.userId
        console.log(name,role,username,userID)
      },
      async beforeUpload (data){
        if (data.file.file?.type !== 'image/png') {
          message.error('只能上传png格式的图片文件，请重新上传')
          return false
        }
        return true
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
