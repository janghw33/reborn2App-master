<template>
  <el-checkbox-group v-model="data">
    <el-checkbox :label="row.value" v-for="row in week" :key="row.value" >{{ row.title }}</el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts">
  import { toInteger } from "lodash"
  import { ref, computed } from "vue"

  export default {
    props: {
      modelValue: {
        type: String,
      },
    },
    setup(props, { emit }) {
      const week = ref<any[]>([
        {
          value: 2,
          title: "월"
        },
        {
          value: 3,
          title: "화"
        },
        {
          value: 4,
          title: "수"
        },
        {
          value: 5,
          title: "목"
        },
        {
          value: 6,
          title: "금"
        },
        {
          value: 7,
          title: "토"
        },
        {
          value: 1,
          title: "일"
        },
      ])

      const data = computed({
        get: (): Array<number> => {
          const num = Array.from(props.modelValue?.split(",") ?? [])
          return num.map<number>(m => toInteger(m))
        },      
        set: (value) => {
          const val = week.value.filter(f => value.includes(f.value))
          emit("update:modelValue", val?.map(m => m.value).join(","))
        },
      })
      
      return {
        week,
        data,
      }
    }  
  }
</script>

<style>
  

</style>