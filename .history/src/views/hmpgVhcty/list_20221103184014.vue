<!-- 
  created: 장형욱 
-->
<template>
  <BasePage :pageContext="pageContext">
    {{models.insrncList}}
    <BaseList :listContext="listContext">
    </BaseList>
    <View ref="view" :insrncList="models.insrncList" :vhctyList="models.vhctyList"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import { useRouter } from 'vue-router';
  
  const router = useRouter()
  const models = reactive<any>({
    insrncList: [],
    vhctyList: []
  })
  const view = ref<InstanceType<typeof View>>()
  const pageContext = reactive<IPageContext>({
    pageTitle: '차량노출 관리',
    breadcrumbs: ['홈페이지 관리'],
    onLoad() {
      listContext.onReload?.()
    },
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
    { name: "추천여부", key: "recomendYnTxt", width: 120, sortable: true },
    { name: "차종", key: "vhctyNm", width: 120, sortable: true },
    { name: "일반보험", key: "gnrlInsrncSn", width: 120, sortable: true },
    { name: "완전보험", key: "prfectInsrncSn", width: 120, sortable: true },
    { name: "프리미엄 여부", key: "expsrGradCode", width: 120, sortable: true },
    { name: "판매 여부", key: "sleYnTxt", width: 120, sortable: true },
    { name: "작성시간", key: "acdntReprtSn", width: 120, sortable: true },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
      },
    },
    itemBinding(row) {
      row.recomendYnTxt = row.recomendYn = 'Y' ? '사용' : '미사용'
      row.sleYnTxt = row.sleYn = 'Y' ? '판매' : '미판매'
      row.expsrGradCodeTxt = row.expsrGradCode = 'P' ? '이용' : '이용안함'
      row.gnrlInsrncSn = models.insrncList.insrncKndNm
    },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (f.vhctyNm?.indexOf(searchFilter.searchWord) >= 0 ||
        f.sleYn?.indexOf(searchFilter.searchWord) >= 0)
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }

      ApiService.call((axios, callback) => axios.get('hmpgVhcty', {params: params}).then(callback), {
        onSuccess(data) {
          models.insrncList = data.models['insrncList']
          models.vhcryList = data.models['vhctyList']
          listContext.listData = data.data
        }
      })
     

    },
    onListView(row) {
      view.value?.formContext.modal?.openView?.(row)
    }
  })
</script>