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

<script lang = "ts" setup>
  import { reactive, ref, watchEffect } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import { Code } from '@/enums'
  const models = reactive<any>({
    data: [],
    totalCount: []
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
      { name: "거래서 일련번호", key: "vhcleManageBcncSn", width: 400, sortable: true},
      { name: "거래처 명", key: "vhcleManageBcncNm", width: 400, sortable: true},
      { name: "거래처 구분", key: "vhcleManageBcncSeCodeTxt", width: 400, sortable: true},
      { name: "사용여부", key: "useYnTxt", sortable: true }
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
    itemBinding(row, { codeText}) {
      row.vhcleManageBcncSeCodeTxt = codeText(Code.SYSM012, row.vhcleManageBcncSeCode)
      row.useYnTxt = row.useYn == 'Y' ? '사용' : '미사용'
    },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return ( f.vhcleManageBcncSn?.indexOf(searchFilter.searchWord) >= 0 ||
        f.vhcleManageBcncNm?.indexOf(searchFilter.searchWord) >= 0 ||
        f.vhcleManageBcncSeCodeTxt?.indexOf(searchFilter.searchWord) >= 0 ||
        f.useYnTxt?.indexOf(searchFilter.searchWord) >= 0)
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.get("vhcleManageBcnc").then(({data}) => {
        models.data = data.data
        listContext.listData = data.data
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
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