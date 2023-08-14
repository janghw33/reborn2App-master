<!-- 
  created: 장형욱 
-->
<template>
  <BaseForm :formContext = "formContext">
    {{formContext.formData}}
    <div class="col-6">
      <FormItem label="데스크명" :required="true" name="deskNm">
        <Input type="text" v-model="formContext.formData.deskNm"></Input>
      </FormItem>
    </div>
    <div class="col-4">
      <FormItem label="데스크명" :required="true" name="deskNm">
        <Input type="text" v-model="formContext.formData.deskNm"></Input>
      </FormItem>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService'
  import FormItem from '@/compnents/rebonr/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import { FormRules } from 'element-plus'

  const reload = inject('reload', () => {})
  const formContext = reactive<IFormContext>({
    formData: {},
    rules: reactive<FormRules>({

    }),
    modal: {
      title: '차량 노출관리',
      width: '1000px',
      onOpen(data) {
        formContext.formData = data ?? {}
      }
    }
  })
  defineExpose({
    formContext: formContext,
  })
</script>