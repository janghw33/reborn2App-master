import { defineComponent } from "@vue/runtime-core";
import * as Yup from "yup";

export default defineComponent({
  methods: {
    modalOpen(data: any, action?: string, index?: number): void {
      const me: any = this
      me.pageData.action = action ?? 'add'
      me.pageData.data = data ?? null
      me.baseModalEvents.onModalOpen?.(data)
      me.baseModal.methods.open(data)
    },
    modalClose() {
      const me: any = this
      me.baseModal.methods.close()
    },
    setValidation(validation) {
      const me: any = this
      validation = Yup.object(me.validationSchema.fields).shape(validation.fields)
      me.validationSchema = validation
    },
  },
})