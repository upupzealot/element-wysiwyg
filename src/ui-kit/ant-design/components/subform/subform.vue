<template>
  <FormRender
    v-if="activated"
    v-show="visible"
    ref="formRender"
    :field="field"
    :schema="schema"
    :data="data"
    :scenario="scenario"
    :sup-nodes="supNodes"
    :class="{subform: true, 'readonly': readonly}"
    style="margin-bottom: 0;"
  />
</template>

<script>
import formItemMixin from '@/ui-kit/ant-design/common/form-item/mixin'

import isVue2, { defineAsyncComponent } from 'vue'

export default {
  name: 'Subform',
  components: {
    FormRender: isVue2 ? () => import('../../form-render') : defineAsyncComponent(() => import('../../form-render')),
  },
  mixins: [formItemMixin],
  props: {
    schema: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    async validate() {
      return new Promise(async resolve => {
        if(this.$refs['formRender']) { // incase not activated
          const valid = await this.$refs['formRender'].validate();
          resolve(valid);
        } else {
          resolve(true);
        }
      })
    }
  }
}
</script>
