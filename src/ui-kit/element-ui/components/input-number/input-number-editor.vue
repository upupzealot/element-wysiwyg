<template>
  <InputNumber
    :field="field"
    :data="data"
    :v-status="vStatus"
    :sup-nodes="supNodes"
    :class="statusClasses"
    class="editor-input-item"
  />
</template>

<style>
.editor-input-item.v-readonly .el-form-item__content {
  background: linear-gradient(45deg, #efefef 25%, transparent 0, transparent 50%, #efefef 0, #efefef 75%, transparent 0);
  background-size:20px 20px;
}
.editor-input-item.v-disabled .el-form-item__content {
  background-color: #efefef;
}
.editor-input-item.v-disabled .el-form-item__content .el-input,
.editor-input-item.v-readonly .el-form-item__content .el-input {
  opacity: .6;
}
</style>

<script>
import editorItemMixin from '@/ui-kit/common/editor-item/mixin'

import InputNumber from './input-number'

export default {
  type: 'input-number',
  components: {
    InputNumber,
  },
  mixins: [editorItemMixin],
}
</script>
