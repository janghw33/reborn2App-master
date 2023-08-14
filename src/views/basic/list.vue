<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button></template>            
    </BaseList>
    <View ref="view"></View>    
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import BasePage, { IPageContext } from '@/components/rebornNew/BasePage.vue';
  import BaseList, { IListContext, ISearchFilter } from '@/components/rebornNew/BaseList.vue';
  import ApiService from '@/core/services/ApiService';
  import View from './view.vue';
  import type { IPrintConfig } from '@/components/rebornNew/BasePrint.vue';
  import { Code } from '@/enums'
  
  const models = reactive<any>({
    
  })

  const view = ref<InstanceType<typeof View>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '테스트',
    breadcrumbs: ['a', 'b'],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "거래처코드", key: "bcncCode", width: 200, sortable: true },
      { name: "거래처명", key: "bcncNm", sortable: true },
      { name: "구분", key: "bcncSeCode", width: 100, sortable: true, groupCode: Code.SYSM009 },
      { name: "대여요금 유형", key: "lendChrgeCl", width: 150, sortable: true },
      { name: "보험요금 유형", key: "insrncChrgeCl", width: 150, sortable: true },
      { name: "할인적용 등급", key: "bcncGradCode", width: 150, sortable: true, groupCode: Code.CUST002 },
      { name: "주말구분", key: "wkendDfkSeValue", width: 100, sortable: true },
      { name: "등록일시", key: "frstRegistDt", width: 200, sortable: true },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
      },
      data: { }
    },
    stepper: { 
      titles: []
    },
    itemBinding(row, { codeText }) {
      
    },
    onSearch(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => axios.get('bcnc/search', { params: params }).then(callback), {
        onSuccess(data) {
          listContext.listData = data.data
        }
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => axios.get("bcnc", { params: params }).then(callback), {
        onSuccess(data) {
          listContext.listData = data.data
        }
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    }, 
    onAddClick() {
      view.value?.formContext.modal?.openAdd?.()
    },
    onExportClick() {
      
    },
    onPrintClick(callback) {
      const printConfig = reactive<IPrintConfig>({
        url: 'basicNew/print',
        data: listContext.listData
      })
      callback(printConfig)
    },
    onDeleteClick() {
      
    },
  })
</script>

<style>

</style>