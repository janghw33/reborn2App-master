<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
  


    </BaseList>
  </BasePage>
</template>


<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue';
  import BasePage, { IPageContext } from '@/components/rebornNew/BasePage.vue';
  import BaseList, { IListContext, ISearchFilter } from '@/components/rebornNew/BaseList.vue';
  import ApiService from '@/core/services/ApiService';
  import RebornControl from '@/components/reborn/control/RebornControl.vue';

  const models = reactive<any>({
  })


</script>