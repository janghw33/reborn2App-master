<!-- 
  created: 장형욱 
-->

<template
<template>
  <BaseModal ref="baseModal" 
    :validation-schema="validationSchema"
    @set-validation="setValidation"
    :action="pageData.action"
    :context="context"
    :baseModalEvents="baseModalEvents"
    width="600px"
    title="입금계좌">
    
    <template v-slot:body>
      <div class="row">
        <div class="mb-10 col-5">
          <RebornControl name="acntBankNm" type="text" :required="true" v-model="pageData.data.acntBankNm" label="은행명"></RebornControl>          
        </div>
        <div class="mb-10 col-5">
          <RebornControl name="acntDpstrNm" type="text" :required="true" v-model="pageData.data.acntDpstrNm" label="예금주명"></RebornControl>
        </div>
        <div class="row">
        <div class="mb-10 col-5">
          <RebornControl name="acntNo" type="text" :required="true" v-model="pageData.data.acntNo" label="계좌번호"></RebornControl>
        </div>
        <div class="mb-10 col">
          <label class="form-label">&nbsp;</label><br/>
          <label>
            <input type="checkbox" v-model="pageData.data.useYn" true-value="N" false-value="Y" /> 사용하지않음</label>
        </div>
        <div class="mb-10 col-10">
          <RebornControl name="etcContents" type="text" :required="true" v-model="pageData.data.etcContents" label="비고"></RebornControl>
        </div>
      </div>
    </div>
    </template>
  </BaseModal>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from "@/components/reborn/BaseForm.vue"
  import ApiService from "@/core/services/ApiService"
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import RebornControl from "@/components/reborn/control/RebornControl.vue"
  import { FormRules } from 'element-plus'

  const reload = inject('reload', () => {})
  const formContext = reactive<IFormContext>({
    formData: {},
    rules: reactive<FormRules>({

    }),
    modal: {
      title: '데스크 관리',
      width: '800px',
      onOpen(data) {
        formContext.formData = data ?? {}
      }
    },
    addClick(row) {
        
        ApiService.alert((axios, callback) => axios.post('desk', row).then(callback), {
          label: '등록',
            onSuccess() {
              formContext.modal?.close?.()
              reload()
            }
          })
      },
      updateClick(row) {
        ApiService.alert((axios, callback) => axios.put('desk', row).then(callback), {
          label: '수정',
          onSuccess() {
            formContext.modal?.close?.()
            reload()
          }
        })
      },
      deleteClick(row) {
        ApiService.confirm((axios, callback) => axios.delete('desk', { data: row }).then(callback), {
          label: '삭제',
          onSuccess() {
            formContext.modal?.close?.()
            reload()
          }
        })
      }
      ,
      exportClick(row, callback: any)
    }
  });
</script>

<style>
</style>