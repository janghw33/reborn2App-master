<template>
  <BasePage :pageContext="pageContext">
    <BaseForm :formContext="formContext">
      <div class="card" >
        <div class="card-body">
          <div class="row">
            <div class="col-3">
              <FormItem label="사업자번호">
                <Input
                  type="text" v-model="formContext.formData.bsnmNo"></Input>
              </FormItem>
            </div>
            <div class="col-3" >
              <FormItem label="상호" >
                <Input type="text" v-model="formContext.formData.mtltyNm"></Input>
              </FormItem>
            </div>
          </div>
          <div class="row">
          <div class="col-3">
            <FormItem label="대표자명">
              <Input type="text" v-model="formContext.formData.rprsntvNm"></Input>
            </FormItem>
          </div>
          <div class="col-3" >
            <FormItem label="홈페이지 URL">
              <Input type="text" v-model="formContext.formData.hmpgUrl"></Input>
            </FormItem>
          </div>
        </div>
          <FormItem label="주소" :rows="3">
            <el-row :gutter="10">
              <el-col :span="16">
                <Input type="text" v-model="formContext.formData.postNo" placeholder="주소검색시 자동입력" :readonly="true"></Input>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="methods.findAddress">주소검색</el-button>
              </el-col>
              <el-col :span="24">
                <Input type="text" v-model="formContext.formData.bassAdres" placeholder="기본주소" :readonly="true"></Input>
              </el-col>
              <el-col :span="24">
                <Input type="text" v-model="formContext.formData.detailAdres" placeholder="상세주소"></Input>
              </el-col>
            </el-row>
          </FormItem>
          <div class="row mt-4">
            <div class="col-3">
              <FormItem label="업종" name="indutyNm">
                <Input type="text" v-model="formContext.formData.indutyNm"></Input>
              </FormItem>
            </div>
            <div class="col-3">
              <FormItem label="업태" name="bizcndNm">
                <Input type="text" v-model="formContext.formData.bizcndNm"></Input>
              </FormItem>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <FormItem label="전화번호">
                <Input type="text" v-model="formContext.formData.tlphonNo"></Input>
              </FormItem>
            </div>
            <div class="col-3">
              <FormItem label="Fax No">
                <Input type="text" v-model="formContext.formData.faxNo"></Input>
              </FormItem>
            </div>
          </div>
          <div class="row mt-6">
            <div class="col-3">
              <FormItem label="셔틀탑승 장소">
                <Input type="text" v-model="formContext.formData.shuttleBoadngPlcNm"></Input>
              </FormItem>
            </div>
            <div class="col-3">
              <FormItem label="탑승장소 내용">
                <Input type="text" v-model="formContext.formData.shuttleBoadngPlcContents"></Input>
              </FormItem>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <FormItem label="셔틀운행 간격">
                <Input type="text" v-model="formContext.formData.shuttleOpratIntrvlMin"  endText="분"></Input>
              </FormItem>
            </div>
            <div class="col-3">
              <FormItem label="이동시간 내용">
                <Input type="text" v-model="formContext.formData.shuttleMvmnTimeContents" ></Input>
              </FormItem>
            </div>
          </div>
          <div class="row">
            <div class="col-3">
              <FormItem label="운영시작 시각">
                <Input maxlength="4" type="text" v-model="formContext.formData.operateBeginHm"  ></Input>
              </FormItem>
            </div>
            <div class="col-3">
              <FormItem label="운영종료 시각" mask="##:##">
                <Input maxlength="4" type="text" v-model="formContext.formData.operateEndHm" ></Input>
              </FormItem>
            </div>
          </div>
          <div class="col">
            <FormItem label="휴일설정">
              <Week v-model="formContext.formData.holidayCode"></Week>
            </FormItem>
          </div>
            <div class="col-6">
              <FormItem label="면허검증 아이디">
                <Input type="text" v-model="formContext.formData.drverClientId"></Input>
              </FormItem>
            </div>
            <div class="col-6">
              <FormItem label="면허검증 키">
                <Input type="text" v-model="formContext.formData.drverClientSecret"></Input>
              </FormItem>
            </div>
          
          <div class="col-6">
              <FormItem label="비고">
                <Input type="text" v-model="formContext.formData.etcContents" ></Input>
              </FormItem>
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
  import { FormRules } from 'element-plus'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  const models = reactive<any>({
    corpData: [],
  })

  const pageContext = reactive<IPageContext>({
    pageTitle: '회사 기본정보',
    breadcrumbs: ['환경설정'],
    onLoad() {
      ApiService.call(
        (axios, callback) =>
          axios.get('corpStup').then(callback),
        {
          onSuccess(data) {
            formContext.formData = data.data
          },
        }
      )
    },
  })

  const reload = inject('reload', () => {})
  const formContext = reactive<IFormContext>({
    formData: {},
    rules: reactive<FormRules>({

    }),
    isUpdate:true,
    isAdd:false,
    updateClick(row) {
        ApiService.alert((axios, callback) => axios.put('corpStup', row).then(callback), {
          label: '수정',
          onSuccess() {
          }
        })
      },
    
  })

  const methods = {
    findAddress() {
      new daum.Postcode({
        oncomplete: function (data) {
          formContext.formData.PostNo = data.zonecode
          formContext.formData.BassAdres = data.address
        },
      }).open();
    }

  }
  defineExpose({
      formContext: formContext
    })
</script>
<style>
</style>
