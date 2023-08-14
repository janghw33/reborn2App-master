<!--
  created: 이진우
-->
<template>
  <BaseForm :formContext="formContext" v-slot="{ form }">
    <div class="row">
      <div class="col-3">
        <FormItem label="차종코드" :required="true" name="vhctyCode">
          <Input type="text" v-model="formContext.formData.vhctyCode" :readonly="form?.action == 'view'" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="차종명" :required="true" name="vhctyNm">
          <Input type="text" v-model="formContext.formData.vhctyNm" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="배기량" :required="true" name="vntilatCpcty">
          <Input type="text" v-model="formContext.formData.vntilatCpcty" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="차종분류" :required="true" name="vhctyClCode">
          <Input type="select" v-model="formContext.formData.vhctyClCode" :groupCode="Code.CUST006" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="제조사" :required="true" name="makrClCode">
          <Input type="select" v-model="formContext.formData.makrClCode" :groupCode="Code.CUST007" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="차종소속코드" :required="true" name="vhclePsitnCode">
          <Input type="select" v-model="formContext.formData.vhclePsitnCode" :groupCode="Code.CUST023" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="차종검색분류" :required="true" name="cmmnVhctyClCode">
          <Input type="select" v-model="formContext.formData.cmmnVhctyClCode" :groupCode="Code.SYSM036" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="승용/승합 구분" :required="true" name="corpPeplcarrSeCode">
          <Input type="select" v-model="formContext.formData.corpPeplcarrSeCode" :groupCode="Code.CART004" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="사용연료" :required="true" name="fuelTyCode">
          <Input type="select" v-model="formContext.formData.fuelTyCode" :groupCode="Code.SYSM005" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="연료단위" :required="true" name="fuelUnitCode">
          <Input type="select" v-model="formContext.formData.fuelUnitCode" :groupCode="Code.SYSM006" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="최대 연료" :required="true" name="mxmmFuelSpaceValue">
          <Input type="text" v-model="formContext.formData.mxmmFuelSpaceValue" :readonly="formContext.formData.fuelUnitCode == 'P'" end-text="칸" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="최대 연료 용량">
          <Input type="text" v-model="formContext.formData.mxmmFuelCpcty" end-text="리터" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="변속기">
          <Input type="radio" v-model="formContext.formData.transmissKndCode" :data-source="{A: '오토', M: '메뉴얼'}" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <FormItem label="차량옵션(안전) :">
          <Input type="checkbox" v-model="formContext.formData.vhcleOptionSafeCode" :groupCode="Code.CART001" />
        </FormItem>
      </div>
      <div class="col-6">
        <FormItem label="편의 :" label-width="60px">
          <Input type="checkbox" v-model="formContext.formData.vhcleOptionCnvncCode" :groupCode="Code.CART002" />
        </FormItem>
      </div>
      <div class="col-2">
        <FormItem label="음향 :" label-width="60px">
          <Input type="checkbox" v-model="formContext.formData.vhcleOptionSondCode" :groupCode="Code.CART003" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <FormItem label="외제차 여부 :">
          <Input type="radio" v-model="formContext.formData.forecarYn" :data-source="{Y: '예', N: '아니오'}" />
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="전기차 여부 :">
          <Input type="radio" v-model="formContext.formData.elctcarYn" :data-source="{Y: '예', N: '아니오'}" />
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="탑승 인원수">
          <Input type="text" v-model="formContext.formData.boadngNmprCo" end-text="명" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <FormItem label="대여 면허유형" :required="true" name="lendLcnsKndCode">
          <Input type="radio" v-model="formContext.formData.lendLcnsKndCode" :groupCode="Code.SYSM011" />
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="대여제한 나이" :required="true" name="vhctyLendLmttAge">
          <Input type="text" v-model="formContext.formData.vhctyLendLmttAge" end-text="세" />
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="대여제한 경력" :required="true" name="vhctyLendLmttCareer">
          <Input type="text" v-model="formContext.formData.vhctyLendLmttCareer" end-text="년" />
        </FormItem>
      </div>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive, watchEffect } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import MomentService from '@/core/services/MomentService'
  import { Code } from '@/enums'
  
  const reload = inject('reload', ()=>{})
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      vhctyCode: [{ validator: (rule, value, callback) => methods.vhctyCodeChecker(value, callback), trigger: 'blur' }]
    }),
    modal: {
      title: '차종상세',
      width: '1400px',
      onOpen(data) {
        formContext.formData = data ?? {}
        formContext.formData.applcDe = MomentService.now()
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => axios.post('vhcty', row).then(callback), {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    updateClick(row) {
      ApiService.alert((axios, callback) => axios.put('vhcty', row).then(callback), {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(row) {
      ApiService.confirm((axios, callback) => axios.delete('vhcty', { data: row }).then(callback), {
        label: '삭제',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    }
  })

  watchEffect(() => {
    formContext.formData.transmissKndCode ??= "A";
    formContext.formData.forecarYn ??= "N"
    formContext.formData.elctcarYn ??= "N"
  })

  watchEffect(() => {
    formContext.formData.yemodelYM = `${formContext.formData.yemodelY}-${formContext.formData.yemodelM}`
  })

  const methods = {
    vhctyCodeChecker(value, callback) {
      ApiService.call((axios, cb) => axios.get('vhcty/codeCheck', { params: { vhctyCode: value } }).then(cb), {
        onSuccess(data) {
          const isOverlap = data.data ?? false
          if (isOverlap) {
            callback(new Error('코드가 중복되었습니다.'))
          } else {
            callback()
          }
        }
      })
    }
  }

  defineExpose({
    formContext: formContext
  })
</script>

<style>

</style>