<template>
  <div class="rpl-checklist wrapper">
    <div class="rpl-checklist__combobox form-control" v-if="schema.listBox" :disabled="disabled">
      <div class="rpl-checklist__drop-list">
        <div class="rpl-checklist__list-row" v-for="(item, index) in items" :key="index" :class="{'is-checked': isItemChecked(item)}">
          <label>
            <input :id="getFieldID(schema)" type="checkbox" :checked="isItemChecked(item)" :disabled="disabled" @change="onChanged($event, item)" :name="getInputName(item)"/>
            <span class="rpl-checklist__checkbox" :class="{ 'rpl-checklist__checkbox--checked': isItemChecked(item) }"><rpl-icon symbol="tick" color="primary" /></span>
            {{ getItemName(item) }}
          </label>
        </div>
      </div>
    </div>
    <div class="rpl-checklist__combobox form-control" :class="{ 'rpl-checklist__combobox--expanded': comboExpanded }" v-if="!schema.listBox" :disabled="disabled">
      <div class="rpl-checklist__main-row" @click="onExpandCombo" :class="{ expanded: comboExpanded }">
        <button :aria-expanded="comboExpanded" class="rpl-checklist__info" type="button">
          <span>{{ labelText }}<span class="rpl-checklist__more-count" v-if="labelHiddenCount"> + {{ labelHiddenCount }} more</span></span>
          <rpl-icon symbol="down" color="primary" />
        </button>
      </div>
      <div class="rpl-checklist__drop-list" v-if="comboExpanded">
        <div class="rpl-checklist__list-row" v-for="(item, index) in items" :key="index" :class="{'is-checked': isItemChecked(item)}">
          <label>
            <input :id="getFieldID(schema)" type="checkbox" :checked="isItemChecked(item)" :disabled="disabled" @change="onChanged($event, item)" :name="getInputName(item)"/>
            <span class="rpl-checklist__checkbox" :class="{ 'rpl-checklist__checkbox--checked': isItemChecked(item) }"><rpl-icon symbol="tick" color="primary" /></span>
            {{ getItemName(item) }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import { isObject, isNil, clone } from 'lodash'
import { abstractField, schema } from 'vue-form-generator'

export default {
  mixins: [abstractField],
  components: {
    RplIcon
  },
  data () {
    return {
      comboExpanded: false,
      labelMaxLetters: Infinity,
      labelHiddenCount: 0,
      labelLetterWidth: 11,
      labelText: ''
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
    },
    selectedCount () {
      if (this.value) {
        return this.value.length
      }
      return 0
    }
  },
  methods: {
    getInputName (item) {
      if (this.schema && this.schema.inputName && this.schema.inputName.length > 0) {
        return schema.slugify(this.schema.inputName + '_' + this.getItemValue(item))
      }
      return schema.slugify(this.getItemValue(item))
    },
    getItemValue (item) {
      if (isObject(item)) {
        if (typeof this.schema['checklistOptions'] !== 'undefined' && typeof this.schema['checklistOptions']['value'] !== 'undefined') {
          return item[this.schema.checklistOptions.value]
        } else {
          if (typeof item['value'] !== 'undefined') {
            return item.value
          } else {
            // throw '`value` is not defined. If you want to use another key name, add a `value` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values'
          }
        }
      } else {
        return item
      }
    },
    getItemName (item) {
      if (isObject(item)) {
        if (typeof this.schema['checklistOptions'] !== 'undefined' && typeof this.schema['checklistOptions']['name'] !== 'undefined') {
          return item[this.schema.checklistOptions.name]
        } else {
          if (typeof item['name'] !== 'undefined') {
            return item.name
          } else {
            // throw '`name` is not defined. If you want to use another key name, add a `name` property under `checklistOptions` in the schema. https://icebob.gitbooks.io/vueformgenerator/content/fields/checklist.html#checklist-field-with-object-values'
          }
        }
      } else {
        return item
      }
    },
    isItemChecked (item) {
      return this.value && this.value.indexOf(this.getItemValue(item)) !== -1
    },
    onChanged (event, item) {
      if (isNil(this.value) || !Array.isArray(this.value)) {
        this.value = []
      }

      if (event.target.checked) {
        // Note: If you modify this.value array, it won't trigger the `set` in computed field
        const arr = clone(this.value)
        arr.push(this.getItemValue(item))
        this.value = arr
      } else {
        // Note: If you modify this.value array, it won't trigger the `set` in computed field
        const arr = clone(this.value)
        arr.splice(this.value.indexOf(this.getItemValue(item)), 1)
        this.value = arr
      }

      this.updateSize()
    },
    onExpandCombo () {
      this.comboExpanded = !this.comboExpanded
    },
    updateSize () {
      if (this.$el && !this.schema.listBox) {
        const info = window.getComputedStyle(this.$el.querySelector('.rpl-checklist__info'))
        const infoWidth = parseFloat(info.width) - parseFloat(info.paddingLeft) - parseFloat(info.paddingRight)
        this.labelMaxLetters = Math.floor(infoWidth / this.labelLetterWidth)
      }

      let letterCount = 0
      let moreLetterCount = 9
      let str = this.schema.placeholder

      this.labelHiddenCount = 0
      if (this.value && this.value.length > 0) {
        str = ''
        this.value.forEach((item, idx) => {
          letterCount += item.length
          if (letterCount < (this.labelMaxLetters - moreLetterCount)) {
            str += ((idx > 0) ? '; ' : '') + item
          } else {
            this.labelHiddenCount++
          }
        })
      }

      this.labelText = str
    }
  },
  mounted: function () {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateSize)
      this.updateSize()
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
@import "~@dpc-sdp/ripple-global/style";
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
    z-index: 2;
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

  &__drop-list {
    @include rpl_breakpoint('m') {
      background-color: $rpl-form-element-bg-color;
      border: $rpl-checklist-expanded-border;
      border-top: 0;
      position: absolute;
      z-index: 1;
      left: -1px;
      width: 100%;
    }

    label {
      @include rpl_typography_ruleset($rpl-checklist-label-ruleset);
      color: $rpl-checklist-label-text-color;
      margin: 0;
      position: relative;
    }

    input[type="checkbox"] {
      position: absolute;
      top: 1px;
      left: 1px;
      opacity: 0;
      width: $rpl-space * 6;
      height: $rpl-space * 6;

      &:focus {
        & + .rpl-checklist__checkbox {
          border: $rpl-checklist-checkbox-border-focus;
        }
      }
    }
  }

  &__list-row {
    padding: $rpl-checklist-list-row-padding;

    &:nth-child(odd) {
      background: $rpl-checklist-list-row-odd-background;
    }
  }

  &__checkbox {
    display: inline-block;
    vertical-align: middle;
    border: $rpl-checklist-checkbox-border;
    border-radius: $rpl-checklist-checkbox-border-radius;
    width: $rpl-space * 6;
    height: $rpl-space * 6;
    position: relative;

    .rpl-icon {
      display: none;
    }

    &--checked {
      .rpl-icon {
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }

  &__more-count {
    color: $rpl-checklist-more-text-color;
  }
}
</style>
