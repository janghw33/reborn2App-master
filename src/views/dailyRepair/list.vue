<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button></template>      
      <template #cell-footer v-if="listContext.listData != null && listContext.listData.length > 0">
        <tr style="background-color:#f7f7f7">
          <th colspan="9" class="text-center">금액합계</th>
          <th>{{ $comma(totalPrice) }}</th>
          <th colspan="2"></th>
        </tr>
      </template>
      <template #right-body>
        <div class="col-3">
          <div class="card card-flush">
            <div class="card-body" style="padding: 0px 20px">
              <div style="display:flex; justify-content: space-between; align-items: center;">
                <h3 style="padding: 20px">
                  일일기타정비사항
                </h3>
                <button class="btn btn-primary" @click="etcRepairSave()">기타정비사항 저장</button>
              </div>
              <div style="display:flex; flex-direction: column">
                <label>
                  기타정비내역
                </label>
                <textarea class="form-control" rows="4" v-model="models.etcRepair.etcImprmnContents"></textarea>
                <label>
                  고장접보
                </label>
                <textarea class="form-control" rows="4" v-model="models.etcRepair.defectRequisContents"></textarea>
                <label>
                  수리점검예정
                </label>
                <textarea class="form-control" rows="4" v-model="models.etcRepair.repairChckPrearngeContents"></textarea>
                <label>
                  공장입고
                </label>
                <textarea class="form-control" rows="4" v-model="models.etcRepair.fctryWrhousngContents"></textarea>
                <label>
                  공장출고
                </label>
                <textarea class="form-control" rows="4" v-model="models.etcRepair.fctryDlivyContents"></textarea>
                <label>
                  특기사항
                </label>
                <textarea class="form-control" rows="4" v-model="models.etcRepair.etcAddContents"></textarea>
              </div>
            </div>
          </div>
        </div>
      </template>
    </BaseList>    
    <View ref="view" :vhcle-list="models.vhcleList" :user-list="models.userList"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed, watchEffect, getCurrentInstance } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import { Code } from '@/enums'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import MomentService from '@/core/services/MomentService'

  const models = reactive<any>({
    etcRepair: {},
    vhcleList: [],
    userList: [],     
  })

  const view = ref<InstanceType<typeof View>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '일일정비일지',
    breadcrumbs: ["차량관리"],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "차번", key: "vhcleNo", width: 80, sortable: true, callback: (row) => row.vhcle?.vhcleNo },
      { name: "차종명", key: "vhctyNm", width: 100, sortable: true, callback: (row) => row.vhcle?.vhctyNm },
      { name: "정비장소", key: "imprmnPlcCode", width: 100, sortable: true, groupCode: Code.CUST020 },
      { name: "작업자", key: "userNm", width: 100, sortable: true, callback: (row) => row.user?.userNm },
      { name: "무상A/S", key: "asGrtsYn", width: 100, sortable: true, callback: (row) => row.asGrtsYn == 'Y' ? '제공' : '미제공' },
      { name: "정비내역", key: "imprmnDtlsCode", width: 100, sortable: true, groupCode: Code.CUST021, },
      { name: "사용부품", key: "useCmpntCode", width: 100, sortable: true, groupCode: Code.CUST022 },
      { name: "기타부품", key: "etcCmpntContents", sortable: true },
      { name: "수량", key: "qy", width: 70, sortable: true },
      { name: "금액", key: "amount", width: 100, sortable: true },
      { name: "주행거리", key: "opratDstncKm", width: 70, sortable: true },
      { name: "등록일시", key: "frstRegistDt", width: 130, sortable: true },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
      },
      data: {
        sDate: MomentService.now(),
      }
    },
    onSearch(searchFilter?: ISearchFilter) {
      ApiService.get("dailyRepair/" + searchFilter?.sDate).then(({data}) => {
        listContext.listData = data.data
        models.etcRepair = data.models['etcRepair'] ?? {}
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      ApiService.get("dailyRepair").then(({data}) => {
        listContext.listData = data.data
        models.etcRepair = data.models['etcRepair'] ?? {}
        models.vhcleList = data.models['vhcleList'] ?? []
        models.userList = data.models['userList'] ?? []
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openAdd?.(row)
    }, 
    onAddClick() {
      const data = {
        imprmnDe: listContext.search?.data?.sDate
      }
      view.value?.formContext.modal?.openAdd?.(data)
    },
  })

  const totalPrice = computed(() => {
    return listContext.listData?.reduce((a, b) => {
      return a + b.amount
    }, 0);
  })


  function etcRepairSave() {
    const data = {
      ...models.etcRepair,
      imprmnDe: listContext.search?.data?.sDate
    }

    ApiService.alert((axios, callback) => {
      axios.post('dailyRepair/etc', data).then(callback)
    }, {
      label: '저장'
    })
  }

</script>