<!-- 
  created: 이진우  
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button> 
      </template>
      <template v-slot:cell-lendChrgeCl="{ row }">
        {{ row.lendChrgeCl.lendChrgeClNm }}
      </template>
      <template v-slot:cell-insrncChrgeCl="{ row }">
        {{ row.insrncChrgeCl.insrncChrgeClNm }}
      </template>
      <template v-slot:cell-wkendDfkSeValue="{ row }">
        {{ weekComputed(row.wkendDfkSeValue) }}
      </template>
      <template v-slot:step-1>
        <table class="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
          <colgroup>
              <col width="200" />
              <col width="100" />
              <col />
            </colgroup>
          <thead>
            <tr>
              <th>할인적용등급</th>
              <th>업체수</th>
              <th>거래처 명</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in models.bcncGradCodeGroups" :key="row">
              <td>
                <Input type="label" v-text="row.first" :groupCode="Code.CUST002"></Input>
              </td>
              <td>
                {{ row.second.length }}
              </td>
              <td>
                <span class="badge-light-info badge fw-semobold me-1" v-for="col in row.second" :key="col.bcncCode">
                  {{ col.bcncNm }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </BaseList>
    <View ref="view" :insrncChrgeList="models.insrncChrgeList" :lendChargeList="models.lendChargeList"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue';
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue';
  import ApiService from '@/core/services/ApiService';
  import View from './view.vue';
  import Input from '@/components/reborn/Input.vue';
  import type { bcnc } from './types'
  import { Code } from '@/enums'

  const models = reactive<any>({
    bcncGradCodeGroups: [],
    lendChargeList: [],
    insrncChrgeList: [],
  });
  console.log(models.bcncGradCodeGroups)
  const view = ref<InstanceType<typeof View>>()
  const pageContext = reactive<IPageContext>({
    pageTitle: '거래처 등록',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    }
  })
  const listContext = reactive<IListContext<bcnc>>({
    listData: [],
    headers: [
      { name: "거래처코드", key: "bcncCode", width: 200, sortable: true },
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
      types: [],
      buttons: {
        isAdd: true,
        isExport: true,
      },
      data: {
        useYn: 'N'
      }
    },
    stepper: { 
      titles: ['거래처 목록별', '할인 등급별']
    },
    itemBinding(row, { codeText }) {
      
    },
    onSearch(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.get("bcnc/search", params).then(({data}) => {            
        listContext.listData = data.data
        models.bcncGradCodeGroups = data.models['bcncGradCodeGroups']
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.get("bcnc", params).then(({data}) => {
        listContext.listData = data.data
        models.bcncGradCodeGroups = data.models['bcncGradCodeGroups']
        models.lendChargeList = data.models['lendChargeList']
        models.insrncChrgeList = data.models['insrncChrgeList']
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    }, 
    onAddClick() {
      view.value?.formContext.modal?.openAdd?.()
    },
  })

  const weekArr = new Array('', '일', '월', '화', '수', '목', '금', '토')
  const weekComputed = computed(() => {
    return (week) => {
      let weekStr = ""
      if ((week || "") != "") {
        week.split(',').forEach(d => {
          weekStr += ", " + weekArr[d];
        })
      }
      return weekStr.substring(2).trim()
    }
  })
</script>