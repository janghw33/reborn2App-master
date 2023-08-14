<template>
  <el-form ref="formRef" :model="formContext.formData" :rules="formContext.rules" :label-position="labelPosition" label-width="120px" size="default" status-icon>
    <div class="modal fade" tabindex="-1" ref="modal" v-if="isModal">
      <div class="modal-dialog" :style="{ maxWidth: formContext.modal?.width ?? '800px' }">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ formContext.modal?.title }}</h5>
            <!--begin::Close-->
            <div
              id="kt_modal_add_customer_close"
              data-bs-dismiss="modal"
              class="btn btn-icon btn-sm btn-active-icon-primary">
              <span class="svg-icon svg-icon-1">
                <inline-svg src="/media/icons/duotune/arrows/arr061.svg" />
              </span>
            </div>
            <!--end::Close-->
          </div>
          <div class="modal-body">
            <slot :form="formContext.modal"></slot>
          </div>
          <div class="modal-footer">
            <el-button @click="formContext.modal?.close">
              닫기
            </el-button>
            <slot name="button">
              <slot name="sub-button"></slot>
              <el-button label="내보내기" event="exportClick" v-if="formContext.modal?.action == 'view' && formContext.isExport">
                내보내기
              </el-button>
              <el-button label="인쇄" @click="methods.print" v-if="formContext.modal?.action == 'view' && formContext.isPrint">
                인쇄
              </el-button>
              <el-button type="danger" @click="methods.delete" v-if="formContext.modal?.action == 'view' && formContext.isDelete">
                삭제
              </el-button>
              <el-button type="warning" @click="methods.submit(formContext.updateClick)" v-if="formContext.modal?.action == 'view' && formContext.isUpdate">
                수정
              </el-button>
              <el-button type="primary" @click="methods.submit(formContext.addClick)" v-if="formContext.modal?.action == 'add' && formContext.isAdd">
                등록
              </el-button>
            </slot>            
          </div>
        </div>
      </div>
    </div> 
    <div v-else>
      <div class="d-flex" style="justify-content: space-between">
        <div>
          <slot name="top">
            
          </slot>
        </div>
        <div>
          <slot name="button">
            <el-button type="warning" label="취소" @click="methods.cancel">
              취소
            </el-button>
            <slot name="sub-button"></slot>
            <el-button label="내보내기" event="exportClick" v-if="formContext.isExport">
              내보내기
            </el-button>
            <el-button label="인쇄" @click="methods.print" v-if="formContext.isPrint">
              인쇄
            </el-button>
            <el-button type="danger" @click="methods.delete" v-if="formContext.isDelete">
              삭제
            </el-button>
            <el-button type="warning" @click="methods.submit(formContext.updateClick)" v-if="formContext.isUpdate">
              수정
            </el-button>
            <el-button type="primary" @click="methods.submit(formContext.addClick)" v-if="formContext.isAdd">
              등록
            </el-button>
          </slot>
        </div>
      </div>      
      <div class="row mt-5">
        <slot :form="formContext.modal"></slot>
      </div>
    </div>
  </el-form>
</template>

<script lang="ts">
  export interface IFormContext<T = any> {
    formData: T,
    rules: any,
    modal?: IModalUtil<T>
    addClick?(row: T): void
    updateClick?(row: T): void
    deleteClick?(row: T): void
    printClick?(callback: (printConfig: IPrintConfig, formData: any, payload?: any) => void): void
    exportClick?(row: T, callback: any): void
    cancelClick?(): void
    isAdd?: boolean
    isUpdate?: boolean
    isDelete?: boolean
    isPrint?: boolean
    isExport?: boolean
    isCancel?: boolean
  }

  interface IModalUtil<T = any> {
    title?: string
    width?: string
    action?: string
    onOpen(data?: T): void
    openAdd?(row?: T, callback?: (data?: any) => void): void
    openView?(row: T, callback?: (data?: any) => void): void
    close?(row?: T): void
  }

  export default {
    name: 'baseForm'
  }
</script>

<script lang="ts" setup>
  import { computed, inject, nextTick, ref, provide } from 'vue'
  import { hideModal, showModal } from "@/core/helpers/dom";
  import type { FormInstance } from 'element-plus'
  import type { IPrintConfig } from './BasePrint.vue'
  import { Context } from '@/enums'
  import { IPageContext } from './BasePage.vue';

  interface Props {
    formContext: IFormContext<any>
    labelPosition?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    labelPosition: 'left'
  })
  
  provide(Context.FormContext, props.formContext)
  const pageContext = inject<IPageContext | null>(Context.PageContext, null)
  const modal = ref<HTMLElement>()
  const isModal = computed(() => props.formContext.modal != null)
  const formRef = ref<FormInstance>()
  const data = computed(() => JSON.parse(JSON.stringify(props.formContext.formData)))

  props.formContext.isAdd ??= true

  // 모달창이면
  if (isModal.value) {   
    let closeCallback: Function | undefined
    props.formContext.isUpdate ??= true
    props.formContext.isDelete ??= true
    props.formContext.modal!.title ??= pageContext?.pageTitle ?? '제목없음'
    props.formContext.modal!.openAdd = (row?: any, callback?: Function) => {
      closeCallback = callback
      formRef.value?.resetFields()
      props.formContext.modal!.action = 'add'
      props.formContext.modal!.onOpen(row)

      nextTick(() => {
        showModal(modal.value!)
      })
    }
    props.formContext.modal!.openView = (row: any, callback?: Function) => {
      closeCallback = callback
      formRef.value?.resetFields()
      props.formContext.modal!.action = 'view'
      props.formContext.modal!.onOpen(row)

      nextTick(() => {
        showModal(modal.value!)
      })
    }

    props.formContext.modal!.close = (row) => {
      hideModal(modal.value!)
      closeCallback?.(row)
    }
  }

  const methods = {
    submit(action?: Function) { 
      formRef.value?.validate((valid) => {
        if (valid) {
          action?.(data.value)
        } 
      })
    },
    delete() {
      props.formContext.deleteClick?.(data.value)
    },
    cancel() {
      props.formContext.cancelClick?.()
    },
    print() {
      props.formContext.printClick?.((printConfig, formData, payload) => {
        printConfig.width ??= 1400
        printConfig.height ??= 800

        const printPopup: Window = window.open(`/print/${printConfig.url}`, "modal", `width=${printConfig.width},height=${printConfig.height},left=200,top=200`)!
        printPopup.opener.getTableData = () => {
          return {
            formData: formData,
            ...payload
          }
        }
      })
    }
  }

  defineExpose({
    formRef: formRef
  })
</script>

<style>

</style>