<!-- 
  created: 장형욱 
-->
<template>
  <BaseForm :formContext="formContext">
    <div class="col-5">
      <FormItem label="입금방법 명" :required="true" name="paySeContents">
        <Input name="paySeContents" type="text" v-model="formContext.formData.paySeContents"></Input>
      </FormItem>
    </div>

    <div class="col-5">
      <FormItem label="사용하지 않음" :required="true" name="paySeContents">
        <Input type="checkbox" v-model="formContext.formData.useYn" true-value="Y" false-value="N"></Input>
      </FormItem>
    </div>
    

    <div class="col-2">
      <FormItem
        label="키오스크 결제 여부"
        :required="true"
        name="paySeContents"
        labelWidth="20px"
      >
        <Input
          type="checkbox"
          v-model="formContext.formData.kioskPayYn"
          true-value="Y"
          false-value="N"
        >
        </Input>
      </FormItem>
    </div>

    <div class="row">
      <RebornControl
        type="radio"
        label="입금방법 형태"
        :required="true"
        group-code="SYSM010"
        name="payStleCode"
        v-model="formContext.formData.payStleCode"
      ></RebornControl>
    </div>
    <div class="col-10">
      <RebornControl
        label="비고"
        type="text"
        v-model="formContext.formData.etcContents"
      ></RebornControl>
    </div>
    -->
    <!-- </div> -->
  </BaseForm>
</template>

<script lang="ts" setup>
import { inject, reactive } from 'vue'
import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
import Input from '@/components/reborn/Input.vue'
import FormItem from '@/components/reborn/FormItem.vue'
import ApiService from '@/core/services/ApiService'
import { FormRules } from 'element-plus'

const reload = inject('reload', () => {})

function test(rule, value, callback) {
  if (value == '100') {
    callback(new Error('100이면 안됨'))
  } else {
    callback()
  }
}

const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({
    paySeContents: [
      {
        validator: (rule, value, callback) => test(rule, value, callback),
        trigger: 'blur',
      },
    ],
  }),
  modal: {
    title: '입금수단 관리',
    width: '800px',
    onOpen(data) {
      formContext.formData = data ?? {}
    },
  },

  addClick(row) {
    ApiService.alert(
      (axios, callback) => {
        axios.post('paySe', row).then(callback)
      },
      {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        },
      }
    )
  },
  updateClick(row) {
    ApiService.alert(
      (axios, callback) => {
        axios.post('paySe', row).then(callback)
      },
      {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        },
      }
    )
  },
  deleteClick(row) {
    ApiService.confirm(
      (axios, callback) => {
        axios.delete('paySe', { data: row }).then(callback)
      },
      {
        label: '삭제',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        },
      }
    )
  },
})

defineExpose({
  formContext: formContext,
})
</script>
