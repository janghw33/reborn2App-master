<template>
  <router-view></router-view>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted } from "vue";
  import { useStore } from "vuex";
  import { Mutations } from "@/store/enums/StoreEnums";
  import { initializeComponents } from "@/core/plugins/keenthemes";
  import { Reborn } from "@/store/enums/StoreEnums";
  import * as Yup from "yup";
  import ko from "yup-locale-ko";
  ko.mixed.required = (arg) => {
    return `"${arg.path}" 필수항목`;
  }
  Yup.setLocale(ko);

  export default defineComponent({
    name: "app",
    setup() {
      const store = useStore();

      onMounted(() => {
        /**
         * this is to override the layout config using saved data from localStorage
         * remove this to use config only from static config (@/core/config/DefaultLayoutConfig.ts)
         */
        store.commit(Mutations.OVERRIDE_LAYOUT_CONFIG);

        /**
         * 기초 데이터 가져오기
         */
        store.dispatch(Reborn.GET_CODE);
        store.dispatch(Reborn.GET_SYS_CORP_CODE);

        nextTick(() => {
          initializeComponents();
        });
      });
    },
  });
</script>

<style lang="scss">  
  @import "~bootstrap-icons/font/bootstrap-icons.css";
  @import "~apexcharts/dist/apexcharts.css";
  @import "~quill/dist/quill.snow.css";
  @import "~animate.css";
  @import "~sweetalert2/dist/sweetalert2.css";
  @import "~nouislider/distribute/nouislider.css";
  @import "~@fortawesome/fontawesome-free/css/all.min.css";
  @import "~socicon/css/socicon.css";
  @import "~line-awesome/dist/line-awesome/css/line-awesome.css";
  @import "~dropzone/dist/dropzone.css";
  @import "~@vueform/multiselect/themes/default.css";
  @import "~prism-themes/themes/prism-shades-of-purple.css";
  @import "~element-plus/dist/index.css";

  // Main demo style scss
  @import "assets/sass/plugins";
  @import "assets/sass/style";

  // Dark mode demo style scss
  //@import "assets/sass/plugins.dark";
  //@import "assets/sass/style.dark";

  //RTL version styles
  //@import "assets/css/style.rtl.css";

  span {
    line-height: 30px;
  }
  .error-message {
    line-height: 20px;
    color: orangered;
    font-size: 0.9rem;
  }
  .label-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fade-enter-active, .fade.leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .el-form-item__error {
    white-space: nowrap;
  }
  .el-loading-text {
    color: #fff !important;
  }
</style>
