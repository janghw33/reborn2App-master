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
  breadcrumbs: ['기초자료'],
  onLoad() {
    listContext.onReload?.()
  },
})
</script>