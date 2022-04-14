<template>
  <div>
     <n-card
      style="width: 100%;height: 100%;"
      title="修改密码"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
    <n-form ref="formRef" :model="model" :rules="rules2">
      <n-grid embedded  :cols="24" :x-gap="24" content-style="padding: 24px;">
     <n-form-item-gi :offset="2" :span="16" path="password" label="原密码">
      <n-input
        v-model:value="model.oldpassword"
        type="password"
        @input="handlePasswordInput"
        @keydown.enter.prevent
        placeholder="请输入旧密码"
      />
    </n-form-item-gi>
      <n-form-item-gi :offset="2" :span="16" path="newpassword" label="新密码">
      <n-input
        v-model:value="model.newpassword"
        type="password"
        @input="handlePasswordInput"
        placeholder="请输入新密码"
        @keydown.enter.prevent
      />
    </n-form-item-gi>
    <n-form-item-gi
      ref="rPasswordFormItemRef"
      :offset="2"
      :span="16"
      first
      path="reenteredPassword"
      label="重复密码"
    >
      <n-input
        v-model:value="model.reenteredPassword"
        :disabled="!model.newpassword"
        type="password"
        @keydown.enter.prevent
        placeholder="请再次输入新密码"
      />
    </n-form-item-gi>
    <n-form-item-gi :offset="8">
          <n-button
            :disabled="model.newpassword === null"
            round
            type="primary"
            @click="handleValidateButtonClick"
          >
            确定修改
          </n-button>
    </n-form-item-gi>
    </n-grid>
    </n-form>
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
    const updateDisabled=ref(false)
    const optionsRef = ref([])
    const loadingRef = ref(false)
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
    function validatePasswordStartWith(rule, value) {
      return !!userModelRef.value.newpassword && userModelRef.value.newpassword.startsWith(value) && userModelRef.value.newpassword.length >= value.length;
    }
    function validatePasswordSame(rule, value) {
      return value === userModelRef.value.newpassword;
    }
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
    return {
      formRef,
      rPasswordFormItemRef,
      model: userModelRef,
      showModal,
      rules,
      rules2,
      loading:loadingRef,
      options:optionsRef,
      updateDisabled: ref(true),
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
