<template>
<div style="height: 1000px;margin-top:20px; ">
<div  style="width: 90%;height: 250px;display:flex;background-color: white; margin:0 auto;">
  
</div>

<n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="提交Issue"
    style="min-width:600px;max-width:800px"
  >
<n-card >
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
    <n-form-item label="标题" path="inputValue">
      <n-input v-model:value="model.inputValue" placeholder="请输入标题"/>
    </n-form-item>
    <n-form-item label="问题等级" path="selectValue">
      <n-select
        v-model:value="model.selectValue"
        placeholder="请选择问题等级"
        :options="levetOptions"
      />
    </n-form-item>
    <n-form-item label="模块选择" path="multipleSelectValue">
      <n-dynamic-tags v-model:value="model.tags" />
    </n-form-item>
    <n-form-item label="问题描述" path="textareaValue">
      <n-input
        v-model:value="model.textareaValue"
        placeholder="请输入问题描述"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      />
    </n-form-item>
    <n-form-item label="前置条件" path="textareaValue">
      <n-input
        v-model:value="model.textareaValue"
        placeholder="请输入前置条件"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      />
    </n-form-item>
    <n-form-item label="复现步骤" path="textareaValue">
      <n-input
        v-model:value="model.textareaValue"
        placeholder="请输入复现步骤"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      />
    </n-form-item>
    
 <n-form-item label="附件" path="file_list">
  <n-upload
            :action="upload_file"
            :headers="{
              'Authorization': tokens()
            }"
            
          >
    <n-button>上传附件</n-button>
  </n-upload>
    </n-form-item>
    
    <n-space style="display: flex; justify-content: flex-end">
        <n-button round type="tertiary" @click="onNegativeClick">
            清空内容
        </n-button>
            <n-button round type="tertiary" @click="onNegativeClick">
            取消
        </n-button>
        <n-button round type="primary" @click="handleValidateButtonClick">
            提交
        </n-button>
    </n-space>
  </n-form>
</n-card>

  </n-modal>
<!-- <div style="width: 90%;display:flex;background-color: white; margin:0 auto;margin-top:30px;bottom: 10px;">
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :row-props="rowProps"/>

</div> -->
<div style="width: 90%;display:flex;background-color: white; margin:0 auto;margin-top:30px;bottom: 10px;padding: 15px;">
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :row-props="rowProps" ellipsis='true' :row-keys='rowKey' />

</div>

</div>
</template>
<script>
import { defineComponent, ref,onMounted,nextTick,h ,onUnmounted,reactive } from "vue";
import { useMessage,NButton,NTag,NDropdown,NEllipsis } from "naive-ui";
import {CloseCircle} from '@vicons/ionicons5'
import {getToken} from '@/utils/token'
import { stringify } from "json5";


export default defineComponent({

        setup (props,context) {
            const message = useMessage();

            const token = 'JWT ' + getToken()
           
            return {
                show:true,
                tokens(){
                    return token
                }
                
            }
        }

    })

</script>
<style scoped>
.FormDesc{
  background-color: white;
  min-width: 500px;
  margin-bottom: 10px;
}
.DescArea{
  background-color:#FAFAFA;
  max-width:90%;
  height:120%;
  margin:auto;
  border:1px solid #ebebeb;

}
.DescTitle{
    text-align: center;
    font-size: 16px;
    line-height: 44px;
    margin-top: 7px;
}
.DeasText{
    padding-bottom: 20px;
}
.N1:before{
  background-color:#eb5a3c;
}
.N2:before{
  background-color:#FFC402;
}
.N3:before{
  background-color:#7264BC;
}
.N4:before{
  background-color:#22A4E5;
}
.N5:before{
  background-color:#00C185;
}
.VSquare:before{
  content: '';
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-right: 10px;
  border-radius: 2px;
  position: relative;
  top: 1px;
}
.N1,.N2,.N3,.N4,.N5{
  padding-left: 120px;
  line-height:26px;
  margin-right: 48px;
}
.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}
.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
.card-frame{
    width: 90%;height: 270px;display:flex;background-color: white; margin:0 auto;margin-top:30px;overflow: hidden;
}
.card-frame2{
    width: 90%;height: 450px;display:flex;background-color: white; margin:0 auto;margin-top:30px
}
</style>