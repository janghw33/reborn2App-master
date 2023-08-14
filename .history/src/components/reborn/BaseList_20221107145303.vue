<template>
  <div>
    <div class="row mb-5">
      <BaseSearch :listContext="listContext" 
        @search="listContext.onSearch" 
        @reload="listContext.onReload" 
        @add="listContext.onAddClick"
        @export="listContext.onExportClick"
        @delete="listContext.onDeleteClick"
        @print="listContext.onPrintClick">
        <template #custom>
          <slot name="custom"></slot>
        </template>
        <template #extend>
          <slot name="extend"></slot>
        </template>
        <template #button>
          <slot name="button"></slot>
        </template>
      </BaseSearch>
    </div>
    <div class="row">
      <slot name="left-body"></slot>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div
              class="stepper stepper-links d-flex flex-column"
              style="cursor:pointer"
              id="kt_create_account_stepper"
              v-if="listContext.stepper != null"
            >
              <div class="stepper-nav py-1">
                <div class="stepper-item" @click="methods.stepperChange(idx)" :class="{current: listContext.stepper?.idx == idx}" v-for="(step, idx) in listContext.stepper?.titles" :key="step" data-kt-stepper-element="nav">
                  <h3 class="stepper-title">{{ step }}</h3>
                </div>
              </div>
            </div>
            <Datatable
              ref="dataTable"
              :table-header="listContext.headers"
              :table-data="listContext.listData"
              :total="totalCount"
              :rows-per-page="listContext.perPage"
              :select-changed="methods.selectChange"
              v-if="listContext.stepper?.idx == 0">
              <template
                v-slot:[`cell-${header.key}`]="{ rowIdx, row }"
                v-for="header in listContext.headers"
                :key="header.key">
                <slot :name="`cell-${header.key}`" :rowIdx="rowIdx" :row="row" :codeText="pageContext?.codeText">
                  {{ methods.getRowValue(header, row) }}
                </slot>
              </template>
              <template v-slot:cell-footer>
                <slot name="cell-footer"></slot>
              </template>
            </Datatable>
            <template v-for="(step, stepIdx) in listContext.stepper?.titles">
              <slot :name="'step-' + stepIdx" v-if="stepIdx == listContext.stepper?.idx"></slot>
            </template>
          </div>
        </div>
      </div>
      <slot name="right-body"></slot>
    </div>    
  </div>
</template>

<script lang="ts">
export interface IListContext<T = any> {
    listData: Array<T>
    headers: Array<IHeaderConfiguration>
    perPage: number
    search?: {
      types?: Array<ISearchType>
      buttons?: {
        isSearchWord?: boolean
        isPrint?: boolean
        isExport?: boolean
        isAdd?: boolean
        isDelete?: boolean
      }
      data?: ISearchFilter
    },
    stepper? : IStepper
    onListView(row: T): void
    itemBinding?(row: T, util: any): void
    onChangeStepper?(index: number): void
    reSearch?(searchFilter: ISearchFilter): void
    onReload?(searchFilter?: ISearchFilter): void
    onSearch?(searchFilter?: ISearchFilter): void
    onAddClick?(): void
    onDeleteClick?(): void
    onExportClick?(): void
    onPrintClick?(callback: (printConfig: IPrintConfig, listData: any, payload?: any) => void): void
  }

  export interface ISearchFilter {
    sDate?: string | null
    eDate?: string | null
    searchType?: string
    searchWord?: string
    useYn?: any
    deleteYn?: any
  }

  export interface ISearchType {
    value: string,
    text: string,
  }

  interface IStepper {
    idx?: number
    titles: Array<string>
  }

  export default {
    name: 'baseList'
  }
</script>

<script lang="ts" setup>
  import { computed, getCurrentInstance, inject, onMounted, watch } from 'vue'
  import BaseSearch from './BaseSearch.vue';
  import Datatable, { IHeaderConfiguration } from "@/components/kt-datatable/KTDatatable.vue";
  import { IPageContext } from './BasePage.vue';
  import type { IPrintConfig } from './BasePrint.vue'
  import { Context } from '@/enums'

  interface Props {
    listContext: IListContext<any>
  }

  const props = withDefaults(defineProps<Props>(), {

  })
  const listData = computed(() => props.listContext.listData)
  const pageContext = inject<IPageContext>(Context.PageContext)
  const totalCount = computed(() => props.listContext.listData.length ?? 0)
  const app = getCurrentInstance()
  const comma = app?.appContext.config.globalProperties.$comma

  watch(listData, val => {
    val = val.map(m => {
      props.listContext.itemBinding?.(m, { codeText: pageContext?.codeText })
      return m
    })
  })

  onMounted(() => {
    props.listContext.stepper ??= {
      idx: 0,
      titles: [],
    }

    if (props.listContext.stepper.idx == null) {
      props.listContext.stepper.idx = 0
    }
  })

  const methods = {
    getRowValue(header: IHeaderConfiguration, row: any) {
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
    },
    selectChange(row: any) {
      row = JSON.parse(JSON.stringify(row))
      props.listContext.onListView(row)
    },
    stepperChange(idx) {
      props.listContext.stepper!.idx = idx
      props.listContext.onChangeStepper?.(idx)
    }
  }
</script>

<style>

</style>