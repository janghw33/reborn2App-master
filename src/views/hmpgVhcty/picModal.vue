<template>
  <BaseForm :formContext="formContext">
    
  </BaseForm>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, watchEffect } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import { FormRules } from 'element-plus'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import ElTable, { IElTableContext } from '@/components/reborn/ElTable.vue'
  import MomentService from '@/core/services/MomentService'
  import ApiService from '@/core/services/ApiService'
  import { useStore } from "vuex";

  const store = useStore()
  const user = store.getters.currentUser
  
  const models = reactive<any>({
    data: {},
    depositList: [],
    deskList: [],
    paySeList: []
  })
  
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    isUpdate: false,
    isDelete: false,
    modal: {
      title: '홈피차량 이미지',
      width: '1000px',
      onOpen(data) {
        models.data.paySe = MomentService.now()
        formContext.formData = data
        console.log(data)

      }
    },
    addClick(row) {
      
    },
    updateClick(row) {
      
    },
    deleteClick(row) {          
      
    },
  })

  const elTableContext = reactive<IElTableContext>({
    data: [],
    headers: [
      { key: "payDe", label: "입금일자", },
      { key: "paySeContents", label: "입금방법", },
      { key: "repairAmount", label: "수리금액", },
      { key: "idlecarRewardAmount", label: "휴차보상금액", },
      { key: "noresponsAmount", label: "면책금액", },
      { key: "deskNm", label: "수납데스크", },
      { key: "userNm", label: "수납사원", },
      { key: "etcContents", label: "비고", },
    ]
  })

  watchEffect(() => {
  })

  defineExpose({
    formContext: formContext,
  })
</script>

<style>

</style>