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
  import { reactive, ref } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'

  const view = ref<InstanceType<typeof View>>()
  const models = reactive<any>({
    data: [],
  })
  const pageContext = reactive<IPageContext>({
    pageTitle: '입금수단',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    },
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "은행계좌 코드", key: "acntSn", width: 120, sortable: true },
      { name: "은행명", key: "acntBankNm", width: 160, sortable: true },
      { name: "계좌번호", key: "acntNo", width: 200, sortable: true },
      { name: "예금주", key: "acntDpstrNm", width: 200, sortable: true },
      { name: "비고", key: "etcContents", sortable: true },
      { name: "사용여부", key: "useYnTxt", width: 100, sortable: true },
      
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
        isExport: true,
      },
      data: {
        useYn: 'Y'
      }
    },
    itemBinding(row) {
      row.useYnTxt = row.useYn == 'Y' ? '사용' : '미사용'
    },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (f.acntBankNm?.indexOf(searchFilter.searchWord) >=0 ||
        f.acntNo?.indexOf(searchFilter.searchWord) >=0 ||
        f.acntDpstrNm?.indexOf(searchFilter.searchWord) >=0 ||
        f.etcContents?.indexOf(searchFilter.searchWord) >=0 )
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }

      ApiService.call((axios, callback) => axios.get('acnt', {params: params}).then(callback), {
        onSuccess(data) {
          models.data = data.data
          listContext.listData = data.data
        }
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      
      ApiService.call((axios, callback) => axios.get('acnt', {params: params}).then(callback), {
        onSuccess(data) {
          models.data = data.data
          listContext.listData = data.data
        }
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    }
  })
  </script>
