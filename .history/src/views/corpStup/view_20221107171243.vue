<template>
  <BasePage :pageContext ="pageContext">
    <BaseForm :formContext="formContext">
      <
    </BaseForm>
  </BasePage>

</template>

<script lang="ts" setup>

  import { reactive, ref, computed } from 'vue';
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue';
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService';
  import { FormRules } from 'element-plus'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import { Code } from '@/enums'
  import MomentService from '@/core/services/MomentService';
  import { useRouter } from 'vue-router';


</script>