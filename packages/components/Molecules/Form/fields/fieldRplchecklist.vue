<template>
  <div class="rpl-checklist wrapper">
    <!-- List Box -->
    <div v-if="schema.listBox" :class="{
      'rpl-checklist__combobox': true,
      'rpl-checklist__combobox--simple': schema.simple,
      'form-control': !schema.simple
    }" :disabled="disabled">
      <div class="rpl-checklist__list">
        <div class="rpl-checklist__list-row" v-for="(item, index) in items" :key="index" :class="{'is-checked': isItemChecked(item)}">
          <rpl-checkbox
            v-model="listValues[index]"
            :inputDisabled="disabled"
            :inputId="getFieldID(schema, true)"
            :inputName="getInputName(item)"
            :inlineLabel="getItemName(item)"
            @change="onMultiChange()"
          />
        </div>
      </div>
    </div>
    <!-- Combo Box -->
    <div v-if="!schema.listBox" class="rpl-checklist__combobox form-control" :class="{ 'rpl-checklist__combobox--expanded': comboExpanded }" :disabled="disabled">
      <div class="rpl-checklist__main-row" :class="{ expanded: comboExpanded }">
        <button :aria-expanded="comboExpanded" class="rpl-checklist__info" type="button" @click="onExpandCombo()">
          <span>{{ labelText }}<span class="rpl-checklist__more-count" v-if="labelHiddenCount"> + {{ labelHiddenCount }} more</span></span>
          <rpl-icon symbol="down" color="primary" />
        </button>
      </div>
      <div class="rpl-checklist__list rpl-checklist__list--dropdown" v-if="comboExpanded">
        <div class="rpl-checklist__list-row" v-for="(item, index) in items" :key="index" :class="{'is-checked': isItemChecked(item), 'rpl-checklist__list-row--single': schema.single }">
          <button
            type="button"
            v-if="schema.single"
            class="rpl-checklist__single-item"
            :class="{'rpl-checklist__single-item--selected': isItemChecked(item)}"
            @click="onSingleClick(item)"
          >
            <span>{{ getItemName(item) }}</span>
            <span v-if="isItemChecked(item)" class="rpl-visually-hidden">(Selected)</span>
          </button>
          <rpl-checkbox
            v-if="!schema.single"
            v-model="listValues[index]"
            :inputDisabled="disabled"
            :inputId="getFieldID(schema, true)"
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
import isObject from 'lodash/isObject'
import { abstractField, schema } from 'vue-form-generator'
import deprecate from '@dpc-sdp/ripple-global/mixins/deprecate'

export default {
  mixins: [
    abstractField,
    deprecate
  ],
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
  mounted () {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateSize)
      this.updateSize()
    }
    this.setCheckedValues()
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
    onSingleClick (item) {
      this.value = this.getInputName(item)
      this.comboExpanded = false
    },
    onExpandCombo () {
      this.comboExpanded = !this.comboExpanded

      if (this.comboExpanded) {
        this.addOutsideTest()
      } else {
        this.removeOutsideTest()
      }
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
        if (Array.isArray(this.value)) {
          // Set display label for multi-select
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
        } else {
          // Set display label for single-select
          const item = this.getItemFromValue(this.value)
          str = this.getItemName(item)
        }
      }

      this.labelText = str
    },
    setCheckedValues () {
      // Set initial values for checkboxes
      this.listValues = this.items.map(item => this.isItemChecked(item))
    },
    addOutsideTest () {
      if (typeof window !== 'undefined') {
        document.addEventListener('click', this.testOutside)
      }
    },
    testOutside (event) {
      if (typeof window !== 'undefined') {
        if (!this.$el.contains(event.target)) {
          this.comboExpanded = false
          this.removeOutsideTest()
        }
      }
    },
    removeOutsideTest (event) {
      if (typeof window !== 'undefined') {
        document.removeEventListener('click', this.testOutside)
      }
    }
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
$rpl-checklist-hover-color: rpl-color('white');
$rpl-checklist-hover-background-color: rpl-color('primary');
$rpl-checklist-label-ruleset: ('xs', 1.4em, 'regular');
$rpl-checklist-label-text-color: rpl-color('extra_dark_neutral');
$rpl-checklist-checkbox-border: 1px solid rpl-color('mid_neutral_1');
$rpl-checklist-checkbox-border-focus: 1px solid rpl-color('primary');
$rpl-checklist-list-row-padding: $rpl-space-3 $rpl-form-element-padding-m-horizontal;
$rpl-checklist-list-row-odd-background: rpl-color('white');
$rpl-checklist-checkbox-border-radius: rem(4px);
$rpl-checklist-more-text-color: rpl-color('primary');
$rpl-checklist-dropdown-max-height: (rem(38px) * 10);

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

    &--simple {
      border-color: transparent;
      background-color: transparent;

      .rpl-checklist__list-row {
        padding: 0;

        &:nth-child(2n+1) {
          background-color: transparent;
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
      max-height: $rpl-checklist-dropdown-max-height;
      overflow: auto;
    }
  }

  &__list-row {
    padding: $rpl-checklist-list-row-padding;

    &:nth-child(odd) {
      background: $rpl-checklist-list-row-odd-background;
    }

    &--single {
      padding: 0;
    }
  }

  &__single-item {
    @include rpl_form_text;
    background-color: transparent;
    padding: $rpl-checklist-list-row-padding;
    border: 0;
    margin: 0;
    width: 100%;
    text-align: left;
    cursor: pointer;

    &:hover, &:focus {
      color: $rpl-checklist-hover-color;
      background-color: $rpl-checklist-hover-background-color;
    }

    &--selected {
      text-decoration: underline;
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
