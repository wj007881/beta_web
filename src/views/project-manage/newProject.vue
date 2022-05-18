<template>
<div>
  <n-config-provider :locale="zhCN" :datelocale="dateZhCN">
  <n-loading-bar-provider>
  <n-card>
 <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging"
    :size="size"
    :style="{
      maxWidth: '640px'
    }"
  >
    <n-form-item label="产品图片" path="image">
          <n-button
            
            round
            type="primary"
            @click='upload_action()'
          >
            上传图片
          </n-button>
    </n-form-item>


    <n-form-item label="项目名称" path="inputValue">
      <n-input v-model:value="model.inputValue" placeholder="请输入项目名称"/>
    </n-form-item>
    <n-form-item label="项目简介" path="textareaValue">
      <n-input
        v-model:value="model.textareaValue"
        placeholder="请输入项目简介"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      />
    </n-form-item>
    <n-form-item label="类别" path="selectValue">
      <n-select
        v-model:value="model.selectValue"
        placeholder="请选择类别"
        :options="generalOptions"
      />
    </n-form-item>
    <n-form-item label="模块选择" path="multipleSelectValue">
      <n-select
        v-model:value="model.multipleSelectValue"
        placeholder="请选择模块"
        :options="generalOptions"
        multiple
      />
    </n-form-item>
    <n-form-item label="测试时间" path="startDatetimeValue" >
      <n-date-picker v-model:value="model.startDatetimeValue" type="date" placeholder="请选择开始测试时间"/>
      <a style="font-size:30px;width: 30px;text-align: center;">-</a>
      <n-date-picker v-model:value="model.endDatetimeValue" type="date" placeholder="请选择结束测试时间"/>
    </n-form-item>
    
    <n-form-item label="测试人员选择" path="transferValue" >
      <n-transfer
        v-model:value="model.transferValue"
        :options="dataSelection()"
        source-title="可选人员"
        target-title="已选人员"
        filterable

      />
    </n-form-item>

    <div style="display: flex; justify-content: flex-end">
      <n-button round type="primary" @click="handleValidateButtonClick">
        提交
      </n-button>
    </div>
  </n-form>
</n-card>
</n-loading-bar-provider>
</n-config-provider>
</div>
</template>

<script>
import { defineComponent, ref,onMounted,onBeforeMount } from "vue";
import { useMessage,zhCN, dateZhCN} from "naive-ui";
import {defAxios} from '@/utils/http/index';
const baseURL= import.meta.env.VITE_APP_GLOB_BATA_API
let dataRef=ref([])
export default defineComponent({
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    const get_data=async ()=>{
      try {
        const res = await defAxios({
            url: baseURL + '/get_create_user',
            method: 'post',
            headers: {
            "Content-type": "application/json"
            }
        });
        if (res.data.code != 200) {
          dataRef = '';
        }
        else {
          let data= res.data.user_list;
          // console.log(res.data.user_list);
          // return dataRef.value
          dataRef.value=data.map((v)=>({
              label:v.name,
              value:v.id
              }))

        }
        } 
        catch (err) {
          throw (err);
        }
    }
    // const dataR=await get_data()
    onMounted(async()=>{
       await get_data()
      });

    return {
      zhCN,
      dateZhCN,
      locale:ref(null),
      datelocale:ref(null),
      formRef,
      size: ref("medium"),
      model: ref({
        inputValue: null,
        textareaValue: null,
        selectValue: null,
        multipleSelectValue: null,
        startDatetimeValue: null,
        endDatetimeValue:null,
        nestedValue: {
          path1: null,
          path2: null
        },
        // switchValue: false,
        checkboxGroupValue: null,
        radioGroupValue: null,
        radioButtonGroupValue: null,
        inputNumberValue: null,
        timePickerValue: null,
        sliderValue: 0,
        transferValue: null
      }),
      // dataSelection:dataRef.value,
      generalOptions: ["groode", "veli good", "emazing", "lidiculous"].map((v) => ({
        label: v,
        value: v
      })),
      cascaderOptions: [
        {
          label: "groode",
          value: "groode",
          children: [
            {
              label: "veli good",
              value: "veli good"
            }
          ]
        }
      ],
      rules: {
        inputValue: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入项目名称"
        },
        textareaValue: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入项目简介"
        },
        selectValue: {
          required: true,
          trigger: ["blur", "change"],
          message: "请选择项目类别"
        },
        multipleSelectValue: {
          type: "array",
          required: true,
          trigger: ["blur", "change"],
          message: "请选择测试模块"
        },
        startDatetimeValue: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "请输入开始时间"
        },
        endDatetimeValue: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "请输入结束时间"
        },
        transferValue: {
          type: "array",
          required: true,
          trigger: "change",
          message: "请选择测试人员"
        }
      },
      handleValidateButtonClick(e) {
        e.preventDefault();
        console.log(dataRef.value[0])
      },
      dataSelection(){
        return dataRef.value
      }
    };
  }
});
</script>