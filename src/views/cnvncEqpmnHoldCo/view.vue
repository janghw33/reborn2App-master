<!--
  created: 이진우
-->
<template>
  <BaseForm :formContext="formContext">
    <div class="row">
      <div class="mb-10 col">
        보유대수 정보를 적용할 날짜를 선택해 주세요.
      </div>
    </div>
    <div class="row">
      <div class="mb-10 col">
        <FormItem label="적용일자" name="applcDe" :required="true">
          <Input type="date" v-model="formContext.formData.applcDe"/>
        </FormItem>
      </div>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive, watchEffect } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import moment from 'moment'

  const reload = inject('reload', ()=>{})
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    modal: {
      title: '보유대수 적용',
      onOpen(data) {
        formContext.formData = data ?? {}
        formContext.formData.applcDe = moment().startOf('day').format('YYYY-MM-DD')
      }
    },
    addClick(row) {      
      ApiService.alert((axios, callback) => {
        axios.post('cnvncEqpmnHoldCo', row).then(callback)
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
    formContext: formContext
  })
</script>

<style>

</style>