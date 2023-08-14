<template>
  <BasePage :pageContext="pageContext">
    <BasePrint :printContext="printContext">
      <!--
      <template v-slot:header="{ codeText }">
        <tbody>
          <tr>
            <td colspan="4">
              사고기간 : {{ query.sDate }} ~ {{ query.eDate }}
            </td>
          </tr>
          <tr>
            <td>사고처리 : {{ getValue(query.searchType1, {N: '미결', Y: '완결'}) }}</td>
            <td>일반처리 : {{ getValue(query.searchType2, {N: '미처리', Y: '처리'}) }}</td>
            <td>상대방처리 : {{ getValue(query.searchType3, {N: '미처리', Y: '처리'}) }}</td>
            <td>자차가입 : {{ getValue(query.searchType4, {N: '미가입', Y: '가입'}) }}</td>
          </tr>
          <tr>
            <td>차량번호 : {{ query.searchType5 ?? '전체' }}</td>
            <td>사고자 : {{ codeText('CUST012', query.searchType6) ?? '전체' }}</td>
            <td>사고장소 : {{ codeText('CUST013', query.searchType7) ?? '전체' }}</td>
            <td>사고종류 : {{ codeText('CUST015', query.searchType8) ?? '전체' }}</td>
          </tr>
          <tr>
            <td>사고원인 : {{ codeText('CUST014', query.searchType9) ?? '전체' }}</td>
            <td>사고유형 : {{ codeText('CUST016', query.searchType10) ?? '전체' }}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </template>
      -->
      <template #cell-lendChrgeCl="{ row }">
        {{ row.lendChrgeCl.lendChrgeClNm }}
      </template>
      <template #cell-insrncChrgeCl="{ row }">
        {{ row.insrncChrgeCl.insrncChrgeClNm }}
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
  import { useRoute } from 'vue-router'
  import BasePrint, { IPrintContext } from '@/components/reborn/BasePrint.vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import { Code } from '@/enums'

  const route = useRoute()
  const query = route.query

  const pageContext = reactive<IPageContext>({
    pageTitle: '테스트인쇄',
    breadcrumbs: [],
    onLoad() {
      
    }
  })

  const printContext: IPrintContext = {
    printData: [],
    headers: [
      { name: "거래처코드", key: "bcncCode", width: 200, sortable: true },
      { name: "거래처명", key: "bcncNm", sortable: true },
      { name: "구분", key: "bcncSeCode", width: 100, sortable: true, groupCode: Code.SYSM009 },
      { name: "대여요금 유형", key: "lendChrgeCl", width: 150, sortable: true },
      { name: "보험요금 유형", key: "insrncChrgeCl", width: 150, sortable: true },
      { name: "할인적용 등급", key: "bcncGradCode", width: 150, sortable: true },
      { name: "주말구분", key: "wkendDfkSeValue", width: 100, sortable: true },
      { name: "등록일시", key: "frstRegistDt", width: 200, sortable: true },
    ],
    onLoad(payload: any) {
      this.printData = payload.listData
    },
    itemBinding(row, { codeText }) {
      row.bcncGradCode = codeText(Code.CUST002, row.bcncGradCode)
      row.wkendDfkSeValue = row.wkendDfkSeValue?.split(',').map(m => week.find(f => f.value == m)?.title).join(',')
    }
  }

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

