<template>
  <BaseForm :formContext="formContext">
    <div class="row">
      <div class="col-3">
        <RebornControl type="text" label="거래처명" :required="true" name="bcncNm" v-model="formContext.formData.bcncNm"></RebornControl>
      </div>
      <div class="col-4">
        <div class="row">
          <div class="col-3">
            <RebornControl type="checkbox" label="거래중지" labelWidth="0px" v-model="formContext.formData.useYn" true-value="N" false-value="Y"></RebornControl>
          </div>
          <div class="col-6">
            <RebornControl type="checkbox" label="에이전트 사용중지" labelWidth="0px" v-model="formContext.formData.agentUseStpgeYn" true-value="Y" false-value="N"></RebornControl>
          </div>
        </div>
      </div>
      <div class="col">
        <RebornControl name="bcncSeCode" type="radio" :required="true" groupCode="SYSM009" v-model="formContext.formData.bcncSeCode" label="거래처 구분"></RebornControl>                
      </div>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/rebornNew/BaseForm.vue'
  import RebornControl from '@/components/reborn/control/RebornControl.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'

  defineProps({
    insrncChrgeList: {
      type: Object as () => Array<any>,
    },
    lendChargeList: {
      type: Object as () => Array<any>,
    },
  })
  
  const reload = inject('reload', ()=>{})
  const models = reactive<any>({
    
  })

  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    modal: {
      title: '거래처관리',
      width: '1400px',
      onOpen(data) {
        formContext.formData = data ?? {}
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => axios.post('bcnc', row).then(callback), {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    updateClick(row) {
      ApiService.alert((axios, callback) => axios.put('bcnc', row).then(callback), {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(row) {          
      ApiService.confirm((axios, callback) => axios.delete('bcnc', { data: row }).then(callback), {
        label: '삭제',
        isLoading: true,
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    printClick(callback) {
      
    },
    exportClick(row, callback: any) {
      
    },
  })

  defineExpose({
    formContext: formContext
  })
</script>

<style>

</style>