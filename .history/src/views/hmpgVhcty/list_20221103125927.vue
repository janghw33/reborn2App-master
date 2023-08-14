<template>
  <BasePage :PageContext="pageContext">
    <BaseList :listContext="listContext">
    </BaseList>
  </BasePage>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BaseList.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import { Code } from '@/enums'
  import MomentService from '@/core/services/MomentService'
  import { userRouter } from ''
</script>