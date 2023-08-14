<!--
  created: 장형욱
-->
<template>
  <BaseForm :formContext="formContext">
    <div row>
      <div class="col-6">
        <FormItem label="예약번호" name="setleRequstHistSn">
          <Input type="text" v-model="formContext.formData.setleRequstHistSn"></Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="ERP 예약번호" name="erpResveSn">
          <Input type="text" v-model ="formContext.formData.erpResveSn"></Input>
        </FormItem> 
      </div>
    </div>
    <div row>
      <div class="col-6">
        <FormItem label="예약자명" name="rsvctmNm">
          <Input type="text" v-model="formContext.formData.rsvctmNm"></Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="예약자 연락처" name="rsvctmCttpcEncpt">
          <Input type="text" v-model ="formContext.formData.rsvctmCttpcEncpt"></Input>
        </FormItem> 
      </div>
    </div>
    <div row>
      <div class="col-6">
        <FormItem label="운전자명" name="rsvctmNm">
          <Input type="text" v-model="formContext.formData.rsvctmNm"></Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="운전자 연락처" name="rsvctmCttpcEncpt">
          <Input type="text" v-model ="formContext.formData.rsvctmCttpcEncpt"></Input>
        </FormItem> 
      </div>
    </div>
  
  </BaseForm>
</template>

<script lang="ts" setup>
import { inject, reactive } from 'vue'
import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
import ApiService from "@/core/services/ApiService"
import FormItem from '@/components/reborn/FormItem.vue'
import { FormRules } from 'element-plus'
import Input from '@/components/reborn/Input.vue'

const reload = inject('reload', () => {})
const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({
  }),
  modal: {
    title: '결제 관리',
    width: '1000px',
    onOpen(data) {
      formContext.formData = data?? {}
      },
    },
  })
defineExpose({
  formContext: formContext
})
</script>