<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      
    </BaseList>
  </BasePage>
  <View ref="view"></View>
</template>

<script lang="ts" setup>
  import { reactive, ref} from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseLIst.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'

  const view = ref<InstanceType<typeof View>>()
  const models = reactive<any>({
    data: [],
  })
  const pageContext = reactive<IPageContext>({
    pageTitle: '회원관리',
    breadcrumbs: ['홈페이지 관리'],
    onLoad() {
      listContext.onReload?.()
    }
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "번호", key: "userSn", width: 200, sortable: true },
      { name: "아이디", key: "userId", sortable: true },
      { name: "이름", key: "userNm", width: 100, sortable: true},
      { name: "생년월일", key: "userBrthdy", width: 150, sortable: true },
      { name: "전화번호", key: "tlphonNoEncpt", width: 150, sortable: true },
      { name: "가입일", key: "firstRegistDt", width: 150, sortable: true },
      { name: "마지막 로그인 일시", key: "lastLoginDt", width: 100, sortable: true },
      { name: "면허 종류", key: "userLcnsKndCode", width: 100, sortable: true },
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
      f.tlphonNoEncpt?.indexOf(searchFilter.searchWord))
    })
  },
  onReload(searchFilter?: ISearchFilter) {
    const params = { search: searchFilter }
    ApiService.call((axios, callback) => axios.get("hmpgUser/search").then(callback), {
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
