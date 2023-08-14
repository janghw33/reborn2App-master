<!--
  created: 이진우
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button></template>
      
      <template #cell-fuelUntpcAmount="{ row }">
        <el-input type="text" v-model="row.fuelUntpcAmount" />
      </template>
      
      <template #left-body>
        <div class="col-2">
          <div class="card card-flush">
            <div class="card-body" style="padding: 0px 20px">
              <label style="display: flex; justify-content: center">적용일자</label>
              <table class="table align-middle table-row-dashed fs-6 dataTable no-footer" style="cursor: pointer">
                <tr v-for="applcDe in models.applcDes" :key="applcDe" :class="{'active': applcDe == models.applcDe }">
                  <td class="fw-bold text-gray-800 text-center" @click="selectApplcDe(applcDe)">
                    {{ $moment(applcDe) }}
                  </td>
                </tr>
              </table>
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

  const models = reactive<any>({
    data: [],
    applcDes: [],
    applcDe: null,
  })

  const view = ref<InstanceType<typeof View>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '연료단가',
    breadcrumbs: ["기초자료"],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "차종코드", key: "vhctyCode", sortable: true, width: 200, },
      { name: "차종명", key: "vhctyNm", sortable: true, },
      { name: "사용연료", key: "fuelTyCodeTxt", sortable: true, width: 100, },
      { name: "최대용량", key: "mxmmFuelCpcty", sortable: true, width: 100, },
      { name: "최대눈금", key: "mxmmFuelSpaceValue", sortable: true, width: 100, },
      { name: "단위구분", key: "fuelUnitCodeTxt", sortable: true, width: 100 },
      { name: "단위당 단가", key: "fuelUntpcAmount", sortable: true, width: 100, },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
        isDelete: true
      },
    },
    itemBinding(row, { codeText }) {
      row.fuelTyCodeTxt = codeText(Code.SYSM005, row.fuelTyCode)
      row.fuelUnitCodeTxt = codeText(Code.SYSM006, row.fuelUnitCode)
    },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (
          f.fuelTyCodeTxt?.indexOf(searchFilter.searchWord) >= 0 || 
          f.vhctyNm?.indexOf(searchFilter.searchWord) >= 0 ||
          f.fuelUnitCodeTxt?.indexOf(searchFilter.searchWord) >= 0)
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      ApiService.get("fuelPrice").then(({data}) => {
        models.applcDes = data.data

        if (models.applcDes.length > 0) {
          selectApplcDe(models.applcDes[0])
        }
      })
    },
    onSearch(searchFilter?: ISearchFilter) {
      ApiService.get("fuelPrice").then(({data}) => {
        models.data = data.data
      })
    },
    onListView() {
      
    }, 
    onAddClick() {
      const data = {
        fuelUntpcs: listContext.listData
      }
      view.value?.formContext.modal?.openAdd?.(data)
    },
    onDeleteClick() {
      const params = {
        applcDe: models.applcDe
      }
      
      ApiService.confirm((axios, callback) => {
        axios.delete('fuelPrice', { data: params }).then(callback)
      }, {
        label: '삭제',
        onSuccess() {
          listContext.onReload?.()
        }
      })
    }
  })

  function selectApplcDe(applcDe) {
    models.applcDe = applcDe
    ApiService.get(`fuelPrice/${models.applcDe}`).then(({data}) => {
      models.data = data.data
      listContext.listData = data.data
    })
  }
</script>

<style scoped>
  .active {
    background-color: bisque;
  }
</style>