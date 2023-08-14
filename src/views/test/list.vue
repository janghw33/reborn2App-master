<template>
  <BasePage :page-context="pageContext">
    <BaseList :list-context="listContext">      
      <template #cell-lendChrgeCl="{ row }">
        {{ row.lendChrgeCl.lendChrgeClNm }}
      </template>
      <template #cell-insrncChrgeCl="{ row }">
        {{ row.insrncChrgeCl.insrncChrgeClNm }}
      </template>
    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import BasePage, { IPageContext } from '@/components/rebornNew/BasePage.vue';
  import BaseList, { IListContext } from '@/components/rebornNew/BaseList.vue';
  import { Code } from '@/enums'
  import ApiService from '@/core/services/ApiService';
  import View from './view.vue'

  const view = ref<InstanceType<typeof View>>()
  const pageContext: IPageContext = reactive({
    pageTitle: 'test',
    breadcrumbs: ['a', 'b'],
    onLoad() {
      listContext.onReload?.()
    }
  })
  const listContext: IListContext = reactive({
    listData: [],
    headers: [
      { name: "거래처코드", key: "bcncCode", width: 200, sortable: true },
      { name: "거래처명", key: "bcncNm", sortable: true },
      { name: "구분", key: "bcncSeCode", width: 100, sortable: true, groupCode: 'SYSM009' },
      { name: "대여요금 유형", key: "lendChrgeCl", width: 150, sortable: true },
      { name: "보험요금 유형", key: "insrncChrgeCl", width: 150, sortable: true },
      { name: "할인적용 등급", key: "bcncGradCode", width: 150, sortable: true, groupCode: Code.CUST002 },
      { name: "주말구분", key: "wkendDfkSeValue", width: 100, sortable: true },
      { name: "등록일시", key: "frstRegistDt", width: 200, sortable: true },],
    perPage: 17,
    search: {
      buttons: {
        isAdd: true
      }      
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    },
    onAddClick() {
      view.value?.formContext.modal?.openAdd?.()
    },
    onSearch(searchFilter) {
      const params = { search: searchFilter }
      ApiService.get("bcnc/search", params).then(({data}) => {            
        listContext.listData = data.data
      })
    },
    onReload() {
      ApiService.get("bcnc").then(({data}) => {            
        listContext.listData = data.data
      })
    },
  })

    
</script>