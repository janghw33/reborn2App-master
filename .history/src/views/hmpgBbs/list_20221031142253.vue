<template>
  <BasePage :pageContext="pageContext">
    {{models.data}}
    <BaseList :listContext="listContext">
    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect} from 'vue'
import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
import ApiService from '@/core/services/ApiService'
import View from './view.vue'

const models = reactive<any>({
  data: [],
})

const view = ref<InstanceType<typeof View>>()
const pageContext = reactive<IPageContext>({
  pageTitle: '게시판 관리',
  breadcrumbs: ['홈페이지 관리'],
  onLoad() {
    listContext.onReload?.()
  },
})
const listContext = reactive<IListContext>({
  listData: [],
  headers: [
    { name: "카테고리", key: "deskCode", width: 200, sortable: true },
    { name: "제목", key: "deskCode", width: 200, sortable: true },
    { name: "내용", key: "deskCode", width: 200, sortable: true },
    { name: "작성자", key: "deskCode", width: 200, sortable: true },
    { name: "작성시간", key: "deskCode", width: 200, sortable: true },
  ],
  perPage: 17,
  search: {
    types: [],
  }
})
</script>