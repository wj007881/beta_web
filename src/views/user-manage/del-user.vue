<template>
  <div>
    <n-card>
   <n-space vertical >
    <n-space justify="end">
      <n-grid :cols="5" responsive>
        <n-grid-item :offset="0">
          <n-input round clearable :on-input="filterName" :on-clear="unfilterName" placeholder="搜索名字">
          </n-input>
        </n-grid-item>
        <n-grid-item :offset="3">
         <n-button class="disbutton">批量禁用</n-button>
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
import { defineComponent, h, reactive,ref } from "vue";
import { NSwitch,NTag } from "naive-ui";

const data = [
  {
    id: 0,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ['nice', 'developer'],
    state:true
  },
  {
    id: 1,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ['nice', 'tester'],
    state:true
  },
  {
    id: 2,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: [],
    state:true
  },
  {
    id: 3,
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
    tags: [],
    state:false
  }
];
// const data=ref([])
export default defineComponent({
  setup() {
    const checkedRowKeysRef = ref([])
    const Nsloading = reactive({ title: false })
    const handleSwitchChange=(val,state)=>{
      Nsloading.title=true
      setTimeout(()=>{
        console.log(data[val].state)
        if(data[val].state==false){
          data[val].state=true
        }
        else if(data[val].state==true){
          data[val].state=false
        }
        console.log(data[val].state)
        Nsloading.title=false
        
      },1000)
    }
    // const addr_options=reactive({
    const options=()=>{
      let addr=[]
      let addr2=[]
      for(let i=0;i<data.length;i++){
        if(addr.indexOf(data[i].address)){
          addr.push(data[i].address)
          addr2.push({
            label:data[i].address,
            value:data[i].address
          })
        }
      }
      console.log(addr2)
      return addr2
    }
    const switchRef=(row)=>{
      if(row.state=='able'){

        return false
      }
      else{

        return true
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
      width: 100,
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
                loading:Nsloading.title,
                disabled:Nsloading.title,
                'checked-value':row.state,
                onUpdateValue: () => {
                  handleSwitchChange(index)
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
    return {
      data,
      columns,
      Nsloading:Nsloading,
      checkedRowKeys: checkedRowKeysRef,
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
        console.log(checkedRowKeysRef.value)
      }
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
