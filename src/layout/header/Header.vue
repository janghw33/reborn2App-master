<template>
  <div id="kt_header" class="header align-items-stretch">
    <div class="header-brand">
      <!--begin::Logo-->
      <router-link to="/dashboard">
        <span style="font-size: 2rem; color: white; font-weight: 900"
          >REborn2</span
        >
      </router-link>
      <!--end::Logo-->

      <!--begin::Aside minimize-->
      <div
        v-if="asideDisplay"
        id="kt_aside_toggle"
        class="btn btn-icon w-auto px-0 btn-active-color-primary aside-minimize"
        :class="{ active: asideMinimized }"
        data-kt-toggle="true"
        data-kt-toggle-state="active"
        data-kt-toggle-target="body"
        data-kt-toggle-name="aside-minimize"
      >
        <span class="svg-icon svg-icon-1 me-n1 minimize-default">
          <inline-svg src="/media/icons/duotune/arrows/arr092.svg" />
        </span>

        <span class="svg-icon svg-icon-1 minimize-active">
          <inline-svg src="/media/icons/duotune/arrows/arr076.svg" />
        </span>
      </div>
      <!--end::Aside minimize-->

      <!--begin::Aside toggle-->
      <div
        class="d-flex align-items-center d-lg-none ms-n3 me-1"
        title="Show aside menu"
      >
        <div
          class="btn btn-icon btn-active-color-primary w-30px h-30px"
          id="kt_aside_mobile_toggle"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="/media/icons/duotune/abstract/abs015.svg" />
          </span>
        </div>
      </div>
      <!--end::Aside toggle-->
    </div>

    <div
      class="toolbar d-flex align-items-stretch"
      :class="{
        'container-fluid': headerWidthFluid,
        'container-xxl': !headerWidthFluid,
      }"
    >
      <div
        class="
          container-fluid
          py-6 py-lg-0
          d-flex
          flex-column flex-lg-row
          align-items-lg-stretch
          justify-content-lg-between
        "
        id="kt_toolbar_container"
      >
        <PageTitle :title="title" :breadcrumbs="breadcrumbs"></PageTitle>
        <KTTopbar />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import KTTopbar from "@/layout/header/Topbar.vue";
import PageTitle from "@/layout/page-title/PageTitle.vue";

import {
  headerWidthFluid,
  headerLeft,
  asideDisplay,
  asideMinimized,
} from "@/core/helpers/config";

export default defineComponent({
  name: "KTHeader",
  props: {
    title: String,
    breadcrumbs: Array,
  },
  components: {
    KTTopbar,
    PageTitle,
  },
  setup() {
    return {
      headerWidthFluid,
      headerLeft,
      asideDisplay,
      asideMinimized,
    };
  },
});
</script>
