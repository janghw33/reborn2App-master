<!--
  created: 이진우
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button></template>
    </BaseList>
    <View ref="view" :menu-list="models.menuList">
    </View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed, watchEffect } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import { Code } from '@/enums'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'

  const models = reactive<any>({
    data: [],
    menuList: [],             // 메뉴 목록
  })

  const view = ref<InstanceType<typeof View>>()
  const pageContext = reactive<IPageContext>({
    pageTitle: '사용자 그룹 관리',
    breadcrumbs: ['환경설정', '사용자 관리'],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "사용자 그룹명", key: "userGroupNm", width: 200, sortable: true },
      { name: "사용여부", key: "useYn", sortable: true, callback: (row) => row.useYn == 'Y' ? '사용' : '미사용' },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
      },
      data: {
        useYn: 'Y'
      }
    },
    reSearch(searchFilter: ISearchFilter) {
      if (searchFilter.useYn == 'Y')
        listContext.listData = models.data.filter(f => f.useYn === 'Y' && f.userGroupNm.indexOf(searchFilter.searchWord) >= 0)
      else
        listContext.listData = models.data.filter(f => f.userGroupNm.indexOf(searchFilter.searchWord) >= 0)
    },
    onSearch(searchFilter: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => axios.get('user/search', { params: params}).then(callback), {
        onSuccess(data) {
          listContext.listData = data.data
        }
      })
    },
    onReload(searchFilter: ISearchFilter) {
      ApiService.call((axios, callback) => axios.get('userGroup').then(callback), {
        onSuccess(data) {
          models.data = data.data
          models.menuList = data.models['menuList']
          listContext.listData = data.data
        }
      })
    },
    onListView(data) {
      view.value?.formContext.modal?.openView?.(data)
    }, 
    onAddClick() {
      view.value?.formContext.modal?.openAdd?.()
    },
  })
</script>