<template></template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
export default defineComponent({
  setup() {
    onMounted(() => {
      setCurrentPageTitle("Empty");
    });
  },
});
</script>

<style>
</style>