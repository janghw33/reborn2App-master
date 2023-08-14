<!-- 
  created: 장형욱 
-->
<template>
  <BasePage :pageContext="pageContext">
  </BasePage>
</template>



<template>
  <BaseModal ref="baseModal" 
    :validation-schema="validationSchema"
    @set-validation="setValidation"
    :action="pageData.action"
    :context="context"
    :baseModalEvents="baseModalEvents"
    width="600px"
    title="배차장소 정보">
    
    <template v-slot:body>
      <div class="row">
        <div class="mb-10 col-5">
          <RebornControl name="alntPlcNm" type="text" :required="true" v-model="pageData.data.alntPlcNm" label="배차장소명"></RebornControl>
        </div>
        <div class="mb-10 col-5">
          <label class="form-label">&nbsp;</label><br />
          <label>
            <input type="checkbox" v-model="pageData.data.useYn" true-value="N" false-value="Y" /> 사용하지않음</label>
        </div>
        <div class="mb-10 col-5">
          <RebornControl name="areaSeCode" type="select" :required="true" groupCode="CUST019" v-model="pageData.data.areaSeCode" label="지역">
          </RebornControl>
        </div>
        <!-- jhwTodo 차고지 리스트 불러오기 구현필요
        <div class="mb-10 col-5">
          <RebornControl type="select" name="garageNm" :required="true" v-model="pageData.garageRows.garageNm" :dataSource="garageRows" label="차고지">
            <template v-slot:item="{ item }">
              <option :value="item.garageNm">{{ item.garageNm }}</option>
            </template>
          </RebornControl>
        </div> -->
        <div class="mb-10 col-10">
          <RebornControl name="etcContents" type="text" :required="false" v-model="pageData.data.etcContents" label="비고"></RebornControl>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script lang="ts" setup>
  import { defineComponent, ref, reactive, watchEffect } from "@vue/runtime-core";
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import { IContext } from "@/components/reborn/BaseList.vue";
  import BaseModal, { IBaseModalEventHandler } from "@/components/reborn/BaseModal.vue";
  import RebornControl from "@/components/reborn/control/RebornControl.vue";
  import * as Yup from "yup";
  import viewMixin from "@/core/mixin/view";
  import ApiService from "@/core/services/ApiService";

  export default defineComponent({
    name: "alntPlcView",
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
          ApiService.call("post", "alntPlc", {
            data: data
          }).then(callback)
        },
        onUpdateClick(data: any, command: any, callback: any) {
          ApiService.call("put", "alntPlc", {
            data: data
          }).then(callback)
        },
        onDeleteClick(data: any, callback: any) {
          ApiService.call("delete", "alntPlc", {
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