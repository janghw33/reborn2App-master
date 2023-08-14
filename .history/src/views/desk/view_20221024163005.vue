<!-- 
  created: 장형욱 
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseForm :formContext="formContext">
      <div class= "row">
      <div class="col-6">
        <FormItem label="데스크명" :required="true" name="deskNm">
          <Input name="deskNm" type="text" v-model="formContext.formData.deskNm"
          ></Input>
        </FormItem>
      </div>
      <div class="col-4">
      <FormItem label="사용안함" label-width="6rem" name="useYn">
        <Input type="checkbox" v-model="formContext.formData.useYn" true-value="N" false-value="Y"></Input>
      </FormItem>
    </div>
  </div>
      <div class = "col-8">
      <FormItem label="비고">
        <Input type = "text" v-model="formContext.formData.etcContents"></Input>
      </FormItem>
    </div>
    </BaseForm>
  </BasePage>
</template>

<script lang="ts" setup>
import { inject, reactive } from 'vue'
import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
import FormItem from '@/components/reborn/FormItem.vue'
import Input from '@/components/reborn/Input.vue'
import ApiService from '@/core/services/ApiService'
import { FormRules } from 'element-plus'
import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
import axios from 'axios'

const reload = inject('reload', () => {})
const pageContext = reactive<IPageContext>({
  pageTitle: '뷰형태',
  breadcrumbs: ['a', 'b'],
  onLoad() {
    ApiService.get('desk').then(({ data }) => {})
  },
})
const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({}),
  modal: {
    title: '데스크 관리',
    width: '800px',
    onOpen(data) {
      formContext.formData = data ?? {}
    },
  },
  addClick(row) {
    ApiService.alert(
      (axios, callback) => axios.post('desk', row).then(callback), {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        },
      })
  },
  updateClick(row) {
    ApiService.alert((axios, callback) => axios.post('desk', row).then(callback), {
      label: '수정',
      onSuccess() {
        formContext.modal?.close?.()
        reload()
      },
    })
  },
  deleteClick(row) {
    ApiService.confirm((axios, callback) => axios.delete('paySe', { data: row }).then(callback), {
      label: '삭제',
      onSuccess() {
        formContext.modal?.close?.()
        reload()
      }
    })
  }
  ,
  // jhwToDo
  exportClick(row, callBack: any) {
    
  },
}),
defineExpose({
  formContext: formContext,
})

</script>
