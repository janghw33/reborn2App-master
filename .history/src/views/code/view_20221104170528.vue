<!--
  created: 장형욱
-->
<template>
  <BaseForm :formContext="formContext">
    <div class="row">
      <div class="col-6">
        <FormItem label="코드구분" :required="true" name="groupCode">
          <Input type="text" v-model="formContext.formData.groupCode"></Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="사용안함" label-width="6rem" name="useYn">
          <Input type="checkbox" v-model="formContext.formData.useYn" true-value="N" false-value="Y"
          ></Input>
        </FormItem>
      </div>
    </div>
      <div class="col-6">
        <FormItem label="코드" :required="true" name="code">
          <Input type="text" v-model="formContext.formData.code"></Input>
        </FormItem>
      </div>
      <div class="col-8">
        <FormItem label="예금주명" :required="true" name="acntDpstrNm">
          <Input type="text" v-model="formContext.formData.acntDpstrNm"></Input>
        </FormItem>
      </div>
      <div class="col-8">
        <FormItem label="계좌번호" :required="true" name="acntNo">
          <Input type="text" v-model="formContext.formData.acntNo"></Input>
        </FormItem>
      </div>
      <div class="col-11">
        <FormItem label="비고" name="etcContents">
          <Input type="text" v-model="formContext.formData.etcContents"
          ></Input>
        </FormItem>
      </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive, watchEffect } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import { FormRules } from 'element-plus'
  import ApiService from '@/core/services/ApiService'

  const reload = inject('reload', ()=>{})
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    modal: {
      title: '각종코드 관리',
      onOpen(data) {
        formContext.formData = data ?? {}
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => {
        axios.post('fuelPrice', row).then(callback)
      }, {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
  })
  defineExpose({
  formContext: formContext,
})
</script>

