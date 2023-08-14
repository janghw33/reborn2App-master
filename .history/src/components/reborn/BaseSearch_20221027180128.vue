<template>
  <el-form label-position="right">
    <div style="display: flex; justify-content: space-between; align-items: center">
      <div style="width: 100%; display: flex; align-items: center;">
        <el-form-item>
          <el-date-picker v-model="searchData.sDate" value-format="YYYY-MM-DD" style="max-width:150px" v-if="!!searchData.sDate"></el-date-picker>
          <label style="padding:0px 4px" v-if="!!searchData.eDate"> ~ </label>
          <el-date-picker v-model="searchData.eDate" value-format="YYYY-MM-DD" style="max-width:150px" v-if="!!searchData.eDate"></el-date-picker>
        </el-form-item>
        <template v-if="!!searchData.sDate && !!!searchData.eDate">
          <el-button
            style="margin-left: 2px"
            title="이전날짜 검색"
            @click="methods.datePrev">
            <i class="las la-fast-backward fs-2 me-1"></i>
          </el-button>
          <el-button
            style="margin-left: 2px"
            title="오늘날짜로 검색"
            @click="methods.dateToday">
            <i class="las la-stop fs-2 me-1"></i>
          </el-button>
          <el-button
            style="margin-left: 2px"
            title="다음날짜 검색"
            @click="methods.dateNext">
            <i class="las la-fast-forward fs-2 me-1"></i>
          </el-button>
        </template>
        <slot name="custom"></slot>
        <el-select v-if="listContext.search?.types != null && listContext.search.types.length > 0" v-model="searchData.searchType" style="max-width: 160px; margin-left: 10px;">
          <slot name="option">
            <el-option label="전체" value=""></el-option>
          </slot>
          <el-option v-for="row in listContext.search?.types" :value="row.value" :label="row.text" :key="row.value"></el-option>
        </el-select>
        <el-input v-if="listContext.search?.buttons?.isSearchWord" v-model="searchData.searchWord" @input="methods.input" @keyup.enter="methods.search" style="max-width:180px; margin-left:2px" :placeholder="isReSearch == true ? '결과내 재검색' : '검색어를 입력해주세요'"></el-input>
        <el-button type="primary" @click="methods.search" style="margin-left: 2px" v-if="!isReSearch">검색</el-button>
        <el-button type="success" @click="methods.reload" style="margin-left: 2px">새로고침</el-button>          
      </div>
      <div style="display:inline-flex">
        <slot name="button"></slot>
        <el-button type="warning" @click="methods.print" v-if="listContext.search?.buttons?.isPrint">인쇄</el-button>
        <el-button type="success" @click="methods.export" v-if="listContext.search?.buttons?.isExport">내보내기</el-button>
        <el-button type="danger" @click="methods.delete" v-if="listContext.search?.buttons?.isDelete">삭제</el-button>
        <el-button type="primary" @click="methods.add" v-if="listContext.search?.buttons?.isAdd">등록</el-button>
      </div>
    </div>  
    <div style="display: flex">
      <el-checkbox label="미사용항목제외" v-model="searchData.useYn" true-label="Y" false-label="N" v-if="searchData.useYn != null"></el-checkbox>
      <el-checkbox label="삭제제외" v-model="searchData.deleteYn" true-label="Y" false-label="N" v-if="searchData.deleteYn != null"></el-checkbox>
      <slot name="extend"></slot>
    </div>
  </el-form>
</template>

<script lang="ts">
  export default {
    name: 'baseSearch'
  }
</script>

<script lang="ts" setup>
  import { computed, nextTick } from 'vue'
  import { IListContext, ISearchFilter } from './BaseList.vue'
  import moment, { Moment } from "moment"
  import { IPrintConfig } from './BasePrint.vue'
  
  interface Props {
    listContext: IListContext<any>
  }
  const props = defineProps<Props>()
  const isReSearch = computed(() => "reSearch" in props.listContext)
  let today = moment().startOf('day')
  const emit = defineEmits(['search', 'reload', 'add', 'delete', 'export', 'print']) 
  props.listContext.search ??= {}
  props.listContext.search.data ??= {}    
  
  const searchData = computed<ISearchFilter>({
    get: () => props.listContext.search!.data!,
    set: (value) => props.listContext.search!.data = value
  })
  let currDay: Moment = moment(searchData.value.sDate)  

  if (props.listContext.search != null) {
    searchData.value.searchType ??= ''
    searchData.value.searchWord ??= ''

    props.listContext.search.buttons ??= { }
    props.listContext.search.buttons.isSearchWord ??= true
  }

  const methods = {
    datePrev() {
      currDay = currDay.add(-1, "day");
      searchData.value.sDate = currDay.format("YYYY-MM-DD")
      emit('search', searchData.value)
    },
    dateToday() {
      currDay = today.clone();
      searchData.value.sDate = currDay.format("YYYY-MM-DD")
      emit('search', searchData.value)
    },
    dateNext() {
      currDay = currDay.add(1, "day");
      searchData.value.sDate = currDay.format("YYYY-MM-DD")
      emit('search', searchData.value)
    },
    search() {
      emit("search", searchData.value)
    },
    reload() {
      emit("reload", searchData.value)
    },
    add() {
      emit("add")
    },
    delete() {
      emit("delete")
    },
    export() {
      emit("export")
    },
    print() {
      emit("print", (printConfig: IPrintConfig, listData: any, payload?: any) => {
        printConfig.width ??= 1400
        printConfig.height ??= 800

        const printPopup: Window = window.open(printConfig.url, "modal", `width=${printConfig.width},height=${printConfig.height},left=200,top=200`)!
        printPopup.opener.getTableData = () => {
          return {
            listData: listData,
            ...payload
          }
        }
      })
    },
    async input() {
      if (isReSearch.value) {
        await nextTick(() => {
          props.listContext.reSearch?.(props.listContext.search!.data!)
        })
      }
    }
  }
</script>

<style scoped>
.el-form-item {
  margin-bottom: 2px !important;    
}

:slotted(.el-form-item) {
  margin-bottom: 2px !important;    
}

.affix-container {
  text-align: center;
  height: 400px;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
}
</style>