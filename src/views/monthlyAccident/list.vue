<!--
  created: 이진우
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #custom>
        <FormItem label="사고처리" label-width="80px">
          <Input type="select" v-model="models.search.searchType1" style="width: 120px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
              <el-option value="N" label="미결"></el-option>
              <el-option value="Y" label="완결"></el-option>
            </template>
          </Input>
        </FormItem>
        <FormItem label="일반처리" label-width="80px">
          <Input type="select" v-model="models.search.searchType2" style="width: 120px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
              <el-option value="N" label="미처리"></el-option>
              <el-option value="Y" label="처리"></el-option>
            </template>
          </Input>
        </FormItem>        
        <FormItem label="상대보험사처리" label-width="120px">
          <Input type="select" v-model="models.search.searchType3" style="width: 120px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
              <el-option value="N" label="미처리"></el-option>
              <el-option value="Y" label="처리"></el-option>
            </template>
          </Input>
        </FormItem>
        <FormItem label="자차가입" label-width="80px">
          <Input type="select" v-model="models.search.searchType4" style="width: 120px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
              <el-option value="N" label="미처리"></el-option>
              <el-option value="Y" label="처리"></el-option>
            </template>
          </Input>
        </FormItem>
      </template>
      <template #extend>
        <FormItem label="차량번호별" label-width="80px">
          <Input type="select" v-model="models.search.searchType5" :data-source="models.vhcleList" style="width: 120px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
            </template>
            <template v-slot="{ item }">
              <el-option :value="item.vhcleNo" :label="item.vhcleNo">{{ item.vhcleNo }}</el-option>
            </template>
          </Input>
        </FormItem>
        <FormItem label="사고자별" label-width="80px">
          <Input type="select" v-model="models.search.searchType6" group-code="CUST012" style="width: 120px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
            </template>
          </Input>
        </FormItem>
        <FormItem label="사고장소별" label-width="90px">
          <Input type="select" v-model="models.search.searchType7" group-code="CUST013" style="width: 120px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
            </template>
          </Input>
        </FormItem>
        <FormItem label="사고종별" label-width="80px">
          <Input type="select" v-model="models.search.searchType8" group-code="CUST015" style="width: 120px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
            </template>
          </Input>
        </FormItem>
        <FormItem label="사고원인별" label-width="90px">
          <Input type="select" v-model="models.search.searchType9" group-code="CUST014" style="width: 120px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
            </template>
          </Input>
        </FormItem>
        <FormItem label="사고유형별" label-width="90px">
          <Input type="select" v-model="models.search.searchType10" group-code="CUST016" style="width: 120px">
            <template #custom>
              <el-option value="" label="전체"></el-option>
            </template>
          </Input>
        </FormItem>
      </template>
      <template v-slot:cell-footer>
        <tr style="background: #dae6ec; font-weight: 900;">
          <td colspan="6">합계</td>
          <td>
            사고 : {{ listContext.listData?.length }} 건
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td colspan="2">
            가입 : {{ methods.mycarInsrncSbscrbCnt }} 건
          </td>
          <td>
            {{ $comma(methods.totalEstimatePrice.value) }}
          </td>
          <td>
            {{ $comma(methods.totalRecompense.value) }}
          </td>
          <td>
            {{ $comma(methods.totalReceivable.value) }}
          </td>
          <td class="text-end">
            계약 : {{ methods.cnctCnt }} 건
          </td>
        </tr>
      </template>      
    </BaseList>
  </BasePage>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, watchEffect, getCurrentInstance } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import { Code } from '@/enums'
  import ApiService from '@/core/services/ApiService'  
  import MomentService from '@/core/services/MomentService'
  import { IPrintConfig } from '@/components/reborn/BasePrint.vue'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'

  const models = reactive<any>({
    vhcleList: [],
    search: {}
  })

  const customSearchFilter = reactive<any>({

  })

  const pageContext = reactive<IPageContext>({
    pageTitle: '월간사고현황',
    breadcrumbs: ["차량관리"],
    onLoad() {
      listContext.onReload?.(listContext.search?.data)
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "사고일지", key: "acdntDe", width: 100, sortable: true },
      { name: "차번", key: "vhcleNo", width: 120, sortable: true, callback: (row) => row.vhcle.vhcleNo },
      { name: "운전자", key: "mycarDrverNm", width: 200, sortable: true },
      { name: "사고자", key: "acdntSeCode", width: 120, sortable: true, groupCode: 'CUST012' },
      { name: "사고장소", key: "acdntPlcCode", width: 120, sortable: true, groupCode: 'CUST013' },
      { name: "사고종별", key: "acdntKndCode", width: 120, sortable: true, groupCode: 'CUST015' },
      { name: "사고원인", key: "acdntCauseCode", width: 200, sortable: true, groupCode: 'CUST014', },
      { name: "사고유형", key: "acdntTyCode", width: 100, sortable: true, groupCode: 'CUST016' },
      { name: "일반", key: "acdntProcessMth1", width: 100, sortable: true, callback: (row) => row.acdntProcessMthCode?.indexOf('1') >= 0 ? '처리' : '미처리' },
      { name: "상대방", key: "acdntProcessMth2", width: 100, sortable: true, callback: (row) => row.acdntProcessMthCode?.indexOf('2') >= 0 ? '처리' : '미처리' },
      { name: "자차", key: "mycarInsrncSbscrbYn", width: 100, sortable: true, callback: (row) => row.mycarInsrncSbscrbYn == 'Y' ? '가입' : '미가입' },
      { name: "완결", key: "comptYn", width: 100, sortable: true, callback: (row) => row.comptYn == 'Y' ? '완결' : '미완결' },
      { name: "예정금액", key: "estimatePrice", width: 120, sortable: true },
      { name: "배상입금", key: "recompense", width: 120, sortable: true },
      { name: "미수금액", key: "receivable", width: 120, sortable: true },
      { name: "계약", key: "cnctNo", width: 100, sortable: true, callback: (row) => row.cnctNo != null ? '계약' : '미계약' },
    ],
    perPage: 999,
    search: {
      types: [],
      buttons: {
        isPrint: true,
        isSearchWord: false,
      },
      data: {
        sDate: MomentService.add(-1, 'month'),
        eDate: MomentService.now()
      }
    },
    itemBinding(row, { codeText }) {
      
    },    
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => axios.get("monthlyAccident", { params: params }).then(callback), {
        onSuccess(data) {
          models.vhcleList = data.models['vhcleList']
          listContext.listData = data.data
        }
      })
    },
    onSearch(searchFilter?: ISearchFilter) {
      const params = { 
        search: {
          ...searchFilter,
          ...customSearchFilter,
        }
      }
      ApiService.call((axios, callback) => axios.get("monthlyAccident", { params: params }).then(callback), {
        onSuccess(data) {
          listContext.listData = data.data
        }
      })
    },
    onListView() {
      
    }, 
    onPrintClick(callback) {
      const printConfig = reactive<IPrintConfig>({
        url: 'monthlyAccident/print',
      })
      callback(printConfig, listContext.listData, {
        search: {
          ...listContext.search?.data,
          ...models.search
        }
      })
    }
  })

  watchEffect(() => {
    models.search.searchType1 ??= ''
    models.search.searchType2 ??= ''
    models.search.searchType3 ??= ''
    models.search.searchType4 ??= ''
    models.search.searchType5 ??= ''
    models.search.searchType6 ??= ''
    models.search.searchType7 ??= ''
    models.search.searchType8 ??= ''
    models.search.searchType9 ??= ''
    models.search.searchType10 ??= ''
  })

  const methods = {
    totalEstimatePrice: computed(() => {
      return listContext.listData?.reduce((a, b) => {
        return a + (b.estimatePrice ?? 0)
      }, 0)
    }),
    totalRecompense: computed(() => {
      return listContext.listData?.reduce((a, b) => {
        return a + (b.recompense ?? 0)
      }, 0)
    }),
    totalReceivable: computed(() => {
      return listContext.listData?.reduce((a, b) => {
        return a + (b.receivable ?? 0)
      }, 0)
    }),
    mycarInsrncSbscrbCnt: computed(() => listContext.listData?.filter(f => f.mycarInsrncSbscrbYn == 'Y').length),
    cnctCnt: computed(() => listContext.listData?.filter(f => f.cnctNo != null).length)
  }
</script>

<style scoped>
  .active {
    background-color: bisque;
  }
</style>