<template>
  <n-form
    ref="formRef"
    :model="rowData"
    :rules="rules"
    :size="size"
    label-placement="left"
  >
    <n-grid :cols="24" :x-gap="24">
      <n-form-item-gi :span="20" label="标题: " path="title">
         <n-ellipsis >
          {{rowData.Title}}
        </n-ellipsis>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Textarea" path="textareaValue">
        <n-input
          v-model:value="rowData.textareaValue"
          placeholder="Textarea"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 5
          }"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Select" path="selectValue">
        <n-select
          v-model:value="rowData.selectValue"
          placeholder="Select"
          :options="generalOptions"
        />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="Multiple Select"
        path="multipleSelectValue"
      >
        <n-select
          v-model:value="rowData.multipleSelectValue"
          placeholder="Select"
          :options="generalOptions"
          multiple
        />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Datetime" path="datetimeValue">
        <n-date-picker v-model:value="model.datetimeValue" type="datetime" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Switch" path="switchValue">
        <n-switch v-model:value="model.switchValue" />
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="Checkbox Group"
        path="checkboxGroupValue"
      >
        <n-checkbox-group v-model:value="model.checkboxGroupValue">
          <n-space>
            <n-checkbox value="Option 1">
              Option 1
            </n-checkbox>
            <n-checkbox value="Option 2">
              Option 2
            </n-checkbox>
            <n-checkbox value="Option 3">
              Option 3
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Radio Group" path="radioGroupValue">
        <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup1">
          <n-space>
            <n-radio value="Radio 1">
              Radio 1
            </n-radio>
            <n-radio value="Radio 2">
              Radio 2
            </n-radio>
            <n-radio value="Radio 3">
              Radio 3
            </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item-gi>
      <n-form-item-gi
        :span="12"
        label="Radio Button Group"
        path="radioGroupValue"
      >
        <n-radio-group v-model:value="model.radioGroupValue" name="radiogroup2">
          <n-radio-button value="Radio 1">
            Radio 1
          </n-radio-button>
          <n-radio-button value="Radio 2">
            Radio 2
          </n-radio-button>
          <n-radio-button value="Radio 3">
            Radio 3
          </n-radio-button>
        </n-radio-group>
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Time Picker" path="timePickerValue">
        <n-time-picker v-model:value="model.timePickerValue" />
      </n-form-item-gi>



      <n-gi :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button round type="primary" @click="handleValidateButtonClick">
            验证
          </n-button>
        </div>
      </n-gi>
    </n-grid>
  </n-form>

</template>

<script>
import { defineComponent, ref,defineProps } from "vue";
import { useMessage ,NEllipsis} from "naive-ui";
export default defineComponent({
  props:{
    rowData:{
      type:Object,
      default:{}
    },
    aFrom:{
      type:Boolean
    }
  },
  setup(props,context) {
    const formRef = ref(null);
    const message = useMessage();
    return {
      formRef,
      size: ref("medium"),
      model: ref({}),
      aFrom:props.aFrom,
      rowData:props.rowData,
      props:props,
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