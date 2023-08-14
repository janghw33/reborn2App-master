<!-- 
  created: 장형욱
 -->
<template>
 
  <BaseForm :formContext="formContext">
  <div class="row">
    <div class="col-6">
      <FormItem label = "운전자명" :required="true" name="deskNm">
        <Input type="text" v-model="formContext.formData.chauferDrverNm"></Input>
      </FormItem>
    </div>
    <div class="col-1">
      <FormItem label = "쇼퍼운전자" true-value="Y" false-value="N"></FormItem>
      <Input type="checkbox" v-model="formContext.formData.ineerEmpYn"></Input>
    </div>
    <div class="col-4">
      <FormItem label="사용안함" label-width="6rem" name="useYn">
        <Input type="checkbox" v-model="formContext.formData.useYn" true-value="N" false-value="Y"></Input>
      </FormItem>
    </div>
    <div class="col-4">
      <FormItem label="면허번호"  name="chauferDrverLcnsNo">
        <Input type="checkbox" v-model="formContext.formData.chauferDrverLcnsNo"></Input>
      </FormItem>
    </div>
    <div class="col-4">
      <FormItem label="면허번호"  name="chauferDrverLcnsNo">
        <Input type="checkbox" v-model="formContext.formData.chauferDrverLcnsNo"></Input>
      </FormItem>
    </div>
  </div>
    <!-- <div class="col-3">
      <RebornControl type="text" label="운전자명" :required="true" name="chauferDrverNm" v-model="formContext.formData.chauferDrverNm"> </RebornControl>
    </div>
    <div class="col-1">
      <RebornControl type="checkbox" label="쇼퍼운전자" v-model="formContext.formData.innerEmpYn" true-value="Y" false-value="N"></RebornControl>
    </div>
    <div class="col-1">
      <RebornControl type="checkbox" label="사용안함" v-model="formContext.formData.useYn" true-value="N" false-value="Y"></RebornControl>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <RebornControl type="text" label="면허번호" :required="true" name="chauferDrverLcnsNo" v-model="formContext.formData.chauferDrverLcnsNo"> </RebornControl>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <RebornControl type="text" label="전화번호" :required="true" name="chauferDrverCttpcEncpt" v-model="formContext.formData.chauferDrverCttpcEncpt"> </RebornControl>
    </div>
  </div>
  <div class="row">
    <div class="col">
        <RebornControl name="chauferDrverLcnsKndCode" type="radio" :required="true" groupCode="SYSM011" v-model="formContext.formData.chauferDrverLcnsKndCode" label="면허 종류"></RebornControl>                
    </div>
  </div>
  <div class="row">
    <div class="col-3">
      <RebornControl label="우편번호" type="text" v-model="formContext.formData.postNo"></RebornControl>
    </div>
    <div class="col-4">
      <RebornControl label="주소" type="text" v-model="formContext.formData.bassAdres"></RebornControl>
    </div>
    <div class="col-4">
      <RebornControl label="상세주소" type="text" v-model="formContext.formData.detailAdres"></RebornControl>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <RebornControl label="비고" type="text" v-model="formContext.formData.etcContents"></RebornControl>
    </div>
  </div>
-->
  </BaseForm>"
</template> 

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import RebornControl from '@/components/reborn/control/RebornControl.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import { useRouter } from 'vue-router'
  import Week from "@/components/reborn/control/Week.vue"

  const router = useRouter()
  const reload = inject('reload', ()=>{})
  const models = reactive<any>({
  })

  const pageContext = reactive<IPageContext>({
    pageTitle: '뷰형태',
    breadcrumbs: ['a', 'b'],
    onLoad() {
    },
  })

  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: Array<FormRules>({
    }),
    modal: {
      title: '쇼퍼 관리',
      width: '1400px',
      onOpen(data) {
        formContext.formData = data ?? {}
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => {
        axios.post('chauferDrver', row).then(callback)
      }, {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    updateClick(row) {
      ApiService.alert((axios, callback) => {
        axios.put('chauferDrver', row).then(callback)
      }, {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(row) {          
      ApiService.confirm((axios, callback) => {
        axios.delete('chauferDrver', { data: row }).then(callback)
      }, {
        label: '삭제',
        isLoading: true,
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
  })

  defineExpose({
    formContext: formContext
  })
</script>