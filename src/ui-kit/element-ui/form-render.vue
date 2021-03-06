<template>
  <el-form
    ref="form"
    :inline="inline"
    :label-width="labelWidth"
    :label-position="labelPosition"
    :model="data"
    :rules="validRules"
  >
    <component
      :is="inline ? 'span' : 'el-row'"
      :gutter="marginX"
    >
      <component
        :is="inline ? 'span' : 'el-col'"
        v-for="field in fieldList"
        :key="field.name"
        :span="field.span"
      >
        <Input
          v-if="field.type === 'input'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <InputNumber
          v-if="field.type === 'input-number'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <InputIp
          v-if="field.type === 'input-ip'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <InputFile
          v-if="field.type === 'input-file'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Select
          v-if="field.type === 'select'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Cascader
          v-if="field.type === 'cascader'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <ChinaRegion
          v-if="field.type === 'china-region'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <ChinaLocation
          v-if="field.type === 'china-location'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Radio
          v-if="field.type === 'radio'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Checkbox
          v-if="field.type === 'checkbox'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <SSwitch
          v-if="field.type === 'switch'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <DatePicker
          v-if="field.type === 'date-picker'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <Blank
          v-if="field.type === 'blank'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        />
        <SSlot
          v-if="field.type === 'slot'"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :data="data"
          :sup-nodes="supNodeList"
        >
          <template
            v-if="field.slotName"
            v-slot:[field.slotName]
          >
            <slot
              :name="field.slotName"
              v-bind="{ schema, field, data }"
            />
          </template>
        </SSlot>
        <Wrapper
          v-if="field.type === 'wrapper'"
          ref="subformItems"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :schema="field"
          :data="data"
          :sup-nodes="supNodeList"
        >
          <template
            v-for="slotName in slotNames"
            v-slot:[slotName]="args"
          >
            <slot
              :name="slotName"
              v-bind="args"
            />
          </template>
        </Wrapper>
        <Subform
          v-if="field.type === 'subform'"
          ref="subformItems"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :schema="field"
          :data="data[field.name]"
          :sup-nodes="supNodeList"
        >
          <template
            v-for="slotName in slotNames"
            v-slot:[slotName]="args"
          >
            <slot
              :name="slotName"
              v-bind="args"
            />
          </template>
        </Subform>
        <ItemList
          v-if="field.type === 'item-list'"
          ref="subformItems"
          :form-conf="formConf"
          :scenario="scenario"
          :field="field"
          :schema="field"
          :data="data"
          :sup-nodes="supNodeList"
        >
          <template
            v-for="slotName in slotNames"
            v-slot:[slotName]="args"
          >
            <slot
              :name="slotName"
              v-bind="args"
            />
          </template>
        </ItemList>
      </component>
    </component>
  </el-form>
</template>

<style>
.form-item.readonly {
  pointer-events: none;
}
</style>

<script>
import _ from 'lodash';

import Input from './components/input/input';
import InputNumber from './components/input-number/input-number';
import InputIp from './components/input-ip/input-ip';
import InputFile from './components/input-file/input-file';
import Select from './components/select/select';
import Cascader from './components/cascader/cascader';
import ChinaRegion from './components/china-region/china-region';
import ChinaLocation from './components/china-location/china-location';
import Radio from './components/radio/radio';
import Checkbox from './components/checkbox/checkbox';
import SSwitch from './components/switch/switch';
import DatePicker from './components/date-picker/date-picker';

import Blank from './components/blank/blank';
import SSlot from './components/slot/slot';
import Wrapper from './components/wrapper/wrapper';
import Subform from './components/subform/subform';
// import ItemList from './components/item-list/item-list';
import isVue2, { reactive } from 'vue';
const IL = isVue2 ? require('./components/item-list/item-list.vue') : require('./components/item-list/item-list3.vue');
const ItemList = IL.default;

let staticConf = isVue2
  ? isVue2.observable({ config: {} })
  : reactive({ config: {} });
function setConfig(key, value) {
  if(_.isObject(key)) {
    if(isVue2) {
      isVue2.set(staticConf, 'config', key);
    } else {
      staticConf.config = key;
    }
  } else {
    if(isVue2) {
      isVue2.set(staticConf.config, key, value);
    } else {
      staticConf.config[key] = value;
    }
    staticConf.config = {
      ...staticConf.config
    }
  }
}
function getConfig(key) {
  if(!key) {
    return staticConf.config;
  } else {
    return staticConf.config[key];
  }
}
export {
  setConfig,
  getConfig,
};

