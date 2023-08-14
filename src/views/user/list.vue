<!--
  created: 이진우
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button></template>
    </BaseList>    
    <View ref="view" 
      :desk-list="models.deskList" 
      :user-group-list="models.userGroupList"
      :bcnc-list="models.bcncList"
      :menu-list="models.menuList">
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
  import { useStore } from "vuex";

  const store = useStore()
  const user = store.getters.currentUser

  const models = reactive<any>({
    deskList: [],             // 데스크 목록
    userGroupList: [],        // 유저그룹 목록
    bcncList: [],             // 소속거래처 목록
    menuList: [],             // 메뉴 목록
  })

  const view = ref<InstanceType<typeof View>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '사용자 등록',
    breadcrumbs: ["환경설정", "사용자 관리"],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "작업자 아이디", key: "userId", sortable: true, width: 200, },
      { name: "전화번호", key: "tlphonNoEncpt", sortable: true, },
      { name: "작업자 명", key: "userNm", width: 200, sortable: true, },
      { name: "작업자 구분", key: "userSeCode", width: 200, sortable: true, hidden: (user.mosaicarYn == 'Y'), groupCode: Code.USER001 },
      { name: "소속 거래처", key: "bcncNm", width: 300, sortable: true, hidden: (user.mosaicarYn == 'Y'), callback: (row) => row.bcnc.bcncNm },
      { name: "할인한도율", key: "dscntLmttRt", width: 100, sortable: true, hidden: (user.mosaicarYn == 'Y'), },
      { name: "사용여부", key: "useYn", width: 100, sortable: true, callback: (row) => row.useYn == 'Y' ? '사용' : '미사용' },
    ],
    perPage: 17,
    search: {
      types: [
        { value: 'userId', text: '아이디' },
        { value: 'tlphonNoIdentno', text: '전화번호' },
        { value: 'userNm', text: '작업자명' },
        { value: 'bcncNm', text: '거래처' },
      ],
      buttons: {
        isAdd: true,
      },
      data: {
        useYn: 'N'
      }
    },
    onSearch(searchFilter: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => {
        axios.get('user/search', { params: params}).then(callback)
      }, {
        onSuccess(data) {
          listContext.listData = data.data
        }
      })
    },
    onReload(searchFilter: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => {
        axios.get('user', { params: params }).then(callback)
      }, {
        onSuccess(data) {
          models.deskList = data.models['deskList']
          models.userGroupList = data.models['userGroupList']
          models.bcncList = data.models['bcncList']
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