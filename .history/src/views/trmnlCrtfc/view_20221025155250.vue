<!-- 
  created: 장형욱 
-->
<template>
  <BaseForm :formContext="formContext">
    <div class ="col-6">
      <FormItem label="단말기코드" :required="true" name="trmnlCode">
        <Input type="text" v-model="formContext.formData.trmnlCrtfcCode"></Input>
      </FormItem>
    </div>
    <div class ="col-6">
      <FormItem label="단말기명" :required="true" name="trmnlNm">
        <Input type="text" v-model="formContext.formData.trmnlCrtfcNm"></Input>
      </FormItem>
    </div>
    <div class ="col-8">
      <FormItem label="단말기설명" :required="true" name="trmnlDcContents">
        <Input type="text" v-model="formContext.formData.etcContents"></Input>
      </FormItem>
      <FormItem label="사용 여부" :required="true" name="useYn">
        <Input type="checkbox" v-model="formContext.formData.useYn"></Input>
      </FormItem>
    </div>
    
  </BaseForm>
</template>

<script lang="ts">
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from "@/components/reborn/BaseList.vue";
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