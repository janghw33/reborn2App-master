<template>
  <BaseForm :formContext="formContext">
  </BaseForm>
</template>

<script lang="ts" setup>
import { inject, reactive } from 'vue'
import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
import ApiService from '@/core/services/ApiService'
import FormItem from '@/components/reborn/FormItem.vue'
import Input from '@/components/reborn/Input.vue'
import { FormRules } from 'element-plus'

const reload = inject('reload', () => {})
const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({
  }),
  modal: {
    title: '결제 관리',
    width: '1000px',
    onOpen(data) {
      formContext.formData = data?? {}
      },
    },

  })
})
defineExpose({
  formContext: formContext
})
</script>