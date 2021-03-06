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
    <div style="display: flex; align-items: center;">
      <el-input
        ref="snippet0"
        v-model="ip0"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        class="ip-snippet"
      />.
      <el-input
        ref="snippet1"
        v-model="ip1"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        class="ip-snippet"
      />.
      <el-input
        ref="snippet2"
        v-model="ip2"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        class="ip-snippet"
      />.
      <el-input
        ref="snippet3"
        v-model="ip3"
        :type="field.mode"
        :disabled="disabled"
        :readonly="readonly"
        class="ip-snippet"
      />
    </div>
  </el-form-item>
</template>

<style scoped>
.form-item .ip-snippet.el-input {
  margin: 0 5px;
}
.form-item .ip-snippet.el-input:first-of-type {
  margin-left: 0;
}
.form-item .ip-snippet.el-input:last-of-type {
  margin-right: 0;
}
</style>

<script>
import formItemMixin from '../../common/form-item/mixin'

export default {
  type: 'input-ip',
  mixins: [formItemMixin],
  validators: [{
    name: 'IP',
    key: 'ip',
    func: (r, value, callback) => {
      const errMsg = '请输入正确的 IP 地址，每位 0~255 之间的整数';
      const snippets = value && value.split('.');
      if(snippets && snippets.length === 4) {
        for(let i = 0; i < 4; i++) {
          const snippet = snippets[i];
          let pass = /[\d]+/.test(snippet);
          if(!pass) {
            callback(new Error(errMsg));
            break;
          }
          const num = Number(snippet);
          pass = num >= 0 && num <= 255;
          if(!pass) {
            callback(new Error(errMsg));
            break;
          }
          if(!i && num === 0) {
            callback(new Error('首位不能为 0'));
          }
        }
      } else {
        callback(new Error(errMsg));
      }
      callback();
    }
  }],
  computed: {
    ip0: {
      get() { return this.getSnippet(0) },
      set(val) { this.setSnippet(0, val) },
    },
    ip1: {
      get() { return this.getSnippet(1) },
      set(val) { this.setSnippet(1, val) },
    },
    ip2: {
      get() { return this.getSnippet(2) },
      set(val) { this.setSnippet(2, val) },
    },
    ip3: {
      get() { return this.getSnippet(3) },
      set(val) { this.setSnippet(3, val) },
    }
  },
  methods: {
    getSnippet(index) {
      const ipStr = this.data[this.field.name];
      if(ipStr) {
        const snippets = ipStr.split('.');
        if(snippets.length === 4) {
          const snippet = snippets[index];
          return /^[0]+$/.test(snippet) ? '0' : snippet.replace(/^[0]+/, '');
        }
      };
      return '';
    },
    setSnippet(index, val) {
      const snippets = [];
      for(let i = 0; i < 4; i++) {
        if(i !== index) {
          snippets.push(this[`ip${i}`]);
        } else {
          let next = false;
          const number = parseInt(val);
          if(number || number === 0) {
            snippets.push(`${Math.max(0, Math.min(255, number))}`);
            if(val.length >= 3 || val.endsWith('.') || (number < 100 && number > 25)) {
              next = true;
            }
          } else {
            snippets.push('');
          }
          if(next && index !== 3) {
            this.$refs[`snippet${index + 1}`].select();
          }
        }
      }
      let ipStr = snippets.join('.');
      if(ipStr === '...') {
        ipStr = '';
      }
      this.$set(this.data, this.field.name, ipStr);
    },
    async validate() {
      return new Promise(async resolve => {
        return resolve(false);
      })
    }
  }
};
</script>
