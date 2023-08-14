<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      {{data.data}}
      {{}}
    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import View from './view.vue'
  import ApiService from '@/core/services/ApiService';

  const models = reactive<any>({
    data: [],
  })
  const view = ref<InstanceType<typeof View>>()
  const pageContext = reactive<IPageContext>({
    pageTitle: '결제 관리',
    breadcrumbs: ['홈페이지 관리'],
    onLoad() {
      listContext.onReload?.()
    },
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
    { name: "예약번호", key: "reservationNm", width: 120, sortable: true },
    { name: "ERP 예약번호", key: "erpreservationNm", width: 120, sortable: true },
    { name: "차종", key: "cartype", width: 120, sortable: true },
    { name: "예약자 성함", key: "reservationpeopleNm", width: 120, sortable: true },
    { name: "예약자 연락처", key: "reservationcontactAddress", width: 120, sortable: true },
    { name: "운전자 성함", key: "operatorNm", width: 120, sortable: true },
    { name: "운전자 연락처", key: "operatorcontactAddress", width: 120, sortable: true },
    { name: "운전자 생년월일", key: "opreatorBirth", width: 120, sortable: true },
    { name: "면허종류", key: "identificationType", width: 120, sortable: true },
    { name: "적용보험", key: "insuranceType", width: 120, sortable: true },
    { name: "결제수단", key: "paymentmethod", width: 120, sortable: true },
    { name: "작성일자", key: "dateofprepration", width: 120, sortable: true },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
      },
      data: {
        useYn: 'Y'
      }
    },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (f.deskNm?.indexOf(searchFilter.searchWord) >= 0 || 
        f.etcContents?.indexOf(searchFilter.searchWord) >= 0 ||
        f.useYnTxt?.indexOf(searchFilter.searchWord) >= 0)
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }

      ApiService.call((axios, callback) => axios.get('hmpgPay', {params: params}).then(callback), {
        onSuccess(data) {
          models.data = data.data
          listContext.listData = data.data
        }
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    }
  
  })
</script>