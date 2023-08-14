<!-- 
  created: 장형욱 
-->
<template>
  <BaseForm :formContext="formContext">
    <div class="row">
      <div class="col-6">
        <FormItem label="배차장소명" :required="true" name="alntPlcNm">
          <Input type="text" v-model="formContext.formData.alntPlcNm"></Input>
        </FormItem>
      </div>
      <div class="col-6">
        <FormItem label="사용안함" label-width="6rem" name="useYn">
        <Input type="checkbox" v-model="formContext.formData.useYn" true-value="N" false-value="Y"></Input>
      </FormItem>
      </div>
    </div>
    <div class="col-6">
        <FormItem label="지역" :required="true" name="areaSeCodeTxt">
          <Input type="select" v-model="formContext.formData.areaSeCodeTxt"></Input>
        </FormItem>
      </div>
      <!-- jhwTodo 차고지 리스트 불러오기 구현필요-->
      <div class="col-6">
        <FormItem label="차고지" :required="true" name="garageNm">
          <Input type="select" v-model="formContext.formData.garageNm"></Input>
        </FormItem>
      </div>
      <div class = "col-4">
      <FormItem label="배/회차료" name="etcContents">
        <Input type = "text" v-model="formContext.formData.etcContents"></Input>
      </FormItem>
    </div>
      <div class = "col-8">
      <FormItem label="비고" name="etcContents">
        <Input type = "text" v-model="formContext.formData.etcContents"></Input>
      </FormItem>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService.vue'
  import FormItem from "@/components/reborn/FormItem.vue";
  import Input from '@/components/reborn/Input.vue'
  import { FormRules } from 'element-plus'
 
  const reload = inject('reload', () => {})

  const formContext = reactive<IFormContext>({
    formData: {},
    rules: reactive<FormRules>({

    }),
    modal: {
      title: '배차장소',
      width: '800px',
      onOpen(data) {
        formContext.formData = data ?? {}
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => axios.post('alntPlc', row).then(callback), {
        label: '등록',
          onSuccess() {
            formContext.modal?.close?.()
            reload()
          }
      })
    },
    updateClick(row) {
      ApiService.alert((axios, callback) => axios.put('alntPlc', row).then(callback), {
        
      }
    }
  })
</script>

<style>
</style>