<!-- 
  created: 장형욱 
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
    </BaseList>
    <View ref="view"></View>
  </BasePage>

  <div>
    <BaseList :context="context" @modal-open="view?.modalOpen">
      <template v-slot:searchBarCustom> </template>
      <template v-slot:searchBarButton> </template>
      <template v-slot:cell-trmnlCode="{ row }">
        {{ row.trmnlCode }}
      </template>
      <template v-slot:cell-trmnlCrtfcNo="{ row }">
        {{ row.trmnlCrtfcNo }}
      </template>
      <template v-slot:cell-trmnlNm="{ row }">
        {{ row.trmnlNm }}
      </template>
      <template v-slot:cell-trmnlDcContents="{ row }">
        {{ row.trmnlDcContents }}
      </template>
      <template v-slot:cell-useYn="{ row }">
        {{ row.useYn == 'Y' ? '사용' : '미사용' }}
      </template>
    
    </BaseList>
    <View ref="view" :context="context"></View>
  </div>
</template>

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
    { name: "인증 상태", key: "deviceIdTxt", width: 80, sortable: true },
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
    row.deviceIdTxt = row.deviceId == null ? '미인증' : '인증'
    row.useYnTxt = row.useYn == 'Y' ? '사용함' : '사용안함'
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
