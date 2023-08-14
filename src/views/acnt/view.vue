<!-- 
  created: 장형욱 
-->

<template>
  <BaseForm :formContext="formContext">
    <div class="row">
      <div class="col-6">
        <FormItem label="은행명" :required="true" name="acntBankNm">
          <Input type="text" v-model="formContext.formData.acntBankNm"></Input>
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
import { inject, reactive } from 'vue'
import BaseForm, { IFormContext } from "@/components/reborn/BaseForm.vue"
import ApiService from "@/core/services/ApiService"
import FormItem from '@/components/reborn/FormItem.vue'
import Input from '@/components/reborn/Input.vue'
import { FormRules } from 'element-plus'

const reload = inject('reload', () => {})

const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({
    acntNo: [{ validator: (rule, value, callback) => methods.acntNmChecker(value, callback), trigger: 'blur'}]
  }),
  modal: {
    title: '입금계좌',
    width: '600px',
    onOpen(data) {
      formContext.formData = data ?? {}
    }
  },
  addClick(row) {
      ApiService.alert((axios, callback) => axios.post('acnt', row).then(callback), {
        label: '등록',
          onSuccess() {
            formContext.modal?.close?.()
            reload()
          }
        })
    },
    updateClick(row) {
      ApiService.alert((axios, callback) => axios.put('acnt', row).then(callback), {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(row) {
      ApiService.confirm((axios, callback) => axios.delete('acnt', { data: row }).then(callback), {
        label: '삭제',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    exportClick(row, callback: any) {},
  })

  const methods = {
    acntNmChecker(value, callback) {
      ApiService.call((axios, cb) => axios.get('acnt/acntNoCheck', { params : { acntNo: value } }).then(cb), {
        onSuccess(data) {
          const isOverlap = data.data ?? false
          if (isOverlap) {
            callback(new Error('계좌명이 중복되었습니다.'))
          } else {
            callback()
          }
        }
      })
    }
  }


  defineExpose({
  formContext: formContext,
})
</script>

<style></style>
