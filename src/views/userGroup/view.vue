<!--
  created: 이진우
-->
<template>
  <BaseForm :formContext="formContext" v-slot="{ form }">
    <div class="row">
      <div class="col-4">
        <FormItem label="사용자 그룹명" name="userGroupNm" :required="true">
          <Input type="text" v-model="formContext.formData.userGroupNm" :readonly="form?.action == 'view'" />
        </FormItem>
      </div>
      <div class="col-3">
        <Input type="checkbox" v-model="formContext.formData.useYn" label="사용하지 않음" true-value="N" false-value="Y"></Input>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="비고">
          <Input type="text" v-model="formContext.formData.etcContents"></Input>
        </FormItem>
      </div>        
    </div>
    <div class="row">
      <div class="col-3">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>
                <div style="display:flex; justify-content:space-between">
                  <span>
                    <b>메뉴명(대)</b>
                  </span>
                  <span class="me-5">
                    <label class="paragraph">
                      <input type="checkbox" @change="methods.allCheck($event)" />
                      전체선택
                    </label>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in models.menuList" :key="row.menuSn" style="cursor: pointer">
              <td @click="models.selectedMenu1 = row; models.selectedMenu2 = {}" class="p-2" :style="[row == models.selectedMenu1 ? {backgroundColor: '#eee'} : {backgroundColor: '#fff'}]">
                {{ index + 1 }}.
                <b>{{ row.menuNm }}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-4">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>
                <div style="display:flex; justify-content:space-between">
                  <span>
                    <b>메뉴명(중)</b>
                  </span>
                  <span class="me-5">
                    <label class="paragraph">
                      <input type="checkbox" @change="methods.allCheck($event, models.selectedMenu1)" />
                      전체선택
                    </label>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in models.selectedMenu1.subMenu" :key="row.menuSn" style="cursor: pointer">
              <td @click="models.selectedMenu2 = row" class="p-2" :style="[row == models.selectedMenu2 ? {backgroundColor: '#eee'} : {backgroundColor: '#fff'}]">
                {{ index + 1 }}.
                <b>{{ row.menuNm }}</b><br />
                <template v-if="row.subMenu.length == 0">
                  <label v-for="authVal in authArr" :key="authVal.value">
                    <input type="checkbox" class="m-3" :value="authVal.value" :disabled="!row.menuSkllSeCodes.includes(authVal.value)" v-model="row.menuAuth" @change="methods.codeChange(row)" />{{ authVal.name }}
                  </label>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-4">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>
                <div style="display:flex; justify-content:space-between">
                  <span>
                    <b>메뉴명(소)</b>
                  </span>
                  <span class="me-5">
                    <label class="paragraph">
                      <input type="checkbox" @change="methods.allCheck($event, models.selectedMenu2)" />
                      전체선택
                    </label>
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in models.selectedMenu2.subMenu" :key="row.menuSn" style="cursor: pointer">
              <td class="p-2">
                {{ index + 1 }}.
                <b>{{ row.menuNm }}</b><br />
                <template v-if="row.subMenu.length == 0">
                  <label v-for="authVal in authArr" :key="authVal.value">
                    <input type="checkbox" class="m-3" :value="authVal.value" :disabled="!row.menuSkllSeCodes.includes(authVal.value)" v-model="row.menuAuth" @change="methods.codeChange(row)" />{{ authVal.name }}
                  </label>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>     
  </BaseForm>
</template>

<script lang="ts" setup>
  import { inject, reactive, computed, watchEffect, ref, } from 'vue'
  import BaseForm, { IFormContext } from '@/components/reborn/BaseForm.vue'
  import FormItem from '@/components/reborn/FormItem.vue'
  import Input from '@/components/reborn/Input.vue'
  import ApiService from '@/core/services/ApiService'
  import { FormRules } from 'element-plus'
  import { useStore } from "vuex"
  import { User } from "@/store/modules/AuthModule"

  interface Props {
    menuList: Array<any>
  }

  const props = defineProps<Props>()  
  const store = useStore()
  const auth = computed<User>(() => store.getters.currentUser)
  const authArr = [
    { value: 'C', name: '등록' },
    { value: 'D', name: '삭제' },
    { value: 'R', name: '조회' },
    { value: 'U', name: '수정' },
  ]
  const models = reactive<any>({
    menuList: [],
    authList: [],
    selectedMenu1: {},
    selectedMEnu2: {},
  })

  const reload = inject('reload', ()=>{})
  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      
    }),
    modal: {
      title: '사용자그룹등록',
      width: '1200px',
      onOpen(data) {
        formContext.formData = data ?? {}
        models.menuList = JSON.parse(JSON.stringify(props.menuList))
        models.selectedMenu1 = {}
        models.selectedMenu2 = {}

        const userGroupSn = data?.userGroupSn ?? auth.value.userGroupSn
        ApiService.call((axios, callback) => axios.get('userGroup/auth', { params: { userGroupSn: userGroupSn } }).then(callback), {
          onSuccess(data) {
            models.authList = data.data
          }
        })
      }
    },
    addClick(data) {
      data.authList = models.menuList

      ApiService.alert((axios, callback) => axios.post('userGroup', data).then(callback), {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    updateClick(data) {
      data.authList = models.menuList

      ApiService.alert((axios, callback) => axios.put('userGroup', data).then(callback), {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(data) {
      ApiService.confirm((axios, callback) => axios.delete('userGroup', { data: data }).then(callback), {
        label: '삭제',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    }
  })

  watchEffect(() => {
    models.selectedMenu1 ??= {}
    models.selectedMenu2 ??= {}
    formContext.formData.userYn ??= 'Y'
  })

  watchEffect(() => {
    models.selectedMenu1.subMenu
    models.selectedMenu2.subMenu
  }, {
    onTrigger(e) {
      let subMenu: any = null
      if(e.key === 'selectedMenu1') {
        subMenu = models.selectedMenu1.subMenu

      } else if (e.key === 'selectedMenu2') {
        subMenu = models.selectedMenu2.subMenu
      }

      if (subMenu != null) {
        subMenu.forEach(d => {
          d.menuAuthOrg ??= models.authList.find(f => f.menuSn === d.menuSn)?.menuSkllSeCodes?.split(',') ?? []
          d.menuAuth ??= d.menuAuthOrg
        })
      }
    }
  })

  const methods = {
    codeChange(row) {
      row.isModify = (JSON.stringify(row.menuAuth) != JSON.stringify(row.menuAuthOrg))
    },
    allCheck(e: any, menu: any = null) {
      const isChecked: boolean = e.target.checked
      const allAuth: string[] = ['C', 'D', 'R', 'U']

      // 전체권한설정
      if (menu == null) {
        models.menuList.forEach(d1 => {
          d1.subMenu.forEach(d2 => {
            if (d2.subMenu.length == 0) {
              d2.menuAuth = isChecked ? allAuth : []
            } else {
              d2.subMenu.forEach(d3 => {
                d3.menuAuth = isChecked ? allAuth : []
              })              
            }
          })
        })
      } else {
        // 개별권한설정
        menu.subMenu.filter(f => f.subMenu.length == 0).forEach(d => {
          d.menuAuth = isChecked ? allAuth : []
        })
      }
    }
  }

  defineExpose({
    formContext: formContext
  })
</script>

<style>

</style>