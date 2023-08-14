<!-- 
  created: 장형욱
 -->
<template>
  <BaseForm :formContext="formContext">
    <div class="col-3">
      <FormItem label = "운전자명" :required="true" name="chauferDrverNm">
        <Input type="text" v-model="formContext.formData.chauferDrverNm"></Input>
      </FormItem>
    </div>
  
    <div class="col-3">
      <FormItem label = "쇼퍼운전자" >
      <Input  type="checkbox" v-model="formContext.formData.innerEmpYn" true-value="Y" false-value="N"></Input>
    </FormItem>
      
    </div>
    <div class="col-3">
      <FormItem label = "사용안함" >
      <Input type="checkbox" v-model="formContext.formData.useYn" true-value="N" false-value="Y"></Input>
    </FormItem>
    </div>
    <div class="row">
    <div class="col-5">
      <FormItem label="면허번호" :required="true" name="chauferDrverLcnsNo">
        <Input type="text" v-model="formContext.formData.chauferDrverLcnsNo"></Input>
      </FormItem>
    </div>
    <div class="col-4">
      <FormItem label="생년월일" :required="true" name="chauferDrverBrthdy">
        <Input type="date" v-model="formContext.formData.chauferDrverBrthdy"></Input>
      </FormItem>
    </div>
  </div>
  <div class="row">
    <div class="col-5">
      <FormItem label="전화번호" :required="true" name="chauferDrverCttpcEncpt">
        <Input type="text" v-model="formContext.formData.chauferDrverCttpcEncpt"></Input>
      </FormItem>
    </div>
    <div class="col-4">
      <FormItem label="유효일자" :required="true" name="chauferDrverLcnsValidDe">
        <Input type="date" v-model="formContext.formData.chauferDrverLcnsValidDe"></Input>
      </FormItem>
    </div>
  </div>
    <div class="col-6">
      <FormItem label="면허 종류" :required="true" name="chauferDrverLcnsKndCode">
        <Input type="radio" groupCode="SYSM011"  v-model="formContext.formData.chauferDrverLcnsKndCode"></Input>
      </FormItem>
    </div>
    <div>
      <FormItem label="주소" :rows="3">
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <Input type="text" v-model="formContext.formData.mycarDrverPostNo" placeholder="주소검색시 자동입력" :readonly="true"></Input>
                      </el-col>
                      <el-col :span="8">
                        <el-button type="primary" @click="methods.findAddress">주소검색</el-button>
                      </el-col>
                      <el-col :span="24">
                        <Input type="text" v-model="formContext.formData.mycarDrverBassAdres" placeholder="기본주소" :readonly="true"></Input>
                      </el-col>
                      <el-col :span="24">
                        <Input type="text" v-model="formContext.formData.mycarDrverDetailAdres" placeholder="상세주소"></Input>
                      </el-col>
                    </el-row>
                  </FormItem>
    </div>
    <div class="row">
  <div class="col-3">
     <FormItem label="우편번호">
        <Input type="text" v-model="formContext.formData.postNo"></Input>
      </FormItem>
  </div>
  <div class="col-5">
    <FormItem label="주소" label-width="4rem">
      <Input type="text" v-model="formContext.formData.bassAdres"></Input>
    </FormItem>
  </div>
</div>
  <div class="col-8">
    <FormItem label="상세주소">
      <Input type="text" v-model="formContext.formData.detailAdres"></Input>
    </FormItem>
  </div>
  <div class="col-8">
    <FormItem label="비고">
      <Input type="text" v-model="formContext.formData.etcContents"></Input>
    </FormItem>
  </div>
  
  </BaseForm>
</template> 

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import { FormRules } from 'element-plus'

  const reload = inject('reload', ()=>{})

  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
    }),
    modal: {
      title: '쇼퍼 관리',
      width: '1000px',
      onOpen(data) {
        formContext.formData = data ?? {}
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => axios.post('chauferDrver', row).then(callback), {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
  
    updateClick(row) {
      ApiService.alert((axios, callback) => axios.put('chauferDrver', row).then(callback), {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },

    deleteClick(row) {          
      ApiService.confirm((axios, callback) => axios.delete('chauferDrver', { data: row }).then(callback), {
        label: '삭제',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
  }),
  const methods ={
    findAddress() {
      new daum.Postcode({
        oncomplete: function(data) {
          formContext.formData.mycarDrverPostNo = data.zonecode
          formContext.formData.mycarDrverBassAdres = data.address
        }
      }).open();
    
  }

  defineExpose({
    formContext: formContext
  })
</script>