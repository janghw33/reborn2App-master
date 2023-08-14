<template>
  <BaseForm :formContext="formContext">
    <div class="row">
      <div class="mb-10 col-3">
        <FormItem label="정비일자" :readonly="true" name="imprmnDe">
          <Input type="text" v-model="formContext.formData.imprmnDe" />
        </FormItem>
      </div>
      <div class="mb-10 col-3">
        <FormItem label="차량번호" name="vhcleSn" :required="true">
          <Input type="select" v-model="formContext.formData.vhcleSn" @change="vhcleChange" :dataSource="vhcleList" v-slot="{ item }">
            <el-option :value="item.vhcleSn" :label="item.vhcleNo"></el-option>
          </Input>
        </FormItem>
      </div>
      <div class="mb-10 col-3">
        <FormItem label="차종명" name="vhctyNm" :readonly="true">
          <Input type="text" v-model="formContext.formData.vhctyNm" />
        </FormItem>
        
      </div>
      <div class="mb-10 col-3">
        <FormItem label="정비장소" name="imprmnPlcCode" :required="true">
          <Input type="select" v-model="formContext.formData.imprmnPlcCode" groupCode="CUST020" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="mb-10 col-3">
        <FormItem label="작업자">
          <Input type="select" v-model="formContext.formData.userSn" :dataSource="userList" v-slot="{ item }">
            <el-option :value="item.userSn" :label="item.userNm"></el-option>
          </Input>          
        </FormItem>
      </div>
      <div class="mb-10 col-3">
        <FormItem label="무상A/S" name="asGrtsYn" :required="true">
          <Input type="radio" v-model="formContext.formData.asGrtsYn" :data-source="{Y: '예', N: '아니오'}"></Input>          
        </FormItem>
      </div>
      <div class="mb-10 col-3">
        <FormItem label="정비내역" name="imprmnDtlsCode" :required="true">
          <Input type="select" v-model="formContext.formData.imprmnDtlsCode" groupCode="CUST021" />          
        </FormItem>
      </div>
      <div class="mb-10 col-3">
        <FormItem label="사용부품" name="useCmpntCode" :required="true">
          <Input type="select" v-model="formContext.formData.useCmpntCode" groupCode="CUST022" />          
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="mb-10">
        <FormItem label="기타부품">
          <Input type="textarea" rows="10" v-model="formContext.formData.etcCmpntContents" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="mb-10 col-3">
        <FormItem label="수량">
          <Input type="text" v-model="formContext.formData.qy" />
        </FormItem>
      </div>
      <div class="mb-10 col-3">
        <FormItem label="금액">
          <Input type="text" v-model="formContext.formData.amount" />
        </FormItem>
      </div>
      <div class="mb-10 col-3">
        <FormItem label="주행거리">
          <Input type="text" v-model="formContext.formData.opratDstncKm" endText="km" />
        </FormItem>
      </div>
      <div class="mb-10 col-3">
        <FormItem label="비고">
          <Input type="text" v-model="formContext.formData.rmContents" />
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
  import { Code } from '@/enums'

  interface Props {
    vhcleList: Array<any>,
    userList: Array<any>
  }

  const props = defineProps<Props>()

  const reload = inject('reload', ()=>{})
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    modal: {
      title: '일일정비일지',
      width: '1200px',
      onOpen(data) {
        formContext.formData = data ?? {}
        vhcleChange()
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => {
        axios.post('dailyRepair', row).then(callback)
      }, {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    updateClick(row) {
      ApiService.alert((axios, callback) => {
        axios.post('dailyRepair', row).then(callback)
      }, {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(row) {          
      ApiService.confirm((axios, callback) => {
        axios.delete('dailyRepair', { data: row }).then(callback)
      }, {
        label: '삭제',
        isLoading: true,
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
  })

  function vhcleChange() {
    const vhcleSn = formContext.formData.vhcleSn
    const idx = props.vhcleList.map(m => m.vhcleSn).indexOf(vhcleSn)
    if (idx >= 0) {
      formContext.formData.vhctyNm = props.vhcleList[idx]['vhctyNm']
    }
  }

  defineExpose({
    formContext: formContext
  })
</script>

<style>

</style>