export default {
  name: 'FormRender',
  components: {
    Input,
    InputNumber,
    InputIp,
    InputFile,
    Select,
    Cascader,
    ChinaRegion,
    ChinaLocation,
    Radio,
    Checkbox,
    SSwitch,
    DatePicker,
    Blank,
    SSlot,
    Wrapper,
    Subform,
    ItemList,
  },
  props: {
    inline: {
      type: Boolean,
      default() {
        return false;
      }
    },
    scenario: {
      type: String,
      default() {
        return 'edit'; // create || edit || preview
      }
    },
    supNodes: {
      type: Array,
      default() {
        return null;
      }
    },
    schema: {
      type: Object,
      default() {
        return {};
      },
    },
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    config: {
      type: Object,
      default() {
        return {};
      },
    }
  },
  computed: {
    mixedConfig() {
      return _.merge({}, staticConf.config, this.supNodeList[0].config);
    },
    supNodeList() {
      if(this.supNodes) {
        return [...this.supNodes, this];
      } else {
        return [this];
      }
    },
    marginX() {
      return this.formConf.marginX || 20;
    },
    formConf() {
      return this.schema.formConf || {};
    },
    labelWidth() {
      return this.formConf.labelWidth || '80px';
    },
    labelPosition() {
      return this.formConf.labelPosition || 'right';
    },
    fieldList() {
      return this.schema.fieldList;
    },
    slotNames() {
      const $root = this.supNodeList[0];
      let slotNames = Object.keys($root.$slots || {});
      slotNames = slotNames.concat(Object.keys($root.$scopedSlots || {}));
      return _.uniq(slotNames);
    },
    validFuncs() {
      return this.schema.validFuncs;
    },
    validRules() {
      const fieldMap =  _.keyBy(this.fieldList, 'name');
      const validFuncMap = _.keyBy(this.validFuncs, 'key');
      return _(this.schema.validRules)
        .pickBy((rules, key) => fieldMap[key] && rules && rules.length)
        .mapValues((rules, key) => {
          const field = fieldMap[key];

          const className = _.upperFirst(_.camelCase(field.type)); // 未考虑 SSwitch
          const fieldComponent = this.$options.components[className];
          let componentValidatorMap = {};
          if(fieldComponent && fieldComponent.validators) {
            componentValidatorMap = _.keyBy(fieldComponent.validators, 'key');
          }

          return rules.map(rule => {
            if(rule.type === 'required') {
              return {
                required: true,
                message: rule.note || `请输入${field.label}`,
                trigger: rule.trigger || 'blur',
              };
            } else if (rule.type === 'regexp') {
              const regExp = new RegExp(rule.regexp);

              return {
                validator(r, value, callback) {
                  // value 为空的时候正则校验器不起作用
                  const pass = !value || regExp.test(value);
                  if(pass) {
                    callback();
                  } else {
                    callback(new Error(rule.note));
                  }
                },
                trigger: rule.trigger || 'blur',
              }
            } else if(rule.type === 'func') {
              let validFunc = null;
              if (rule.isPreset !== false) {
                if (_.startsWith(rule.preset, '[component]')) {
                  const key = rule.preset.replace('[component]', '');
                  const validator = componentValidatorMap[key];
                  if(validator) {
                    validFunc = validator.func;
                  } else {
                    // console.warn(`validator not found: ${key} in component ${className}`)
                    return null;
                  }
                } else {
                  const funcStr = validFuncMap[rule.preset].func;
                  validFunc = new Function('rule', 'value', 'callback', funcStr);
                }
              } else {
                const funcStr = rule.func;
                validFunc = new Function('rule', 'value', 'callback', funcStr);
              }

              validFunc = validFunc.bind(this);

              return {
                validator: validFunc,
                trigger: rule.trigger || 'blur',
              }
            }
          })
        })
        .pickBy()
        .value();
    }
  },
  watch: {
    fieldList: {
      handler(fields) {
        fields.forEach(field => {
          if(field.type === 'subform' && !this.data[field.name]) {
            this.$set(this.data, field.name, {});
          }
          if(field.type === 'item-list' && !this.data[field.name]) {
            this.$set(this.data, field.name, []);
          }
        })
      },
      immediate: true,
    }
  },
  methods: {
    async validate() {
      return new Promise(resolve => {
        let valiResult = true;
        
        this.$refs['form'].validate(async isValid => {
          valiResult = valiResult && isValid;

          let subformItems = this.$refs['subformItems'] || [];
          if(!_.isArray(subformItems)) {
            subformItems = [subformItems];
          }

          const valids = await Promise.all(subformItems.map(subform => {
            return subform.validate();
          }));
          valids.forEach(valid => {
            valiResult = valiResult && valid;
          })
          return resolve(valiResult);
        });
      });
    }   
  }
}
</script>
