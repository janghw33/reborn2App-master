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
    { name: "추천여부", key: "recomendYn", width: 120, sortable: true },
    { name: "차종", key: "vhctyNm", width: 120, sortable: true },
    { name: "일반보험", key: "gnrlInsrncSn", width: 120, sortable: true },
    { name: "완전보험", key: "prfectInsrncSn", width: 120, sortable: true },
    { name: "프리미엄 여부", key: "expsrGradCode", width: 120, sortable: true },
    { name: "판매 여부", key: "sleYn", width: 120, sortable: true },
    { name: "작성시간", key: "acdntReprtSn", width: 120, sortable: true },
    
    ],
    perPage: 17,
    search: {
      types: [
      ],
    },
    itemBinding(row) {
      row.recomendYnTxt = row.recomendYn = 'Y' ? '사용' : '미사용'
      row.sleYnTxt = row.sleYn = 'Y' ? '판매' : '미판매'
    },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (f.vhctyNm?.indexOf())
      })
    }
  })
</script>