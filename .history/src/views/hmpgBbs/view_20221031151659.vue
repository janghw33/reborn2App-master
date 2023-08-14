<template>
  <BaseForm :formContext="formContext">
    <div class="col-6">
        <FormItem label="게시글 제목" :required="true" name="bbscttTitle">
          <Input type="text" v-model="formContext.formData.ctgryCode"></Input>
        </FormItem>
      </div>
    <div class= "row">
      <div class="col-6">
        <FormItem label="카테고리코드" :required="true" name="ctgryCode">
          <Input type="select" v-model="formContext.formData.ctgryCode"></Input>
        </FormItem>
      </div>
      <div class="col-6">
        <FormItem label="" :required="true" name="ctgryCode">
          <Input type="text" v-model="formContext.formData.ctgryCode"></Input>
        </FormItem>
      </div>
    </div>
  </BaseForm>
</template>