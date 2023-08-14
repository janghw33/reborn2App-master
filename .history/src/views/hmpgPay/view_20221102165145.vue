<!--
  created: 장형욱
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseForm :formContext="formContext">
      <div class="card">
        <div class="card-body">
          <div class="row">

            <div class="col-4">
              <div class="card shadow mb-2">
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
                  <h3>예약 정보</h3>
                  <FormItem label="예약번호" name="setleRequstHistSn">
                    <Input type="text" v-model="formContext.formData.setleRequstHistSn"></Input>
                  </FormItem>
                  <FormItem label="ERP 예약번호" name="erpResveSn">
                    <Input type="text" v-model ="formContext.formData.erpResveSn"></Input>
                  </FormItem>
                  <FormItem label="예약자명" name="rsvctmNm">
                    <Input type="text" v-model="formContext.formData.rsvctmNm"></Input>
                  </FormItem>
                  <FormItem label="예약자 연락처" name="rsvctmCttpcEncpt">
                    <Input type="text" v-model ="formContext.formData.rsvctmCttpcEncpt"></Input>
                  </FormItem>
                  <FormItem label="이메일" name="rsvctmEmailAdresEncpt">
                    <Input type="text" v-model="formContext.formData.rsvctmEmailAdresEncpt"></Input>
                  </FormItem>
                  <FormItem label="대여시간" name="resveLendTimeCo">
                    <Input type="text" v-model ="formContext.formData.resveLendTimeCo"></Input>
                  </FormItem>
                  <FormItem label="시작일자" name="resveBeginDe">
                    <Input type="text" v-model ="formContext.formData.resveBeginDe"></Input>
                  </FormItem>
                  <FormItem label="종료일자" name="resveEndTime">
                    <Input type="text" v-model ="formContext.formData.resveEndTime"></Input>
                  </FormItem>  
                </div>
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
                  <h3>운전자 정보</h3>
                  <FormItem label="운전자명" name="drverNm">
                    <Input type="text" v-model="formContext.formData.drverNm"></Input>
                  </FormItem>
                  <FormItem label="운전자 연락처" name="drverCttpcEncpt">
                    <Input type="text" v-model ="formContext.formData.drverCttpcEncpt"></Input>
                  </FormItem>
                  <FormItem label="운전자 생년월일" name="drverBrthdy">
                    <Input type="text" v-model="formContext.formData.drverBrthdy"></Input>
                  </FormItem>
                  <FormItem label="운전자 면허" name="drverLcnsKndCode">
                    <Input type="text" v-model ="formContext.formData.drverLcnsKndCode"></Input>
                  </FormItem>
                </div>
              </div>
            </div>

            <div class="col-4">
              <div class="card shadow mb-2">
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
                  <h3>결제 정보</h3>
                  <FormItem label="예약상태" name="setleRequstHistSn">
                    <Input type="text" v-model="formContext.formData.setleRequstHistSn"></Input>
                  </FormItem>
                  <FormItem label="결제 금액" name="erpResveSn">
                    <Input type="text" v-model ="formContext.formData.erpResveSn"></Input>
                  </FormItem>
                  <FormItem label="예약자명" name="rsvctmNm">
                    <Input type="text" v-model="formContext.formData.rsvctmNm"></Input>
                  </FormItem>
                  <FormItem label="예약자 연락처" name="rsvctmCttpcEncpt">
                    <Input type="text" v-model ="formContext.formData.rsvctmCttpcEncpt"></Input>
                  </FormItem>
                  <FormItem label="이메일" name="rsvctmEmailAdresEncpt">
                    <Input type="text" v-model="formContext.formData.rsvctmEmailAdresEncpt"></Input>
                  </FormItem>
                  <FormItem label="대여 시간" name="resveLendTimeCo">
                    <Input type="text" v-model ="formContext.formData.resveLendTimeCo"></Input>
                  </FormItem>
                  <FormItem label="시작 일자" name="resveBeginDe">
                    <Input type="text" v-model ="formContext.formData.resveBeginDe"></Input>
                  </FormItem>
                  <FormItem label="종료 일자" name="resveEndTime">
                    <Input type="text" v-model ="formContext.formData.resveEndTime"></Input>
                  </FormItem>  
                </div>
              </div>
              <div class="card shadow mb-2">
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
                  <h3>환불 정보</h3>
                  <FormItem label="예약번호" name="setleRequstHistSn">
                    <Input type="text" v-model="formContext.formData.setleRequstHistSn"></Input>
                  </FormItem>
                  <FormItem label="ERP 예약번호" name="erpResveSn">
                    <Input type="text" v-model ="formContext.formData.erpResveSn"></Input>
                  </FormItem>
                  <FormItem label="예약자명" name="rsvctmNm">
                    <Input type="text" v-model="formContext.formData.rsvctmNm"></Input>
                  </FormItem>
                  <FormItem label="예약자 연락처" name="rsvctmCttpcEncpt">
                    <Input type="text" v-model ="formContext.formData.rsvctmCttpcEncpt"></Input>
                  </FormItem>
                  <FormItem label="이메일" name="rsvctmEmailAdresEncpt">
                    <Input type="text" v-model="formContext.formData.rsvctmEmailAdresEncpt"></Input>
                  </FormItem>
                  <FormItem label="대여 시간" name="resveLendTimeCo">
                    <Input type="text" v-model ="formContext.formData.resveLendTimeCo"></Input>
                  </FormItem>
                  <FormItem label="시작 일자" name="resveBeginDe">
                    <Input type="text" v-model ="formContext.formData.resveBeginDe"></Input>
                  </FormItem>
                  <FormItem label="종료 일자" name="resveEndTime">
                    <Input type="text" v-model ="formContext.formData.resveEndTime"></Input>
                  </FormItem>  
                </div>
              </div>
            </div>
    
          </div>
        </div>
      </div>
    </BaseForm>
  </BasePage>
</template>

<script lang="ts" setup>
import { inject, reactive } from 'vue'
import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
import ApiService from '@/core/services/ApiService'
import FormItem from '@/components/reborn/FormItem.vue'
import { useRoute } from 'vue-router'
import { FormRules } from 'element-plus'
import Input from '@/components/reborn/Input.vue'

const route = useRoute()
const models = reactive<any>({
  data: [],
})

const pageContext = reactive<IPageContext>({
  pageTitle: '결제 관리',
  breadcrumbs: ['홈페이지 관리'],
  async onLoad() {
    const setleRequstHistSn = route.query.setleRequstHistSn
    const { data } = await ApiService.get('accident/infor/' + setleRequstHistSn)
    formContext.formData = data.data
    models.data = data.data
  },
})

const reload = inject('reload', () => {})
const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({}),
})
</script>
