<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    label="　"
    class="blank-wrap"
    :style="{ marginBottom: colMarginY }"
  >
    <div class="blank" />
  </el-form-item>
</template>

<style>
.blank-wrap .el-form-item__label {
  color: transparent;
  content: none;
  pointer-events: none;
}
.blank-wrap .blank {
  width: 100%;
  height: 40px;
  color: #eee;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
};
</script>
