<template>
  <StandardForm>
    <template v-slot:basic>
      <OptionList
        :field="field"
        class="schema-form"
      />
    </template>
  </StandardForm>
</template>

<script>
import schemaItemMixin from '@/ui-kit/common/schema-item/mixin';
import OptionList from '@/ui-kit/common/schema-item/option-list';

export default {
  type: 'radio',
  components: {
    OptionList,
  },
  mixins: [schemaItemMixin],
};
</script>
