<!-- 
  created: 장형욱 
-->
<template>
  <BaseForm :formContext="formContext">
    <div class ="col-6">
      <FormItem label="단말기코드" :required="true" name="trmnlCode">
        <Input type="text" v-model="formContext.formData.trmnlCode"></Input>
      </FormItem>
    </div>
    <div class ="col-6">
      <FormItem label="단말기명" :required="true" name="trmnlNm">
        <Input type="text" v-model="formContext.formData.trmnlNm"></Input>
      </FormItem>
    </div>
    <div class ="col-8">
      <FormItem label="단말기설명" :required="true" name="trmnlDcContents">
        <Input type="text" v-model="formContext.formData.etcContents"></Input>
      </FormItem>
      <FormItem label="사용 여부" :required="true" name="useYn">
        <Input type="checkbox" v-model="formContext.formData.useYn" true-value="Y" false-value="N"></Input>
      </FormItem>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from "@/components/reborn/BaseForm.vue";
  import ApiService from "@/core/services/ApiService";
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import { FormRules } from 'element-plus'

  const reload = inject('reload', () => {})

  const formContext = reactive<IFormContext>({
    formData: {},
    rules: reactive<FormRules>({

    }),
    modal: {
      title: '전자계약단말기 설정',
      width: '800px',
      onOpen(data) {
        formContext.formData = data ?? {}
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => axios.post('desk', row).then(callback), {
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

<style>
</style>