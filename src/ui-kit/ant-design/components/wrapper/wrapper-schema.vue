<template>
  <StandardForm :config="{ hasDesc: false, hasValid: false }" />
</template>

<script>
import schemaItemMixin from '@/ui-kit/common/schema-item/mixin';

export default {
  type: 'wrapper',
  mixins: [schemaItemMixin],
};
</script>
