<!-- 
  created: 장형욱 
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
    </BaseList>
    <View ref="view"></View>
  </BasePage>

<script lang="ts">
import { reactive,ref } from "vue"
import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
import BaseList, { IListContext, ISearchFilter } from "@/components/reborn/BaseList.vue"
import ApiService from "@/core/services/ApiService"
import View from "./view.vue";

const view = ref<InstanceType<typeof View>>()
const models = reactive<any>({
  data: [],
})
const pageContext = reactive<IPageContext>({
  pageTitle: '전자계약 단말기설정',
  breadcrumbs: ['기초자료'],
  onLoad() {
    listContext.onReload?.()
  },
})
const listContext = reactive<IListContext>({
  listData: [],
  headers: [
    { name: "단말기 코드", key: "trmnlCode", width: 160, sortable: true },
    { name: "단말기 인증 번호",  width: 160, key: "trmnlCrtfcNo", sortable: true },
    { name: "단말기 명", key: "trmnlNm", width: 160, sortable: true },
    { name: "단말기 설명 내용", key: "trmnlDcContents",  sortable: true },
    { name: "사용 여부", key: "useYn", width: 80, sortable: true },
    { name: "인증 상태", key: "deviceId", width: 80, sortable: true },
  ],

  itemBinding(row, { codeText }) {

  },
  perPage: 999,
  stepper: {
    titles: []
  },
  onBaseListLoad(searchType?: IBaseListSearch) {
      this.onBaseListReload(searchType)
    },
    onBaseListSearch(searchType?: IBaseListSearch) {

    },
    onBaseListReload(searchType?: IBaseListSearch) {
      const params = { search: searchType }
      ApiService.get("trmnlCrtfc", { params: params }).then(({data}) => {
        console.log(data.data)
        context.tableData = data.data
      })
    },
    onBaseListDelete(rows?: any[]) {

    },
    onBaseListExport(rows?: any[]) {

    },
    onBaseListPrint(rows?: any[]) {

    },
    onBaseListStepperChange(index: number) {

    },
    onBaseListAdd() {

    },
    onBaseListChanged(row: any, index: number) {

    },

});

    return {
      context,
      pageData,
      view,
    };
  },
});
</script>

<style></style>
