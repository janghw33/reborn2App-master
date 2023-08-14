<!--
  created: 이진우
-->
<template>
  <BasePage :pageContext="pageContext">
    <BaseList :listContext="listContext">
      <template #button></template>
      <template #left-body>
        <div class="col-2">
          <div class="card card-flush">
            <div class="card-body" style="padding: 0px 20px">
              <label style="display: flex; justify-content: center">적용일자</label>
              <table class="table align-middle table-row-dashed fs-6 dataTable no-footer" style="cursor: pointer">
                <tr v-for="applcDe in models.applcDes" :key="applcDe" :class="{'active': applcDe == models.applcDe }">
                  <td class="fw-bold text-gray-800 text-center" @click="models.applcDe = applcDe">
                    {{ applcDeFormat(applcDe) }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </template>
      <template #cell-cnvncEqpmnHoldCo="{ row }">
        <input type="text" class="form-control" v-model="row.cnvncEqpmnHoldCo" />
      </template>
      <template #cell-useYn="{ row }">
        {{ row.useYn == "Y" ? "사용중" : "사용안함" }} 
      </template>
    </BaseList>
    <View ref="view"></View>
  </BasePage>
</template>

<script lang="ts" setup>
  import { reactive, ref, computed, watchEffect } from 'vue'
  import BasePage, { IPageContext } from '@/components/reborn/BasePage.vue'
  import BaseList, { IListContext, ISearchFilter } from '@/components/reborn/BaseList.vue'
  import ApiService from '@/core/services/ApiService'
  import View from './view.vue'
  import moment from "moment";

  const models = reactive<any>({
    applcDes: [],
    applcDe: null,
  });

  const view = ref<InstanceType<typeof View>>()

  const pageContext = reactive<IPageContext>({
    pageTitle: '보유대수',
    breadcrumbs: ["기초자료", "편의장비"],
    onLoad() {
      listContext.onReload?.()
    }
  })

  const listContext = reactive<IListContext>({
    listData: [],
    headers: [
      { name: "편의장비명", key: "cnvncEqpmnNm", sortable: true, width: 300, },
      { name: "보유수량", key: "cnvncEqpmnHoldCo", sortable: true, },
      { name: "사용여부", key: "useYn", sortable: true, width: 100, },
    ],
    perPage: 17,
    search: {
      types: [],
      buttons: {
        isAdd: true,
      },
    },
    onSearch(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.get("cnvncEqpmn", params).then(({data}) => {
        listContext.listData = data.data
      })
    },
    onReload(searchFilter?: ISearchFilter) {
      const params = { search: searchFilter }
      ApiService.get("cnvncEqpmnHoldCo", params).then(({data}) => {
        models.applcDes = data.data;

        if (models.applcDes.length > 0) {
          models.applcDe = models.applcDes[0]
        }
      })
    },
    onListView() {
      return false      
    }, 
    onAddClick() {
      const params = {
        cnvncEqpmnHoldCos: listContext.listData
      }
      view.value?.formContext.modal?.openAdd?.(params)
    },
  })

  watchEffect(async () => {
    const applcDe = models.applcDe;
    if (applcDe != null) {
      const { data } = await ApiService.get(`cnvncEqpmnHoldCo/${applcDe}`);
      listContext.listData = data.data;
    }
  })

  const applcDeFormat = computed(() => {
    return (val) => {
      return moment(val, "YYYYMMDD").format("YYYY-MM-DD");
    }
  })
</script>

<style scoped>
  .active {
    background-color: bisque;
  }
</style>