<template>
  <el-form-item
    v-if="activated"
    v-show="visible"
    :label="field.label"
    :prop="field.name"
    :class="{'form-item': true, 'readonly': readonly}"
    :style="{ marginBottom: colMarginY }"
  >
    <template v-slot:label>
      <Tooltip :field="field" />
    </template>
    <el-date-picker
      :key="calendarId"
      v-model="data[field.name]"
      :type="field.mode"
      :disabled="disabled"
      :placeholder="field.placeholder"
      value-format="timestamp"
      style="width: 100%;"
    />
  </el-form-item>
</template>

<script>
import { $id } from '../../../common/util-funcs.js'
import formItemMixin from '../../common/form-item/mixin'

export default {
  mixins: [formItemMixin],
  data() {
    return {
      calendarId: $id(),
    }
  },
  watch: {
    'field.mode': {
      handler() {
        this.$set(this.data, this.field.name, undefined);
        this.calendarId = $id();
        this.$forceUpdate();
      }
    }
  },
  defaultSchema: {},
};
</script>
