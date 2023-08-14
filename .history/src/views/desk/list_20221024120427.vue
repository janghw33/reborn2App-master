<template>
  {{models.data}}
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">

    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>


<script lang="ts" setup>
  import { reactive, ref, watchEffect } from 'vue'
  import BasePage, { IPageContext } from '@/components/rebornNew/BasePage.vue'
  import BaseList, {IListContext, ISearchFilter} from '@/components/rebornNew/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import RebornControl from '@/components/reborn/control/RebornControl.vue'
  import { IPrintConfig } from '@/components/rebornNew/BasePrint.vue'
  import { Code } from '@/enums'

  const view = ref<InstanceType<typeof View>>()
  const models = reactive<any>({
    data: [],
  })
  const pageContext = reactive<IPageContext>({
    pageTitle: '데스크 등록',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    }
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "데스크 코드", key: "deskCode", width: 200, sortable: true },
      { name: "데스크명", key: "deskNm", width: 200, sortable: true },
      { name: "비고", key: "etcContents", width: 200, sortable: true },
      { name: "사용 여부", key: "useYn", width: 200, sortable: true, callback: (row) => row.useYn == 'Y' ? '사용함' : '사용안함'},
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
    // reSearch(searchFilter: ISearchFilter) {
    //   listContext.listData = models.data.filter(f => {
    //     return (f.deskNm.indexOf(searchFilter.searchWord) >= 0 ||
    //       f.etcContents.indexOf(searchFilter.searchWord) >= 0)
    //     })
    // },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (f.deskNm.indexOf(searchFilter.searchWord))
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