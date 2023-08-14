import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { Mutations, Actions, Reborn } from "@/store/enums/StoreEnums";
import JwtService from "@/core/services/JwtService";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "dashboard",
    component: () => import("@/layout/RebornLayout.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
      },
      {
        path: "builder",
        name: "builder",
        component: () => import("@/views/Builder.vue"),
      },
      {
        path: "empty",
        name: "empty",
        component: () => import("@/views/Empty.vue"),
      },
      {
        path: "basic",
        name: "basic",
        component: () => import("@/views/basic/list.vue"),
      },
      {
        path: "basicNew",
        name: "basicNew",
        component: () => import("@/views/basicNew/list.vue"),
      },
      {
        path: "basicNew/view",
        name: "basicNewView",
        component: () => import("@/views/basicNew/view.vue"),
      },
      {
        path: "vhcty",
        name: "vhcty",
        component: () => import("@/views/vhcty/list.vue"),
      },
      {
        path: "vhcle",
        name: "vhcle",
        component: () => import("@/views/vhcle/list.vue"),
      },
      {
        path: "vhcleHoldCo",
        name: "vhcleHoldCo",
        component: () => import("@/views/vhcleHoldCo/list.vue"),
      },
      {
        path: "cnvncEqpmn",
        name: "cnvncEqpmn",
        component: () => import("@/views/cnvncEqpmn/list.vue"),
      },
      {
        path: "cnvncEqpmnHoldCo",
        name: "cnvncEqpmnHoldCo",
        component: () => import("@/views/cnvncEqpmnHoldCo/list.vue"),
      },
      {
        path: "fuelPrice",
        name: "fuelPrice",
        component: () => import("@/views/fuelPrice/list.vue"),
      },
      {
        path: "bcnc",
        name: "bcnc",
        component: () => import("@/views/bcnc/list.vue"),
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/user/list.vue"),
      },
      {
        path: "userGroup",
        name: "userGroup",
        component: () => import("@/views/userGroup/list.vue"),
      },
      {
        path: "dailyRepair",
        name: "dailyRepair",
        component: () => import("@/views/dailyRepair/list.vue"),
      },
      {
        path: "monthlyAccident",
        name: "monthlyAccident",
        component: () => import("@/views/monthlyAccident/list.vue"),
      },
      {
        path: "accident",
        name: "accident",
        component: () => import("@/views/accident/list.vue")
      },
      {
        path: "accident/view",
        name: "accidentView",
        component: () => import("@/views/accident/view.vue")
      },
      {
        path: "acnt",
        name: "acnt",
        component: () => import("@/views/acnt/list.vue")
      },
      {
        path: "alntPlc",
        name: "acntPlc",
        component: () => import("@/views/alntPlc/list.vue")
      },
      {
        path: "trmnlCrtfc",
        name: "trmnlCrtfc",
        component: () => import("@/views/trmnlCrtfc/list.vue")
      },
      {
        path: "paySe",
        name: "paySe",
        component: () => import("@/views/paySe/list.vue")
      },
      {
        path: "test",
        name: "test",
        component: () => import("@/views/test/list.vue")
      },
      {
        path: "chauferDrver",
        name: "chauferDrver",
        component: () => import("@/views/chauferDrver/list.vue")
      },
      {
        path: "desk",
        name: "desk",
        component: () => import("@/views/desk/list.vue")
      },
      {
        path: "corpStup",
        name: "corpStup",
        component: () => import("@/views/corpStup/list.vue")
      },
      {
        path: "hmpgUser",
        name: "hmpgUser",
        component: () => import("@/views/hmpgUser/list.vue")
      },
      {
        path: "hmpgBbs",
        name: "hmpgBbs",
        component: () => import("@/views/hmpgBbs/list.vue")
      },
      { 
        path: "hmpgPay",
        name: "hmpgPay",
        component: () => import("@/views/hmpgPay/list.vue")
      },
      {
        path: "hmpgPay/view",
        name: "hmpgPayView",
        component: () => import("@/views/hmpgPay/view.vue")
      },
      {
        path: "hmpgVhcty",
        name: "hmpgVhcty",
        component: () => import("@/views/hmpgVhcty/list.vue")
      },
      {
        path: "hmpgVhcty/view",
        name: "hmpgVhctyView",
        component: () => import("@/views/hmpgVhcty/view.vue")
      },
      {
        path: "code",
        name: "code",
        component: () => import("@/views/code/list.vue")
      }
    ],
  },
  {
    path: "/",
    component: () => import("@/layout/PrintLayout.vue"),
    children: [
      {
        path: "monthlyAccident/print",
        name: "monthlyAccidentPrint",
        component: () => import("@/views/monthlyAccident/print.vue")
      },
      {
        path: "trmnlCrtfc",
        name: "trmnlCrtfcPrint",
        component: () => import("@/views/trmnlCrtfc/print.vue")
      },
      {
        path: "basicNew/print",
        name: "basicNewPrint",
        component: () => import("@/views/basicNew/print.vue")
      },
      
    ],
  },
  {
    path: "/",
    component: () => import("@/components/page-layouts/Auth.vue"),
    children: [
      {
        path: "sign-in",
        name: "sign-in",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignIn.vue"),
      },
      {
        path: "sign-up",
        name: "sign-up",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/SignUp.vue"),
      },
      {
        path: "password-reset",
        name: "password-reset",
        component: () =>
          import("@/views/crafted/authentication/basic-flow/PasswordReset.vue"),
      },
    ],
  },
  {
    path: "/multi-step-sign-up",
    name: "multi-step-sign-up",
    component: () =>
      import("@/views/crafted/authentication/MultiStepSignUp.vue"),
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/crafted/authentication/Error404.vue"),
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/views/crafted/authentication/Error500.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  //history: createWebHashHistory(),
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(() => {
  // reset config to initial state
  store.commit(Mutations.RESET_LAYOUT_CONFIG);

  store.dispatch(Actions.VERIFY_AUTH, { token: JwtService.getToken() });

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

export default router;
