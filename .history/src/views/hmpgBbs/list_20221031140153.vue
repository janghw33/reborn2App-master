<template>
  <BasePage :pageContext="pageContext">
    {{models.data}}
    <BaseList :listContext="listContext">
    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect} from 'vue'
import BasePage, {IpageContext } from '@/components/reborn/BasePage.vue'
import BaseList, { ILIstContext, ISearchFilter from '@/compontestf'
</script>