<template>
  <BasePage :pageContext="pageContext">
    <BaseForm :formContext="formContext">
      {{formContext.formData}}
      <div class="card">
        <div class="card-body">
          <div class="row">
            <FormItem name="vhctyNm" :required="true" label="차종">
              <Input type="text" v-model="formContext.formData.vhctyNm"></Input>
            </FormItem>
          </div>  
        </div>
      </div>
    </BaseForm>
  </BasePage>
</template>

<script lang="ts" setup>

  import { reactive, ref, computed } from 'vue';
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue';
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService';
  import { formContextKey, FormRules } from 'element-plus'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import { Code } from '@/enums'
  import MomentService from '@/core/services/MomentService';
  import { useRouter } from 'vue-router';
import axios from 'axios';
import { ISearchFilter } from '@/components/reborn/BaseList.vue';

  const router = useRouter()
  const models = reactive<any>({
    corpData : []
  })

  const pageContext = reactive<IPageContext>({
    pageTitle: '회사 기본정보',
    breadcrumbs: ['환경설정'],
    onLoad(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.call((axios, callback) => axios.get("corpStup", { params: params }).then(callback), {
        onSuccess(data) {
          formContext.formData = data.data
        }
      })
    }
      
    })
  const formContext = reactive<IFormContext>({
    formData: {},
    rules: reactive<FormRules>({

    }),
    updateClick(row) {

    }
  })
  
  const methods = {
    findAddress() {
      new daum.Postcode({
        oncomplete: function(data) {
          formContext.formData.mycarDrverPostNo = data.zonecode
          formContext.formData.mycarDrverBassAdres = data.address
        }
      }).open();
    }

  }
  


</script>