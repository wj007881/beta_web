<template>
 <n-dropdown :options="options" @select="handleSelect">
  <div class="lang-icon">
    <n-icon :component="LanguageFilled" size="40">
      
    </n-icon>
    </div>
  </n-dropdown>
</template>

<script>
import {LanguageFilled} from '@vicons/material'
import { zhCN, dateZhCN } from 'naive-ui'
import { defineComponent, ref } from "vue";
// import { zhCN, dateZhCN } from "naive-ui";
const options = [
  {
    label: '中文',
    key: 'chinese',
  },
  {
    label: 'English',
    key: 'english',
  },
]
export default defineComponent({
  setup() {
    return {
      zhCN,
      dateZhCN,
      LanguageFilled,
      options:options,
      locale: ref(null),
      dateLocale: ref(null),
      handleSelect(key) {
            if (key === 'chinese') {
                () => {
                        locale = zhCN
                        dateLocale = dateZhCN
                    }
            } else if (key === 'english') {
                () => {
                        locale = null
                        dateLocale = null
                    }
            }
        }
    };
  }
});



</script>
<style>
.lang-icon { 
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: -70%;
}
</style>
