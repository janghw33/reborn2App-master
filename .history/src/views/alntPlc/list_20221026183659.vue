<!-- 
  created: 장형욱 
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">

    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import BasePage, { IPageContext } from "@/components/reborn/BasePage.vue"
  import BaseList, { IListContext, ISearchFilter } from "@/componentes/reborn/BaseList.vue"
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'

  const view = ref<InstanceType<typeof View>>()
  const models = reactive<any>({
    data: [],
  })
  const pageContext = reactive<IPageContext>({
    pageTitle: '배차장소',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    }
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "배차장소코드", key: "alntPlcCode", width: 100, sortable: true },
      { name: "배차장소명", key: "alntPlcNm", sortable: true },
      { name: "지역", key: "areaSeCode", width: 150, sortable: true, groupCode: 'CUST019' },
      { name: "차고지", key: "garageNm", width: 150, sortable: true },
      { name: "배/회차료", key: "alntRetuncarChrge", width: 100, sortable: true },
      { name: "사용여부", key: "useYn", width: 50, sortable: true }
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
        isExport: true,
      },
      data: {
        useYn: 'Y'
      }
    },
    itemBinding(row) {
      row.useYnTxt = row.useYn == 'Y' ? '사용함' : '사용안함'
    },
    reSearch(searchFIlter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (f.alntPlcNm?.indexOf(searchFIlter.searchWord) >=0)
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = {search: searchFIlter }

      ApiService.call((axios, callback) => axios.get('acnt', {params: params}).then(callback), {
        onSuccess(data) {
          models.data = data.data
          listContext.data = data.data
        }
      })
    },
    onListView(row) {
      view.value?.formContext.modal?.openAdd?.()
    },
    onAddClick() {
      view.value?.formContext
    }
  })

  export default defineComponent({
    name: "alntPlcList",
    components: {
      BaseList,
      View,
      RebornControl
    },
    setup(props, { emit }) {
      const view = ref<InstanceType<typeof View>>();

        const pageData = reactive<any>({
        data: [],
        garageRows: []
      })

      const context: IContext = reactive<IContext>({
        pageTitle: '배차장소',
        breadcrumbs: ['기초자료'],
        header: [
          { name: "배차장소코드", key: "alntPlcCode", width: 100, sortable: true },
          { name: "배차장소명", key: "alntPlcNm", sortable: true },
          { name: "지역", key: "areaSeCode", width: 150, sortable: true, groupCode: 'CUST019' },
          { name: "차고지", key: "garageNm", width: 150, sortable: true },
          { name: "배/회차료", key: "alntRetuncarChrge", width: 100, sortable: true },
          { name: "사용여부", key: "useYn", width: 50, sortable: true }
        ],
        tableData: [],
        itemBinding(row, { codeText }) {
          
        },
        perPage: 999,
        searchBar: {
          filters: [],
          isDateFilterVisible: false,
          isBtnAddVisible: true,
          isBtnDeleteVisible: false,
          isBtnExportVisible: true,
          isBtnPrintVisible: false,
          data: {
            useYn: 'Y'
          },
          reSearch(searchType: IBaseListSearch) {
            if (searchType.useYn == 'Y')
              context.tableData = pageData.data.filter(f => f.useYn === 'Y' &&
              (f.alntPlcNm?.indexOf(searchType.searchWord) >= 0 || f.garageNm?.indexOf(searchType.searchWord) >= 0)
              )
            else
              context.tableData = pageData.data.filter(f => 
              (f.alntPlcNm?.indexOf(searchType.searchWord) >= 0 || f.garageNm?.indexOf(searchType.searchWord) >= 0)
              )
          }
        },
        printPopup: {
        },
        events: {
          onBaseListLoad(searchType?: IBaseListSearch) {
            ApiService.get("alntPlc").then(({data}) => {              
              pageData.data = data.data
              context.tableData = data.data
            })
          },
          onBaseListSearch(searchType?: IBaseListSearch) {
          },
          onBaseListReload(searchType?: IBaseListSearch) {
            this.onBaseListLoad()
          },
          onBaseListDelete(rows?: any[]) {
            
          },
          onBaseListExport(rows?: any[]) {
            
          },
          onBaseListStepperChange(index: number) {
            
          },
          onBaseListAdd() {

          },
          onBaseListChanged(row: any, index: number) {

          },
        }
      });
      

      return {
        context,
        pageData,
        view
      };
    },
  });
</scrip>

<style>
</style>