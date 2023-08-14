<template>
  <BaseForm :formContext="formContext" v-slot="{ modal }">
    <el-row :gutter="10">
      <el-col :span="8">
        <FormItem label="접수번호">
          <Input type="text" :disabled="true" v-model="formContext.formData.acdntReprtSn"></Input>
        </FormItem>
      </el-col>
      <el-col :span="5">
        <FormItem label="요금합계">
          <label>{{ 0 }} 원</label>
        </FormItem>
      </el-col>
      <el-col :span="11" class="d-flex" style="justify-content:flex-end">
        <el-button @click="methods.reset">다시작성</el-button>
        <el-button type="danger" @click="methods.delete" v-if="modal?.action === 'view'">삭제</el-button>
        <el-button type="warning" @click="methods.update" v-if="modal?.action === 'view'">수정</el-button>
        <el-button type="primary" @click="methods.add" v-if="modal?.action === 'add'">등록</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8">
        <FormItem label="입금일자">
          <Input type="text" mask="####-##-##" placeholder="####-##-##" v-model="models.data.payDe"></Input>
        </FormItem>
      </el-col>
      <el-col :span="6">
        <FormItem label="입금합계">
          <label>{{ 0 }} 원</label>
        </FormItem>
      </el-col>
      <el-col :span="8">
        <FormItem label="잔금">
          <label>{{ 0 }} 원</label>
        </FormItem>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <FormItem label="수납데스크" labelWidth="90px">
          <Input type="select" :dataSource="models.deskList" v-model="models.data.deskCode" valueField="deskCode" textField="deskNm" />
        </FormItem>
      </el-col>
      <el-col :span="6">
        <FormItem label="수리비" labelWidth="60px">
          <Input type="text" endText="원" v-model="models.data.repairAmount"></Input>
        </FormItem>
      </el-col>
      <el-col :span="6">
        <FormItem label="휴차보상" labelWidth="70px">
          <Input type="text" endText="원" v-model="models.data.idlecarRewardAmount"></Input>
        </FormItem>
      </el-col>
      <el-col :span="6">
        <FormItem label="면책료" labelWidth="60px">
          <Input type="text" endText="원" v-model="models.data.noresponsAmount"></Input>
        </FormItem>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <FormItem label="수납사원" labelWidth="90px">
          <Input type="select" :dataSource="models.depositList" v-model="models.data.userSn" valueField="userSn" textField="userNm" />
        </FormItem>
      </el-col>
      <el-col :span="6">
        <FormItem label="입금방법" labelWidth="70px">
          <Input type="select" :dataSource="models.paySeList" v-model="models.data.paySeCode" valueField="paySeCode" textField="paySeContents">
          </Input>
        </FormItem>
      </el-col>
      <el-col :span="12">
        <FormItem label="비고" labelWidth="70px">
          <Input type="text" v-model="models.data.etcContents"></Input>
        </FormItem>
      </el-col>
    </el-row>
    <el-divider content-position="center">입금목록</el-divider>
    <ElTable :Context="elTableContext">
      <el-table-column></el-table-column>
      <el-table-column></el-table-column>
      <el-table-column></el-table-column>
    </ElTable>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { reactive, watchEffect } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import { FormRules } from 'element-plus'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import ElTable, { IElTableContext } from '@/components/reborn/ElTable.vue'
  import MomentService from '@/core/services/MomentService'
  import ApiService from '@/core/services/ApiService'
  import { useStore } from "vuex";

  const store = useStore()
  const user = store.getters.currentUser
  
  const models = reactive<any>({
    data: {},
    depositList: [],
    deskList: [],
    paySeList: []
  })
  
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    isUpdate: false,
    isDelete: false,
    modal: {
      title: '사고자 부담 입금관리',
      width: '1000px',
      onOpen(data) {
        models.data.payDe = MomentService.now()
        formContext.formData = data

        ApiService.get("accident/paySe", { acdntReprtSn: data.acdntReprtSn }).then(({data}) => {
          elTableContext.data = data.data
          console.log(elTableContext.data)
          models.depositList = data.models['depositList']
          models.deskList = data.models['deskList']
          models.paySeList = data.models['paySeList']
          models.data.paySeCode = models.paySeList.at(0).paySeCode
        })
      }
    },
  })

  const elTableContext = reactive<IElTableContext>({
    data: [],
    headers: [
      { key: "payDe", label: "입금일자", width: "100px" },
      { key: "paySeContents", label: "입금방법", width: "100px", },
      { key: "repairAmount", label: "수리금액", width: "100px", },
      { key: "idlecarRewardAmount", label: "휴차보상금액", width: "100px", },
      { key: "noresponsAmount", label: "면책금액", width: "100px", },
      { key: "deskNm", label: "수납데스크", width: "100px", },
      { key: "userNm", label: "수납사원", width: "100px", },
      { key: "etcContents", label: "비고", width: "100px" },
    ],
    currentChange(row: any) {
      formContext.modal!.action = 'view'
      console.log('currentChange', row)
    }
  })

  watchEffect(() => {
    models.data.deskCode ??= user.deskCode
    models.data.userSn ??= user.userSn
  })

  const methods = {
    add() {
      ApiService.alert((axios, callback) => {
        const data = {
          acdntReprtSn: formContext.formData.acdntReprtSn,
          ...models.data
        }
        axios.post('accident/pay', data).then(callback)
      }, {
        label: '입금처리',
        onSuccess() {
          formContext.modal?.close?.()
        }
      })
    },
    update() {

    },
    delete() {

    },
    reset() {
      formContext.modal!.action = 'add'
      models.data = {}
    }
  }

  defineExpose({
    formContext: formContext,
  })
</script>

<style>

</style>