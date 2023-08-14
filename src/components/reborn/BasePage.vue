<template>
  <slot></slot>
</template>

<script lang="ts">
  export interface IPageContext {
    pageTitle: string
    breadcrumbs: string[]
    codeText?: Function
    onLoad(data?: any): void
  }

  export interface IPageAlertService {
    loading?: boolean,
    message?: string,
    response(res: AxiosResponse<any>): void
  }

  export default {
    name: 'basePage'
  }
</script>

<script lang="ts" setup>
  import { onMounted, computed, watch, provide } from '@vue/runtime-core';
  import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
  import { useStore } from "vuex";
  import { Context } from '@/enums'
  import { AxiosResponse } from 'axios';

  interface Props {
    pageContext: IPageContext,
  }

  const props = withDefaults(defineProps<Props>(), {
    
  })

  provide(Context.PageContext, props.pageContext)
  provide('reload', (data?: any) => props.pageContext.onLoad(data))
  const store = useStore();
  const sysCorpCode = computed(() => store.getters.getSysCorpCode)
  const code = computed(() => store.getters.getCode)

  const codeData = computed(() => {
    return (groupCode) => {
      if (groupCode.startsWith("CUST")) {
        const res = sysCorpCode.value.find((f) => f.groupCode == groupCode)
        return res?.details
      } else {
        const res = code.value.find((f) => f.groupCode == groupCode)
        return res?.details
      }
    }
  })

  watch([sysCorpCode, code], () => {
    // 코드데이터가 준비되면 페이지로드
    if (sysCorpCode.value.length > 0 && code.value.length > 0) {
      props.pageContext.onLoad()
    }
  }, { immediate: true })

  onMounted(() => {
    setCurrentPageBreadcrumbs(
      props.pageContext.pageTitle,
      props.pageContext.breadcrumbs
    );
  })

  props.pageContext.codeText = (groupCode: string, code: string) => {
    const codeNm = codeData.value(groupCode)?.find(f => f.code === code)?.codeNm
    return codeNm
  }
</script>

<style>

</style>