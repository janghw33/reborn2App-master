<template>
  <BaseForm :formContext="formContext">
    <div class ="row">
      <RebornControl>
        type="text"
        label="입금방법 명"
        :required="true"
        name="paySeContents"
        v-model="formContext.formData.paySeContents"
      </RebornControl>
    </div>
  </BaseForm>
</template>

<script>
</script>