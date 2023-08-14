<!-- 
  created: 장형욱 
-->
<template>
  <BasePage>
    <BaseForm :formContext="formContext">
      <div class="card">
        <div class="row">
          <div class="col-6">
            <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
              <FormItem label="차종" :required="true" name="vhctyNm" readonly="true"
              >
                <Input
                  type="text"
                  v-model="formContext.formData.vhctyNm"
                ></Input>
              </FormItem>
            </div>
            <div class="card-body pt-2 pb-2" style="padding: 0px 16px"></div>
          </div>

          <div class="col-6">
            <div class="card-body pt-2 pb-2" style="padding: 0px 16px"></div>
            <div class="card-body pt-2 pb-2" style="padding: 0px 16px"></div>

            <div class="card-body pt-2 pb-2" style="padding: 0px 16px"></div>
            <div class="card-body pt-2 pb-2" style="padding: 0px 16px"></div>
          </div>
        </div>
      </div>
    </BaseForm>
  </BasePage>
  <!-- <BaseForm :formContext = "formContext">
    {{formContext.formData}}
    <div class="col-6">
      <FormItem label="차종" :required="true" name="vhctyNm" :readonly="true">
        <Input type="text" v-model="formContext.formData.vhctyNm"></Input>
      </FormItem>
    </div>
    <div class="col-4">
      <FormItem label="데스크명" :required="true" name="deskNm">
        <Input type="text" v-model="formContext.formData.deskNm"></Input>
      </FormItem>
    </div>
  </BaseForm> -->
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
  rules: reactive<FormRules>({}),
  modal: {
    title: '차량 노출관리',
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
