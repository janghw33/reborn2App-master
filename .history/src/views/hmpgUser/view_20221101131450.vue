<template>
    <BaseForm :formContext="formContext">
      <div class="col-6">
          <FormItem label="아이디" name="userId">
            <Input type="text" v-model="formContext.formData.userId" ></Input>
          </FormItem>
        </div>
        <div v-if="show"></div>
        <div class="col-6">
          <FormItem label="비밀번호 변경" name="passwordNew">
            <Input type="text" :required="true" v-model="formContext.formData.passwordNew"></Input>
          </FormItem>
        </div>
    
        <div class="col-6">
          <FormItem label="이름" name="userNm" :required="true">
            <Input type="text" v-model="formContext.formData.userNm" ></Input>
          </FormItem>
        </div>
        
        <div class="col-6">
          <FormItem label="휴대전화" name="tlphonNoEncpt" :required="true">
            <Input type="text" v-model="formContext.formData.tlphonNoEncpt" ></Input>
          </FormItem>
        </div>
        <div class="col-6">
          <FormItem label="생년월일" name="userBrthdy" :required="true">
            <Input type="text" v-model="formContext.formData.userBrthdy" ></Input>
          </FormItem>
        </div>
        <div class="col-6">
          <FormItem label="면허종류" name="userLcnsKndCode" :required="true">
            <Input type="radio" :data-source="{'12': '1종 보통', '21': '2종 보통'}" v-model="formContext.formData.userLcnsKndCode"></Input>
          </FormItem>
        </div>
    </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'

  const reload = inject('reload', ()=>{} )
  
  const formContext = reactive<IFormContext>({
    formData: {},
    rules: reactive<FormRules>({
    }),
    modal: {
      title: '회원관리',
      width: '1200px',
      onOpen(data) {
        formContext.formData = data ?? {}
      }
    },
  updateClick(row) {
    row.userBrthdy.substring('-','')
      ApiService.alert((axios, callback) => axios.put('hmpgUser', row).then(callback), {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.(row)
          reload()
        }
      })
    },
    })
    defineExpose({
    formContext: formContext
  })

</script>