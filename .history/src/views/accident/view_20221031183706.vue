<template>
  <BasePage :pageContext="pageContext">
    <BaseForm :formContext="formContext">
      <div class="card">
        <div class="card-header pb-2">
          <div style="display:inline-flex">
            <h3 class="card-title" style="width:100px">접수번호 : </h3>
            <input type="text" class="form-control" :value="formContext.formData?.acdntReprtSn" disabled>
          </div>
        </div>
        <div class="card-body">
          <div class="row">
            <h3>사고기본정보</h3>
            <div class="col-4">
              <div class="card shadow mb-5">
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
                  <FormItem label="사고일자" :required="true" name="acdntDate">
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <Input type="date" v-model="formContext.formData.acdntDe"></Input>
                      </el-col>
                      <el-col :span="8">
                        <Input type="time" v-model="formContext.formData.acdntHm"></Input>
                      </el-col>
                    </el-row>
                  </FormItem>
                  <FormItem name="acdntPlcCode" label="사고장소" :required="true">
                    <el-col :span="24">
                      <Input type="select" groupCode="CUST013" v-model="formContext.formData.acdntPlcCode"></Input>
                    </el-col>
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.acdntPlcContents" placeholder="상세내용"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem name="acdntWethrCode" label="날씨">
                    <Input type="select" groupCode="CUST011" v-model="formContext.formData.acdntWethrCode"></Input>
                  </FormItem>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card shadow mb-5">
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
                  <FormItem name="acdntSeCode" label="사고자구분" :required="true">
                    <Input type="select" groupCode="CUST012" v-model="formContext.formData.acdntSeCode"></Input>
                  </FormItem>
                  <FormItem name="acdntKndCode" label="사고종별" :required="true">
                    <Input type="select" groupCode="CUST015" v-model="formContext.formData.acdntKndCode"></Input>
                  </FormItem>
                  <FormItem name="acdntCauseCode" label="사고원인" :required="true">
                    <Input type="select" groupCode="CUST014" v-model="formContext.formData.acdntCauseCode"></Input>
                  </FormItem>
                  <FormItem name="acdntTyCode" label="사고유형" :required="true">
                    <Input type="select" groupCode="CUST016" v-model="formContext.formData.acdntTyCode"></Input>
                  </FormItem>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card shadow mb-5">
                <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
                  <div class="row">
                    <Input type="checkbox" groupCode="SYSM037" v-model="formContext.formData.acdntProcessMthCode"></Input>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <div class="card shadow">
                <div class="card-header">
                  <h3 class="card-title">자차정보</h3>
                  <div class="card-toolbar"></div>
                </div>
                <div class="card-body">
                  <FormItem label="계약서" :rows="2">
                    <el-row>
                      <el-col :span="24">
                        <Input type="radio" :dataSource="{N: '무', Y: '유'}" v-model="formContext.formData.cnctYn"></Input>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <Input type="text" v-model="formContext.formData.cnctNo" :readonly="true"></Input>
                      </el-col>
                      <el-col :span="8">
                        <el-button type="primary" :disabled="formContext.formData.cnctYn === 'N'" @click="methods.findCnct">계약서찾기</el-button>
                      </el-col>
                    </el-row>
                  </FormItem>
                  <FormItem name="vhcleSn" :required="true" label="차량번호">
                    <Input type="select" :dataSource="models.vhcleList"
                      v-model="formContext.formData.vhcleSn" @change="methods.vhcleChange" v-slot="{ item }">
                        <el-option :value="item.vhcleSn" :key="item.vhcleSn" :label="item.vhcleNo"></el-option>
                    </Input>
                  </FormItem>
                  <FormItem name="vhctyNm" :required="true" label="차종">
                    <Input type="text" v-model="formContext.formData.vhctyNm"></Input>
                  </FormItem>
                  <FormItem name="mycarDrverNm" :required="true" label="운전자">
                    <Input type="text" v-model="formContext.formData.mycarDrverNm"></Input>
                  </FormItem>
                  <FormItem name="mycarDrverCttpcEncpt" label="연락처">
                    <Input type="text" v-model="formContext.formData.mycarDrverCttpcEncpt" placeholder="###-####-####" mask="###-####-####"></Input>
                  </FormItem>
                  <FormItem name="mycarDrverLcnsNo" :required="true" label="면허번호">
                    <Input type="text" v-model="formContext.formData.mycarDrverLcnsNo"></Input>
                  </FormItem>
                  <FormItem label="주소" :rows="3">
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <Input type="text" v-model="formContext.formData.mycarDrverPostNo" placeholder="주소검색시 자동입력" :readonly="true"></Input>
                      </el-col>
                      <el-col :span="8">
                        <el-button type="primary" @click="methods.findAddress">주소검색</el-button>
                      </el-col>
                      <el-col :span="24">
                        <Input type="text" v-model="formContext.formData.mycarDrverBassAdres" placeholder="기본주소" :readonly="true"></Input>
                      </el-col>
                      <el-col :span="24">
                        <Input type="text" v-model="formContext.formData.mycarDrverDetailAdres" placeholder="상세주소"></Input>
                      </el-col>
                    </el-row>
                  </FormItem>
                  <FormItem label="인적피해">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.mycarHnlDmgeContents"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="손상부위">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.mycarDamgContents"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="보험사">
                    <el-col :span="24">
                      <Input type="select" groupCode="CUST008" v-model="formContext.formData.mycarInsrncCmpnyCode"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="보험담당">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.mycarInsrncChrgContents"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem name="mycarRentDe" label="임대기간" :rows="2">
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <Input type="text" v-model="formContext.formData.mycarRentBeginDe" placeholder="####-##-##" mask="####-##-##"></Input>
                      </el-col>
                      <el-col :span="8">
                        <Input type="text" v-model="formContext.formData.mycarRentBeginHm" placeholder="##:##" mask="##:##"></Input>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <Input type="text" v-model="formContext.formData.mycarRentEndDe" placeholder="####-##-##" mask="####-##-##"></Input>
                      </el-col>
                      <el-col :span="8">
                        <Input type="text" v-model="formContext.formData.mycarRentEndHm" placeholder="##:##" mask="##:##"></Input>
                      </el-col>                      
                    </el-row>
                  </FormItem>
                  <FormItem label="자차보험">
                    <el-col :span="24">
                      <Input type="radio" v-model="formContext.formData.mycarInsrncSbscrbYn" :dataSource="{N: '미가입', Y: '가입'}"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="자차가입금액">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.mycarInsrncSbscrbAmount"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="특이사항">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.mycarInsrncEtcContents"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="보험접수No">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.mycarInsrncRceptNo"></Input>
                    </el-col>
                  </FormItem>
                  <el-divider />
                  <el-row>
                    <el-table :data="acdntNmprsData" style="width: 100%; margin-bottom: 4px;">
                      <template #append>
                        <el-row style="margin: 10px 0px">
                          <el-input type="text" style="width:100px" placeholder="사고자명" v-model="models.newAcdnt.accidriverNm"></el-input>
                          <el-input type="text" style="width:100px" placeholder="생년월일" v-model="models.newAcdnt.accidriverBrthdy"></el-input>
                          <el-input type="text" style="width:150px" placeholder="연락처" v-model="models.newAcdnt.accidriverCttpcEncpt"></el-input>
                          <el-input type="text" style="width:150px" placeholder="병원" v-model="models.newAcdnt.accidriverHsptlNm"></el-input>
                          <el-input type="text" style="width:190px; margin-right: 10px;" placeholder="비고" v-model="models.newAcdnt.accidriverEtcContents"></el-input>
                          <el-button type="primary" size="small" @click.prevent="methods.acdntAdd(models.newAcdnt)">추가</el-button>
                        </el-row>
                      </template>
                      <el-table-column fixed prop="accidriverNm" label="사고자명" width="100"></el-table-column>
                      <el-table-column prop="accidriverBrthdy" label="생년월일" width="100"></el-table-column>
                      <el-table-column prop="accidriverCttpcEncpt" label="연락처" width="150"></el-table-column>
                      <el-table-column prop="accidriverHsptlNm" label="병원" width="150"></el-table-column>
                      <el-table-column prop="accidriverEtcContents" label="비고" width="200"></el-table-column>
                      <el-table-column fixed="right" label="버튼" width="80">
                        <template #default="scope">
                          <el-button type="danger" size="small" @click.prevent="methods.acdntRemove(scope.row)">삭제</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow mb-5">
                <div class="card-header">
                  <h3 class="card-title">타차정보</h3>
                  <div class="card-toolbar">
                    
                  </div>
                </div>
                <div class="card-body">
                  <FormItem label="차량번호">
                    <Input type="text" v-model="formContext.formData.somcarVhcleNo"></Input>
                  </FormItem>
                  <FormItem label="차종">
                    <Input type="text" v-model="formContext.formData.somcarVhctyNm"></Input>
                  </FormItem>
                  <FormItem label="운전자">
                    <Input type="text" v-model="formContext.formData.somcarDrverNm"></Input>
                  </FormItem>
                  <FormItem label="연락처">
                    <Input type="text" v-model="formContext.formData.somcarDrverCttpcEncpt"></Input>
                  </FormItem>
                  <FormItem label="수리비">
                    <Input type="text" v-model="formContext.formData.somcarRepairAmount"></Input>
                  </FormItem>
                  <FormItem label="인적피해">
                    <Input type="text" v-model="formContext.formData.somcarHnlDmgeContents"></Input>
                  </FormItem>
                  <FormItem label="손상부위">
                    <Input type="text" v-model="formContext.formData.somcarDamgContents"></Input>
                  </FormItem>
                  <FormItem label="보험사">
                    <Input type="text" v-model="formContext.formData.somcarInsrncCmpnyCode"></Input>
                  </FormItem>                  
                  <FormItem label="보험담당">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.somcarInsrncChrgContents"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="특이사항">
                    <el-col :span="24">
                      <Input type="textarea" v-model="formContext.formData.somcarEtcContents"></Input>
                    </el-col>
                  </FormItem>
                </div>
              </div>
              <div class="card shadow mb-5">
                <div class="card-header">
                  <h3 class="card-title">수리내역</h3>
                  <div class="card-toolbar">
                    
                  </div>
                </div>
                <div class="card-body">
                  <FormItem label="공업사" labelWidth="100px">
                    <el-col :span="24">
                      <Input type="select" groupCode="CUST020" v-model="formContext.formData.repairIndstryCode"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="과실비율" labelWidth="100px">
                    <el-row :gutter=10>
                      <el-col :span="11">
                        <Input type="text" v-model="formContext.formData.repairFaultMmnyRate" endText="%"></Input>
                      </el-col>
                      <el-col :span="1">
                        <span>:</span>
                      </el-col>
                      <el-col :span="11">
                        <Input type="text" v-model="formContext.formData.repairFaultPartnRate" endText="%"></Input>
                      </el-col>
                    </el-row>                    
                  </FormItem>
                  <FormItem label="총견적" labelWidth="100px">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.repairEstmtAmount"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="자사부담" labelWidth="100px">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.repairMmnyBndAmount"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="상대부담" labelWidth="100px">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.repairPartnBndAmount"></Input>
                    </el-col>
                  </FormItem>
                  <FormItem label="수리기간" labelWidth="100px">
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <Input type="text" v-model="formContext.formData.repairBeginDe" mask="####-##-##" placeholder="yyyy-MM-dd"></Input>
                      </el-col>
                      <el-col :span="8">
                        <Input type="text" v-model="formContext.formData.repairBeginHm" mask="##:##" placeholder="HH:mm"></Input>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :span="16">
                        <Input type="text" v-model="formContext.formData.repairEndDe" mask="####-##-##" placeholder="yyyy-MM-dd"></Input>
                      </el-col>
                      <el-col :span="8">
                        <Input type="text" v-model="formContext.formData.repairEndHm" mask="##:##" placeholder="HH:mm"></Input>
                      </el-col>
                    </el-row>
                  </FormItem>
                </div>
              </div>
              <div class="card shadow mb-5">
                <div class="card-header">
                  <h3 class="card-title">사고자부담</h3>
                  <div class="card-toolbar">
                    <button type="button" class="btn btn-primary btn-sm me-n3" @click="methods.faidAppr">
                      입금처리
                    </button>                                        
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-6">
                      <FormItem label="수리비" label-width="80px">
                        <el-col :span="24">
                          <Input type="text" v-model="formContext.formData.accidriverBndRepairAmount"></Input>
                        </el-col>
                      </FormItem>
                    </div>
                    <div class="col-6">
                      <FormItem label="총합계" label-width="80px">
                        <el-col :span="24">
                          <Input type="text" v-model="formContext.formData.totalAmount"></Input>
                        </el-col>
                      </FormItem>
                    </div>                    
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <FormItem label="휴차보상" label-width="80px">
                        <el-col :span="24">
                          <Input type="text" v-model="formContext.formData.accidriverBndIdlecarReward"></Input>
                        </el-col>
                      </FormItem>
                    </div>
                    <div class="col-6">
                      <FormItem label="배상입금" label-width="80px">
                        <el-col :span="24">
                          <Input type="text" v-model="formContext.formData.payAmount"></Input>
                        </el-col>
                      </FormItem>
                    </div>                    
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <FormItem label="면책료" label-width="80px">
                        <el-col :span="24">
                          <Input type="text" v-model="formContext.formData.accidriverBndNoresponsAmoun"></Input>
                        </el-col>
                      </FormItem>
                    </div>
                    <div class="col-6">
                      <FormItem label="미수금액" label-width="80px">
                        <el-col :span="24">
                          <Input type="text" v-model="formContext.formData.balance"></Input>
                        </el-col>
                      </FormItem>
                    </div>                    
                  </div>
                  <FormItem label="추가조치" label-width="80px">
                    <el-col :span="24">
                      <Input type="text" v-model="formContext.formData.accidriverAddManagtContents"></Input>
                    </el-col>
                  </FormItem>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card shadow mb-5">
                <div class="card-header">
                  <h3 class="card-title">사고사진</h3>
                  <div class="card-toolbar">
                    
                  </div>
                </div>
                <div class="card-body">
                  <table class="table p-4">
                    <tr>
                      <td class="text-end">
                        <button class="btn btn-primary">사진등록</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <img src="https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc=" style="width:100%; height:275px">
                      </td>
                    </tr>
                  </table>                  
                </div>
              </div>
              <div class="card shadow mb-5">
                <div class="card-header">
                  <h3 class="card-title">파일첨부</h3>
                  <div class="card-toolbar">
                    
                  </div>
                </div>
                <div class="card-body">
                  <el-upload
                    ref="uploadRef"
                    class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :auto-upload="false"
                  >
                    <template #trigger>
                      <el-button type="primary">select file</el-button>
                    </template>

                    <el-button class="ms-3 mb-1" type="success" @click="methods.fileUpload">
                      upload to server
                    </el-button>

                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                      </div>
                    </template>
                  </el-upload>
                </div>
              </div>
              <div class="card shadow mb-5">
                <div class="card-header">
                  <h3 class="card-title">사고경위</h3>
                  <div class="card-toolbar">
                  </div>
                </div>
                <div class="card-body">
                  <div class="row">
                    <Input type="textarea" rows="3" v-model="formContext.formData.acdntCrcmstncsContents"></Input>
                  </div>
                  <table class="table table-bordered mt-5 table-row-dashed border table-rounded">
                    <colgroup>
                      <col style="width:100px">
                      <col>
                    </colgroup>
                    <tbody>
                      <tr>
                        <th style="background-color: #d8f8fd;">접수일자</th>
                        <td>
                          {{ formContext.formData.rceptDt }}
                        </td>
                      </tr>
                      <tr>
                        <th style="background-color: #d8f8fd;">접수자</th>
                        <td>
                          {{ formContext.formData.rceptUserNm }}
                        </td>
                      </tr>
                      <tr>
                        <th style="background-color: #beeae5;">수정일자</th>
                        <td>
                          {{ formContext.formData.updtDt }}
                        </td>
                      </tr>
                      <tr>
                        <th style="background-color: #beeae5;">수정자</th>
                        <td>
                          {{ formContext.formData.updtUserNm }}
                        </td>
                      </tr>
                      <tr>
                        <th style="background-color: #dfdfdf;">완결일자</th>
                        <td>
                          {{ formContext.formData.comptDt }}
                        </td>
                      </tr>
                      <tr>
                        <th style="background-color: #dfdfdf;">완결자</th>
                        <td>
                          {{ formContext.formData.comptUserNm }}
                        </td>
                      </tr>
                      <tr>
                        <th class="danger">삭제일자</th>
                        <td class="text-danger">
                          {{ formContext.formData.deleteDt }}
                        </td>
                      </tr>
                      <tr>
                        <th class="danger">삭제자</th>
                        <td class="text-danger">
                          {{ formContext.formData.deleteUserSn }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </BaseForm>
    <CnctModal ref="cnctModal"></CnctModal>
    <FaidModal ref="faidModal"></FaidModal>
  </BasePage>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref, watchEffect } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import { useRoute } from 'vue-router'
  import CnctModal from './cnctModal.vue'
  import FaidModal from './faidModal.vue'

  const route = useRoute()
  const models = reactive<any>({
    vhcleList: [],
    newAcdnt: {}
  })
  const cnctModal = ref<InstanceType<typeof CnctModal>>()
  const faidModal = ref<InstanceType<typeof FaidModal>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '사고보고서',
    breadcrumbs: ['차량관리'],
    async onLoad() {
      const acdntReprtSn = route.query.acdntReprtSn
      const { data } = await ApiService.get("accident/" + acdntReprtSn)
      formContext.formData = data.data
      models.vhcleList = data.models.vhcleList
      methods.vhcleChange()
    },
  })
  const formContext = reactive<IFormContext>({
    formData: {},  
    rules: reactive<FormRules>({
      
    }),
    isPrint: true,
    addClick(row) {
      
    },
    updateClick(row) {
      
    },
    deleteClick(row) {          
      
    },
    printClick(callback) {
      
    },
    exportClick(row, callback: any) {
      
    },
    cancelClick() {
      
    }
  })

  watchEffect(() => {
    formContext.formData.acdntDe ??= ""
    formContext.formData.acdntHm ??= ""

    if (formContext.formData.acdntDe == "" || formContext.formData.acdntHm == "")
      formContext.formData.acdntDate = ""
    else
      formContext.formData.acdntDate = formContext.formData.acdntDe + " " + formContext.formData.acdntHm
  })

  watchEffect(() => {
    formContext.formData.cnctYn ??= 'N'
  })

  const acdntNmprsData = computed(() => formContext.formData.acdntNmprs?.filter(f => f.type != 'delete') ?? [])

  const methods = {
    vhcleChange() {
      const idx = models.vhcleList.map(m => m.vhcleSn).indexOf(formContext.formData?.vhcleSn)
      if (idx >= 0) {
        formContext.formData.vhctyNm = models.vhcleList?.[idx]?.vhctyNm
      }
    },
    fileUpload() {

    },
    findCnct() {
      cnctModal.value?.formContext.modal?.openView?.(formContext.formData, (data) => {
        formContext.formData.cnctNo = data.cnctNo
      })
    },
    faidAppr() {
      faidModal.value?.formContext.modal?.openView?.(formContext.formData, (data) => {
        console.log(data)
      })
    },
    acdntAdd(newRow: any) {
      formContext.formData.acdntNmprs.push(newRow)
      /*
      ApiService.call((axios, callback) => axios.post('accident/acdnt', {
        acdntReprtSn: formContext.formData.acdntReprtSn,
          ...newRow
        }).then(callback), {
          message: '운전자 등록이 완료되었습니다',
          onSuccess(data) {
            formContext.formData.acdntNmprs.push(data.data)
        }
      })
      */
    },
    async acdntRemove(row: any) {
      row.type = 'delete'
    },
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

<style>

</style>