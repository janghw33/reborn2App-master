<template>
  <el-form-item :label="label" :label-width="labelWidth" :prop="name">
    <slot></slot>
  </el-form-item>
</template>
<script lang="ts" setup>
  import { inject } from 'vue'
  import { IFormContext } from "@/components/reborn/BaseForm.vue"
  import { Context } from "@/enums"
  import { FormRules } from "element-plus"

  interface Props {
    label: string,
    labelWidth?: string,
    name?: string,
    required?: boolean,
    rows?: number,
  }

  const props = withDefaults(defineProps<Props>(), {
    labelWidth: "120px",
    name: '',
    required: false,
    rows: 1,
  })

  const formContext = inject<IFormContext | null>(Context.FormContext, null)

  if (props.required && props.name != '' && formContext != null) {
    const rule: FormRules = {
      [props.name]: { required: true, message: `${props.label}은(는) 필수항목 입니다`, trigger: 'change' },
    }
    
    formContext.rules[props.name] ??= []
    formContext.rules[props.name].splice(0, 0, rule[props.name])
  }
</script>