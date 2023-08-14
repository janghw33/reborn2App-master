<!-- 
  created: 장형욱 
-->
<template>
  
    <BaseForm :formContext="formContext" v-slot="{ form }">
      {{models.insrncList}}
      <div class="card">
        <div class="row">
          <div class="col-6">
            <div class="card-body pt-2 pb-2" style="padding: 0px 16px">
              <FormItem label="차종" :required="true" name="vhctyNm">
                <Input type="text" v-model="formContext.formData.vhctyNm"  :readonly="true"></Input>
              </FormItem>
            </div>
            <div class="card shadow mb-5">
                <div class="card-header">
                  <h3 class="card-title">차량사진</h3>
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
          </div>
          <div class="col-6">
            <div class="card-body pt-2 pb-2" style="padding: 0px 16px"></div>
              <FormItem label="판매여부"  name="sleYn">
                  <Input type="checkbox" v-model="formContext.formData.sleYn"></Input>
                </FormItem>
                <FormItem label="일반보험매핑"  name="gnrlInsrncSn">
                  <Input type="select" :dataSource="models.insrncList" v-model="formContext.formData.gnrlInsrncSn">
                    <template v-slot="{ item }">
                      <el-option :value="item.insrncKndSn" :label="item.insrncKndNm"></el-option>
                    </template>
                  </Input>
                </FormItem>
                <FormItem label="일반보험매핑" name="prfectInsrncSn">
                  <Input type="select" :dataSource="models.insrncList" v-model="formContext.formData.prfectInsrncSn">
                    <template v-slot="{ item }">
                      <el-option :value="item.insrncKndSn" :label="item.insrncKndNm"></el-option>
                    </template>
                  </Input>
                </FormItem>
                <FormItem label="프리미엄 여부" name="deskNm">
                  <Input type="checkbox" v-model="formContext.formData.expsrGradCode" true-value="P" false-value=""></Input>
                </FormItem>
                <FormItem label="추천여부" :required="true" name="recomendYnTxt">
                <Input type="checkbox" v-model="formContext.formData.recomendYn" true-value="N" false-value="Y"></Input>
              </FormItem>
              <FormItem label="정렬순서" :required="true" name="sortOrdr">
                <Input type="text" v-model="formContext.formData.sortOrdr"></Input>
              </FormItem>
                <div class="card shadow mb-5">
                <div class="card-header">
                  <h3 class="card-title">기타 차량사진</h3>
                  <div class="card-toolbar"></div>
                </div>
                <div class="card-body">
                  <table class="table p-4">
                    <tr>
                      <td class="text-end">
                        <!-- <button type="button" class="btn btn-primary" @click="methods.picAppr" >사진등록</button> -->
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

            </div>
        </div>
      </div>
    </BaseForm>

</template>

<script lang="ts" setup>
import { inject, reactive } from 'vue'
import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
import ApiService from '@/core/services/ApiService'
import FormItem from '@/components/reborn/FormItem.vue'
import Input from '@/components/reborn/Input.vue'
import { FormRules } from 'element-plus'

interface Props {
  insrncList: Array<any>
}

const models = reactive<any>({
  insrncList: []
})
// const picModal = ref<InstanceType<typeof picModal>>()
const reload = inject('reload', () => {})
const formContext = reactive<IFormContext>({
  formData: {},
  rules: reactive<FormRules>({}),
  modal: {
    title: '차량 노출관리',
    width: '1000px',
    onOpen(data) {
      formContext.formData = data ?? {}

      ApiService.get("accident")
    },
  },
})
const methods = {
  insrncChange() {
  },
  // picAppr() {
  //     picModal.value?.formContext.modal?.openView?.(formContext.formData, (data) => {
  //       console.log(data)
  //     })
  //   },

}
defineExpose({
  formContext: formContext,
})
</script>
