<!-- 
  created: 장형욱 
-->
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
          ApiService.call("post", "acnt", {
            data: data
          }).then(callback)
        },
        onUpdateClick(data: any, command: any, callback: any) {
          ApiService.call("post", "acnt", {
            data: data
          }).then(callback)
        },
        onDeleteClick(data: any, callback: any) {
          ApiService.call("delete", "acnt", {
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
</script>

<style>
</style>