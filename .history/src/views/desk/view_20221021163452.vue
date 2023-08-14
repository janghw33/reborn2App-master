<template>
  <BaseForm :formContext="formContext">
    <div class ="row">
      <RebornControl
      type="text"
      lael="입금방법 명"
      :required="true"
    </div>
  </BaseForm>
</template>