<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">

    </BaseList>
  </BasePage>
</template>


<script lang="ts" setup>
  import { reactive, ref, computed, watchEffect } from 'vue';
  import BasePage, { IPageContext } from '@/components/rebornNew/BasePage.vue';
  import BaseList, { IListContext, ISearchFilter } from '@/components/rebornNew/BaseList.vue';
  import ApiService from '@/core/services/ApiService';
  import View from './view.vue';
  import RebornControl from '@/components/reborn/control/RebornControl.vue';
  import { Code } from '@/enums'

  const view = ref<InstanceType<typeof View>>()
  const models = reactive<any>({
    data: [],
  })

  const pageContext = reactive<IPageContext>({
    pageTitle: '거래처 등록',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "데스크 코드", key: "deskCode", width: 200, sortable:true},
      { name: "데스크명", key: "deskNm", width: 200, sortable:true},
      { name: "비고", key: "etcContents", width: 200, sortable:true},
      { name: "사용 여부", key: "useYn", width: 200, sortable:true}
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
        isExport: true,
      },
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    },
    onAddClick() {
      view.value?.formContext.modal?.openAdd?.()
    }
  })

  watchEffect(() => {
    const useYn = listContext.search?.data?.useYn
    listContext.reSearch?.(listContext.search?.data!)
    if (useYn === 'Y') {
      listContext.reSearch?.(listContext.search?.data!) 
    } else {
      listContext.listData = listContext.listData
    }
  })
</script>