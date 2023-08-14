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
  import { reactive, ref} from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import View from './view.vue'
  import ApiService from '@/core/services/ApiService';

  const models = reactive<any>({
    data: [],
  })

  const view = ref<InstanceType<typeof View>>()
  const pageContext = reactive<IPageContext>({
    pageTitle: '게시판 관리',
    breadcrumbs: ['홈페이지 관리'],
    onLoad() {
      listContext.onReload?.()
    },
  })
  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "카테고리", key: "ctgryCode", width: 200, sortable: true },
      { name: "제목", key: "bbscttTitle", width: 200, sortable: true },
      { name: "내용", key: "bbscttContents", width: 200, sortable: true },
      { name: "작성자", key: "wrterNm", width: 200, sortable: true },
      { name: "작성시간", key: "deskCode", width: 200, sortable: true },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true
      },
    data: {
      useYn: 'Y'
    }
  },
  itemBinding(row) {
    
  },
  reSearch(searchFilter: ISearchFilter) {
    listContext.listData = models.data.filter(f => {
      return (f.ctgryCode?.indexOf(searchFilter.searchWord) >= 0 ||
        f.bbscttContents?.indexOf(searchFilter.searchWord) >=0 ||
        f.bbscttContents?.indexOf(searchFilter.searchWord) >=0)
    })
  },
  onReload(searchFilter?: ISearchFilter) {
    const params = { search: searchFilter }
    
    ApiService.call((axios, callback) => axios.get('hmpgBbs', {params: params}).then(callback), {
      onSuccess(data) {
        models.data = data.data
        listContext.listData = data.data
      }
    })
  },
  onListView(row) {
    view.value?.formContext.modal?.openView?.(row)
  },
  onAddClick() {
      view.value?.formContext.modal?.openAdd?.()
    },
  })
</script>