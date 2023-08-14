<template>
    <BaseForm :formContext="formContext" v-slot="{ form }">
      <div class="col-6">
          <FormItem label="아이디" name="userId">
            <Input type="text" v-model="formContext.formData.userId" ></Input>
          </FormItem>
        </div>
        <div class="col-6">
          <FormItem label="비밀번호 변경" name="new" :required="true">
            <Input type="text" :required="true" v-model="formContext.formData.new"></Input>
          </FormItem>
        </div>
        <div class="col-6">
          <FormItem label="이름" name="userNm">
            <Input type="text" v-model="formContext.formData.userId" ></Input>
          </FormItem>
        </div>
        <div class="col-6">
          <FormItem label="휴대전화" name="tlphonNoEncpt">
            <Input type="text" v-model="formContext.formData.tlphonNoEncpt" ></Input>
          </FormItem>
        </div>
        <div class="col-6">
          <FormItem label="생년월일" name="userBrthdy">
            <Input type="date" v-model="formContext.formData.userBrthdy" ></Input>
          </FormItem>
        </div>
        <div class="col-6">
          <FormItem label="면허종류" name="userLcnsKndCode">
            <Input type="radio" :data-source="{12: '예', N: '아니오'}" v-model="formContext.formData.userLcnsKndCode" groupCode="SYSM009"></Input>
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
  
  const models = reactive<any>({

  })
  const formContext = reactive<IFormContext>({
    formData: {},
    isUpdate: true,
    rules: reactive<FormRules>({
    }),
    modal: {
      title: '회원관리',
      width: '1200px',
      onOpen(data) {

      }
    },
  updateClick(row) {
      ApiService.alert((axios, callback) => axios.put('hmpgUser', row).then(callback), {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.(row)
          
        }
      })
    },
    })
    defineExpose({
    formContext: formContext
  })

</script>