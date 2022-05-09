<template>
  <div>
    <n-card>
    <n-space vertical>
      <div style="margin-left:50px;margin-top:30px;">
      <p>编辑
      <n-switch v-model:value="updateDisabled"/>
      </p>
    </div>
    <n-form
      ref="formRef"
      :model="model"
      label-placement="left"
      :label-width="160"
      :disabled="!updateDisabled"
      :style="{
        maxWidth: '600px'
      }"
    >
    <n-grid embedded  :cols="24" :x-gap="24" content-style="padding: 24px;"></n-grid>
      <n-form-item label="名字" path="inputValue">
        <n-input v-show="updateDisabled" v-model:value="model.inputValue" placeholder="请输入名字" />
        <a v-show="!updateDisabled">{{model.inputValue}}</a>
      </n-form-item>
      <n-form-item label="工作地点" path="working_location" >
        <n-select
          v-show="updateDisabled"
          v-model:value="model.working_location"
          placeholder="请选择工作地点"
          :options="working_location_options"
        />
        <a v-show="!updateDisabled">{{model.working_location}}</a>
      </n-form-item>
      <n-form-item label="头像" path="uploadValue">
        <n-avatar
        v-show="!updateDisabled"
          round
          :size="48"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
          <!-- http://localhost:3399/post_avatar -->
          <n-upload
            :action="upload_url"
            @before-upload="beforeUpload"
            v-show="updateDisabled"
          >
            <n-button>上传文件</n-button>
          </n-upload>
      </n-form-item>
      <n-form-item label="email" path="email">
        <n-auto-complete
        v-show="updateDisabled"
          v-model:value="model.email"
          :options="autoCompleteOptions"
          placeholder="邮箱"
        />
        <a v-show="!updateDisabled">{{model.email}}</a>
      </n-form-item>
      

    </n-form>

  <n-form >
    <n-grid embedded :cols="24" :x-gap="24" content-style="padding: 24px;">
    <n-form-item-gi :offset="4">
          <n-button
            :disabled="!updateDisabled"
            round
            type="primary"
            @click="comfirmModify"
          >
            确定修改
          </n-button>
    </n-form-item-gi>
    </n-grid>
  </n-form>
  </n-space>

    
  </n-card>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import {
  useMessage,useDialog
} from "naive-ui";


export default defineComponent({
  setup() {
    const formRef = ref(null);
    const rPasswordFormItemRef = ref(null);
    const showModal = ref(false);
    const message = useMessage();
    const dialog = useDialog();
    const updateDisabled=ref(true);
    const optionsRef = ref([]);
    const loadingRef = ref(false);
    const model=ref(null)
    const baseURL= import.meta.env.VITE_APP_GLOB_BATA_API
    const upload_url=baseURL+'/post_avatar'
    const userModelRef = ref({
      id:0,
      username:null,
      icon_path:null,
      email:'',
      age: null,
      name:null,
      working_location:null,
      beta_level:null,
      oldpassword: null,
      newpassword: null,
      reenteredPassword: null,
      user_state:true,
      beta_count:null,
    });
    const rules = {
      age: [
        {
          required: true,
          validator(rule, value) {
            if (!value) {
              return new Error("需要年龄");
            } else if (!/^\d*$/.test(value)) {
              return new Error("年龄应该为整数");
            } else if (Number(value) < 18) {
              return new Error("年龄应该超过十八岁");
            }
            return true;
          },
          trigger: ["input", "blur"]
        }
      ],}
    const rules2={
      oldpassword: [
        {
          required: true,
          message: "请输入密码"
        }
      ],
      newpassword: [
        {
          required: true,
          message: "请输入密码"
        }
      ],
      reenteredPassword: [
        {
          required: true,
          message: "请再次输入密码",
          trigger: ["input", "blur"]
        },
        {
          validator: validatePasswordStartWith,
          message: "两次密码输入不一致",
          trigger: "input"
        },
        {
          validator: validatePasswordSame,
          message: "两次密码输入不一致",
          trigger: ["blur", "password-input"]
        }
      ]
    };
    function validatePasswordStartWith(rule, value) {
      return !!userModelRef.value.newpassword && userModelRef.value.newpassword.startsWith(value) && userModelRef.value.newpassword.length >= value.length;
    }
    function validatePasswordSame(rule, value) {
      return value === userModelRef.value.newpassword;
    }
    
    return {
      formRef,
      rPasswordFormItemRef,
      model: userModelRef,
      showModal,
      rules,
      rules2,
      loading:loadingRef,
      options:optionsRef,
      upload_url:upload_url,
      updateDisabled: ref(false),
      working_location_options: ["上海", "北京", "深圳", "武汉"].map((v) => ({
        label: v,
        value: v
      })),
      handlePasswordInput() {
        if (userModelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
        }
      },
      handleValidateButtonClick(e) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success("验证成功");
          } else {
            console.log(errors);
            message.error("验证失败");
          }
        });
      },
      async beforeUpload (data){
        if (data.file.file?.type !== 'image/png') {
          message.error('只能上传png格式的图片文件，请重新上传')
          return false
        }
        return true
      },
      comfirmModify(){},
      autoCompleteOptions: computed(() => {
        return ['@gmail.com', '@163.com', '@qq.com', '@lenovo.com'].map((suffix) => {
          const prefix = userModelRef.value.email.split('@')[0]
          return {
            label: prefix + suffix,
            value: prefix + suffix
          }
        })
      })
    };
  }
});
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
