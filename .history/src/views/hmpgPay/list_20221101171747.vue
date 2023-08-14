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
  import { Code } from '@/enums'
  import MomentService from '@/core/services/MomentService'
  import { useRouter } from 'vue-router'

  const models = reactive<any>({
    data: [],
  })
  const view = ref<InstanceType<typeof View>>()
  const router = useRouter()
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
    { name: "예약번호", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "ERP 예약번호", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "차종", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "예약자 성함", key: "acdntReprtSn", width: 120, sortable: true },
    { name: "예약자 연락처", key: "acdntReprtSn", width: 120, sortable: true },
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
        { text: '미결자료', value: '01'},
        { text: '완결자료', value: '02'},
      ],
      buttons: {
        isAdd: true,
      },
      data: {

      }
    },
    onSearch(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }

      ApiService.call((axios, callback) => axios.get("hmpgPay", { params: params}).then(callback), {
        onSuccess(data) {
          models.data = data.data
        }
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    }
  })
</script>