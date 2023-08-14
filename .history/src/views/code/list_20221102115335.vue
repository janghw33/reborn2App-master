<!--
  created: 장형욱
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button>

      </template> 
    </BaseList>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import Input from '@/components/reborn/Input.vue'
  import type { IPrintConfig } from '@/components/reborn/BasePrint.vue'
  import { Code } from '@/enums'

  const models = reactive<any>({
    data : [],
  })

  const pageContext = reactive<IPageContext>({
    pageTitle: '기초자료',
    breadcrumbs: ['각종 코드관리'],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "코드명", key: "codeNm", sortable: true, width: 300 },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd:true,
      },
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.get("code/CUST002", params).then(({data}) => {
        models.data = data.data;
      
      })
    },
    onListView() {
      return false
    },
    onAddClick() {
    }
  })
  </script>

  <style scoped>
  .active {
    background-color: bisque
  }
  </style>
  
