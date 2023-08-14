<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
    
    </BaseList>
  </BasePage>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
import ApiService from '@/core/services/ApiService;';
import Modal1 from './modal1.vue'
import Modal2 from './modal2.vue'
import input from '@/components/reborn/Input.vue'
import type { IPrintConfig } from '@/components/reborn/BasePrint.vue'

const view = reactive<any>({
  data:[]
})

const pageContext = reactive<IPageContext>({
  pageTitle: '회사 기본정보',
  breadcrumbs: ['환경설정'],
  onLoad() {
    listContext.onReload?.()
  }
})

const listContext = reactive<IListContext>({
  listData: [],
  headers: [
    { name: "사업자번호", key:, width:200, sortable:true}
  ]
})

</script>