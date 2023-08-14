<template>
  <BasePage :pageContext="pageContext">
    {{models.data}}
    <BaseList :listContext="listContext">
      
    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseLIst.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'

  const models = reactive<any>({
    data: [],
  })
  const view = ref<InstanceType<typeof View>>()
  const pageContext = reactive<IPageContext>({
    pageTitle: '회원관리',
    breadcrumbs: ['홈페이지 관리'],
    onLoad() {
      listContext.onReload?.()
    },
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "번호", key: "userSn", width: 80, sortable: true },
      { name: "아이디", key: "userId", sortable: true },
      { name: "이름", key: "userNm", width: 160, sortable: true},
      { name: "생년월일", key: "userBrthdy", width: 160, sortable: true },
      { name: "전화번호", key: "tlphonNoEncpt", width: 200, sortable: true },
      { name: "가입일", key: "frstRegistDt", width: 200, sortable: true },
      { name: "마지막 로그인 일시", key: "lastLoginDt", width: 200, sortable: true },
      { name: "면허 종류", key: "userLcnsKndCode", width: 100, sortable: true, callback: (row) => row.userLcnsKndCode == '12' ? '1종 보통' : '2종 보통'},
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: false,
        isExport: false,
      }
  },
  itemBinding(row, { codeText }) {
  },
  reSearch(searchFilter: ISearchFilter) {
    listContext.listData = models.data.filter(f => {
      return (f.userId?.indexOf(searchFilter.searchWord) >=0 ||
      f.userNm?.indexOf(searchFilter.searchWord) >=0 ||
      f.tlphonNoEncpt?.indexOf(searchFilter.searchWord) >=0)
    })
  },
  onReload(searchFilter?: ISearchFilter) {
    const params = { search: searchFilter }

    ApiService.call((axios, callback) => axios.get("hmpgUser", {params: params}).then(callback), {
      onSuccess(data) {
        models.data = data.data
        listContext.listData = data.data
      }
    })
  },
  onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    }, 
})

</script>

<style>
</style>
