<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
  


    </BaseList>
  </BasePage>
</template>


<script lang="ts" setup>
  import BasePage, { IPageContext } from 'vue';
  import BaeList, { IListContext, ISearchFilter } from '@/components/rebornNew/BaseList.vue';

</script>