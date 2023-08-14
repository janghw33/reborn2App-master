import Vue, { createApp } from "vue";
import App from "./App.vue";

/*
TIP: To get started with clean router change path to @/router/clean.ts.
 */
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import i18n from "@/core/plugins/i18n";
import mitt from "mitt";
//import moment from "moment";

//imports for app initialization
import ApiService from "@/core/services/ApiService";
import { initApexCharts } from "@/core/plugins/apexcharts";
import { initInlineSvg } from "@/core/plugins/inline-svg";
import { initVeeValidate } from "@/core/plugins/vee-validate";
import { mask } from "vue-the-mask"

import "@/core/plugins/prismjs";
import "bootstrap";
import moment from "moment";

const emitter = mitt();
const app = createApp(App);

app.use(store);
app.use(router);
app.use(ElementPlus);

ApiService.init(app);
initApexCharts(app);
initInlineSvg(app);
initVeeValidate();

app.use(i18n);

/*
app.provide("dateFormat", (val, format = 'YYYY-MM-DD H:mm') => {
  return moment(val).format(format);
});
*/
app.mount("#app");

app.directive('mask', (el, binding) => {
  if (!binding.value) return
  
  mask(el, binding)
})

app.config.globalProperties.$comma = (num) => {
  num ??= 0
  var regexp = /\B(?=(\d{3})+(?!\d))/g;                
  return num.toString().replace(regexp, ',');
}

app.config.globalProperties.$moment = (val, format: string = 'YYYY-MM-DD') => {
  return moment(val).format(format)
}

/*
const sysCodeData = computed((): Array<SysCorpCode> => store.getters.getSysCorpCode)
const codeData = computed((): Array<Code> => store.getters.getCode)
*/



/*
app.directive('code', (el, bindings) => {
  if (bindings.value != null) {
    
    const groupCode = bindings.arg
    if (groupCode?.startsWith("CUST")) {
      const codeRows = sysCodeData.value.find(f => f.groupCode == groupCode)      
      const code = codeRows?.details.find(f => f.code == bindings.value)
      el.innerText = code?.codeNm ?? ""
    }
    else {
      const codeRows = codeData.value.find(f => f.groupCode == groupCode)
      const code = codeRows?.details.find(f => f.code == bindings.value)
      el.innerText = code?.codeNm ?? ""
    }
  }
});
*/

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $comma: (num: number) => void
    $moment: (val: string, format?: string) => void
  }
}