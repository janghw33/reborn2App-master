<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button>
        <el-buttion type="info" @click="openModal2">리스트형 모달창</el-buttion>
      </template>
    </BaseList>
  </BasePage>
  <View ref="view"></View>

<script lang="ts" setup>
  import
</script>