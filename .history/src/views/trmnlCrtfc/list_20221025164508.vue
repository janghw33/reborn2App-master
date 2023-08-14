<!-- 
  created: 장형욱 
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <div class ="row"></div>
      <template v-slot:cell-deviceIdTxt="{ row }">
        <el-button type="info" @click="openModal2">해제</el-button>
        {{ row.deviceIdTxt }}
      </template>
    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>

<script lang="ts" setup>
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
    { name: "사용여부", key: "useYnTxt", width: 80, sortable: true },
    { name: "인증 상태", key: "deviceIdTxt", width: 80, sortable: true },
  ],
  perPage: 17,
  itemBinding(row) {
    row.deviceIdTxt = row.deviceId == null ? '미인증' : '인증'
    row.useYnTxt = row.useYn == 'Y' ? '사용함' : '사용안함'
  },
  onReload(searchFilter?: ISearchFilter) {
    const params = { search: searchFilter }
    ApiService.call((axios, callback) => axios.get('trmnlCrtfc', {params: params}).then(callback), {
      onSuccess(data) {
        models.data = data.data
        listContext.listData = data. data
      }
    })
  },
  onListView(row) {
    view.value?.formContext.modal?.openView?.(row)
  },
  onAddClick() {
    view.value?.formContext.modal?.openAdd?.()
  }

})
</script>

<style></style>
