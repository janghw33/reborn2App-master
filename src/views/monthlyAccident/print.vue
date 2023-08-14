<!--
  created: 이진우
-->
<template>
  <BasePage :pageContext="pageContext">
    <BasePrint :printContext="printContext">
      <template v-slot:header="{ codeText }">
        <tbody>
          <tr>
            <td colspan="4">
              사고기간 : {{ models.search.sDate }} ~ {{ models.search.eDate }}
            </td>
          </tr>
          <tr>
            <td>사고처리 : {{ getValue(models.search.searchType1, {N: '미결', Y: '완결'}) }}</td>
            <td>일반처리 : {{ getValue(models.search.searchType2, {N: '미처리', Y: '처리'}) }}</td>
            <td>상대방처리 : {{ getValue(models.search.searchType3, {N: '미처리', Y: '처리'}) }}</td>
            <td>자차가입 : {{ getValue(models.search.searchType4, {N: '미가입', Y: '가입'}) }}</td>
          </tr>
          <tr>
            <td>차량번호 : {{ models.search.searchType5 || '전체' }}</td>
            <td>사고자 : {{ codeText?.('CUST012', models.search.searchType6) ?? '전체' }}</td>
            <td>사고장소 : {{ codeText?.('CUST013', models.search.searchType7) ?? '전체' }}</td>
            <td>사고종류 : {{ codeText?.('CUST015', models.search.searchType8) ?? '전체' }}</td>
          </tr>
          <tr>
            <td>사고원인 : {{ codeText?.('CUST014', models.search.searchType9) ?? '전체' }}</td>
            <td>사고유형 : {{ codeText?.('CUST016', models.search.searchType10) ?? '전체' }}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </template>
      <template #footer>
        <thead style="font-size:14pt">
          <tr>
            <th>총계약건수</th>
            <th>예정총금액</th>
            <th>사고건수</th>
            <th>배상총금액</th>
            <th>자차가입건수</th>
            <th>미수총금액</th>
          </tr>
        </thead>
        <tbody style="font-size:14pt; text-align: right">
          <tr>
            <td class="pe-3">{{ $comma(summary.a.value) }}</td>
            <td class="pe-3">{{ $comma(summary.b.value) }}</td>
            <td class="pe-3">{{ $comma(summary.c.value) }}</td>
            <td class="pe-3">{{ $comma(summary.d.value) }}</td>
            <td class="pe-3">{{ $comma(summary.e.value) }}</td>
            <td class="pe-3">{{ $comma(summary.f.value) }}</td>
          </tr>
        </tbody>
      </template>
    </BasePrint>
  </BasePage>  
</template>

<script lang="ts" setup>
  import { computed, reactive } from 'vue'
  import BasePrint, { IPrintContext } from '@/components/reborn/BasePrint.vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import { Code } from '@/enums'

  const models = reactive<any>({
    search: {}
  })

  const pageContext = reactive<IPageContext>({
    pageTitle: '월간사고현황',
    breadcrumbs: [],
    onLoad() {
      
    }
  })

  const printContext: IPrintContext = {
    printData: [],
    headers: [
      { name: "사고일지", key: "acdntDe", width: 100, sortable: true },
      { name: "차번", key: "vhcleNo", width: 120, sortable: true, callback: (row) => row.vhcle.vhcleNo },
      { name: "운전자", key: "mycarDrverNm", width: 200, sortable: true },
      { name: "사고자", key: "acdntSeCode", width: 120, sortable: true, groupCode: Code.CUST012 },
      { name: "사고장소", key: "acdntPlcCode", width: 120, sortable: true, groupCode: Code.CUST013 },
      { name: "사고종별", key: "acdntKndCode", width: 120, sortable: true, groupCode: Code.CUST015 },
      { name: "사고원인", key: "acdntCauseCode", width: 200, sortable: true, groupCode: Code.CUST014, },
      { name: "사고유형", key: "acdntTyCode", width: 100, sortable: true, groupCode: Code.CUST016 },
      { name: "일반", key: "acdntProcessMth1", width: 100, sortable: true, callback: (row) => row.acdntProcessMthCode?.indexOf('1') >= 0 ? '처리' : '미처리' },
      { name: "상대방", key: "acdntProcessMth2", width: 100, sortable: true, callback: (row) => row.acdntProcessMthCode?.indexOf('2') >= 0 ? '처리' : '미처리' },
      { name: "자차", key: "mycarInsrncSbscrbYn", width: 100, sortable: true, callback: (row) => row.mycarInsrncSbscrbYn == 'Y' ? '가입' : '미가입' },
      { name: "완결", key: "comptYn", width: 100, sortable: true, callback: (row) => row.comptYn == 'Y' ? '완결' : '미완결' },
      { name: "예정금액", key: "estimatePrice", width: 120, sortable: true },
      { name: "배상입금", key: "recompense", width: 120, sortable: true },
      { name: "미수금액", key: "receivable", width: 120, sortable: true },
      { name: "계약", key: "cnctNo", width: 100, sortable: true, callback: (row) => row.cnctNo != null ? '계약' : '미계약' },
    ],
    onLoad(payload: any) {
      this.printData = payload.listData
      models.search = payload.search
    },
    itemBinding(row, { codeText }) {
      row.bcncGradCode = codeText(Code.CUST002, row.bcncGradCode)
      row.wkendDfkSeValue = row.wkendDfkSeValue?.split(',').map(m => week.find(f => f.value == m)?.title).join(',')
    }
  }

  const getValue = computed(() => {
    return(val: string, source: any) => {
      if (val == '') {
        return '전체'
      }
      else {
        return source[val]
      }
    }
  })

  const week = [
    { value: 2, title: "월" },
    { value: 3, title: "화" },
    { value: 4, title: "수" },
    { value: 5, title: "목" },
    { value: 6, title: "금" },
    { value: 7, title: "토" },
    { value: 1, title: "일" },
  ]

  const summary = {
    a: computed(() => {
      return printContext.printData?.reduce((a, b) => {
        return a + (b.cnctNo == '계약' ? 1 : 0)
      }, 0)
    }),
    b: computed(() => {
      return printContext.printData?.reduce((a, b) => {
        return a + b.estimatePrice
      }, 0)
    }),
    c: computed(() => {
      return printContext.printData?.length ?? 0
    }),
    d: computed(() => {
      return printContext.printData?.reduce((a, b) => {
        return a + b.recompense
      }, 0)
    }),
    e: computed(() => {
      return printContext.printData?.reduce((a, b) => {
        return a + (b.mycarInsrncSbscrbYn == '가입' ? 1 : 0)
      }, 0)
    }),
    f: computed(() => {
      return printContext.printData?.reduce((a, b) => {
        return a + b.receivable
      }, 0)
    }),
  }

  
</script>

