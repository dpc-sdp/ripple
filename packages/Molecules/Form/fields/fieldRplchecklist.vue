<template>
  <div v-click-outside="onClickOutside" class="rpl-checklist wrapper">
    <!-- List Box -->
    <div v-if="schema.listBox" class="rpl-checklist__combobox form-control" :disabled="disabled">
      <div class="rpl-checklist__list">
        <div class="rpl-checklist__list-row" v-for="(item, index) in items" :key="index" :class="{'is-checked': isItemChecked(item)}">
          <rpl-checkbox
            v-model="listValues[index]"
            :inputDisabled="disabled"
            :inputId="getFieldID(schema)"
            :inputName="getInputName(item)"
            :inlineLabel="getItemName(item)"
            @change="onMultiChange()"
          />
        </div>
      </div>
    </div>
    <!-- Combo Box -->
    <div v-if="!schema.listBox" class="rpl-checklist__combobox form-control" :class="{ 'rpl-checklist__combobox--expanded': comboExpanded }" :disabled="disabled">
      <div class="rpl-checklist__main-row" @click="onExpandCombo" :class="{ expanded: comboExpanded }">
        <button :aria-expanded="comboExpanded" class="rpl-checklist__info" type="button">
          <span>{{ labelText }}<span class="rpl-checklist__more-count" v-if="labelHiddenCount"> + {{ labelHiddenCount }} more</span></span>
          <rpl-icon symbol="down" color="primary" />
        </button>
      </div>
      <div class="rpl-checklist__list rpl-checklist__list--dropdown" v-if="comboExpanded">
        <div class="rpl-checklist__list-row" v-for="(item, index) in items" :key="index" :class="{'is-checked': isItemChecked(item)}">
          <rpl-checkbox
            v-model="listValues[index]"
            :inputDisabled="disabled"
            :inputId="getFieldID(schema)"
            :inputName="getInputName(item)"
            :inlineLabel="getItemName(item)"
            @change="onMultiChange()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import RplCheckbox from '../Checkbox.vue'
import { isObject } from 'lodash'
import { abstractField, schema } from 'vue-form-generator'
import vClickOutside from 'v-click-outside'

export default {
  mixins: [abstractField],
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    RplIcon,
    RplCheckbox
  },
  data () {
    return {
      listValues: [],
      comboExpanded: false,
      labelMaxLetters: Infinity,
      labelHiddenCount: 0,
      labelLetterWidth: 11,
      labelText: ''
    }
  },
  watch: {
    value (newVal, oldVal) {
      this.updateSize()
      this.setCheckedValues()
    }
  },
  computed: {
    items () {
      let values = this.schema.values
      if (typeof values === 'function') {
        return values.apply(this, [this.model, this.schema])
      } else {
        return values
      }
    }
  },
  methods: {
    getInputName (item) {
      if (this.schema && this.schema.inputName && this.schema.inputName.length > 0) {
        return schema.slugify(this.schema.inputName + '_' + this.getItemValue(item))
      }
      return schema.slugify(this.getItemValue(item))
    },
    getItemProperty (item, property) {
      if (isObject(item)) {
        if (typeof this.schema['checklistOptions'] !== 'undefined' && typeof this.schema['checklistOptions'][property] !== 'undefined') {
          return item[this.schema.checklistOptions[property]]
        } else {
          if (typeof item[property] !== 'undefined') {
            return item[property]
          } else {
            // throw '`value` is not defined. If you want to use another key name, add a `value` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values'
          }
        }
      } else {
        return item
      }
    },
    getItemValue (item) {
      return this.getItemProperty(item, 'value')
    },
    getItemName (item) {
      return this.getItemProperty(item, 'name')
    },
    getItemFromValue (value) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.getItemValue(this.items[i]) === value) {
          return this.items[i]
        }
      }
      return null
    },
    isItemChecked (item) {
      return this.value && this.value.indexOf(this.getItemValue(item)) !== -1
    },
    onMultiChange () {
      // Set convert checked boxes into value array.
      let arr = []
      this.listValues.forEach((item, index) => {
        if (item && this.items[index]) {
          arr.push(this.getItemValue(this.items[index]))
        }
      })
      this.value = arr
      this.updateSize()
    },
    onExpandCombo () {
      this.comboExpanded = !this.comboExpanded
    },
    onClickOutside (event) {
      this.comboExpanded = false
    },
    updateSize () {
      let str = this.schema.placeholder

      if (this.$el && !this.schema.listBox) {
        const info = window.getComputedStyle(this.$el.querySelector('.rpl-checklist__info'))
        const infoWidth = parseFloat(info.width) - parseFloat(info.paddingLeft) - parseFloat(info.paddingRight)
        this.labelMaxLetters = Math.floor(infoWidth / this.labelLetterWidth)
      }

      const moreLetterCount = 9
      let letterCount = 0

      this.labelHiddenCount = 0
      if (this.value && this.value.length > 0) {
        str = ''
        this.value.forEach((value, idx) => {
          const item = this.getItemFromValue(value)
          if (item) {
            const itemName = this.getItemName(item)
            letterCount += itemName.length
            if (letterCount < (this.labelMaxLetters - moreLetterCount)) {
              str += ((idx > 0) ? '; ' : '') + itemName
            } else {
              this.labelHiddenCount++
            }
          }
        })
      }

      this.labelText = str
    },
    setCheckedValues () {
      // Set initial values for checkboxes
      this.listValues = this.items.map(item => this.isItemChecked(item))
    }
  },
  mounted: function () {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateSize)
      this.updateSize()
    }
    this.setCheckedValues()
  },
  beforeDestroy: function () {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.updateSize)
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "../scss/form";

