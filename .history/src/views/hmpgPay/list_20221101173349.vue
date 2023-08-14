<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
    </BaseList>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed, vModelSelect } from 'vue';
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/MomentService'
import axios from 'axios';

  const models = reactive<any>({
    data: [],
  })
  const view = ref<InstanceType<typeof View>>()
  const pageContext = reactive<IPageContext>({
    pageTitle: '결제 관리',
    breadcrumbs: ['홈페이지 관리'],
    onLoad() {
      listContext.onSearch?.()
    }
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
    { name: "예약번호", key: "reservationNm", width: 120, sortable: true },
    { name: "ERP 예약번호", key: "erpreservationNm", width: 120, sortable: true },
    { name: "차종", key: "cartype", width: 120, sortable: true },
    { name: "예약자 성함", key: "reservationpeopleNm", width: 120, sortable: true },
    { name: "예약자 연락처", key: "reservationcontactAddress", width: 120, sortable: true },
    { name: "운전자 성함", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "운전자 연락처", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "운전자 생년월일", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "면허종류", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "적용보험", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "결제수단", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "작성일자", key: "acdntReprtSn", width: 120, sortable: true },
    ],
    perPage: 17,
    search: {
      types: [
      ],
      buttons: {
        isAdd: true,
      },
      data: {
        useYn: 'Y'
      }
    },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter( f => {
        return (f.deskNm?.indexOf(searchFilter.searchWord) >= 0 || 
        f.etcContents?.indexOf(searchFilter.searchWord) >= 0 ||
        f.useYnTxt?.indexOf(searchFilter.searchWord) >= 0)
      })
    }
    ,
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    }
  })
</script>