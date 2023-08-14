<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
    </BaseList>
  </BasePage>
</template>

<script lang = "ts" setup>
  import { reactive, ref, watchEffect } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/service/ApiSerivce'
  import View from './view.vue'

  const models = reactive<any>({
    data: [],
  })
  const view = ref<InstanceType<typeof View>>()
  const pageContext = reactive<IPageContext>({
    pageTitle: '차량관리 거래처',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    },
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "거래서 일련번호", key: "bcncNum", width: 200, sortable: true},
      { name: "거래처 명", key: "bcncNmae", width: 200, sortable: true},
      { name: "거래처 구분", key: "bcncSeCode", width: 200, sortable: true},
      { name: "사용여부", key: "useYn" }
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
      row.useYnTxt = row.useYn = 'Y' ? '사용' : '미사용'
    },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (f.bcncName?.indexOf(searchFilter.searchWord))
      })
    },
    
  })
</script>