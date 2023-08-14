<!--
  created: 장형욱
-->
<template>
  <BasePage :pageContext="pageContext">
    {{formContext.formData}}
    <BaseForm :formContext="formContext" v-slot="{ form }" >
      <div class="card">
        <div class="card-body">
          <div class="row">

            <div class="col-4">
              <div class="card shadow mb-2">
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px" >
                  <h3>예약 정보</h3>
                  <FormItem label="예약번호" name="setleRequstHistSn">
                    <Input type="text" v-model="formContext.formData.setleRequstHistSn" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="ERP 예약번호" name="erpResveSn">
                    
                    <Input type="text" v-model ="formContext.formData.erpResveSn" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="예약자명" name="rsvctmNm">
                    <Input type="text" v-model="formContext.formData.rsvctmNm" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="예약자 연락처" name="rsvctmCttpcEncpt">
                    <Input type="text" v-model ="formContext.formData.rsvctmCttpcEncpt" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="이메일" name="rsvctmEmailAdresEncpt">
                    <Input type="text" v-model="formContext.formData.rsvctmEmailAdresEncpt" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="대여시간" name="resveLendTimeCo">
                    <Input type="text" v-model ="formContext.formData.resveLendTimeCo" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="시작일자" name="resveBeginDe">
                    <Input type="text" v-model ="formContext.formData.resveBeginDe" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="종료일자" name="resveEndTime">
                    <Input type="text" v-model ="formContext.formData.resveEndTime" :readonly="true"></Input>
                  </FormItem>  
                </div>
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
                  <h4>운전자 정보</h4>
                  <FormItem label="운전자명" name="drverNm">
                    <Input type="text" v-model="formContext.formData.drverNm" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="운전자 연락처" name="drverCttpcEncpt">
                    <Input type="text" v-model ="formContext.formData.drverCttpcEncpt" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="운전자 생년월일" name="drverBrthdy">
                    <Input type="text" v-model="formContext.formData.drverBrthdy" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="운전자 면허" name="drverLcnsKndCode">
                    <Input type="text" :dataSource="{12: '1종 보통', '21': '2종 보통'}" v-model ="formContext.formData.drverLcnsKndCode" :readonly="true"></Input>
                  </FormItem>
                </div>
              </div>
            </div>

            <div class="col-4">
              <div class="card shadow mb-2">
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px" >
                  <h3>결제 정보</h3>
                  <FormItem label="예약상태" name="setleRequstHistSn">
                    <Input type="text" v-model="formContext.formData.setleRequstHistSn" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="결제금액" name="setleAmount">
                    <Input type="text" v-model ="formContext.formData.setleAmount" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="결제수단" name="rsvctmNm">
                    <Input type="text" v-model="formContext.formData.rsvctmNm" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="결제요청 일시" name="setleRequstDt">
                    <Input type="date" v-model ="formContext.formData.setleRequstDt" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="결제완료 일시" name="setleComptDt">
                    <Input type="date" v-model="formContext.formData.setleComptDt" :readonly="true"></Input>
                  </FormItem>
                </div>
              </div>
              <div class="card shadow mb-2" style="margin-top: 40px">
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px"  >
                  <h3>환불 정보</h3>
                  <FormItem label="환불상태" name="setleRequstHistSn">
                    <Input type="text" v-model="formContext.formData.setleRequstHistSn" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="환불금액" name="refndAmount">
                    <Input type="text" v-model ="formContext.formData.refndAmount" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="환불요청 일시" name="refndRequstDt">
                    <Input type="date" v-model="formContext.formData.refndRequstDt" :readonly="true"></Input>
                  </FormItem>
                  <FormItem label="환불완료 일시" name="refndComptDt">
                    <Input type="date" v-model ="formContext.formData.refndComptDt" :readonly="true"></Input>
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

const pageContext = reactive<IPageContext>({
  pageTitle: '결제 관리',
  breadcrumbs: ['홈페이지 관리'],
  async onLoad() {
    const setleRequstHistSn = route.query.setleRequstHistSn
    const { data } = await ApiService.get('hmpgPay/info/' + setleRequstHistSn)
    formContext.formData = data.data
  },
})

const reload = inject('reload', () => {})
const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({

  }),
  isAdd: false,
  isCancel: false
})

defineExpose({
  formContext: formContext,
})
</script>
