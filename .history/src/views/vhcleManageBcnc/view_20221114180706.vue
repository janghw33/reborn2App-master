<!-- 
  created: 장형욱 
-->
<template>
  <BaseForm :formContext ="formContext">
    <div class="row">
      <div class="col-5">
        <FormItem label="거래처명" :required="true" name="vhcleManageBcncNm">
          <Input type="text" :required="true" v-model="formContext.formData.vhcleManageBcncNm" />
        </FormItem>
      </div>
      <div class="col-5">
        <FormItem label="사용하지 않음" name="useYn">
          <Input type="checkbox" v-model="formContext.formData.useYn" true-value="N" false-value="Y"></Input>
        </FormItem>
      </div>
    </div>
    <div class="col-5">
    <FormItem label = "거래처 구분" :required="true" name="vhcleManageBcncSeCode">
      <Input type="radio" v-model="formContext.formData.vhcleManageBcncSeCode" groupCode="SYSM012"></Input>
    </FormItem>
    </div>
    <div class = "row">
      <div class = "col-5">
        <FormItem label="사업자번호" name = "bsnmNo">
          <Input type="text" v-model="formContext.formData.bsnmNo"></Input>
        </FormItem>
      </div>
      <div class = "col-5">
        <FormItem label="대표자명" name = "rprsntvNm">
          <Input type="text" v-model="formContext.formData.rprsntvNm"></Input>
        </FormItem>
      </div>
    </div>
    <div class = "row">
      <div class = "col-5">
        <FormItem label="업종" name = "indutyNm">
          <Input type="text" v-model="formContext.formData.indutyNm"></Input>
        </FormItem>
      </div>
      <div class = "col-5">
        <FormItem label="업태" name = "bizcndNm">
          <Input type="text" v-model="formContext.formData.bizcndNm"></Input>
        </FormItem>
      </div>
    </div>
    <div class = "col-12">
      <FormItem label="주소" :rows="3">
        <el-row :gutter="10">
          <el-col :span="16">
            <Input type="text" v-model="formContext.formData.postNo" placeholder="주소검색시 자동입력" :readonly="true"></Input>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="methods.findAddress">주소검색</el-button>
          </el-col>
          <el-col :span="24">
            <Input type="text" v-model="formContext.formData.bassAdres" placeholder="기본주소" :readonly="true"></Input>
          </el-col>
          <el-col :span="24">
            <Input type="text" v-model="formContext.formData.detailAdres" placeholder="상세주소"></Input>
          </el-col>
        </el-row>
      </FormItem>
    </div>
    <div class = "col-6">
      <FormItem label="비고" name = "etcContents">
        <Input type="text" v-model="formContext.formData.etcContents"></Input>
      </FormItem>
    </div>


  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive, watchEffect } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import { FormRules } from 'element-plus'

  const props = defineProps({
  })
  const reload = inject('reload', ()=> {})
  const formContext = reactive<IFormContext>({
    formData: {},
    rules: reactive<FormRules>({
    }),
  modal: {
    title: '차량관리 거래처',
    width: '1000px',
    onOpen(data) {
      formContext.formData = data ?? {}
    },
  },
  addClick(row) {
    ApiService.alert((axios, callback) => axios.post('vhcleManageBcnc', { data: row }).then(callback), {
      label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
    })
  },
  updateClick(row) {
    ApiService.alert((axios, callback) => {axios.put('vhcleManageBcnc', { data: row }).then(callback)
    }, {
      label: '수정',
      onSuccess() {
        formContext.modal?.close?.()
        reload()
      }
    })
  },
  deleteClick(row) {
    ApiService.alert((axios, callback) => axios.delete('vhcleManageBcnc', { data: row }).then(callback), {
      label: '삭제',
      onSuccess() {
        formContext.modal?.close?.()
        reload()
      }
    })
  }
})
// watchEffect(() => {
//     formContext.formData.vhcleManageBcncNm ??= ''
//   })

// function vhcleManageBcncNmChecker(value, callback) {
//   const vhcleManageBcncNm = value
//   ApiService.get('vhcleManageBcnc/check', { vhcleManageBcncNm: vhcleManageBcncNm }).then(({data}) => {
//     const isOverlap = data.data ?? false
//     if (isOverlap) {
//       callback(new Error('중복되었습니다'))
//     } else {
//       callback()
//     }
//   })
// }

const methods = {
  // vhcleManageBcncNmChecker(value, callback) {
  //   ApiService.call((axios, cb) => axios.get('vhcleManageBcnc/check', { params: { vhcleManageBcncNm: value } }).then(cb), {
  //     onSuccess(data) {
  //       const isOverlap = data.data ?? false
  //       if (isOverlap) {
  //         callback(new Error('거래처명이 중복되었습니다.'))
  //       } else {
  //         callback()
  //       }
  //       console.log(isOverlap)
  //     }
  //   })
  // },
  findAddress() {
      new daum.Postcode({
        oncomplete: function(data) {
          formContext.formData.postNo = data.zonecode
          formContext.formData.bassAdres = data.address
        }
      }).open();
    }
}

  defineExpose({
    formContext: formContext,
  })
</script>