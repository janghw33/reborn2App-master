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
import ApiService from '@/core/services/ApiService'
import View from './view.vue'

const models = reactive<any>({
  data: [],
})
const view = ref

</script>