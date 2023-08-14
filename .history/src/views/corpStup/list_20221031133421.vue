<template>
  <BasePage :pageContext="pageContext">
    <BaseList :formContext="formContext">
    </BaseList>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reacitve, ref, computed } from 'vue';
  import { BasePage, {IPageContext } from '@/componente'}
</script>