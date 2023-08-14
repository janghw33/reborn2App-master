<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button></template>
      <template #cell-vhcleNo="{ row }">
        {{ row.vhcle.vhcleNo }}
      </template>
      
      <template #cell-vhctyNm="{ row }">
        {{ row.vhcle.vhctyNm }}
      </template>
      <template #cell-mycarRentDt="{ row }">
        {{ row.mycarRentBegin }} ~ {{ row.mycarRentEnd }}
      </template>
    </BaseList>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue';
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue';
  import ApiService from '@/core/services/ApiService';
  import { Code } from '@/enums'
  import MomentService from '@/core/services/MomentService';
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const pageContext = reactive<IPageContext>({
    pageTitle: '사고보고서',
    breadcrumbs: ['차량관리'],
    onLoad() {
      listContext.onSearch?.()
    }
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "접수번호", key: "acdntReprtSn", width: 120, sortable: true },
      { name: "사고일시", key: "acdntDe", sortable: true },
      { name: "차량번호", key: "vhcleNo", width: 100, sortable: true },
      { name: "차량명", key: "vhctyNm", width: 200, sortable: true },
      { name: "운전자명", key: "mycarDrverNm", width: 200, sortable: true },
      { name: "연락처", key: "mycarDrverCttpcEncpt", width: 150, sortable: true },
      { name: "임대기간", key: "mycarRentDt", width: 300, sortable: true },
      { name: "자차보험가입여부", key: "mycarInsrncSbscrbYn", width: 120, sortable: true, callback: (row) => row.mycarInsrncSbscrbYn == 'Y' ? '가입' : '미가입' },
      { name: "보험사(자차)", key: "mycarInsrncCmpnyCode", width: 150, sortable: true, groupCode: Code.CUST008 },
      { name: "보험사(타차)", key: "somcarInsrncCmpnyCode", width: 150, sortable: true, groupCode: Code.CUST008 },
    ],
    perPage: 17,
    search: {
      types: [
        { text: '미결자료', value: '01'},
        { text: '완료자료', value: '02'},
      ],
      buttons: {
        isAdd: true,
      },
      data: {
        sDate: MomentService.now(),
        eDate: MomentService.now(),
        deleteYn: 'Y',
      }
    },
    onSearch(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => axios.get("accident/search", { params: params}).then(callback), {
        onSuccess(data) {
          listContext.listData = data.data
        }
      })
    },
    onListView(row) {
      router.push({
        path: "/accident/view",
        query: {
          acdntReprtSn: row.acdntReprtSn
        }
      })
    }
  })
</script>