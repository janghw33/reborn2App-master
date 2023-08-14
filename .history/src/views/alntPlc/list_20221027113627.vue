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
  import { reactive, ref, warchEffect } from 'vue'
  import BasePage, { IPageContext } from "@/components/reborn/BasePage.vue"
  import BaseList, { IListContext, ISearchFilter } from "@/components/reborn/BaseList.vue"
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'

  const view = ref<InstanceType<typeof View>>()
  const models = reactive<any>({
    data: [],
  })
  const pageContext = reactive<IPageContext>({
    pageTitle: '배차장소',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    },
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "배차장소코드", key: "alntPlcCode", width: 100, sortable: true },
      { name: "배차장소명", key: "alntPlcNm", sortable: true },
      { name: "지역", key: "areaSeCode", width: 150, sortable: true, groupCode: 'CUST019' },
      { name: "차고지", key: "garageNm", width: 150, sortable: true },
      { name: "배/회차료", key: "alntRetuncarChrge", width: 100, sortable: true },
      { name: "사용여부", key: "useYnTxt", width: 50, sortable: true }
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
      row.useYnTxt = row.useYn == 'Y' ? '사용함' : '사용안함'
    },
    reSearch(searchFIlter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (f.alntPlcNm?.indexOf(searchFIlter.searchWord) >=0)
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = {search: searchFilter }

      ApiService.call((axios, callback) => axios.get('acnt', {params: params}).then(callback), {
        onSuccess(data) {
          models.data = data.data
          listContext.data = data.data
        }
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.()
    },
    onAddClick() {
      view.value?.formContext.modal?.openAdd?.()
    },
    onExportClick() {
    }
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
<style>
</style>