<template>
  <BasePage :pageContext="pageContext">
    {{models.data}}
    <BaseList :listContext="listContext">
    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, watchEffect} from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
import axios from 'axios'

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
      { name: "카테고리", key: "deskCode", width: 200, sortable: true },
      { name: "제목", key: "deskCode", width: 200, sortable: true },
      { name: "내용", key: "deskCode", width: 200, sortable: true },
      { name: "작성자", key: "deskCode", width: 200, sortable: true },
      { name: "작성시간", key: "deskCode", width: 200, sortable: true },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd:true
      },
      data: {
        useYn: 'Y'
      }
    },
    itemBinding(row) {
      row.useYN = row.useYn == 'Y' ? '사용' : '미사용'
    },
    reSearch(searchFilter: ISearchFilter) {
      listContext.listData = models.data.filter(f => {
        return (f.ctgryCode?.indexOf(searchFilter.searchWord) >= 0 ||
        f.wrterNm?.indexOf(searchFilter.searchWord) >= 0 || 
        f.bbscttTitle?.indexOf(searchFilter.searchWord) >= 0)
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }

      ApiService.call(axios, callback) => axios.get('hmpgBbs', {params: params}).then(callback), {
        onSuccess(data) {}
      }
    }
  })
</script>