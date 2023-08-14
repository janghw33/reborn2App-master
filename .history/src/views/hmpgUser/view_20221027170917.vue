<template>
  <BasePage :PageContext="pageContext">
    <BaseForm :formContext="formContext" v-slot="{ form }">
      <div class="col-3">
          <FormItem label="아이디" name="userId">
            <Input type="text" v-model="formContext.formData.userId" ></Input>
          </FormItem>
        </div>
        <div class="col-3">
          <FormItem label="비밀번호 변경" name="new" :required="true">
            <Input type="text" :required="true" v-model="formContext.formData.new"></Input>
          </FormItem>
        </div>
    </BaseForm>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive} from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import { useRouter } from 'vue-router'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'

  const router = useRouter()
  const models = reactive<any>({

  })
  const formContext = reactive<IFormContext>({
    formData: {},
    isDelete: true,
    isUpdate: true,
    rules: reactive<FormRules>({
      chrgerAtLeast: [{ validator: (rule, value, cb) => }]
    }),
    
  })

</script>