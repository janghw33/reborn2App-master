<!--
  created: 이진우
-->
<template>
  <BaseForm :formContext="formContext">
    <div class="row">
      <div class="mb-10 col">
        연료단가 정보를 적용할 날짜를 선택해 주세요.
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="적용일자" name="applcDe" :required="true">
          <Input type="date" v-model="formContext.formData.applcDe" />
        </FormItem>
      </div>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import MomentService from '@/core/services/MomentService'

  const reload = inject('reload', ()=>{})
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    modal: {
      onOpen(data) {
        formContext.formData = data ?? {}
        formContext.formData.applcDe = MomentService.now()
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
    formContext: formContext
  })
</script>

<style>

</style>