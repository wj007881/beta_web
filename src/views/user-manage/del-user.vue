<template>
  <div>
    <n-card>
   <n-space vertical >
    <n-space justify="end">
      <n-grid :cols="7" responsive>
        <n-grid-item :offset="0">
          <n-input round clearable :on-input="filterName" :on-clear="unfilterName" placeholder="搜索名字">
          </n-input>
        </n-grid-item>
        <n-grid-item :offset="3">
         <n-button class="disbutton" @click="dis_account('False')">批量禁用</n-button>
        </n-grid-item>
        <n-grid-item :offset="1">
         <n-button class="disbutton" @click="dis_account('True')">批量启用</n-button>
        </n-grid-item>
      </n-grid>
    </n-space>

    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @update:filters="handleUpdateFilter"
      :scroll-x="1800"
      :row-key="row => row.id"
      @update:checked-row-keys="handleCheck"
    />
  </n-space>
  </n-card>
  </div>
</template>

<script>
import { defineComponent, h, reactive,ref,onMounted } from "vue";
import { NSwitch,NTag } from "naive-ui";
import {defAxios} from '@/utils/http/index';
import axios from "axios";
import { getToken } from "@/utils/token";
import { stringify } from "json5";
const baseURL= import.meta.env.VITE_APP_GLOB_BATA_API
// let data = [
//   {
//     id: 0,
//     name: "John Brown",
//     age: 32,
//     address: "New York No. 1 Lake Park",
//     tags: ['nice', 'developer'],
//     state:true
//   },
//   {
//     id: 1,
//     name: "Jim Green",
//     age: 42,
//     address: "London No. 1 Lake Park",
//     tags: ['nice', 'tester'],
//     state:true
//   },
//   {
//     id: 2,
//     name: "Joe Black",
//     age: 32,
//     address: "Sidney No. 1 Lake Park",
//     tags: [],
//     state:true
//   },
//   {
//     id: 3,
//     name: "Jim Red",
//     age: 32,
//     address: "London No. 2 Lake Park",
//     tags: [],
//     state:false
//   }
// ];
let dataRef=ref([])

export default defineComponent({
  setup() {
    const checkedRowKeysRef = ref([])
    const Nsloading = reactive({ loading: false })
    const change_state=async(id,state)=>{
      let user_state={
        'state':state,
        'id':id
      }
      const as= defAxios({
        url: baseURL+'/change_user_state',
            method: 'post',
            headers: {
              "Content-type": "application/json"
            },
            data:{
              "id":user_state.id,
              "state":user_state.state
            }
        })
        await as.then((res)=>{
              if(res.status_code==200){
                user_state.state='True'
              }
            })
        await as.catch(()=>{
              user_state.state='False'
            })
        
        return user_state

        
    }
    const handleSwitchChange=(row,index)=>{
      Nsloading.loading=true
      setTimeout(async()=>{
        // console.log(dataRef.value[index].state)
        if(dataRef.value[index].state=='False'){
          const req=await change_state(row.id,"True")

          dataRef.value[index].state=req.state
          Nsloading.loading=false
        }
        else if(dataRef.value[index].state=='True'){
          const req=await change_state(row.id,"False")
          // console.log(req)
          dataRef.value[index].state=req.state
          Nsloading.loading=false
      }
        
        
      },1000)
    }
    // const addr_options=reactive({
    const options=()=>{
      let addr=[]
      let addr2=[]
      console.log('options')
      for(let i=0;i<dataRef.length;i++){
        if(addr.indexOf(dataRef[i].address)){
          addr.push(dataRef[i].address)
          addr2.push({
            label:dataRef[i].address,
            value:dataRef[i].address
          })
        }
      }
      console.log(addr2)
      return addr2
    }
    const switchRef=(row)=>{
      if(row.state=='True'){

        return true
      }
      else{

        return false
      }
    }
    const nameColumn = reactive({
        title: "Name",
        key: "name",
        filterMultiple: false,
        filterOptionValue: null,
        fixed: 'left',
        width: 50,
        sorter(rowA, rowB) {
          return rowA.name.length - rowB.name.length;
        },
        filter(value, row) {
        return !!~row.name.indexOf(value.toString());
      }
      })
    const addressColumn = reactive({
      title: "Address",
      key: "address",
      filterMultiple: false,
      filterOptionValue: null,
      filterOptions:options(),
      fixed: 'left',
      sorter: "default",
      width: 50,
      filter(value, row) {
        return !!~row.address.indexOf(value.toString());
      }
    });
    const disableColumn=reactive({
        title: "State",
        key: "state",
        filterMultiple: false,
        filterOptionValue: null,
        sorter: "default",
        fixed: 'right',
        width: 50,
        filterOptions: [
        {
          label: "disable",
          value: "disable"
        },
        {
          label: "able",
          value: "able"
        }
        ],
        filter(value, row) {
          return !!~row.address.indexOf(value.toString());
        },
    });
    const disableButton=reactive({
        title: "Action",
        key: "state",
        fixed: 'right',
        width: 30,
        render(row,index) {
          return h(
              NSwitch, 
              {
                round:false,
                loading:Nsloading.loading,
                disabled:Nsloading.loading,
                value:switchRef(row),
                onUpdateValue: () => {
                  handleSwitchChange(row,index)
                  }
              })
        },
    });
    const tagColumn=reactive({
      title: 'Tags',
      key: 'tags',
      width: 250,
      ellipsis: true,
      
      render (row) {
        if(row.tags==''){
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info'
            },
            {
              default: () => 'None'
            }
          )
        }
        const tags = row.tags.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: 'info'
            },
            {
              default: () => tagKey
            }
          )
        })
        return tags
        }
    })
    const columns = reactive([
      {
        type: 'selection',
        fixed: 'left',
      },
      nameColumn,
      addressColumn,
      tagColumn,
      // disableColumn,
      disableButton
    ]);
    const dis_account= async(state)=>{
        console.log('start')
        let success_arr=[]
        let error_arr=[]
        for(let i=0;i<checkedRowKeysRef.value.length;i++){
            console.log(checkedRowKeysRef)
            const id=checkedRowKeysRef.value[i]
            console.log(id)
            const req=await change_state(id,state)
            if(req.state==state){
              success_arr.push(req)
              dataRef.value[i].state=state
            }
            else{
              error_arr.push(req)
            }
        }
        if(error_arr==[]){
          get_data()
        }
        else{
          
        }
      }
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
          dataRef.value = res.data.user_list;
          console.log(res.data.user_list);
        }
        } 
        catch (err) {
          throw (err);
        }
    }
    onMounted(async()=>{
       await get_data()
      });
    return {
      data:dataRef,
      columns,
      Nsloading:Nsloading,
      checkedRowKeys: checkedRowKeysRef,
      change_state:change_state,
      dis_account:dis_account,
      pagination: { pageSize: 10 },
      filterName(val) {
        console.log(val)
        nameColumn.filterOptionValue = val;
      },
      filterAddr(val) {
        console.log(val)
        addressColumn.filterOptionValue = val;
      },
      unfilterName() {
        nameColumn.filterOptionValue = null;
      },
      handleUpdateFilter(filters, sourceColumn) {
        addressColumn.filterOptionValue = filters[sourceColumn.key];
      },
      handleCheck (rowKeys) {
        checkedRowKeysRef.value = rowKeys
        // console.log(checkedRowKeysRef.value)
      },
      
      
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
.disbutton{
  float: right;
  background-color:#4ba7b1;
}
</style>
