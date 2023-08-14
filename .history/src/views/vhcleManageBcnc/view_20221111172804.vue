<template>

</template>

<script lang="ts" setup>
  import { inject, reactive } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'

  const props = defineProps({
    
  })

  const reload = inject('reload', () => {})
  const models = reactive<any>({
    totalCount: []
  })





</script>