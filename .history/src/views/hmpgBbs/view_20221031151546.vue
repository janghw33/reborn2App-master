<template>
  <BaseForm :formContext="formContext">
    <div class= "row">
      <div class="col-6">
        <FormItem label="카테고리코드" :required="true" name="ctgryCode">
          <Input></Input>
        </FormItem>
      </div>
    </div>
  </BaseForm>
</template>