<!--
  created: 이진우
-->
<template>
  <BaseForm :formContext="formContext" v-slot="{ form }">
    <div class="row">
      <div class="col-4">
        <FormItem label="차량번호" :required="true" name="vhcleNo">
          <Input type="text" v-model="formContext.formData.vhcleNo" :readonly="form?.action == 'view'" />
        </FormItem>
      </div>
      <div class="col">
        <Input type="checkbox" name="useYn" v-model="formContext.formData.useYn" label="사용하지 않음"></Input>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <FormItem label="차종" :required="true" name="vhctyCode">
          <Input type="select" v-model="formContext.formData.vhctyCode" :dataSource="vhctyRows" v-slot="{ item }">
            <el-option :value="item.vhctyCode">{{ item.vhctyNm }}</el-option>
          </Input>
        </FormItem>
      </div>
      <div class="col-4">
        <FormItem label="등록관청" :required="true" name="registGrcCode">
          <Input type="select" v-model="formContext.formData.registGrcCode" groupCode="CUST001" />
        </FormItem>
      </div>
      <div class="col-4">
        <FormItem label="모바일 키" :required="true" name="mobileKeyCode">
          <Input type="select" v-model="formContext.formData.mobileKeyCode" groupCode="SYSM042" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="운행구분" :required="true" name="opratSeCode">
          <Input type="radio" :dataSource="{S: '단기대여', L: '장기대여'}" v-model="formContext.formData.opratSeCode" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="최초등록일" :required="true" name="vhcleRegistDe">
          <Input type="date" v-model="formContext.formData.vhcleRegistDe" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="연식" label-width="80px" :required="true" name="yemodelYM">
          <Input type="select" v-model="formContext.formData.yemodelY"
            :data-source="methods.getNumbers(1999, parseInt(MomentService.now('Y')) + 1)" 
            v-slot="{ item }" style="width:100px">
            <el-option :value="item">{{ item }}</el-option>
          </Input>
          <el-col :span="3" class="text-center">
            년
          </el-col>
          <Input type="select" v-model="formContext.formData.yemodelM" 
            :data-source="methods.getNumbers(1, 12)" 
            v-slot="{ item }" style="width:70px">
            <el-option :value="item">{{ item }}</el-option>
          </Input>
          <el-col :span="3" class="text-center">
            월
          </el-col>
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="차량만료일" name="vhcleEndDe">
          <Input type="date" v-model="formContext.formData.vhcleEndDe" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="차량소속코드">
          <Input type="select" v-model="formContext.formData.vhclePsitnCode" groupCode="CUST023" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <FormItem label="차량색상">
          <Input type="text" name="vhcleColor" v-model="formContext.formData.vhcleColor" />
        </FormItem>
      </div>
      <div class="col-4">
        <FormItem label="차대번호">
          <Input type="text" v-model="formContext.formData.carbodyNo" />
        </FormItem>
      </div>
      <div class="col-4">
        <FormItem label="차량형식">
          <Input type="text" v-model="formContext.formData.vhcleFomNm" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="사용 네비게이션">
          <Input type="select" v-model="formContext.formData.cnvncEqpmnCode" 
            :dataSource="naviRows">
            <template #item="{ item }">
              <el-option :value="item.cnvncEqpmnCode" :label="item.cnvncEqpmnNm"></el-option>
            </template>
          </Input>
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="배기용량">
          <Input type="text" v-model="formContext.formData.vntilatCpcty" />
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="네비게이션 관리번호" label-width="160px">
          <Input type="text" v-model="formContext.formData.naviManageno" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <FormItem label="비고">
          <Input type="text" v-model="formContext.formData.etcContents" />
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

  interface Props {
    vhctyRows: Array<any>,
    naviRows: Array<any>
  }

  const props = defineProps<Props>()

  const reload = inject('reload', ()=>{})
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    modal: {
      width: '1400px',
      onOpen(data) {
        formContext.formData = data ?? {}
        formContext.formData.applcDe = MomentService.now()
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => axios.post('vhcle', row).then(callback), {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    updateClick(row) {
      ApiService.alert((axios, callback) => axios.put('vhcle', row).then(callback), {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(row) {
      ApiService.confirm((axios, callback) => axios.delete('vhcle', { data: row }).then(callback), {
        label: '삭제',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    }
  })

  watchEffect(() => {
    formContext.formData.useYn ??= 'Y'
    formContext.formData.mobileKeyCode ??= '01'
    formContext.formData.yemodelY ??= MomentService.now('Y')
    formContext.formData.yemodelM ??= MomentService.now('MM')
    formContext.formData.opratSeCode ??= 'S'
  })

  watchEffect(() => {
    formContext.formData.yemodelYM = `${formContext.formData.yemodelY}-${formContext.formData.yemodelM}`
  })

  const methods = {
    getNumbers(start, stop, step = 1): Array<string> {
      return new Array((stop - start + 1) / step).fill(start).map((n, i) => ((n + i) * step).toString())
    }
  }

  defineExpose({
    formContext: formContext
  })
</script>

<style>

</style>