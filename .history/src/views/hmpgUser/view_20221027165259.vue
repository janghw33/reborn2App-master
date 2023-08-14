<template>
  <BasePage :PageContext="pageContext">
    <BaseForm :formContext="formContext">
      <div class="col-3">
          <FormItem label="아이디" name="userId">
            <Input type="text" v-model="formContext.formData.userId" :readonly="form?.action == 'view'></Input>
          </FormItem>
        </div>
        <div class="col-3">
          <FormItem label="아이디" name="userId" :required="true">
            <Input type="text" :required="true" v-model="formContext.formData.userId"></Input>
          </FormItem>
        </div>
    </BaseForm>
  </BasePage>
</template>