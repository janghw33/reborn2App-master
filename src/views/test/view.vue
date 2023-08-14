<template>
  <BaseForm :form-context="formContext">
    <RebornControl type="text" :required="true" v-model="formContext.formData.bcncNm" name="bcncNm" label="거래처명"></RebornControl>
  </BaseForm>
</template>
<script lang="ts" setup>
  import BaseForm, { IFormContext } from '@/components/rebornNew/BaseForm.vue';
  import { FormRules } from 'element-plus';
  import { reactive } from 'vue';
  import RebornControl from '@/components/reborn/control/RebornControl.vue';
  import ApiService from '@/core/services/ApiService';

  const formContext: IFormContext = reactive({
    formData: {},
    rules: reactive<FormRules>({

    }),
    modal: {
      title: '모달창',
      onOpen(row = {}) {
        formContext.formData = row
      },
    },
    deleteClick(row) {
      ApiService.alert((axios, callback) => {
        axios.delete('bcnc', { data: row }).then(callback)
      }, {
        label: '삭제',
        isLoading: true
      })
      /*
      ApiService.confirm((axios, callback) => {
        axios.delete('bcnc', { data: row }).then(callback)
      }, {
        label: '삭제',
        isLoading: true,
        onSuccess() {
          formContext.modal?.close?.()
        }
      })
      */
    }
  })

  defineExpose({
    formContext: formContext
  })

</script>