<template>
  <BaseForm :formContext="formContext">
    <div class="col-6">
        <FormItem label="게시글 제목" :required="true" name="bbscttTitle">
          <Input type="text" v-model="formContext.formData.bbscttTitle"></Input>
        </FormItem>
      </div>
    <div class= "row">
      <div class="col-6">
        <FormItem label="카테고리" :required="true" name="ctgryCode">
          <Input type="select" v-model="formContext.formData.ctgryCode"></Input>
        </FormItem>
      </div>
      <div class="col-6">
        <FormItem label="게시글 내용" :required="true" name="bbscttContents">
          <Input type="text" v-model="formContext.formData.bbscttContents"></Input>
        </FormItem>
      </div>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
import { inject, reactive } from 'vue'
import BaseForm, { IFormContext } from '@/componenets/reborn/BaseForm.vue'
import ApiService from '@/core/services/ApiService'
import FormItem from '@/components/reborn/FormItem.vue'
import Input from '@/components/reborn/Input.vue'
import { FormRules } from 'elememt-plus'

const reload = inject('reload', () => {})

const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({

  }),
  modal: {
    title: '데스크 등록',
    width: '800px',
    onOpen(data) {
      formContext.formData = data ?? {}
    },
  },
  updateClick(row) {
    ApiService.alert((axios, callback) => axios.put(hmpgBbs, row).then(callback), {
      label: '수정',
      onSuccess() {
        formContext.modal?.close?.()
        reload()
      }
    })
  }
})


</script>