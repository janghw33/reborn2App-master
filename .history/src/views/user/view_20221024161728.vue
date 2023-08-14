<!--
  created: 이진우
-->
<template>
  <BaseForm ref="baseFormRef" :formContext="formContext" v-slot="{ form }" label-position="top">
    <div class="row">
      <div class="col-6">
        <FormItem label="작업자구분" name="userSeCode" :required="true">
          <template v-if="auth.userSeCode == 'CA'">          
            <Input type="radio" v-model="formContext.formData.userSeCode" group-code="USER001" tmpr2="Y" />
          </template>
          <template v-else-if="auth.userSeCode == 'AA'">
            <Input type="radio" v-model="formContext.formData.userSeCode" group-code="USER001" tmpr3="Y" />
          </template>
        </FormItem>
      </div>
      <div class="col-6">
        <div class="col-6" v-if="formContext.formData.isAgent">
          <div style="display: flex; justify-content: center; color: #007ec5;">
            여러 렌트카 업체와 거래를 하게되는 경우<br />
            사용자 아이디는 각 렌터카업체마다 동일한 아이디로 지정을 하시면<br />
            리본프로그램 하나에서 관리가 가능합니다.
          </div>
          예시)
          <table class="table" style="width:670px; height:auto; position:absolute;">
            <thead>
              <tr>
                <th>렌트카 업체</th>
                <th>직원1 ID</th>
                <th>직원2 ID</th>
                <th>직원3 ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>제주A 렌터카</td>
                <td>jejutour1</td>
                <td>jejutour2</td>
                <td>jejutour3</td>
              </tr>
              <tr>
                <td>제주B 렌터카</td>
                <td>jejutour1</td>
                <td>jejutour2</td>
                <td>jejutour3</td>
              </tr>
            </tbody>
          </table>
        </div>        
      </div>
    </div>
    <div class="row">
      <div class="col-2">
        <FormItem label="작업자 아이디" name="userId" :required="true">
          <Input type="text" :readonly="form?.action == 'view'" v-model="formContext.formData.userId" />
        </FormItem>
      </div>
      <div class="col-2">
        <FormItem label="작업자 명" name="userNm" :required="true">
          <Input type="text" v-model="formContext.formData.userNm" />
        </FormItem>
      </div>
      <div class="col-2">
        <Input type="checkbox" v-model="formContext.formData.useYn" label="사용하지 않음" true-value="N" false-value="Y" />
      </div>      
    </div>
    <div class="row">
      <div class="col-2">
        <FormItem label="비밀번호">
          <Input type="password" v-model="formContext.formData.passwordEncpt" />
        </FormItem>
      </div>
      <div class="col-2">
        <FormItem label="비밀번호 확인">
          <Input type="password" v-model="formContext.formData.checkPassword" />
        </FormItem>
      </div>
      <div class="col-2">
        <FormItem label="전화번호" name="tlphonNoEncpt" :required="true">
          <Input type="text" v-model="formContext.formData.tlphonNoEncpt" />
        </FormItem>
      </div>
      <div class="col-3" v-if="auth.mosaicarYn === 'N'">
        <FormItem label="소속 데스크" name="deskCode" :required="true">
          <Input type="select" v-model="formContext.formData.deskCode" :dataSource="deskList" v-slot="{ item }">
            <el-option :value="item.deskCode" :label="item.deskNm"></el-option>
          </Input>
        </FormItem>
      </div>
      <div class="col-3" v-if="auth.mosaicarYn === 'N'">
        <FormItem label="소속 거래처" name="bcncCode" :required="true">
          <Input type="select" v-model="formContext.formData.bcncCode" :dataSource="bcncList" v-slot="{ item }">
            <el-option :value="item.bcncCode" :label="item.bcncNm"></el-option>
          </Input>
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col-3" v-if="auth.mosaicarYn === 'N'">
        <FormItem label="사용자 그룹관리" name="userGroupSn" :required="true">
          <Input type="select" v-model="formContext.formData.userGroupSn" :dataSource="userGroupList" v-slot="{ item }">
            <el-option :value="item.userGroupSn" :label="item.userGroupNm"></el-option>
          </Input>
        </FormItem>
      </div>
      <div class="col-3" v-if="auth.mosaicarYn === 'N'">
        <FormItem label="할인한도율" name="dscntLmttRt" :required="true">
          <Input type="text" v-model="formContext.formData.dscntLmttRt" />
        </FormItem>
      </div>
      <div class="col-3" v-if="auth.mosaicarYn === 'N'">
        <FormItem label="M/T 문자수신 담당여부">
          <Input type="radio" v-model="formContext.formData.mtLendYn" :data-source="{Y: '예', N: '아니오'}" />
        </FormItem>
      </div>
      <div class="col-3" v-if="auth.mosaicarYn === 'N'">
        <FormItem label="회계 계정 여부" name="accnutAcntYn" :required="true">
          <Input type="radio" v-model="formContext.formData.accnutAcntYn" :data-source="{Y: '예', N: '아니오'}" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <FormItem label="비고">
          <Input type="text" v-model="formContext.formData.etcContents" />
        </FormItem>
      </div>
    </div>
    <div class="row">
      <h5>권한설정</h5>
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
    deskList: Array<any>,
    userGroupList: Array<any>,
    bcncList: Array<any>,
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
  function userIdChecker(value, callback) {
    if (formContext.modal?.action == "add") {
      const userId = value
      const userSeCode = formContext.formData.userSeCode    
      if (userId != null && userSeCode != null) {
        ApiService.get('user/idCheck', { userId: userId, userSeCode: userSeCode }).then(({data}) => {
          const isOverlap = data.data ?? false
          if (isOverlap) {
            callback(new Error('아이디가 중복되었습니다'))
          } else {
            callback()
          }
        })
        return
      }
    }
    callback()
  }
  function passwordChecker(value, callback) {
    if (formContext.formData.passwordEncpt != value) {
      callback(new Error('비밀번호가 일치하지 않습니다'))
    } else {
      callback()
    }
  }

  const formContext = reactive<IFormContext>({
    formData: {},        
    rules: reactive<FormRules>({
      checkPassword: [
        { validator: (rule, value, cb) => passwordChecker(value, cb),  trigger: 'change' },
      ],
      userId: [
        { validator: (rule, value, cb) => userIdChecker(value, cb),  trigger: 'change' },  
      ]
    }),
    modal: {
      title: '사용자등록',
      width: '1400px',
      onOpen(data) {
        formContext.formData = data ?? {}
        models.menuList = JSON.parse(JSON.stringify(props.menuList))
        models.selectedMenu1 = {}
        models.selectedMenu2 = {}

        const userSn = data?.userSn ?? auth.value.userSn
        ApiService.call((axios, callback) => {
          axios.get('user/auth', { params: { userSn: userSn } }).then(callback)
        }, {
          onSuccess(data) {
            models.authList = data.data
          }
        })
      }
    },
    addClick(data) {
      data.authList = models.menuList

      ApiService.alert((axios, callback) => {
        axios.post('user', data).then(callback)
      }, {
        label: '등록',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    updateClick(data) {
      data.authList = models.menuList

      ApiService.alert((axios, callback) => {
        axios.put('user', data).then(callback)
      }, {
        label: '수정',
        onSuccess() {
          formContext.modal?.close?.()
          reload()
        }
      })
    },
    deleteClick(data) {
      ApiService.confirm((axios, callback) => {
        axios.delete('user', { data: data }).then(callback)
      }, {
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
    formContext.formData.mtLendYn ??= 'N'
    formContext.formData.useYn ??= 'Y'
    formContext.formData.passwordEncpt ??= ''
    formContext.formData.checkPassword ??= ''
  })

  const baseFormRef = ref<InstanceType<typeof BaseForm>>()


  watchEffect(() => {
    const userSeCode = formContext.formData.userSeCode
    formContext.formData.isAgent = ['AA', 'AU'].includes(userSeCode)
    baseFormRef.value?.formRef?.validateField('userId')
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