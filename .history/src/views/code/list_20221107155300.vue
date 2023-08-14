<!--
  created: 장형욱
-->
<template>
  <BasePage :pageContext="pageContext">
    {{listContext.listData}}
    
    <BaseList :listContext="listContext">
      <template #button>
      </template>
      <template #left-body>
        <div class="col-2">
          <div class="card  car-flush">
            <div class="card-body" style="padding: 10px 20px">
              <label style="display: flex ; justify-content: center">그룹코드</label>
              <table class="table align-middle table-row-dashed fs-6 dataTable no-footer" style="cursor:pointer">
                <tr v-for="codeInfo in models.codeList" :key="codeInfo" :class="{'active': codeInfo == models.codeInfo }">
                  <td class="fw-bolde text-gray-800 text-center" @click="selectGroupCode(codeInfo)">
                    {{ $comma(codeInfo.groupNm)}}
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
  import { reactive, ref, computed } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import Input from '@/components/reborn/Input.vue'
  import type { IPrintConfig } from '@/components/reborn/BasePrint.vue'
  import { Code } from '@/enums'
  import { Row } from 'element-plus/es/components/table-v2/src/components'
import { rowContextKey } from 'element-plus'

  const models = reactive<any>({
    data : [],
    codeList: [],
    codeInfo: null
  })

  const view = ref<InstanceType<typeof View>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '각종 코드관리',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "코드", key: "code", sortable: true, width: 300 },
      { name: "코드명", key: "codeNm", sortable: true, width: 300 },
      { name: "비고", key: "codeDc", sortable: true, width: 300 },
      { name: "사용 유무", key: "useYn", sortable: true, width: 300, callback:  (row)=> row.useYn == 'N' ? '사용안함' : '사용중' },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd:true,
      },
    },
    onReload() {
      ApiService.get("code").then(({data}) => {
        models.codeList= data.data
        if (models.codeList.length > 0) {
        selectGroupCode(models.codeList[0])
        }
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
      console.log(row)
    },
    onAddClick() {
      const data = {
        groupCode: models.codeInfo.groupCode
      }
      view.value?.formContext.modal?.openAdd?.(data)
    }
  })

  function selectGroupCode(codeInfo) {
    models.codeInfo = codeInfo
    ApiService.get(`code/${codeInfo.groupCode}`).then(({data}) => {
      models.data = data.data
      listContext.listData = data.data
      console.log(models.codeList)
    })
  }
  </script>

  <style scoped>
  .active {
    background-color: bisque
  }
  </style>
  
