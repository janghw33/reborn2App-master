<!--
  created: 장형욱
-->
<template>
  <BaseForm :formContext="formContext" v-slot = "{form}">
    <div class="row">
      <div class="col-6">
        <FormItem label="코드" :required="true" name="code">
          <Input type="text" v-model="formContext.formData.code" :readonly="form?.action == 'view'"></Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="사용안함" label-width="6rem" name="useYn">
          <Input type="checkbox" v-model="formContext.formData.useYn" true-value="N" false-value="Y"
          ></Input>
        </FormItem>
      </div>
    </div>
      <div class="col-8">
        <FormItem label="코드명" :required="true" name="codeNm">
          <Input type="text" v-model="formContext.formData.codeNm"></Input>
        </FormItem>
      </div>
      <div class="col-8">
        <FormItem label="비고"  name="codeDc">
          <Input type="text" v-model="formContext.formData.codeDc"></Input>
        </FormItem>
      </div>
      
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive, watchEffect } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import { FormRules } from 'element-plus'
  import ApiService from '@/core/services/ApiService'
import axios from 'axios'

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
        axios.post('code', row).then(callback)
      }, {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    updateClick(row) {
      ApiService.alert((aixos, callback) => axios.put('code',row).then(callback), {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(row) {
      ApiService.alert((aixos, callback) => axios.delete('code',{ data:row}).then(callback), {
        label: '삭제',
        isLoading: true,
        onSuccess() {
          formContext.modal?.close?.()
        }
      })
    }
  })
  defineExpose({
  formContext: formContext,
})
</script>

