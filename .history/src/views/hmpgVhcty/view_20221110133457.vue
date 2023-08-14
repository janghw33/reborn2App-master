<!-- 
  created: 장형욱 
-->
<template>
  
    <BaseForm :formContext="formContext" v-slot="{ form }">
      {{models.insrncList}}
      <div class="card">
        <div class="row">

          <div class="col-6">
            <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
              <FormItem label="차종" :required="true" name="vhctyNm">
                <Input type="text" v-model="formContext.formData.vhctyNm"  :readonly="true"></Input>
              </FormItem>
              <FormItem label="추천여부" :required="true" name="recomendYnTxt">
                <Input type="checkbox" v-model="formContext.formData.recomendYn" true-value="N" false-value="Y"></Input>
              </FormItem>
              <FormItem label="정렬순서" :required="true" name="sortOrdr">
                <Input type="text" v-model="formContext.formData.sortOrdr"></Input>
              </FormItem>
            </div>
          </div>

          <div class="col-6">
            <div class="card-body pt-2 pb-2" style="padding: 0px 16px"></div>
              <FormItem label="판매여부"  name="sleYn">
                  <Input type="checkbox" v-model="formContext.formData.sleYn"></Input>
                </FormItem>
                <FormItem label="일반보험매핑"  name="gnrlInsrncSn">
                  <Input type="select" :dataSource="models.insrncList" v-model="formContext.formData.gnrlInsrncSn">
                    <template v-slot="{ item }">
                      <el-option :value="item.insrncKndSn" :label="item.insrncKndNm"></el-option>
                    </template>
                  </Input>
                </FormItem>
                <FormItem label="일반보험매핑" name="prfectInsrncSn">
                  <Input type="select" :dataSource="models.insrncList" v-model="formContext.formData.prfectInsrncSn">
                    <template v-slot="{ item }">
                      <el-option :value="item.insrncKndSn" :label="item.insrncKndNm"></el-option>
                    </template>
                  </Input>
                </FormItem>
                <FormItem label="프리미엄 여부" name="deskNm">
                  <Input type="checkbox" v-model="formContext.formData.expsrGradCode" true-value="P" false-value=""></Input>
                </FormItem>
            </div>

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

const models = reactive<any>({
  insrncList: []
})
const reload = inject('reload', () => {})
const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({}),
  modal: {
    title: '차량 노출관리',
    width: '1000px',
    onOpen(data) {
      formContext.formData = data ?? {}

      ApiService.get("accident")
    },
  },
})
const methods = {
  insrncChange() {
  }
}
defineExpose({
  formContext: formContext,
})
</script>
