<template>
  <BaseForm :formContext="formContext">
    <div class ="row">
      <RebornControl>
        type="text"
        label="입금방법 명"
        :required="true"
        name="paySeContents"
        v-model="formContext.formData.paySeContents"
      </RebornControl>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/rebornNew/BaseForm.vue'
  import RebornControl from '@/components/reborn/control/RebornControl.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import Week from "@/components/reborn/control/Week.vue"
  import BasePage, { IPageContext } from '@/compoenets/rebornNew/BasePage.vue'
  


</script>