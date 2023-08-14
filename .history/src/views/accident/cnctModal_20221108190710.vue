<template>
  <BaseForm :formContext="formContext">
    <BaseList :listContext="listContext"></BaseList>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import MomentService from '@/core/services/MomentService'
    
  const models = reactive<any>({
    
  })
  
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    isUpdate: false,
    isDelete: false,
    modal: {
      title: '계약서검색',
      width: '1400px',
      onOpen(data) {
        
      }
    },
    addClick(row) {
      
    },
    updateClick(row) {
      
    },
    deleteClick(row) {          
      
    },
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "계약번호", key: "cnctNo", width: 120, sortable: true },
      { name: "차종코드", key: "vhctyCode", sortable: true },
      { name: "차량명", key: "vhctyNm", width: 200, sortable: true },
      { name: "차량번호", key: "vhcleNo", width: 200, sortable: true },
      { name: "임차인명", key: "drver1Nm", width: 150, sortable: true },
      { name: "전화번호", key: "drver1CttpcEncpt", width: 150, sortable: true },
      { name: "운전자명", key: "drver2Nm", width: 150, sortable: true },
      { name: "전화번호", key: "drver2CttpcEncpt", width: 150, sortable: true, }
    ],
    perPage: 999,
    search: {
      types: [
        { text: '미결자료', value: '01'},
        { text: '완료자료', value: '02'},
      ],
      buttons: {
        
      },
      data: {
        sDate: MomentService.now(),
        eDate: MomentService.now(),
      }
    },
    onSearch(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => axios.get("accident/cnct", { params: params}).then(callback), {
        onSuccess(data) {
          listContext.listData = data.data
        }
      })
    },
    onListView(row) {
      formContext.modal?.close?.(row)
    }
  })

  defineExpose({
    formContext: formContext,
  })
</script>

<style>

</style>