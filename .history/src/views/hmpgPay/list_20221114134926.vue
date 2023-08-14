<!--
  created: 장형욱
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
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
  import MomentService from '@/core/services/MomentService';
  
  const view = ref<InstanceType<typeof View>>()
  const models = reactive<any>({
    data: [],
  })
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
    { name: "예약번호", key: "setleRequstHistSn", width: 120, sortable: true },
    { name: "ERP 예약번호", key: "erpResveSn", width: 120, sortable: true },
    { name: "차종", key: "vhctyNm", width: 120, sortable: true },
    { name: "예약자 성함", key: "rsvctmNm", width: 120, sortable: true },
    { name: "예약자 연락처", key: "rsvctmCttpcEncpt", width: 120, sortable: true },
    { name: "운전자 성함", key: "drverNm", width: 120, sortable: true },
    { name: "운전자 연락처", key: "drverCttpcEncpt", width: 120, sortable: true },
    { name: "운전자 생년월일", key: "drverBrthdy", width: 80, sortable: true },
    { name: "면허종류", key: "drverLcnsKndCode", width: 40, sortable: true }
    ],
    perPage: 17,
    search: {
      types: [
        { text: '결제일', value: '01'},
        { text: '예약일', value: '02'},
      ],
      buttons: {
        isSearchWord: false
      },
      data: {
        sDate: MomentService.add(-1, 'month'),
        eDate: MomentService.now()
      }
    },
    onSearch(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => axios.get("hmpgPay/search", { params: params}).then(callback), {
        onSuccess(data) {
          listContext.listData = data.data
        }
      })

    },
    itemBinding(row) {
    row.drverLcnsKndCode = row.drverLcnsKndCode == '12' ? '1종 보통' : '2종 보통'
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
    // onListView(row) {
    //   router.push({
    //     path: "/hmpgPay/view",
    //     query: {
    //       setleRequstHistSn: row.setleRequstHistSn
    //     }
    //   })
    // }
  
  })
</script>