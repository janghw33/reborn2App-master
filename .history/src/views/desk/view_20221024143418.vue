<!-- 
  created: 장형욱 
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseForm :formContext="formContext">
      <div class="col-8">
      <FormItem label="데스크명" :required="true" name="deskNm">
        <Input name="deskNm" type="text" v-model="formContext.formData.deskNm"></Input>
      </FormItem>
    </div>
    </BaseForm>
  </BasePage>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import RebornControl from '@/components/reborn/control/RebornControl.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import Week from "@/components/reborn/control/Week.vue"
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import { useRouter } from 'vue-router'



  const reload = inject('reload', () => {})
  const pageContext = reactive<IPageContext>({
    pageTitle: '뷰형태',
    breadcrumbs: ['a', 'b'],
    onLoad() {
      ApiService.get('desk').then(({data}) => {

      }) 
    }
  })
  const formContext = reactive<IFormContext>({
    formData: {},
    isDelete: true,
    isUpdate: true,
    rules: reactive<FormRules>({
    }),
    isPrint: true,
    addClick(row) {
      ApiService.alert((axios, callback) => axios.post('desk', row).then(callback), {
        label: '등록',
        onSuccess() {

        }
      })
    }
  })

  defineExpose({
    formContext: formContext,
  })


</script>