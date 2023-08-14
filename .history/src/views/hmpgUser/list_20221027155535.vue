<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button>
        <el-buttion type="info" @click="openModal2">리스트형 모달창</el-buttion>
      </template>
    </BaseList>
  </BasePage>
  <View ref="view"></View>

<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseLIst.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'

  const pageContext = reactive<IPageContext>({
    pageTitle: '회원관리',
    breadcrumbs: ['홈페이지 관리'],
    onLoad() {
      listContext.onReload?.()
    }
  })

</script>