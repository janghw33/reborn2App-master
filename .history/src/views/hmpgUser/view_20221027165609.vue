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

