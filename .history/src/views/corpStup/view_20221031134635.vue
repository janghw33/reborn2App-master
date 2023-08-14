<template>
  <BasePage :pageContext="pageContext">
    <BaseForm :formContext="formContext">
      <div class="card">
        <div calss="card-header pb-2">

        </div>
      </div>
  </BasePage>
</template>

<script lang="ts" setup>
import { inject, reactive } from 'vue'
import BaseForm, {IFormContext } from '@/components/reborn/BaseForm.vue'
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
    title: '데스크 등록'
  }
})

</script>