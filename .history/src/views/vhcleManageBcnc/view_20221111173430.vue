<!-- 
  created: 장형욱 
-->
<template>
  <BaseForm :formContext ="formContext">
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService

  const props = defineProps({
    
  })

  const reload = inject('reload', () => {})
  const models = reactive<any>({
    totalCount: []
  })





</script>