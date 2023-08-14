<template>
  <div>
    <span style="display:flex; justify-content: center; font-size: 40pt; margin: 20px 0px">
      {{ pageContext?.pageTitle }}
    </span>
    <table class="table-bordered" style="margin: 20px auto; font-size: 14pt;">
      <slot name="header" :codeText="pageContext?.codeText"></slot>
    </table>
    <table class="table-bordered">
      <thead>
        <tr>
          <th v-for="row in printContext.headers" :key="row.name">{{ row.name }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="!printContext.printData">
          <tr>
            <td colspan="20" class="text-center" style="color:red">데이터 없음</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="(row, idx) in printContext.printData" :key="idx">
            <template v-for="header in printContext.headers" :key="header.key">
              <td>
                <slot :name="`cell-${header.key}`" :row="row">
                  {{ getRowValue(header, row) }}
                </slot>
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
    <table class="table-bordered" style="margin: 20px auto">
      <slot name="footer"></slot>
    </table>
    <div style="display: flex; justify-content: center">
      <button type="button" @click="print" class="btn btn-primary">인쇄</button>
    </div>
  </div>
</template>

<script lang="ts">
  export interface IPrintConfig {
    url: string,
    width?: number,
    height?: number,
  }
  
  export interface IPrintContext<T = any> {
    headers: Array<IPrintHeader>,
    printData: Array<T> | T,
    onLoad(payLoad: any): void,
    itemBinding?: (row: T, util: any) => void
  }

  interface IPrintHeader {
    name: string,
    key: string,
    width?: number,
    sortable: boolean,
    groupCode?: string,
    callback?: (row) => any,
  }

  export default {
    name: 'basePrint'
  }
</script>

<script lang="ts" setup>
  import { inject, getCurrentInstance, nextTick } from 'vue'
  import { IPageContext } from './BasePage.vue'
  import { Context } from '@/enums'

  interface Props {
    printContext: IPrintContext,
  }

  const props = defineProps<Props>()
  const app = getCurrentInstance()
  const comma = app?.appContext.config.globalProperties.$comma
  const pageContext = inject<IPageContext>(Context.PageContext)  
  const payload = JSON.parse(JSON.stringify(opener.getTableData()))
  props.printContext.onLoad(payload)
    
  nextTick(() => {
    const gridData = props.printContext.printData?.map(m => {
      return props.printContext.itemBinding?.(m, { codeText: pageContext?.codeText }) ?? m
    })
    props.printContext.printData = gridData
    pageContext?.onLoad()
  })

  function getRowValue(header: IPrintHeader, row: any) {
    const val = row[header.key]
  
    if (header.callback) {
      return header.callback(row)
    } else {
      if (header.groupCode != null) {
        return pageContext?.codeText?.(header.groupCode, val)
      } else {
        return typeof row[header.key] == 'number' ? comma(val) : val
      }
    }
  }

  const print = () => window.print()
</script>

<style lang="scss">
  $table-border-width: 1px;

  .table-bordered {
    width: 1200px;
    margin: 0 auto;
  }
  .table-bordered th {
    background-color: #ccc;
    color: #000;
    font-weight: normal;
    text-align: center;
    font-size: 12pt;
    font-weight: 900;
  }
  .table-bordered td {
    padding: 0px 4px;
    line-height: 30px;
  }
  .table-bordered {
    > :not(caption) > * {
      border-width: $table-border-width 0;

      > * {
        border-width: 0 $table-border-width;
      }
    }
  }

</style>