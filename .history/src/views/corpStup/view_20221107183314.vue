<template>
  <BasePage :pageContext="pageContext">
    <BaseForm :formContext="formContext">
      {{ formContext.formData }}
      <div class="card" style="width: 1000px ;">
        <div class="card-body">
    
          <div class="row mt-5">
            <div class="col-3">
        <FormItem label="사업자번호">
          <Input type="text" v-model="formContext.formData.bsnmNo">
          </Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="대표전화번호">
          <Input type="text" v-model="formContext.formData.tlphonNo">
          </Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="Fax No">
          <Input type="text" v-model="formContext.formData.faxNo">
          </Input>
        </FormItem>
      </div>
  
      <div class="col-3">
        <FormItem label="대표자명">
          <Input type="text" v-model="formContext.formData.rprsntvNm">
          </Input>
        </FormItem>
      </div>
    </div>
    <div class="row mt-6">
      <div class="col-4">
        <FormItem label="대표전화번호">
          <Input type="text" v-model="formContext.formData.tlphonNo">
          </Input>
        </FormItem>
      </div>
      <div class="col-4">
        <FormItem label="Fax No">
          <Input type="text" v-model="formContext.formData.faxNo">
          </Input>
        </FormItem>
      </div>
    </div>
  
          
          
          </div>
      </div>
    </BaseForm>
  </BasePage>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
import ApiService from '@/core/services/ApiService'
import { formContextKey, FormRules } from 'element-plus'
import FormItem from '@/components/reborn/FormItem.vue'
import Input from '@/components/reborn/Input.vue'
import { Code } from '@/enums'
import MomentService from '@/core/services/MomentService'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ISearchFilter } from '@/components/reborn/BaseList.vue'

const router = useRouter()
const models = reactive<any>({
  corpData: [],
})

const pageContext = reactive<IPageContext>({
  pageTitle: '회사 기본정보',
  breadcrumbs: ['환경설정'],
  onLoad(searchFilter?: ISearchFilter) {
    const params = { search: searchFilter }
    ApiService.call(
      (axios, callback) =>
        axios.get('corpStup', { params: params }).then(callback),
      {
        onSuccess(data) {
          formContext.formData = data.data
        },
      }
    )
  },
})
const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({}),
  updateClick(row) {},
})

const methods = {
  findAddress() {
    new daum.Postcode({
      oncomplete: function (data) {
        formContext.formData.mycarDrverPostNo = data.zonecode
        formContext.formData.mycarDrverBassAdres = data.address
      },
    }).open()
  },
}
</script>
