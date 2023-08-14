<!--
  created: 이진우
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button></template>
      <template #cell-corpVhcleCo="{ row }">
        <el-input type="text" v-model="row.corpVhcleCo"></el-input>
      </template>
      <template #left-body>
        <div class="col-2">
          <div class="card card-flush">
            <div class="card-body" style="padding: 0px 20px">
              <label style="display: flex; justify-content: center">적용일자</label>
              <table class="table align-middle table-row-dashed fs-6 dataTable no-footer" style="cursor: pointer">
                <tr v-for="applcDe in models.applcDeRows" :key="applcDe" :class="{'active': applcDe == models.applcDe }">
                  <td class="fw-bold text-gray-800 text-center" @click="selectApplcDe(applcDe)">
                    {{ $moment(applcDe, 'YYYY-MM-DD') }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </template>
    </BaseList>    
    <View ref="view"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed, watchEffect } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import { Code } from '@/enums'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'

  const models = reactive<any>({    
    data: [],

    // 차종목록
    applcDeRows: [],
        
    // 적용일자
    applcDe: null,
  })

  const view = ref<InstanceType<typeof View>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '보유대수',
    breadcrumbs: ["기초자료", "차량정보"],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "차종코드", key: "vhctyCode", sortable: true, width: 200, },
      { name: "차종", key: "vhctyNm", sortable: true, },
      { name: "보유수량", key: "corpVhcleCo", sortable: true, width: 200, },
    ],
    perPage: 99,
    search: {
      types: [],
      buttons: {
        isAdd: true,
        isDelete: true,
      },
      data: {}
    },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data?.filter(f => f.vhctyNm?.indexOf(searchFilter.searchWord) >= 0)
    },
    onReload(searchFilter: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => axios.get('vhcleHoldCo', { params: params }).then(callback), {
        onSuccess(data) {
          models.applcDeRows = data.data
          if (data.data.length > 0) {
            selectApplcDe(data.data[0])
          }
        }
      })
    },
    onListView(data) {
      
    }, 
    onAddClick() {      
      view.value?.formContext.modal?.openAdd?.(models.data)
    },
    onDeleteClick() {
      const data = {
        applcDe: models.applcDe
      }
      ApiService.confirm((axios, callback) => axios.delete('vhcleHoldCo', { data: data }).then(callback), {
        label: '삭제',
        onSuccess() {
          pageContext.onLoad()
        }
      })      
    }
  })

  function selectApplcDe(applcDe) {
    models.applcDe = applcDe    
    ApiService.call((axios, callback) => axios.get('vhcleHoldCo/' + applcDe).then(callback), {
      onSuccess(data) {
        models.data = data.data
        listContext.listData = data.data
      }
    })
  }
</script>
<style scoped>
  .active {
    background-color: bisque;
  }
</style>