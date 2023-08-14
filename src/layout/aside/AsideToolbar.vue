<template>
  <!--begin::User-->
  <div
    class="aside-user d-flex align-items-sm-center justify-content-center py-5"
  >
    <!--begin::Symbol-->
    <div class="symbol symbol-50px">
      <img src="/media/avatars/blank.png" alt="" />
    </div>
    <!--end::Symbol-->

    <!--begin::Wrapper-->
    <div class="aside-user-info flex-row-fluid flex-wrap ms-5">
      <!--begin::Section-->
      <div class="d-flex">
        <!--begin::Info-->
        <div class="flex-grow-1 me-2">
          <!--begin::Username-->
          <a href="#" class="text-white text-hover-primary fs-6 fw-bold">{{
            user.name
          }}</a>
          <!--end::Username-->

          <!--begin::Description-->
          <span class="text-gray-600 fw-bold d-block fs-8 mb-1">개발팀장</span>
          <!--end::Description-->

          <!--begin::Label-->
          <div class="d-flex align-items-center text-success fs-9">
            <span class="bullet bullet-dot bg-success me-1"></span>online
          </div>
          <!--end::Label-->
        </div>
        <!--end::Info-->

        <!--begin::User menu-->
        <div class="me-n2">
          <!--begin::Action-->
          <a
            href="#"
            class="btn btn-icon btn-sm btn-active-color-primary mt-n2"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-start"
            data-kt-menu-overflow="true"
          >
            <span class="svg-icon svg-icon-muted svg-icon-1">
              <inline-svg src="/media/icons/duotune/coding/cod001.svg" />
            </span>
          </a>

          <UserMenu />
          <!--end::Action-->
        </div>
        <!--end::User menu-->
      </div>
      <!--end::Section-->
    </div>
    <!--end::Wrapper-->
  </div>
  <!--end::User-->

  <!--begin::Aside search-->
  <!--
  <div class="aside-search py-5">
    <AsideSearch />
  </div>
  -->
  <!--end::Aside search-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import UserMenu from "@/layout/header/partials/UserMenu.vue";
import { useStore } from "vuex";
// import AsideSearch from "@/layout/aside/AsideSearch.vue";

export default defineComponent({
  name: "kt--aside-toolbar",
  components: {
    UserMenu,
    // AsideSearch,
  },
  setup() {
    const store = useStore();

    return {
      user: store.getters.currentUser,
    };
  },
});
</script>
