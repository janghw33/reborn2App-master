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
import BasePage, { IpageContext } from '@/components/reborn/BasePage.vue'
import BaseList, { ILIstContext, ISearchFilter } from '@/compontest/reborn/BaseList.vue'
import ApiService from '@/core/services/ApiService'
import View from './view.vue'

const models = reactive<any>({
  data: [],
})

const view = ref<InstanceType<typeof View>>()
const pageContext = reactive<IPageContext>({
  pageTitle: '데스크 등록',
  breadcrumbs: ['홈페이지 관리'],
  onLoad() {
    listContext.onReload?.()
  },
})
const listContext = reactive<IListContext>({
  listData: [],
  headers: [
    { name: "데스크 코드", key: "deskCode", width: 200, sortable: true },

  ]
})
</script>