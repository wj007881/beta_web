<template>
  <div>
    <n-card>
   <n-space vertical :size="12">
    <n-space>
      <!-- <n-button @click="filterAddress">
        Filter Address(Use Value 'London')
      </n-button>
      <n-button @click="unfilterAddress">
        Clear Address Filters
      </n-button> -->
      <n-input round clearable :on-input="filterName" :on-clear="unfilterName" placeholder="搜索名字">
      </n-input>
      <!-- <n-input round clearable :on-change="filterAddr" :on-clear="clearinput" placeholder="搜索位置">

      </n-input> -->
    </n-space>
    <n-data-table
      :columns="columns"
      :data="data"
      :pagination="pagination"
      @update:filters="handleUpdateFilter"
    />
  </n-space>
  </n-card>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";


const data = [
  {
    key: 0,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    state:'able'
  },
  {
    key: 1,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    state:'disable'
  },
  {
    key: 2,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    state:'able'
  },
  {
    key: 3,
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
    state:'disable'
  }
];

export default defineComponent({
  setup() {
    const nameColumn = reactive({
        title: "Name",
        key: "name",
        filterMultiple: false,
        filterOptionValue: null,
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
      sorter: "default",
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
    })
    const columns = reactive([
      nameColumn,
      {
        title: "Age",
        key: "age",
        sorter(rowA, rowB) {
          return rowA.age - rowB.age;
        }
      },
      addressColumn,
      disableColumn
    ]);
    return {
      data,
      columns,
      pagination: { pageSize: 5 },
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
</style>
