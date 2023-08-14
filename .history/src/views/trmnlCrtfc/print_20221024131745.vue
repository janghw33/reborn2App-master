<!-- 
  created: 장형욱 
-->
<template>
  <BasePopup ref="basePopup" :popupContext="popupContext">
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
    <template v-slot:footer>
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
  </BasePopup>
</template>

<script lang="ts">
  import { computed } from 'vue'
  import BasePopup, { PopupContext } from '@/components/reborn/BasePopup.vue'
  import { useRoute } from 'vue-router'

  export default {
    components: {
      BasePopup
    },
    setup() {
      const route = useRoute()
      const query = route.query

      const popupContext: PopupContext = {
        title: '월간 차량별 사고현황',
        header: [
          { name: "단말기 코드", key: "trmnlCode", width: 200, sortable: true },
          { name: "단말기 인증 번호", key: "trmnlCrtfcNo", sortable: true },
          { name: "단말기 명", key: "trmnlNm", width: 200, sortable: true },
          { name: "단말기 설명 내용", key: "trmnlDcContents", width: 200, sortable: true },
          { name: "사용 여부", key: "useYn", width: 200, sortable: true },
        ],
        itemBinding(row) {
          row.acdntProcessMth1 = (row.acdntProcessMthCode?.indexOf('1') >= 0) ? '처리' : '미처리'
          row.acdntProcessMth2 = (row.acdntProcessMthCode?.indexOf('2') >= 0) ? '처리' : '미처리'
          row.mycarInsrncSbscrbYn = row.mycarInsrncSbscrbYn == 'Y' ? '가입' : '미가입'
          row.comptYn = row.comptYn == 'Y' ? '완결' : '미완결'
          row.cnctNo = row.cnctNo == null ? '미계약' : '계약'
        }
      }

      const getValue = computed(() => {
        return(val: string | null, source: any) => {
          if (val == null) {
            return '전체'
          }
          else {
            return source[val]
          }
        }
      })

      const summary = {
        a: computed(() => {
          return popupContext.gridData?.reduce((a, b) => {
            return a + (b.cnctNo == '계약' ? 1 : 0)
          }, 0)
        }),
        b: computed(() => {
          return popupContext.gridData?.reduce((a, b) => {
            return a + b.estimatePrice
          }, 0)
        }),
        c: computed(() => {
          return popupContext.gridData?.length ?? 0
        }),
        d: computed(() => {
          return popupContext.gridData?.reduce((a, b) => {
            return a + b.recompense
          }, 0)
        }),
        e: computed(() => {
          return popupContext.gridData?.reduce((a, b) => {
            return a + (b.mycarInsrncSbscrbYn == '가입' ? 1 : 0)
          }, 0)
        }),
        f: computed(() => {
          return popupContext.gridData?.reduce((a, b) => {
            return a + b.receivable
          }, 0)
        }),
      }
      
      return {
        popupContext,
        query,
        getValue,
        summary
      }
    }
  }
</script>

