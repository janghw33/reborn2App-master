<!-- 
  created: 장형욱
 -->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">

    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>
<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'
import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
import BaseList, {IListContext, ISearchFilter} from '@/components/reborn/BaseList.vue'
import ApiService from '@/core/services/ApiService'
import View from './view.vue'

const view = ref<InstanceType<typeof View>>()
const models = reactive<any>({
  data: [],
})
const pageContext = reactive<IPageContext>({
  pageTitle: '쇼퍼 등록',
  breadcrumbs: ['기초자료'],
  onLoad() {
    listContext.onReload?.()
  },
})
const listContext = reactive<IListContext>({
  listData: [],
  headers: [
    { name: '운전자 코드', key: 'chauferDrverSn', width: 150, sortable: true },
    { name: '운전자명', key: 'chauferDrverNm', width: 150, sortable: true },
    { name: '구분', key: 'innerEmpYnTxt', width: 150, sortable: true},
    { name: '생년월일', key: 'chauferDrverBrthdy', width: 150, sortable: true },
    { name: '비고', key: 'etcContents', sortable: true },
    { name: '사용여부', key: 'useYnTxt', width: 100, sortable: true },
  ],
  perPage: 17,
  search: {
    types: [],
    buttons: {
      isAdd: true,
      isExport: true,
    },
    data: {
      useYn: 'Y',
    },
  },
  itemBinding(row) {
    row.innerEmpYnTxt = row.innerEmpYn == 'Y' ? '쇼퍼운전자' : '일반직원'
    row.useYnTxt = row.useYn == 'Y' ? '사용함' : '사용안함'
    },
    console.log()
  reSearch(searchFilter: ISearchFilter) {
    listContext.listData = models.data.filter(f => {
      return (f.chauferDrverNm.indexOf(searchFilter.searchWord) >= 0 ||
       f.innerEmpYnTxt.indexOf(searchFilter.searchWord) >= 0)
      })
  },
  reSearch(searchFilter: ISearchFilter) {
    listContext.listData = models.data.filter(f => {
      return f.
       
      })
  },
  onReload(searchFilter?: ISearchFilter) {
    const params = { search: searchFilter }
    
    ApiService.call((axios, callback) => axios.get('chauferDrver', { params: params }).then(callback), {
      onSuccess(data) {
        models.data = data.data
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
    // 추후 개발
  },
})

watchEffect(() => {
    const useYn = listContext.search?.data?.useYn
    listContext.reSearch?.(listContext.search?.data!)
    if (useYn === 'Y') {
      listContext.listData = listContext.listData.filter(f => f.useYn === 'Y')
    } else {
      listContext.listData = listContext.listData
    }
  })
</script>
