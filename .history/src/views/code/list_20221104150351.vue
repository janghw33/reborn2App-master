<!--
  created: 장형욱
-->
<template>

  <BasePage :pageContext="pageContext">
    {{models.groupCode}}
    {{models.data}}
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
    groupCode: []
  })

  const pageContext = reactive<IPageContext>({
    pageTitle: '각종 코드관리',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "코드구분", key: "codeGroup", sortable: true, width: 300 },
      { name: "코드", key: "code", sortable: true, width: 300 },
      { name: "코드명", key: "codeNm", sortable: true, width: 300 },
      { name: "사용하지 않음", key: "codeNm", sortable: true, width: 300 },
      { name: "코드명", key: "codeNm", sortable: true, width: 300 },
      { name: "코드명", key: "codeNm", sortable: true, width: 300 },
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
      ApiService.get("code", params).then(({data}) => {
        models.groupCode= data.data
      
        selectGroupCode(models.groupCode[0])
      
      })
    },
    onListView() {
      
    },
    onAddClick() {
    }
  })

  function selectGroupCode(groupCode) {
    models.groupCode = groupCode
    ApiService.get(`code/${models.groupCode}`).then(({data}) => {
      models.data = data.data
      listContext.listData = data.data

    })
  
  }
  </script>

  <style scoped>
  .active {
    background-color: bisque
  }
  </style>
  
