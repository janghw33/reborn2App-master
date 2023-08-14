<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext"> </BaseList>
  </BasePage>
  <View ref="view"></View>
</template>

<script lang="ts" setup>
  import { reactive, ref} from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseLIst.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import Input from '@/components/reborn/Input.vue';

  const view = ref<InstanceType<typeof View>>()

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
      { name: "마지막 로그인 일시", key: "lastLoginDt", width: 100, sortable: true },
    ],
    perPage: 17,
    search: {
      buttons: {
        isAdd: false,
        isExport: true,
      }
  },
  itemBinding(row, { codeText }) {
  },
  onSearch(searchFilter?: ISearchFilter) {
    const params = { search: searchFilter }
    ApiService.call((axios, callback) => axios.get('hmpgUser', {params: params }).then(callback), {
      onSuccess(data) {
        listContext.listData = data.data
      }
    })
  },
  onReload(searchFilter?: ISearchFilter) {
    ApiService.call((axios, callback) => axios.get("hmpgUser").then(callback), {
      onSuccess(data) {
        listContext.listData = data.data
      }
    })
  },
  onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    }, 
})

</script>
