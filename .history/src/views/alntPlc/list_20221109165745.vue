<!-- 
  created: 장형욱 
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template v-slot:cell-garageSn="{ row }">
        {{ row.garageRows.garageNm}}
      </template>
    

    </BaseList>
    <View ref="view" :garageNmList="models.garageRows"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, watchEffect } from 'vue'
  import BasePage, { IPageContext } from "@/components/reborn/BasePage.vue"
  import BaseList, { IListContext, ISearchFilter } from "@/components/reborn/BaseList.vue"
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import { Code } from '@/enums'

  const view = ref<InstanceType<typeof View>>()

  const models = reactive<any>({
    data: [],
    garageRows: [],
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
      { name: "배차장소코드", key: "alntPlcCode", width: 240, sortable: true },
      { name: "배차장소명", key: "alntPlcNm", width: 240, sortable: true },
      { name: "지역", key: "areaSeCode", width: 200, sortable: true, groupCode: Code.CUST019 },
      { name: "차고지", key: "garageNm", width: 200, sortable: true },
      { name: "비고", key: "etcContents", sortable: true },
      { name: "배/회차료", key: "alntRetuncarChrge", width: 80, sortable: true },
      { name: "사용여부", key: "useYnTxt", width: 80, sortable: true }
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
        return (f.alntPlcNm?.indexOf(searchFilter.searchWord) >=0 ||
        f.etcContents?.indexOf(searchFilter.searchWord) >= 0 ||
        f.useYnTxt?.indexOf(searchFilter.searchWord) >= 0)
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = {search: searchFilter }

      ApiService.call((axios, callback) => axios.get('alntPlc', {params: params}).then(callback), {
        onSuccess(data) {
          models.data = data.data
          models.garageRows = data.models['garageRows']
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