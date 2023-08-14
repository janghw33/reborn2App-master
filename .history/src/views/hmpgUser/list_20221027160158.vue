<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button>
        <el-buttion type="info" @click="openModal2">리스트형 모달창</el-buttion>
        </template>

    </BaseList>
  </BasePage>
  <View ref="view"></View>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseLIst.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import Modal2 from './modal2.vue';

  const modal2 = ref<InstanceType<typeof Modal2>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '회원관리',
    breadcrumbs: ['홈페이지 관리'],
    onLoad() {
      
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "사용자", key: "bcncCode", width: 200, sortable: true },
      { name: "거래처명", key: "bcncNm", sortable: true },
      { name: "구분", key: "bcncSeCode", width: 100, sortable: true, groupCode: Code.SYSM009 },
      { name: "대여요금 유형", key: "lendChrgeCl", width: 150, sortable: true },
      { name: "보험요금 유형", key: "insrncChrgeCl", width: 150, sortable: true },
      { name: "할인적용 등급", key: "bcncGradCode", width: 150, sortable: true, groupCode: Code.CUST002 },
      { name: "주말구분", key: "wkendDfkSeValue", width: 100, sortable: true },
      { name: "등록일시", key: "frstRegistDt", width: 200, sortable: true },
    ],
    perPage: 17,
    search: {
      types:
    }
  })


  function openModal2() {
    ApiService.confirm(() => {
      modal2.value?.formContext.modal?.openAdd?.()
    }, {
      message: '리스트 모달창을 여시겠습니까?'
    })
  }

  // const listContext = reactive<IListContext>({
  //   listData: [],
  //   headers: []
  // })

</script>