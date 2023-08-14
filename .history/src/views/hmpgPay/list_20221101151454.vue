<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
    </BaseList>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/MomentService'
  import { Code } from '@/enums'
  import MomentService from '@/core/services/MomentService'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const pageContext = reactive<IPageContext>({
    pageTitle: '사고보고서',
    breadcrumbs: ['차량관리'],
    onLoad() {
      listContext.onSearch?.()
    }
  })


</script>