$rpl-checklist-expanded-border: 1px solid rpl-color('primary');
$rpl-checklist-label-ruleset: ('xs', 1.4em, 'regular');
$rpl-checklist-label-text-color: rpl-color('extra_dark_neutral');
$rpl-checklist-checkbox-border: 1px solid rpl-color('mid_neutral_1');
$rpl-checklist-checkbox-border-focus: 1px solid rpl-color('primary');
$rpl-checklist-list-row-padding: $rpl-space-3 $rpl-form-element-padding-m-horizontal;
$rpl-checklist-list-row-odd-background: rpl-color('white');
$rpl-checklist-checkbox-border-radius: rem(4px);
$rpl-checklist-more-text-color: rpl-color('primary');

.rpl-checklist {
  $root: &;

  &__combobox {
    background-color: $rpl-form-element-bg-color;
    border: 1px solid $rpl-form-element-border-color;
    border-radius: $rpl-form-element-border-radius;
    position: relative;

    &--expanded {
      border: $rpl-checklist-expanded-border;

      @include rpl_breakpoint('m') {
        border-radius: $rpl-form-element-border-radius $rpl-form-element-border-radius 0 0;
        border-bottom: 1px solid transparent;
      }

      #{$root}__info {
        .rpl-icon {
          transform: rotate(-180deg);
        }
      }
    }
  }

  &__info {
    position: relative;
    cursor: pointer;
    color: $rpl-form-element-text-color;
    text-align: left;
    display: block;
    width: 100%;
    background: transparent;
    border: 0;
    padding: $rpl-form-element-padding-s;
    @include rpl_breakpoint(m) {
      padding: $rpl-form-element-padding-m;
    }

    .rpl-icon {
      position: absolute;
      top: 0;
      bottom: 0;
      right: $rpl-form-element-padding-s-horizontal;
      margin: auto;
      transition: transform .25s;
      @include rpl_breakpoint(m) {
        right: $rpl-form-element-padding-m-horizontal;
      }
    }
  }

  &__list--dropdown {
    @include rpl_breakpoint('m') {
      background-color: $rpl-form-element-bg-color;
      border: $rpl-checklist-expanded-border;
      border-top: 0;
      position: absolute;
      z-index: 1;
      left: -1px;
      width: 100%;
    }
  }

  &__list-row {
    padding: $rpl-checklist-list-row-padding;

    &:nth-child(odd) {
      background: $rpl-checklist-list-row-odd-background;
    }
  }

  &__single-item {
    @include rpl_form_text;
    background-color: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: left;
    cursor: pointer;

    &:hover, &:focus {
      text-decoration: underline;
      color: rpl-color('primary');
    }
  }

  &__more-count {
    color: $rpl-checklist-more-text-color;
  }

  .rpl-checkbox {
    margin-bottom: 0;
  }
}
</style>
