<template>
  <BasePage :PageContext="pageContext">
    <BaseForm :formContext="formContext">
      <div class="col-3">
          <FormItem label="거래처명" name="bcncNm" :required="true">
            <Input type="text" :required="true" v-model="formContext.formData.bcncNm"></Input>
          </FormItem>
        </div>
    </BaseForm>
  </BasePage>
</template>