import { defineComponent } from "vue";
import * as Yup from "yup";

export default defineComponent({
  methods: {
    setValidation(validation) {
      const me: any = this
      validation = Yup.object(me.context.validationSchema.fields).shape(validation.fields)
      me.context.validationSchema = validation
    },
  },
})