<template>
  <BaseForm :formContext = "formContext">
    {{formContext.formData}}
    <div class="col-6">
      <FormItem label="데스크명" :required="true" name="deskNm">
        <Input type="text"
      </FormItem>
    </div>
  </BaseForm>
</template>