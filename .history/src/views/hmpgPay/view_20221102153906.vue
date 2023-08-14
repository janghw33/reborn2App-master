<!--
  created: 장형욱
-->
<template>
  <BasePage :pageContext="pageContext">
  <BaseForm :formContext="formContext">
    <div class= "row">
      <div class="col-5">
        <FormItem label="예약번호" name="setleRequstHistSn">
          <Input type="text" v-model="formContext.formData.setleRequstHistSn"></Input>
        </FormItem>
      </div>
      <div class="col-5">
        <FormItem label="ERP 예약번호" name="erpResveSn">
          <Input type="text" v-model ="formContext.formData.erpResveSn"></Input>
        </FormItem> 
      </div>
    </div>
    <div class= "row">
      <div class="col-5">
        <FormItem label="예약자명" name="rsvctmNm">
          <Input type="text" v-model="formContext.formData.rsvctmNm"></Input>
        </FormItem>
      </div>
      <div class="col-5">
        <FormItem label="예약자 연락처" name="rsvctmCttpcEncpt">
          <Input type="text" v-model ="formContext.formData.rsvctmCttpcEncpt"></Input>
        </FormItem> 
      </div>
    </div>
    <div class= "row">
      <div class="col-5">
        <FormItem label="운전자명" name="drverNm">
          <Input type="text" v-model="formContext.formData.drverNm"></Input>
        </FormItem>
      </div>
      <div class="col-5">
        <FormItem label="운전자 연락처" name="drverCttpcEncpt">
          <Input type="text" v-model ="formContext.formData.drverCttpcEncpt"></Input>
        </FormItem> 
      </div>
    </div>
    <div class= "row">
      <div class="col-5">
        <FormItem label="운전자 생년월일" name="drverBrthdy">
          <Input type="text" v-model="formContext.formData.drverBrthdy"></Input>
        </FormItem>
      </div>
      <div class="col-5">
        <FormItem label="운전자 면허" name="drverLcnsKndCode">
          <Input type="text" v-model ="formContext.formData.drverLcnsKndCode"></Input>
        </FormItem> 
      </div>
    </div>
    <div class= "row">
      <div class="col-5">
        <FormItem label="이메일" name="rsvctmEmailAdresEncpt">
          <Input type="text" v-model="formContext.formData.rsvctmEmailAdresEncpt"></Input>
        </FormItem>
      </div>
      <div class="col-5">
        <FormItem label="대여 시간" name="resveLendTimeCo">
          <Input type="text" v-model ="formContext.formData.resveLendTimeCo"></Input>
        </FormItem> 
      </div>
    </div>
    <div class= "row">
      <div class="col-5">
        <FormItem label="이메일" name="rsvctmEmailAdresEncpt">
          <Input type="text" v-model="formContext.formData.rsvctmEmailAdresEncpt"></Input>
        </FormItem>
      </div>
      <div class="col-5">
        <FormItem label="대여 시간" name="resveLendTimeCo">
          <Input type="text" v-model ="formContext.formData.resveLendTimeCo"></Input>
        </FormItem> 
      </div>
    </div>
  </BaseForm>
</BasePage>
</template>

<script lang="ts" setup>
import { inject, reactive } from 'vue'
import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
import ApiService from "@/core/services/ApiService"
import FormItem from '@/components/reborn/FormItem.vue'
import { FormRules } from 'element-plus'
import Input from '@/components/reborn/Input.vue'

const models = reactive<any>({
  data: [],
  
})

const pageContext = reactive<IPageContext>({
    pageTitle: '결제 관리',
    breadcrumbs: ['홈페이지 관리'],
    onLoad() {
      listContext.onReload?.()
    },
  })

const reload = inject('reload', () => {})
const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({
  }),
</script>