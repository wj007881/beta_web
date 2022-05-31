<template>
<div style="height: 1000px;margin-top:20px; ">
<div  style="width: 90%;height: 250px;display:flex;background-color: white; margin:0 auto;">
  <div  style="width: 50%;height: 250px;display: inline-block;text-align:center;margin:0 auto;">
  <img src="@/assets/images/go_package.jpeg" style="width:150px;margin-top: 20%;">
  <br/>
  <a>标题</a>
  </div>
  <div style="
	height: 80%;
	width: 4px;
	margin: 0 auto;
	background-color: #e2e2e2;
    margin-top:2%
"></div>
  <div id="echarts168" style="width: 150%;height: 250px;" v-if="isShowEcharts"></div>
</div>
<div style="width: 90%;display:flex;background-color: white; margin:0 auto;margin-top:30px;bottom: 10px;">
  <n-collapse>
    <n-collapse-item title="评级说明"  >
      <div class = "FormDesc">
      <div class = "DescArea">
        <p class = "DescTitle">Bug评级说明</p>
        <div class = "DeasText">
          <p><span class = "N1 VSquare">致命</span>程序无法正常运行或程序无法跑通-无法正常启动、异常退出、crash、资源不足、死循环、崩溃或严重资源不足</p>
          <p><span class = "N2 VSquare">严重</span>核心功能无法完成、功能报错、数据错误等，但不会影响程序运行</p>
          <p><span class = "N3 VSquare">缺陷</span>一般功能性Bug，产品中的不符合产品需求或用户使用的缺陷</p>
          <p><span class = "N4 VSquare">瑕疵</span>操作不方便，布局不合理等一类的易用性相关的缺陷</p>
          <p><span class = "N5 VSquare">建议</span>对产品的改进优化型建议</p>
        </div>
      </div>
    </div>
    </n-collapse-item>
  </n-collapse>
</div>
<!-- <div  style="width: 90%;height: 250px;display:flex;background-color: white; margin:0 auto;margin-top:30px">
  <n-grid cols="4" item-responsive responsive="screen">
    
    <n-grid-item>
    <n-layout>
      <n-layout-header style="padding: 24px;">
      <div style="background-color: #1081de:height:100%"><h3>本次测试Bug总数</h3></div>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        <div style="border:1px;margin-top:-10%;width:90%;height: 150px;background-color: #f8fcff;">
        
        </div>
      </n-layout-content>
    </n-layout>
    </n-grid-item>
    <n-grid-item span="0 m:1 l:3">
      <n-layout>
      <n-layout-header style="padding: 24px;">标题</n-layout-header>
      <n-layout-content content-style="padding: 24px;">
        内容
      </n-layout-content>
      <n-layout-content content-style="padding: 24px;">
        内容
      </n-layout-content>
    </n-layout>
    </n-grid-item>
  </n-grid>
</div> -->
<div class="card-frame" id="bug_list">
    <div style="padding:24px">
  <n-form
      ref="formRef"
      :model="model"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :size="size"
      :style="{
        maxWidth: '640px'
      }"
    >
    <n-form-item label="Bug 搜索" path="inputValue" >
        <n-space justify="start" style="min-width: 400px;">
            <n-input size='large' v-model:value="model.inputValue" placeholder="请输入标题关键字" />
            <n-button @click="cleanSearch" style="margin-top: 4px;">清除筛选
                <n-icon size="23" color="#de576d">
                    <CloseCircle />
                </n-icon>
            </n-button>
        </n-space>
    </n-form-item>
    <n-form-item label="测试评级" path="textareaValue" width="100%">
     <n-space style="min-width: 550px;">
        <n-space v-for="(i,index) in mylevel" inline="true">
        <n-button round  size="large" justify="space-between"  :type="i['type']" style="margin-right:10px" @click="filterMyLevel(i.value)">{{i.value}}</n-button>
    </n-space>


    </n-space>
    </n-form-item>
    <n-form-item label="我的评级" path="selectValue">
     <n-space v-for="(i,index) in mylevel" inline="true" >
        <n-button dashed round  size="large" justify="space-between"  :type="i['type']" style="margin-right:10px" @click="filterMyLevel(i.value)">{{i.value}}</n-button>
    </n-space>
    </n-form-item>
    <n-form-item label="所属模块" path="multipleSelectValue">
        
    <!-- <n-space inline="true">
        <n-dynamic-tags v-model:value="tags" size="large" :closable="false" type="info" onclick="print_tags(key)">
            <template #trigger="{ activate, disabled }" >
            <n-button style="display:none">
            </n-button>
            </template>
        </n-dynamic-tags>
    </n-space> -->
    <n-space v-for="(i,index) in tags" inline="true">
        <n-button  secondary  size="large" justify="space-between" :closable="false" type="info" style="margin-right:10px" @click="filterTags(i)">{{i}}</n-button>
    </n-space>
    </n-form-item>


  </n-form>
  </div>
