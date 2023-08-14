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
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './View.vue'

  const view = ref<InstanceType<typeof View>>()
    const models = reactive<any>({
    data: [],
  })
  const pageContext = reactive<IPageContext>({
    pageTitle: '데스크 등록',
    breadcrumbs: ['기초자료'],
    onLoad() {
      listContext.onReload?.()
    },
  })
  const listContext = reactive = reactive<IListContext>({
    listData: [],
  })</IListContext>

  export default defineComponent({
    
    },
 {
    ;

        const pageData = reactive<any>({
        data: []
      })

      const context: IContext = reactive<IContext>({
        pageTitle: '입금계좌',
        breadcrumbs: ['기초자료'],
        header: [
          { name: "은행계좌 코드", key: "acntSn", width: 120, sortable: true },
          { name: "은행명", key: "acntBankNm", width: 120, sortable: true },
          { name: "계좌번호", key: "acntNo", width: 200, sortable: true },
          { name: "예금주", key: "acntDpstrNm", width: 120, sortable: true },
          { name: "사용여부", key: "useYn", width: 40, sortable: true }
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
              (f.acntBankNm.indexOf(searchType.searchWord) >= 0 || f.acntDpstrNm.indexOf(searchType.searchWord) >= 0 ))
            else
              context.tableData = pageData.data.filter(f => 
              (f.acntBankNm?.indexOf(searchType.searchWord) >= 0 || f.acntDpstrNm?.indexOf(searchType.searchWord) >= 0 )
              )
          }
        },
        printPopup: {
        },
        events: {
          onBaseListLoad(searchType?: IBaseListSearch) {
            ApiService.get("acnt").then(({data}) => {      
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
</script>

<style>
</style>