<!-- 
  created: 장형욱 
-->
<template>
  <BaseForm :formContext="formContext">
    <div class ="col-6">
      <FormItem label="단말기코드" :required="true" name="trmnlCrtfcCode">
        <Input type="text" v-model="formContext.formData.trmnlCrtfcCode"></Input>
      </FormItem>
    </div>
    <div class ="col-6">
      <FormItem label="단말기명" :required="true" name="trmnlCrtfcNm">
        <Input type="text" v-model="formContext.formData.trmnlCrtfcNm"></Input>
      </FormItem>
    </div>
    <div class ="col-8">
      <FormItem label="단말기설명" :required="true" name="etc">
        <Input type="text" v-model="formContext.formData.trmnlCrtfcNm"></Input>
      </FormItem>
    </div>
    
  </BaseForm>
  <BaseModal ref="baseModal" 
    :validation-schema="validationSchema"
    @set-validation="setValidation"
    :action="pageData.action"
    :context="context"
    :baseModalEvents="baseModalEvents"
    width="600px"
    title="전자계약 단말기 수정">
    
    <template v-slot:body="{ action }">
      <div class="row">
        <div class="mb-10 col-4">
          <RebornControl name="trmnlCode" type="text" :required="true" :readonly="action == 'view'" v-model="pageData.data.trmnlCode" label="단말기 코드"></RebornControl>
        </div>
        <div class="mb-10 col-4">
          <RebornControl name="trmnlNm" type="text" :required="true" v-model="pageData.data.trmnlNm" label="단말기 명"></RebornControl>          
        </div>
      </div>
      <div class="row">
        <div class="mb-12 col-4">
          <RebornControl name="trmnlDcContents" type="text" :required="true" v-model="pageData.data.trmnlDcContents" label="단말기 설명 내용"></RebornControl>
        </div>
        <div class="mb-10 col-6">
          <RebornControl name="useYn" type="radioYN" v-model="pageData.data.useYn" label="사용 여부" :dataSource="{Y: '사용', N: '미사용'}">
          </RebornControl>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts">
  import { defineComponent, ref, reactive, watchEffect } from "@vue/runtime-core";
  import { IContext } from "@/components/reborn/BaseList.vue";
  import BaseModal, { IBaseModalEventHandler } from "@/components/reborn/BaseModal.vue";
  import RebornControl from "@/components/reborn/control/RebornControl.vue";
  import * as Yup from "yup";
  import viewMixin from "@/core/mixin/view";
  import ApiService from "@/core/services/ApiService";

  export default defineComponent({
    name: "basicView",
    mixins: [
      viewMixin
    ],
    components: {
      BaseModal, RebornControl
    },
    props: {
      context: {
        type: Object as () => IContext,
        required: true
      }
    },
    setup() {
      const baseModal = ref<InstanceType<typeof BaseModal>>()

      const pageData: any = reactive({
        action: null,
        data: {},
      })

      const validationSchema = ref(Yup.object().shape({
        
      }))

      watchEffect(() => {
        pageData.data.useYn ??= 'Y'
      })

      const baseModalEvents: IBaseModalEventHandler = {
        onModalOpen(data: any) {

        },
        onAddClick(data: any, command: any, callback: any) {          
          ApiService.call("post", "trmnlCrtfc", {
            data: data
          }).then(callback)
        },
        onUpdateClick(data: any, command: any, callback: any) {
          ApiService.call("put", "trmnlCrtfc", {
            data: data
          }).then(callback)
        },
        onDeleteClick(data: any, callback: any) {
          ApiService.call("delete", "trmnlCrtfc", {
            data: data
          }).then(callback)
        },
      }
      
      return {
        baseModal,
        pageData,
        validationSchema,
        baseModalEvents
      }
    }
  });

  defineExpose({
  formContext: formContext,
})
</script>

<style>
</style>