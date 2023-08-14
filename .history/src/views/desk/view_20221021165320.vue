<template>
  <BasePage :pageContext="pageContext">
    <BaseForm :formContext="formContext">
      <div class ="row">
        <RebornControl
        type="text"
        label="입금방법 명"
        :required="true"
        name="deskNm"
        v-model="formContext.formData.deskNm">
      </RebornControl>
    </div>
    </BaseForm>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/rebornNew/BaseForm.vue'
  import RebornControl from '@/components/reborn/control/RebornControl.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import Week from "@/components/reborn/control/Week.vue"
  import BasePage, { IPageContext } from '@/components/rebornNew/BasePage.vue'
  import { useRouter } from 'vue-router'
  import type { IPrintConfig } from '@/components/rebornNew/BasePrint.vue'

  const router = useRouter()
  const models = reactive<any>({

  })
  const pageContext = reactive<IPageContext>({
    pageTitle: '뷰형태',
    breadcrumbs: ['a', 'b'],
    onLoad() {
      ApiService.get('desk').then(({data}) => {

      }) 
    }
  })
  const formContext = reactive<IFormContext>({
    fomrData: {},
    isDelete: true,
    isUpdate: true,
    rules: reactive<FormRules>({})
  })


</script>