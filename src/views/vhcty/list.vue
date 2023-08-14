<!--
  created: 이진우
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import { Code } from '@/enums'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'

  const models = reactive<any>({
    
  })

  const view = ref<InstanceType<typeof View>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '차종등록',
    breadcrumbs: ["기초자료", "차량정보"],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "노출순서", key: "sortOrdr", sortable: true, width: 100, },
      { name: "차종코드", key: "vhctyCode", sortable: true, },
      { name: "차종명", key: "vhctyNm", sortable: true, },
      { name: "소속", key: "vhclePsitnCode", sortable: true, groupCode: Code.CUST023 },
      { name: "차종분류", key: "vhctyClCode", sortable: true, groupCode: Code.CUST006 },
      { name: "제조사", key: "makrClCode", sortable: true, groupCode: Code.CUST007 },
      { name: "연료", key: "fuelTyCode", sortable: true, groupCode: Code.SYSM005 },
      { name: "연료(단위)", key: "fuelUnitCode", sortable: true, groupCode: Code.SYSM006 },
      { name: "사용여부", key: "useYn", sortable: true, callback: (row) => row.useYn == 'Y' ? '사용' : '미사용' },
    ],
    perPage: 17,
    search: {
      types: [
        { text: '차종코드', value: 'vhctyCode'},
        { text: '차종명', value: 'vhctyNm'},
      ],
      buttons: {
        isAdd: true,
      },
      data: {
        useYn: 'Y'
      }
    },
    onReload(searchFilter: ISearchFilter) {
      this.onSearch?.(searchFilter)
    },
    onSearch(searchFilter: ISearchFilter) {      
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => {
        axios.get('vhcty', { params: params }).then(callback)
      }, {
        onSuccess(data) {
          listContext.listData = data.data
          models.vhctyRows = data.models.vhctyRows
          models.vhcleCount = data.models.vhcleCount
          models.naviRows = data.models.naviRows
        }
      })
    },
    onListView(data) {
      view.value?.formContext.modal?.openView?.(data)
    }, 
    onAddClick() {
      view.value?.formContext.modal?.openAdd?.()
    },
  })
</script>