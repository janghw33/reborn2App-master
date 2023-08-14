<template>
  <BasePage :pageContext="pageContext">
    <BaseForm :formContext="formContext">
      <div class="card">

      </div>
    </BaseForm>
  
  </BasePage>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue'
import BasePage, {IPageContext} from '@/components/reborn/BasePage.vue'
import BaseList, {IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
import ApiService from '@/core/'

</script>