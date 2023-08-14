<template>
  <template v-if="type == 'text' || type == 'password'">
    <el-input :type="type" v-model="data" v-mask="mask" :readonly="readonly" v-on:focusout="$emit('focusout', $event)" :placeholder="placeholder">
      <template #prepend v-if="startText != null">{{ startText }}</template>
      <template #append v-if="endText != null">{{ endText }}</template>
    </el-input>
  </template>
  <template v-else-if="type == 'select'">
    <template v-if="groupCode == null">
      <el-select v-model="data" v-on:change="$emit('change', $event)" :style="style" filterable :placeholder="placeholder ?? '선택하세요'">
        <slot name="custom"></slot>
        <slot v-for="item in dataSource" :item="item" :key="item[valueField]">
          <el-option :value="item[valueField]" :label="item[textField]"></el-option>
        </slot>
      </el-select>
    </template>
    <template v-else>
      <el-select v-model="data" :style="style" filterable  :placeholder="placeholder ?? '선택하세요'">
        <slot name="custom"></slot>
        <el-option v-for="row in codeData" :value="row.code" :label="row.codeNm"></el-option>
      </el-select>
    </template>
  </template>
  <template v-else-if="type == 'radio'">
    <template v-if="dataSource != null">
      <el-radio-group v-model="data">
        <slot name="custom"></slot>
        <slot v-for="(item, key) in dataSource" :item="item" :key="key">
          <el-radio :label="key">{{ item }}</el-radio>
        </slot>
      </el-radio-group>
    </template>
    <template v-else-if="groupCode != null">
      <el-radio-group v-model="data">
        <slot name="custom"></slot>
        <el-radio v-for="row in codeData" :label="row.code">{{ row.codeNm }}</el-radio>
      </el-radio-group>
    </template>
  </template>
  <template v-else-if="type === 'checkbox'">
    <template v-if="dataSource != null">
      <el-checkbox-group v-model="checkboxData">
        <slot name="custom"></slot>
        <slot v-for="(item, key) in dataSource" :item="item">
          <el-checkbox :label="key">{{ item }}</el-checkbox>
        </slot>
      </el-checkbox-group>
    </template>
    <template v-else-if="groupCode != null">
      <el-checkbox-group v-model="checkboxData">
        <slot name="custom"></slot>          
        <el-checkbox v-for="code in codeData" :label="code.code">{{ code.codeNm }}</el-checkbox>
      </el-checkbox-group>        
    </template>
    <template v-else>
      <el-checkbox v-model="data" :label="label" :true-label="trueValue" :false-label="falseValue" />
    </template>
  </template>
  <template v-else-if="type == 'date'">
    <el-input
      type="text"
      v-model="data"
      v-mask="'####-##-##'"
      placeholder="####-##-##"
      masked="true"
    />
  </template>
  <template v-else-if="type == 'time'">
    <el-input
      type="text"
      v-model="data"
      v-mask="'##:##'"
      placeholder="##:##"
      masked="true"
    />
  </template>
  <template v-else-if="type == 'label'">
    <label v-text="codeText"></label>
  </template>
  <template v-else-if="type == 'textarea'">
    <el-input type="textarea" v-model="data" :rows="rows"></el-input>
  </template>
  <template v-else>
    ERROR
  </template>
</template>

<script lang="ts">
  import { SysCorpCode, Code } from "@/store/modules/RebornModule"
  import { useStore } from 'vuex'
  import { computed, defineComponent } from 'vue'
  import { useModelWrapper } from './modelWrapper.js'

  export default defineComponent({
    props: {
      modelValue: { type: [String, Number] },
      textContent: String,
      type: { type: String },
      label: { type: String, default: '' },
      dataSource: { type: Object },
      readonly: { type: Boolean, default: false },
      groupCode: { type: String },
      startText: { type: String },
      endText: { type: String },
      tmpr1: { type: String },
      tmpr2: { type: String },
      tmpr3: { type: String },
      tmpr4: { type: String },
      tmpr5: { type: String },
      dateFormat: { type: String, default: 'YYYYMMDD' },
      rows: { type: String, default: '3' },
      style: Object,
      placeholder: String,
      mask: { type: String, default: '' },
      trueValue: String,
      falseValue: String,
      textField: {
        type: String,
        default: ''
      },
      valueField: {
        type: String,
        default: ''
      },
    },
    emits: [
      'update:modelValue', 'focusout', 'change'
    ],
    setup(props, { emit }) {
      const store = useStore()
      const code: Array<Code> = store.getters.getCode
      const sysCorpCode: Array<SysCorpCode> = store.getters.getSysCorpCode
      const checkboxData = computed({
        get: (): any => props.modelValue?.toString().split(",") || [],
        set: (value) => {
          let val = value?.sort().join(",")
          if (val.indexOf(',') === 0) {
            val = val.substring(1)
          }
          emit("update:modelValue", val)
        }
      })

      const data = useModelWrapper(props, emit)

      const codeData = computed(() => {
        if (props.groupCode?.startsWith("CUST")) {
          const res = sysCorpCode.find((f) => f.groupCode == props.groupCode)
          return res?.details
        } else {
          const res = code.find((f) => f.groupCode == props.groupCode)
          return res?.details.filter(f => {
            return (f.tmpr1 === (props.tmpr1 || f.tmpr1) &&
              f.tmpr2 === (props.tmpr2 || f.tmpr2) && 
              f.tmpr3 === (props.tmpr3 || f.tmpr3) && 
              f.tmpr4 === (props.tmpr4 || f.tmpr4) && 
              f.tmpr5 === (props.tmpr5 || f.tmpr5)) 
          })
        }
      })

      const codeText = computed(() => {
        const code = codeData.value?.find(f => f.code == props.textContent)
        return code?.codeNm
      })

      return {
        codeData,
        codeText,
        data,    
        checkboxData,
      }      
    }
  })
</script>