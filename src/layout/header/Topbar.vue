<template>
  <!--begin::Action group-->
  <div class="d-flex align-items-stretch overflow-auto pt-3 pt-lg-0">
    <!--begin::Action wrapper-->
    <div class="d-flex align-items-center">
      <!--begin::Label-->
      <span
        class="fs-7 fw-bolder text-gray-700 pe-4 text-nowrap d-none d-xxl-block"
        >Sort By:</span
      >
      <!--end::Label-->

      <!--begin::Select-->
      <select
        class="form-select form-select-sm form-select-solid w-100px w-xxl-125px"
      >
        <option value="1" selected>Latest</option>
        <option value="2">In Progress</option>
        <option value="3">Done</option>
      </select>
      <!--end::Select-->
    </div>
    <!--end::Action wrapper-->

    <!--begin::Action wrapper-->
    <div class="d-flex align-items-center">
      <!--begin::Separartor-->
      <div class="bullet bg-secondary h-35px w-1px mx-5"></div>
      <!--end::Separartor-->

      <!--begin::Label-->
      <span class="fs-7 text-gray-700 fw-bolder d-none d-sm-block"
        >Impact <span class="d-none d-xxl-inline">Level</span>:</span
      >
      <!--end::Label-->

      <!--begin::NoUiSlider-->
      <div class="d-flex align-items-center ps-4" id="kt_toolbar">
        <div
          id="kt_toolbar_slider"
          class="noUi-target noUi-target-primary w-75px w-xxl-150px noUi-sm"
        ></div>

        <span
          id="kt_toolbar_slider_value"
          class="d-flex flex-center bg-light-primary rounded-circle w-35px h-35px ms-4 fs-7 fw-bolder text-primary"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Set impact level"
        >
        </span>
      </div>
      <!--end::NoUiSlider-->

      <!--begin::Separartor-->
      <div class="bullet bg-secondary h-35px w-1px mx-5"></div>
      <!--end::Separartor-->
    </div>
    <!--end::Action wrapper-->

    <!--begin::Action wrapper-->
    <div class="d-flex align-items-center">
      <!--begin::Label-->
      <span class="fs-7 text-gray-700 fw-bolder pe-3 d-none d-xxl-block"
        >Quick Tools:</span
      >
      <!--end::Label-->

      <!--begin::Actions-->
      <div class="d-flex">
        <!--begin::Action-->
        <a
          href="#"
          class="btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_invite_friends"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="/media/icons/duotune/files/fil003.svg" />
          </span>
        </a>
        <!--end::Action-->

        <!--begin::Notifications-->
        <div class="d-flex align-items-center">
          <!--begin::Menu- wrapper-->
          <router-link
            to="/apps/subscriptions/add-subscription"
            class="btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/files/fil005.svg" />
            </span>
          </router-link>
          <!--end::Menu wrapper-->
        </div>
        <!--end::Notifications-->

        <!--begin::Quick links-->
        <div class="d-flex align-items-center">
          <!--begin::Menu wrapper-->
          <a
            href="#"
            class="btn btn-sm btn-icon btn-icon-muted btn-active-icon-primary"
            data-bs-toggle="modal"
            data-bs-target="#kt_modal_create_app"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="/media/icons/duotune/files/fil010.svg" />
            </span>
          </a>
          <!--end::Menu wrapper-->
        </div>
        <!--end::Quick links-->
      </div>
      <!--end::Actions-->
    </div>
    <!--end::Action wrapper-->

    <!--begin::Theme mode-->
    <div class="d-flex align-items-center"></div>
    <!--end::Theme mode-->
  </div>
  <!--end::Action group-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import noUiSlider from "nouislider/distribute/nouislider.js";

export default defineComponent({
  name: "layout-topbar",
  components: {},
  setup() {
    const initSlider = (): void => {
      const slider: Element | noUiSlider =
        document.querySelector("#kt_toolbar_slider");
      const rangeSliderValueElement: Element | null = document.querySelector(
        "#kt_toolbar_slider_value"
      );

      if (!slider) {
        return;
      }

      slider.innerHTML = "";

      noUiSlider.create(slider, {
        start: [5],
        connect: [true, false],
        step: 1,
        range: {
          min: [1],
          max: [10],
        },
      });

      slider.noUiSlider.on("update", function (values, handle) {
        if (!rangeSliderValueElement) {
          return;
        }

        rangeSliderValueElement.innerHTML = parseInt(values[handle]).toFixed(1);
      });
    };

    onMounted(() => {
      initSlider();
    });
  },
});
</script>
