<!--
  created: 장형욱
-->
<template>
  <BaseForm :formContext="formContext">
    <div class="row">
      <div calss="mb-10 col">

      </div>
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
</script>

