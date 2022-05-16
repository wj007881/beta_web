<template>
<div>
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
    <n-form-item label="测试时间" path="datetimeValue" >
      <n-date-picker v-model:value="model.datetimeValue" type="date" placeholder="请选择开始测试时间"/>
      <a style="font-size:30px;width: 30px;text-align: center;">-</a>
      <n-date-picker v-model:value="model.datetimeValue" type="date" placeholder="请选择结束测试时间"/>
    </n-form-item>
    
    <n-form-item label="测试人员选择" path="transferValue" >
      <n-transfer
        v-model:value="model.transferValue"
        :options="generalOptions"
        source-title="可选人员"
        target-title="已选人员"
        filterable
      />
    </n-form-item>

    <div style="display: flex; justify-content: flex-end">
      <n-button round type="primary" @click="handleValidateButtonClick">
        验证
      </n-button>
    </div>
  </n-form>
</n-card>
</n-loading-bar-provider>
</div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
export default defineComponent({
  setup() {
    const formRef = ref(null);
    const message = useMessage();
    return {
      formRef,
      size: ref("medium"),
      model: ref({
        inputValue: null,
        textareaValue: null,
        selectValue: null,
        multipleSelectValue: null,
        datetimeValue: null,
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
      generalOptions: ["groode", "veli good", "emazing", "lidiculous","groode", "veli good", "emazing", "lidiculous"].map((v) => ({
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
          message: "请输入 inputValue"
        },
        textareaValue: {
          required: true,
          trigger: ["blur", "input"],
          message: "请输入 textareaValue"
        },
        selectValue: {
          required: true,
          trigger: ["blur", "change"],
          message: "请选择 selectValue"
        },
        multipleSelectValue: {
          type: "array",
          required: true,
          trigger: ["blur", "change"],
          message: "请选择 multipleSelectValue"
        },
        datetimeValue: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "请输入 datetimeValue"
        },
        nestedValue: {
          path1: {
            required: true,
            trigger: ["blur", "input"],
            message: "请输入 nestedValue.path1"
          },
          path2: {
            required: true,
            trigger: ["blur", "change"],
            message: "请输入 nestedValue.path2"
          }
        },
        checkboxGroupValue: {
          type: "array",
          required: true,
          trigger: "change",
          message: "请选择 checkboxGroupValue"
        },
        radioGroupValue: {
          required: true,
          trigger: "change",
          message: "请选择 radioGroupValue"
        },
        radioButtonGroupValue: {
          required: true,
          trigger: "change",
          message: "请选择 radioButtonGroupValue"
        },
        inputNumberValue: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "请输入 inputNumberValue"
        },
        timePickerValue: {
          type: "number",
          required: true,
          trigger: ["blur", "change"],
          message: "请输入 timePickerValue"
        },
        sliderValue: {
          validator(rule, value) {
            return value > 50;
          },
          trigger: ["blur", "change"],
          message: "sliderValue 需要大于 50"
        },
        transferValue: {
          type: "array",
          required: true,
          trigger: "change",
          message: "请输入 transferValue"
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
      }
    };
  }
});
</script>