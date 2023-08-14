<template>
  <BaseForm :formContext="formContext">
    <div class="row">
      <div class="col-3">
        <FormItem label="거래처명" name="bcncNm" :required="true">
          <Input type="text" :required="true" v-model="formContext.formData.bcncNm"></Input>
        </FormItem>
      </div>
      <div class="col-4">
        <div class="row">
          <div class="col-3">
            <Input type="checkbox" label="거래중지" v-model="formContext.formData.useYn" true-value="N" false-value="Y"></Input>
          </div>
          <div class="col-6">
            <Input type="checkbox" label="에이전트 사용중지" v-model="formContext.formData.agentUseStpgeYn" true-value="Y" false-value="N"></Input>
          </div>
        </div>
      </div>
      <div class="col">
        <FormItem label="거래처 구분" name="bcncSeCode" :required="true">
          <Input type="radio" v-model="formContext.formData.bcncSeCode" groupCode="SYSM009"></Input>
        </FormItem>
      </div>
    </div>    
    <div class="row">
      <div class="col-3">
        <FormItem label="단기대여 요금유형" name="lendChrgeClSn" :required="true" labelWidth="140px">
          <Input type="select" :dataSource="lendChargeList" v-model="formContext.formData.lendChrgeClSn" v-slot="{ item }">
            <el-option :value="item.lendChrgeClSn" :label="item.lendChrgeClNm"></el-option>
          </Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="단기보험 요금유형" name="insrncChrgeClSn" :required="true" labelWidth="140px">
          <Input type="select" :dataSource="insrncChrgeList" v-model="formContext.formData.insrncChrgeClSn" v-slot="{ item }">
            <el-option :value="item.insrncChrgeClSn" :label="item.insrncChrgeClNm"></el-option>
          </Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="장기대여 요금유형" name="lendChrgeLtClSn" labelWidth="140px">
          <Input type="select" :dataSource="lendChargeList" v-model="formContext.formData.lendChrgeLtClSn" v-slot="{ item }">
            <el-option :value="item.lendChrgeClSn" :label="item.lendChrgeClNm"></el-option>
          </Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="장기보험 요금유형" name="insrncChrgeLtClSn" labelWidth="140px">
          <Input type="select" :dataSource="insrncChrgeList" v-model="formContext.formData.insrncChrgeLtClSn" v-slot="{ item }">
            <el-option :value="item.insrncChrgeClSn" :label="item.insrncChrgeClNm"></el-option>
          </Input>
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <FormItem label="할인적용 등급" name="bcncGradCode" :required="true">
          <Input type="select" groupCode="CUST002" v-model="formContext.formData.bcncGradCode">            
          </Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="할인조건" name="dscntSeCode" :required="true">
          <Input type="select" groupCode="CUST004" v-model="formContext.formData.dscntSeCode">            
          </Input>
        </FormItem>
      </div>
      <div class="col">
        <FormItem label="주말구분">
          <Week v-model="formContext.formData.wkendDfkSeValue"></Week>
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <FormItem label="후불거래처 여부" name="frpyBcncYn">
          <Input type="radio" v-model="formContext.formData.frpyBcncYn" :dataSource="{Y: '예', N: '아니오'}">
          </Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="판매수수료" name="salesFeeRt">
          <Input type="text" v-model="formContext.formData.salesFeeRt" endText="%">
          </Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="신규예약 등록제한" name="bcncMxmmResveRegistLmttDe" labelWidth="140px">
          <Input type="text" v-model="formContext.formData.bcncMxmmResveRegistLmttDe" endText=" 일 이내">
          </Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="예약 변경/취소 제한" name="bcncMxmmResveChangeLmttTi" labelWidth="140px">
          <Input type="text" v-model="formContext.formData.bcncMxmmResveChangeLmttTi" endText=" 시간 이내">
          </Input>
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <el-form-item label-width="200px" label="담당자 정보(최소 1명 필수입력)" prop="chrgerAtLeast">
        </el-form-item>
      </div>
    </div>
    <div class="row mt-3" v-for="(row, idx) in models.bcncChargerList" :key="idx">
      <div class="col-3">
        <el-input :placeholder="`이름 ${idx + 1} : `" v-model="row.chargerNm"></el-input>
      </div>
      <div class="col-3">
        <el-input :placeholder="`전화번호 ${idx + 1} : `" v-model="row.chargerCttpcEncpt"></el-input>
      </div>
      <div class="col-4">
        <el-input :placeholder="`기타 ${idx + 1} : `" v-model="row.etcContents"></el-input>
      </div>
    </div>
    <div class="row mt-5">
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
        <FormItem label="사업자번호">
          <Input type="text" v-model="formContext.formData.bsnmNo">
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
    <div class="row">
      <div class="col-3">
        <FormItem label="업종">
          <Input type="text" v-model="formContext.formData.indutyNm">
          </Input>
        </FormItem>
      </div>
      <div class="col-3">
        <FormItem label="업태">
          <Input type="text" v-model="formContext.formData.bizcndNm">
          </Input>
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <FormItem label="우편번호">
          <Input type="text" v-model="formContext.formData.postNo">
          </Input>
        </FormItem>
      </div>
      <div class="col-4">
        <FormItem label="주소">
          <Input type="text" v-model="formContext.formData.bassAdres">
          </Input>
        </FormItem>
      </div>
      <div class="col-5">
        <FormItem label="상세주소">
          <Input type="text" v-model="formContext.formData.detailAdres">
          </Input>
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <FormItem label="비고1">
          <Input type="text" v-model="formContext.formData.etcContents"></Input>
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <FormItem label="비고2">
          <Input type="textarea" v-model="formContext.formData.etcContents2" rows="5"></Input>
        </FormItem>
      </div>
    </div>
    <div class="row">
      <h5>소속 작업자 명단</h5>        
    </div>
    <div class="row">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>작업자 아이디</th>
            <th>작업자 명</th>
            <th>전화번호</th>
            <th>할인 한도율</th>
            <th>사용여부</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in models.userList" :key="row.userSn" style="cursor: pointer" :style="[row.useYn == 'N' ? {color: 'red'} : {}]">
            <td>
              {{ row.userId }}
            </td>
            <td>
              {{ row.userNm }}
            </td>
            <td>
              {{ row.tlphonNoEncpt }}
            </td>
            <td>
              {{ row.dscntLmttRt }}
            </td>
            <td>
              {{ row.useYn == 'Y' ? '사용' : '미사용' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import Input from '@/components/reborn/Input.vue'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Week from '@/components/reborn/Week.vue'

  const props = defineProps({
    insrncChrgeList: {
      type: Object as () => Array<any>,
    },
    lendChargeList: {
      type: Object as () => Array<any>,
    },
  })
  
  const reload = inject('reload', ()=>{})
  const models = reactive<any>({
    bcncChargerList: [],
    userList: []
  })

  const chrgerAtLeastChecker = (callback) => {        
    const isValidate = models.bcncChargerList.some(f => {
      if ((f.chargerNm || null) != null && (f.chargerCttpcEncpt || null) != null) {
        return true
      }
    })
    if (!isValidate) {
      callback(new Error('담당자는 최소 1명 필수입력 입니다'))
    } else {
      callback()
    }
  }

  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      chrgerAtLeast: [{ validator: (rule, value, cb) => chrgerAtLeastChecker(cb) ,  trigger: 'change' }]
    }),
    modal: {
      title: '거래처관리',
      width: '1400px',
      onOpen(data) {
        formContext.formData = data ?? {}
        if (this.action == 'add') {
          models.bcncChargerList = Array.from(Array(5).keys()).map(i => {
            return {
              chargerNm: null, 
              chargerCttpcEncpt: null, 
              etcContents: null
            }
          })
        } else {
          const bcncCode = data.bcncCode;
          ApiService.get(`bcnc/${bcncCode}`).then(({data}) => {
            formContext.formData = data.data
            models.userList = data.models['userList']
            models.bcncChargerList = Array.from(Array(5).keys()).map(i => {
              return data.models['bcncChargerList'][i] ?? { }
            })
          })
        }
      }
    },
    addClick(row) {
      ApiService.alert((axios, callback) => axios.post('bcnc', row).then(callback), {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    updateClick(row) {
      ApiService.alert((axios, callback) => axios.put('bcnc', row).then(callback), {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(row) {          
      ApiService.confirm((axios, callback) => axios.delete('bcnc', { data: row }).then(callback), {
        label: '삭제',
        isLoading: true,
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    printClick(callback) {
      
    },
    exportClick(row, callback: any) {
      
    },
  })

  defineExpose({
    formContext: formContext
  })
</script>

<style>

</style>