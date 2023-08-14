<template>
  <BasePage :PageContext="pageContext">
    <BaseList :listContext="listContext">
    </BaseList>
  </BasePage>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BaseList.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import { Code } from '@/enums'
  import MomentService from '@/core/services/MomentService'
  import { userRouter } from 'vue-router'

  const router = useRouter()
  const pageContext = reactive<IPageContext>({
    pageTitle: '차량노출 관리',
    breadcrumbs: ['홈페이지 관리'],
    onLoad() {
      listContext.onSearch?.()
    }
  })
  const listContext = reactive<ILIstContext>({
    listData: [],
    headers: [
    { name: "접수번호", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "접수번호", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "접수번호", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "접수번호", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "접수번호", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "접수번호", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "접수번호", key: "acdntReprtSn", width: 120, sortable: true },
    
    ]
  })
</script>