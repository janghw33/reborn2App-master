<template>
  <!--begin::Menu wrapper-->
  <div
    id="kt_aside_menu_wrapper"
    ref="scrollElRef"
    class="hover-scroll-overlay-y my-5 my-lg-5"
    data-kt-scroll="true"
    data-kt-scroll-activate="{default: false, lg: true}"
    data-kt-scroll-dependencies="#kt_aside_logo, #kt_aside_footer"
    data-kt-scroll-height="auto"
    data-kt-scroll-offset="0"
    data-kt-scroll-wrappers="#kt_aside_menu"
  >
    <!--begin::Menu-->
    <div
      id="#kt_header_menu"
      class="
        menu
        menu-column
        menu-title-gray-800
        menu-state-title-primary
        menu-state-icon-primary
        menu-state-bullet-primary
        menu-arrow-gray-500
      "
      data-kt-menu="true"
    >
      <template v-for="(menu, j) in RebornMenuConfig" :key="j">
          <div
            v-if="menu.heading"
            :class="{ show: hasActiveChildren(menu.route) }"
            class="menu-item menu-accordion"
            data-kt-menu-sub="accordion"
            data-kt-menu-trigger="click"
          >
            <span class="menu-link">
              <span
                v-if="menu.svgIcon || menu.fontIcon"
                class="menu-icon"
              >
                <i
                  v-if="asideMenuIcons === 'font'"
                  :class="menu.fontIcon"
                  class="bi fs-3"
                ></i>
                <span
                  v-else-if="asideMenuIcons === 'svg'"
                  class="svg-icon svg-icon-2"
                >
                  <inline-svg :src="menu.svgIcon" />
                </span>
              </span>
              <span class="menu-title">{{ translate(menu.heading) }}</span>
              <span class="menu-arrow"></span>
            </span>
            <div :class="{ show: hasActiveChildren(menu.route) }" class="menu-sub menu-sub-accordion">
              <template v-for="(item2, k) in menu.pages" :key="k">
                <div
                  v-if="item2.heading"
                  :class="{ show: hasActiveChildren(item2.route) }"
                  class="menu-item menu-accordion"
                  data-kt-menu-sub="accordion"
                  data-kt-menu-trigger="click"
                >
                  <span class="menu-link">
                    <span class="menu-bullet">
                      <span class="bullet bullet-plus"></span>
                    </span>
                    <span class="menu-title">
                      <router-link class="menu-link" active-class="active" v-if="!!item2.route" :to="item2.route">
                        {{ translate(item2.heading) }}
                      </router-link>
                      <template v-else>
                        <a href="#" class="menu-link">
                          {{ translate(item2.heading) }}
                        </a>
                      </template>
                    </span>
                    <span class="menu-arrow" v-if="!!item2.sub"></span>
                  </span>
                  <div :class="{ show: hasActiveChildren(item2.route) }" class="menu-sub menu-sub-accordion">
                    <template v-for="(item3, k) in item2.sub" :key="k">
                      <div v-if="item3.heading" class="menu-item">
                        <router-link class="menu-link" active-class="active" :to="item3.route">
                          <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                          </span>
                          <span class="menu-title">{{ translate(item3.heading) }}</span>
                        </router-link>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      <div class="menu-item">
        <div class="menu-content">
          <div class="separator mx-1 my-4"></div>
        </div>
      </div>
      <div class="menu-item">
        <a
          class="menu-link"
          href="https://preview.keenthemes.com/metronic8/vue/docs/#/changelog"
        >
          <span class="menu-icon">
            <i
              v-if="asideMenuIcons === 'font'"
              class="bi bi-card-text fs-3"
            ></i>
            <span
              v-else-if="asideMenuIcons === 'svg'"
              class="svg-icon svg-icon-2"
            >
              <inline-svg src="/media/icons/duotune/general/gen005.svg" />
            </span>
          </span>
          <span class="menu-title"
            >{{ translate("changelog") }} v{{ version }}</span
          >
        </a>
      </div>
    </div>
    <!--end::Menu-->
  </div>
  <!--end::Menu wrapper-->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { version } from "@/core/helpers/documentation";
import { asideMenuIcons } from "@/core/helpers/config";
import RebornMenuConfig from "@/core/config/RebornMenuConfig";

export default defineComponent({
  name: "kt-menu",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const route = useRoute();
    const scrollElRef = ref<null | HTMLElement>(null);

    onMounted(() => {
      if (scrollElRef.value) {
        scrollElRef.value.scrollTop = 0;
      }
    });

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const hasActiveChildren = (match) => {
      return route.path.indexOf(match) !== -1;
    };

    return {
      hasActiveChildren,
      RebornMenuConfig,
      asideMenuIcons,
      version,
      translate,
    };
  },
});
</script>
