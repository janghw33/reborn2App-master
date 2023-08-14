<template>
  <el-table :data="Context.data" @current-change="Context.currentChange">
    <el-table-column v-for="header in Context.headers" :fixed="header.fixed" :label="header.label" :width="header.width">
      <template #default="scope">
        {{ header.callback?.(scope.row) ?? scope.row[header.key] }}
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts">
  interface IHeaderConfiguration {
    key: string
    label: string
    fixed?: string
    width?: string
    hidden?: boolean
    groupCode?: string
    callback?: (row) => any
  }

  export interface IElTableContext {
    headers: Array<IHeaderConfiguration>,
    data: Array<any>,
    currentChange?: (row?: any) => void
  }
</script>
<script lang="ts" setup>  
  import { ref } from 'vue'
  import { ElTable } from 'element-plus'

  defineProps({
    Context: {
      type: Object as () => IElTableContext,
      required: true
    }
  })
</script>