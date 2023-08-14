<!-- 
  created: 이진우  
-->
<template>
  <BaseForm :formContext="formContext">
    <div class="row">
      <div class="col">
        <FormItem label="장비명" :required="true" name="cnvncEqpmnNm">
          <Input type="text" v-model="formContext.formData.cnvncEqpmnNm" />
        </FormItem>
      </div>
      <div class="col-3">
        <Input type="checkbox" label="사용하지 않음" v-model="formContext.formData.useYn" true-value="N" false-value="Y" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="장비요금(원)" :required="true" name="cnvncEqpmnChrge">
          <Input type="text" v-model="formContext.formData.cnvncEqpmnChrge" />
        </FormItem>        
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="과금방법" :required="true" name="cnvncEqpmnAccinfoCode">
          <Input type="radio" :groupCode="Code.SYSM008" v-model="formContext.formData.cnvncEqpmnAccinfoCode" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="네비여부">
          <Input type="radio" :data-source="{Y: '예', N: '아니오'}" v-model="formContext.formData.naviYn" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="비고">
          <Input type="text" v-model="formContext.formData.etcContents" />
        </FormItem>
      </div>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive, watchEffect } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import { Code } from '@/enums'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'

  const reload = inject('reload', ()=>{})
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    modal: {
      title: '장비등록',
      onOpen(data) {
        formContext.formData = data ?? {}
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => {
        axios.post('cnvncEqpmn', row).then(callback)
      }, {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    updateClick(row) {
      ApiService.alert((axios, callback) => {
        axios.put('cnvncEqpmn', row).then(callback)
      }, {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(row) {          
      ApiService.confirm((axios, callback) => {
        axios.delete('cnvncEqpmn', { data: row }).then(callback)
      }, {
        label: '삭제',
        isLoading: true,
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
  })

  watchEffect(() => {
    formContext.formData.useYn ??= "Y"
    formContext.formData.naviYn ??= "N"
  })

  defineExpose({
    formContext: formContext
  })
</script>

<style>

</style>