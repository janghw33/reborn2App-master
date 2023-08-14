<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
  


    </BaseList>
  </BasePage>
</template>


<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import BasePage, { IPageContext } from '@/components/rebornNew/BasePage.vue';
  import BaseList, { IListContext, ISearchFilter } from '@/components/rebornNew/BaseList.vue';
  import ApiService from '@/core/services/ApiService';
  import View from './view.vue';
  import RebornControl from '@/components/reborn/control/RebornControl.vue';
  import { Code } from '@/enums'

  const models = reactive<any>({
  })
  
  const view = ref<InstanceType<typeof View>>()

  
  const pageContext = reactive<IPageContext>({
    pageTitle: '거래처 등록',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listC




</script>