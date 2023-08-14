<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button>

      </template> 
    </BaseList>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import Input from '@/components/reborn/Input.vue'
  import type { IPrintConfig } from '@/components/reborn/BasePrint.vue'
  import { Code } from '@/enums'

  const models = reactive<any>({
    data : [],
  })

  const pageContext = reactive<IPageContext>({
    pageTitle: '기초자료',
    breadcrumbs: ['코드명'],
    onLoad() {
      listContext.onReload?.()
    }
  })
  
