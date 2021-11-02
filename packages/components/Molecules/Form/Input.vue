<template>
  <div class="form-control" :class="computedClasses">
    <component class="rpl-form-input__btn rpl-form-input__btn-before" v-if="showBeforeIcon" :is="icon.before.onClick ? 'button' : 'div'" @click.prevent="handleIconClick('before')">
      <rpl-icon
        class="rpl-form-input__icon rpl-form-input__icon-before"
        v-bind="icon.before"
      />
    </component>
    <input
      type="text"
      class="rpl-form-input__input"
      id="tests"
      v-model="computedValue"
      :disabled="disabled"
      :maxlength="max"
      :placeholder="placeholder"
      :readonly="readonly"
    />
    <component class="rpl-form-input__btn rpl-form-input__btn-after" v-if="showAfterIcon" :is="icon.after.onClick ? 'button' : 'div'" @click.prevent="handleIconClick('after')">
      <rpl-icon
        class="rpl-form-input__icon rpl-form-input__icon-after"
        v-bind="icon.after"
      />
    </component>
  </div>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import { RplFormEventBus } from './index.js'
export default {
  name: 'rpl-form-input',
  components: {
    RplIcon
  },
  props: {
    value: String,
    disabled: Boolean,
    max: String,
    placeholder: String,
    readonly: Boolean,
    icon: {
      type: Object
    }
  },
  methods: {
    handleIconClick (pos) {
      if (pos === 'before' && this.icon.before?.onClick && typeof this.icon.before.onClick === 'function') {
        this.icon.before?.onClick()
      }
      if (pos === 'after' && this.icon.after?.onClick && typeof this.icon.after.onClick === 'function') {
        this.icon.after?.onClick()
      }
      RplFormEventBus.$emit('rpl-form-input-icon-click', pos)
    },
    updateValue (val) {
      this.$emit('input', val)
    },
    showIcon (direction) {
      if (this.icon?.[direction]) {
        if (this.icon[direction].hideOnDirty) {
          return this.computedValue !== ''
        }
        return true
      }
    }
  },
  computed: {
    computedClasses () {
      const name = this.$options.name.toLowerCase()
      const classes = [name]
      if (this.icon) {
        classes.push(`${name}--with-icon`)
      }
      if (this.icon?.before) {
        classes.push(`${name}--with-icon-before`)
      }
      if (this.icon?.after) {
        classes.push(`${name}--with-icon-after`)
      }
      return classes
    },
    computedValue: {
      set (val) {
        this.updateValue(val)
      },
      get () {
        if (this.value === null || this.value === undefined) {
          return ''
        }
        return this.value
      }
    },
    showBeforeIcon () {
      return this.showIcon('before')
    },
    showAfterIcon () {
      return this.showIcon('after')
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "scss/form";
$rpl-form-input-icon-size: $rpl-space-4;
.rpl-form-input {
  $root: &;
  position: relative;
  &--with-icon {
    &-before {
      & #{$root}__input {
        &[type="text"] {
          padding-left: $rpl-form-input-icon-size + $rpl-space-3 * 2;
        }
      }
    }
    &-after {
      & #{$root}__input {
        &[type="text"] {
          padding-right: $rpl-form-input-icon-size + $rpl-space-3 * 2;
        }
      }
    }
  }
  &__btn {
    @include rpl_btn_reset;
    height: $rpl-form-input-icon-size;
    width: $rpl-form-input-icon-size;
    position: absolute;
    top: calc(50% - #{$rpl-space-2});
    &-before {
      left: $rpl-space-3;
    }
    &-after {
      right: $rpl-space-3;
    }
  }
  &__icon {
    width: $rpl-form-input-icon-size !important; // required to overide inline style on rpl-icon
    height: $rpl-form-input-icon-size !important;
  }
}
</style>
