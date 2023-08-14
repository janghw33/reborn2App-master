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
    pageTitle: '데스크 등록',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    },
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "데스크 코드", key: "deskCode", width: 200, sortable: true },
      { name: "데스크명", key: "deskNm", width: 200, sortable: true },
      { name: "비고", key: "etcContents", width: 200, sortable: true },
      { name: "사용 여부", key: "useYnTxt", width: 200, sortable: true},
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
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (f.deskNm?.indexOf(searchFilter.searchWord) >= 0 ||
        f.etcContents?.indexOf(searchFilter.searchWord) >= 0)
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }

      ApiService.call((axios, callback) => axios.get('desk', {params: params}).then(callback), {
        onSuccess(data) {
          models.data = data.data
          listContext.listData = data.data
        },
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    },
    onAddClick() {
      view.value?.formContext.modal?.openAdd?.()
    },
    onExportClick() {
      // jhwToDo
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