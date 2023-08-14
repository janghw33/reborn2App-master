<!-- 
  created: 장형욱
 -->
<template>
  <BaseForm :formContext="formContext">
  <div class="row">
    <div class="col-4">
      <FormItem label = "운전자명" :required="true" name="deskNm">
        <Input type="text" v-model="formContext.formData.chauferDrverNm"></Input>
      </FormItem>
    </div>
    <div class="col-5">
      <FormItem label = "쇼퍼운전자" label-width="8rem" name=" innerEmpYn"></FormItem>
      <Input type="checkbox" v-model="formContext.formData.innerEmpYn" true-value="Y" false-value="N"></Input>
    </div>
    <div class="col-4">
      <FormItem label="사용안함" label-width="6rem" name="useYn">
        <Input type="checkbox" v-model="formContext.formData.useYn" true-value="N" false-value="Y"></Input>
      </FormItem>
    </div>
    <div class="col-4">
      <FormItem label="면허번호"  name="chauferDrverLcnsNo">
        <Input type="text" v-model="formContext.formData.chauferDrverLcnsNo"></Input>
      </FormItem>
    </div>
    <div class="col-4">
      <FormItem label="전화번호"  name="chauferDrverCttpcEncpt">
        <Input type="text" v-model="formContext.formData.chauferDrverCttpcEncpt"></Input>
      </FormItem>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <FormItem label="면허 종류"  name="chauferDrverLcnsKndCode" groupCode="SYSM011">
        <Input type="radio" v-model="formContext.formData.chauferDrverLcnsKndCode"></Input>
      </FormItem>
    </div>
  </div>
  <div class="col-3">
     <FormItem label="우편번호">
        <Input type="text" v-model="formContext.formData.postNo"></Input>
      </FormItem>
  </div>
  <div class="col-4">
    <FormItem label="주소">
      <Input type="text" v-model="formContext.formData.bassAdres"></Input>
    </FormItem>
  </div>
  <div class="col-5">
    <FormItem label="상세주소">
      <Input type="text" v-model="formContext.formData.detailAdres"></Input>
    </FormItem>
  </div>
  <div class="col-12">
    <FormItem label="비고1">
      <Input type="text" v-model="formContext.formData.etcContents"></Input>
    </FormItem>
  </div>
  </BaseForm>"
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
      ApiService.alert((axios, callback) => { axios.post('chauferDrver', row).then(callback)
      }, {
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
      ApiService.confirm((axios, callback) => axios.delete('chauferDrver', { data: row }).then(callback)
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