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
  import { Code } from '@/enums'

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
      { name: '입금방법 코드', key: 'paySeCode', width: 300, sortable: true },
      { name: '입금방법명', key: 'paySeContents', sortable: true },
      { name: '입금방법 형태', key: 'payStleCodeTxt', width: 200, sortable: true },
      { name: '비고', key: 'etcContents', width: 400, sortable: true },
      { name: '사용여부', key: 'useYn', width: 100, sortable: true, callback: (row) => row.useYn == 'Y' ? '사용함' : '사용안함' },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
        isExport: true,
      },
      data: {
        useYn: 'N',
      },
    },
    itemBinding(row, { codeText }) {
      row.payStleCodeTxt = codeText(Code.SYSM010, row.payStleCode)
    },
    reSearch(searchFilter: ISearchFilter) {      
      listContext.listData = models.data.filter(f => {
        return (f.paySeContents.indexOf(searchFilter.searchWord) >= 0 ||
          f.payStleCodeTxt.indexOf(searchFilter.searchWord) >= 0 ||
          f.etcContents.indexOf(searchFilter.searchWord) >= 0)
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }

      ApiService.call((axios, callback) => axios.get('paySe', { params: params }).then(callback), {
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
