<!-- 
  created: 이진우  
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button></template>
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

  const models = reactive<any>({
    data: []
  });

  const view = ref<InstanceType<typeof View>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '장비등록',
    breadcrumbs: ["기초자료", "편의장"],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "편의장비 코드", key: "cnvncEqpmnCode", sortable: true, width: 200, },
      { name: "편의장비 명", key: "cnvncEqpmnNm", sortable: true, },
      { name: "편의장비 요금", key: "cnvncEqpmnChrge", sortable: true, width: 200, },
      { name: "비고", key: "etcContents", sortable: true, width: 200, },
      { name: "사용여부", key: "useYn", sortable: true, width: 200, },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
        isExport: true,
      },
    },
    reSearch(searchFilter: ISearchFilter) {
      if (searchFilter.useYn == "Y")
        listContext.listData = models.data.filter(f => f.useYn === "Y" && f.cnvncEqpmnNm?.indexOf(searchFilter.searchWord) >= 0);
      else
        listContext.listData = models.data.filter(f => f.cnvncEqpmnNm?.indexOf(searchFilter.searchWord) >= 0);
    },
    onSearch(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.get("cnvncEqpmn", { params: params }).then(({data}) => {
        models.data = data.data
        listContext.listData = data.data
      });
    },
    onReload(searchFilter?: ISearchFilter) {
      this.onSearch?.(searchFilter)
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    }, 
    onAddClick() {
      view.value?.formContext.modal?.openAdd?.()
    },
    onExportClick() {
      
    },
  })
</script>