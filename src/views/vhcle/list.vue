<!--
  created: 이진우
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button></template>
      <template #custom>
        <FormItem label="차종" label-width="60px">
          <Input type="select" v-model="customSearch.vhctyCode" :data-source="models.vhctyRows" style="width: 160px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
            </template>
            <template #item="{ item }">
              <el-option :value="item.vhctyCode" :label="item.vhctyNm"></el-option>
            </template>
          </Input>
        </FormItem>
        <FormItem label="소속구분" label-width="90px">
          <Input type="select" v-model="customSearch.vhclePsitnCode" style="width: 160px" group-code="CUST023">
            <template #custom>
              <el-option value="" label="전체"></el-option>
            </template>
            <template #item="{ item }">
              <el-option :value="item.vhctyCode" :label="item.vhctyNm"></el-option>
            </template>
          </Input>
        </FormItem>
      </template>
      <template #right-body>
        <div class="col-3">
          <div class="card card-flush">
            <div class="card-body" style="padding: 0px 20px">
              <label style="display: flex; justify-content: center">차종별 현황</label>
              <table class="table align-middle table-row-dashed fs-6 dataTable no-footer">
                <thead>
                  <tr
                    class="text-start text-gray-600 fw-bolder fs-7 text-uppercase gs-0">
                    <th>차종</th>
                    <th class="text-center">대수</th>
                  </tr>
                </thead>
                <tr v-for="row in models.vhcleCount" :key="row.vhctyCode">
                  <td class="fw-bold text-gray-800">
                    {{ row.vhctyNm }}
                  </td>
                  <td class="text-center">
                    {{ row.cnt }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </template>
    </BaseList>    
    <View ref="view" 
      :vhcty-rows="models.vhctyRows"
      :navi-rows="models.naviRows">
    </View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import { Code } from '@/enums'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'

  const models = reactive<any>({
    // 차종목록
    vhctyRows: [],

    // 차종별 현황
    vhcleCount: [],

    // 네비목록
    naviRows: [],
  })

  const view = ref<InstanceType<typeof View>>()

  const customSearch = reactive<any>({
    vhctyCode: null,
    vhclePsitnCode: null,
  });

  const pageContext = reactive<IPageContext>({
    pageTitle: '차량대장',
    breadcrumbs: ["기초자료", "차량정보"],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "차량일련번호", key: "vhcleSn", sortable: true, width: 100, },
      { name: "차번", key: "vhcleNo", sortable: true, },
      { name: "차종코드", key: "vhctyCode", sortable: true, },
      { name: "차종", key: "vhctyNm", sortable: true, },
      { name: "소속구분", key: "vhclePsitnCode", sortable: true, groupCode: Code.CUST023 },
      { name: "최초등록일", key: "vhcleRegistDe", sortable: true, },
      { name: "운행구분", key: "opratSeCode", sortable: true, groupCode: Code.SYSM026 },
      { name: "사용여부", key: "useYn", sortable: true, callback: (row) => row.useYn == 'Y' ? '사용중' : '사용안함' },
    ],
    perPage: 17,
    search: {
      types: [
        { value: 'vhcleNo', text: '차번' },
      ],
      buttons: {
        isAdd: true,
        isExport: true,
      },
      data: {
        useYn: 'Y'
      }
    },
    onReload(searchFilter: ISearchFilter) {
      const params = { search: { ...searchFilter, ...customSearch } }
      ApiService.call((axios, callback) => axios.get('vhcle', { params: params }).then(callback), {
        onSuccess(data) {
          listContext.listData = data.data
          models.vhctyRows = data.models.vhctyRows
          models.vhcleCount = data.models.vhcleCount
          models.naviRows = data.models.naviRows
        }
      })
    },
    onSearch(searchFilter: ISearchFilter) {      
      const params = { search: { ...searchFilter, ...customSearch } }
      ApiService.call((axios, callback) => axios.get('vhcle/search', { params: params }).then(callback), {
        onSuccess(data) {
          listContext.listData = data.data
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