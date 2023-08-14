<!-- 
  created: 장형욱 
-->
<template>
  <BaseForm :formContext ="formContext">
    {{formContext.formData}}
    <div class="row">
      <div class="col-6">
        <FormItem label="거래처명" name="vhcleManageBcncNm">
          <Input type="text" :required="true" v-model="formContext.formData.vhcleManageBcncNm" />
        </FormItem>
      </div>
      <div class="col-6">
        <FormItem label="사용하지 않음" name="useYn">
          <Input type="checkbox" v-model="formContext.formData.useYn" true-value="Y" false-value="N"></Input>
        </FormItem>
      </div>
    </div>
    <div class="col-6">
    <FormItem label = "거래처 구분" name="vhcleManageBcncSeCode">
      <Input type="radio" v-model="formContext.formData.vhcleManageBcncSeCode" groupCode="SYSM012"></Input>
    </FormItem>
    </div>
    <div class = "row">
      <div class = "col-6">
        <FormItem label="사업자번호" name = "bsnmNo">
          <Input type="text" v-model="formContext.formData.bsnmNo"></Input>
        </FormItem>
      </div>
      <div class = "col-6">
        <FormItem label="대표자명" name = "mtltyNm">
          <Input type="text" v-model="formContext.formData.rprsntvNm"></Input>
        </FormItem>
      </div>
    </div>
    <div class = "row">
      <div class = "col-6">
        <FormItem label="업종" name = "rprsntvNm">
          <Input type="text" v-model="formContext.formData.rprsntvNm"></Input>
        </FormItem>
      </div>
      <div class = "col-6">
        <FormItem label="업태" name = ""
      </div>
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

  
  const props = defineProps({
    
  })
  const reload = inject('reload', ()=> {})
  const formContext = reactive<IFormContext>({
    formData: {},
    rules: reactive<FormRules>({
    }),
  modal: {
    title: '차량관리 거래처',
    width: '1000px',
    onOpen(data) {
      formContext.formData = data ?? {}
    },
  },
})

  defineExpose({
    formContext: formContext,
  })
</script>