</div>
<!-- <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="提交表单"
    positive-text="确认"
    negative-text="算了"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  > -->
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
<div style="width: 90%;display:flex;background-color: white; margin:0 auto;margin-top:30px;bottom: 10px;">
  <n-data-table :columns="columns" :data="data" :pagination="pagination" :row-props="rowProps" ellipsis='true' :row-keys='rowKey' />

</div>
 <n-back-top :right="40" :bottom="120">
    <div
      style="
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
    >
      <a>回到顶部</a>
    </div>
  </n-back-top>
  <n-back-top :right="40" :bottom="60" show="true">
    <div
      style="
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
      "
      @click="showModal = true"
    >
      <a >提交问题</a>
    </div>
  </n-back-top>
</div>
</template>
<script>
import { defineComponent, ref,onMounted,nextTick,h ,onUnmounted,reactive } from "vue";
import { useMessage,NButton,NTag,NDropdown,NEllipsis } from "naive-ui";
import {CloseCircle} from '@vicons/ionicons5'
import * as echarts from 'echarts'
import {getToken} from '@/utils/token'
import { stringify } from "json5";

const props = {
                    ewidth: {
                        type: Number ,
                        default: 100
                    },
                    eheight: {
                        type: Number,
                        default: 440
                    }
                }
let  setting_ID=ref(1)
export default defineComponent({
        props,
        components: {
            CloseCircle
        },
        setup (props,context) {
            const message = useMessage();
            const showModalRef = ref(false);
            const token = 'JWT ' + getToken()
            let isShowEcharts = ref(true);
            let {ewidth: nwidth, eheight: nheight} = props
            const initCharts = () => {
                console.log('init charts')
                const option = {
                    xAxis: {
                        type: 'category',
                        data: ['致命', '严重', '缺陷', '瑕疵', '建议']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                        data: [
                            {
                            value: 20,
                            itemStyle: {
                                color: '#d03050'
                            }
                            }, 
                            {
                            value: 180,
                            itemStyle: {
                                color: '#fcb040'
                            }
                            }, {
                            value: 100,
                            itemStyle: {
                                color: '#316c72'
                            }
                            }, {
                            value: 50,
                            itemStyle: {
                                color: '#4098fc'
                            }
                            }, {
                            value: 160,
                            itemStyle: {
                                color: '#00d492'
                            }
                            }],
                        type: 'bar',
                        itemStyle: {
                        normal: {
                        label: {
                            show: true, //开启显示

                            textStyle: {
                            //数值样式
                            color: 'black',
                            fontSize: 15
                            }
                        },
                        data:dataRef,
                        color: function (d) {
                            return (
                            '#' +
                            Math.floor(Math.random() * (256 * 256 * 256 - 1)).toString(16)
                            );
                        },
                        RRef:function(){
                            console.log(dataRef)
                            return dataRef
                        }
                        }
                        }
                        }
                    ]
                };
               
                const myChart = echarts.init(document.getElementById('echarts168'));
                myChart.setOption(option)
            
                window.onresize = () => {
                    myChart.resize()
                };

            }
            onMounted(() => {
                initCharts()
            })
            onUnmounted(() => {
                isShowEcharts.value = false;
            });
	  
            // 向外暴露初始化方法
            context.expose({
                initCharts
            })
            
            const dataRef=[
                {
                id:1,
                type: "error",
                content: "致命",

            },
            {
                id:2,
                type: "warning",
                content: "严重",

            }, 
            {
                id:3,
                type: "primary",
                content: "缺陷",

            }, 
            {
                id:4,
                type: "info",
                content: "瑕疵",

            },
            {
                id:5,
                type: "success",
                content: "建议",

            },
            ]
            let showsmall=true
            let setting_ID=0
            const dropOptions= [
                    {
                    label: "非常有用",
                    key: "非常有用",
                    // props: {
                    //     onClick: () => {
                    //         message.success('Good!')
                    //     }
                    // }
                    },
                    {
                    label: "一般",
                    key: "一般",
                    
                    },
                    {
                    label: "没什么用",
                    key: "没什么用",
                    
                    }
                ]
            const tagsColumns= reactive(
                {
                title: "Tags",
                key: "tags",
                sorter: (row1, row2) => row1.tags.length - row2.tags.length ,
                filterOptionValue:[],
                filter(value, row) {
                    // console.log(value)
                    return !!~row.tags.indexOf(value.toString());
                },
                render(row) {
                    const tags = row.tags.map((tagKey) => {
                    return h(NTag, {
                        style: {
                        marginRight: "6px"
                        },
                        type: "info"
                    }, {
                        default: () => tagKey
                    });
                    });
                    return tags;
                }
                }
            )
            const bugsLevelColumns= reactive(
                {
                title: "Level",
                key: "level",
                defaultSortOrder: 'ascend',
                sorter: (row1, row2) => row1.level.toString() - row2.level.toString() ,
                filterOptionValue:[],
                filter(value, row) {
                    // console.log(value)
                    return !!~row.level.indexOf(value.toString());
                },
                render(row) {
                    const level = row.level.map((tagKey) => {
                        let tag_type=''
                        if(tagKey=='致命'){
                            tag_type='error'
                        }
                        if(tagKey=='瑕疵'){
                            tag_type='info'
                        }
                        if(tagKey=='严重'){
                            tag_type='warning'
                        }
                        if(tagKey=='缺陷'){
                            tag_type='promary'
                        }
                        if(tagKey=='建议'){
                            tag_type='success'
                        }
                        return h(NTag, {
                            style: {
                            marginRight: "6px"
                            },
                            type: tag_type
                        }, {
                            default: () => tagKey
                        });
                    });
                    return level;
                }
                }
            )
            const createColumns = ({
                openDetail,set_id,handleSelect
            }) => {
            return [
                {
                title: "ID",
                key: "key",
                render(row,index){
                    return h(NEllipsis,{
                        style:"max-width:50px;min-width:30px",
                    },
                    { 
                        default: () => row.key
                        })
                }
                },
                {
                type: "expand",
                expandable: (rowData) => rowData.title !== "Jim Green",
                renderExpand: (rowData) => {
                    return `${rowData.name} is a good guy.`;
                }
                },
                {
                title: "Title",
                key: "Title",
                render(row,index){
                    return h(NEllipsis,{
                        style:"max-width:700px;min-width:300px",
                        default:row.Title,
                        value:row.title
                    },
                    { 

                        default: () => row.Title
                        })
                }
                },
                tagsColumns,
                bugsLevelColumns,
                {
                title: "Action",
                key: "actions",
                render(row,index) {
                    return h(NDropdown, {
                        options:dropOptions,
                        onSelect:handleSelect,
                        style:"min-width:100px",
                        onClick: () => set_id(row.id,index),
                        
                    }, 
                    [
                        h(NButton,{
                            id:"button"+String(index)
                        },
                        {
                            default:() =>'点击置评',
                        })
                    ]
                    );
                }
                },
                
            ];
            };
            const createData = () => [
            {
                key: 0,
                name: "John Brown",
                Title: "New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park",
                tags:  (["外观", "性能","舒适度"]),
                level:(["致命"])
            },
            {
                key: 1,
                name: "Jim Green",
                Title: "London No. 1 Lake Park",
                tags:  (["性能"]),
                level:(["瑕疵"])
            },
            {
                key: 2,
                name: "Joe Black",
                Title: "Sidney No. 1 Lake Park",
                tags:  (["舒适度"]),
                level:(["严重"])
            }
            ];
            const rowSelect=ref([])
            const dpSelect=ref('')
            const seletionID=ref('0')
            const rowIndex=ref('0')
            return {
                nwidth,
                nheight,
                show:true,
                dataRef:dataRef,
                showsize:250,
                isShowEcharts,
                showModal: showModalRef,
                data: createData(),
                rowKey:(row) => row.key,
                CloseCircle,
                tags: ref(["外观", "性能","舒适度"]),
                levetOptions:["致命", "严重", "缺陷", "瑕疵","建议"].map((v) => ({
                        label: v,
                        value: v
                    })),
                formValue: ref({
                    user: {
                    name: '',
                    age: ''
                    },
                    phone: ''
                }),
                mylevel: ref([{
                    value:"致命",
                    type:"error"
                }, 
                {
                    value:"严重",
                    type:"warning"
                },
                {
                    value:"缺陷",
                    type:"primary"
                },
                {
                    value:"瑕疵",
                    type:"info"
                },
                {
                    value:"建议",
                    type:"success"
                }]),
                model: ref({
                    inputValue: null,
                    textareaValue: null,
                    selectValue: null,
                    tags: ref(["外观", "性能","舒适度"]),
                    level:null,
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
                setting_ID:setting_ID,
                rowProps: (row) => {
                    return {
                    style: 'cursor: pointer;',
                    onClick: () => {
                        // message.info(stringify(row))
                        rowSelect.value=stringify(row)
                        // message.info(rowSelect.value)
                    }
                    }
                },
                columns: createColumns({
                    set_id(id,index) {
                        seletionID.value=parseInt(id) 
                        rowIndex.value=parseInt(index)
                        console.log(seletionID.value,dpSelect.value,rowIndex.value)
                        const buttonID='button'+String(index)
                        document.getElementById('button'+String(index)).innerHTML=dpSelect.value
                        if(dpSelect.value!=''){
                            document.getElementById('button'+String(index)).style.setProperty('border','1px #ff6342 solid')
                            document.getElementById('button'+String(index)).style.setProperty('background-color','#ff6342')
                        }
                        
                    },
                    handleSelect(key){
                        dpSelect.value=String(key)
                    },
                    openDetail(rowData){
                        console.log(rowData.index==rowIndex.value)
                        if(rowData.index==rowIndex.value){
                            return true
                        }
                        else{
                            return false
                        }
                    }
                }),
                pagination: {
                    pageSize: 10
                },
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
                sel_p(type){
                    console.log(type)
                },
                print_tags(tagKey){
                    console.log(tagKey)
                },
                filterTags(value){
                    if(tagsColumns.filterOptionValue==[]){
                        tagsColumns.filterOptionValue.push(value)
                    }
                    else if(tagsColumns.filterOptionValue.indexOf(value)==-1){
                        tagsColumns.filterOptionValue.push(value);
                    }
                    else if(tagsColumns.filterOptionValue.indexOf(value)!=-1){
                        tagsColumns.filterOptionValue=tagsColumns.filterOptionValue.sort()
                        for (let i=0;i<tagsColumns.filterOptionValue.length;i++){
                            if(tagsColumns.filterOptionValue[i]==value){
                                tagsColumns.filterOptionValue.pop(i)
                            }
                        } 
                    }
                    // console.log(tagsColumns.filterOptionValue)
                    //  tagsColumns.filterOptionValue=value
                },
                filterMyLevel(value){
                    if(bugsLevelColumns.filterOptionValue==[]){
                        bugsLevelColumns.filterOptionValue.push(value)
                    }
                    else if(bugsLevelColumns.filterOptionValue.indexOf(value)==-1){
                        bugsLevelColumns.filterOptionValue.push(value);
                    }
                    else if(bugsLevelColumns.filterOptionValue.indexOf(value)!=-1){
                        bugsLevelColumns.filterOptionValue=bugsLevelColumns.filterOptionValue.sort()
                        for (let i=0;i<bugsLevelColumns.filterOptionValue.length;i++){
                            if(bugsLevelColumns.filterOptionValue[i]==value){
                                bugsLevelColumns.filterOptionValue.pop(i)
                            }
                        } 
                    }
                    // console.log(tagsColumns.filterOptionValue)
                    //  tagsColumns.filterOptionValue=value
                },
                cleanSearch(){
                    bugsLevelColumns.filterOptionValue=[];
                    tagsColumns.filterOptionValue=[];
                },
                onNegativeClick() {
                    message.success("Cancel");
                    showModalRef.value = false;
                },
                onPositiveClick() {
                    message.success("Submit");
                    showModalRef.value = false;
                },
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