<template>
  <div class="rpl-select" :class="{'rpl-select--open' : isOpen}">
    <div v-if="!$breakpoint.s" class="rpl-select__native">
      <select :id="fieldId" :disabled="disabled" :name="schema.inputName" :multiple="schema.multiselect" v-model="value">
        <option v-if="!schema.multiselect" disabled value="">{{placeholder}}</option>
        <option :value="option.id" v-for="(option) in options" :key="option.id">{{option.name}}</option>
      </select>
      <rpl-icon v-if="!schema.multiselect" class="rpl-select__trigger-icon" symbol="down" color="primary" />
    </div>
    <div class="rpl-select__inner" v-else>
      <div
        class="rpl-select__trigger"
        tabindex="0"
        aria-haspopup="listbox"
        :aria-labelledby="`${schema.model}-rpl-select-trigger ${schema.model}-rpl-select-value`"
        :aria-expanded="isOpen ? 'true' : false"
        role="button"
        ref="trigger"
        @click="toggleOpen"
        @keyup.space.prevent="toggleOpen"
        @keyup.enter.prevent="toggleOpen"
      >
        <template v-if="value && value.length > 0">
          <span :id="`${schema.model}-rpl-select-value`">{{selectedTitles}}</span>
          <span class="rpl-select__label-count" v-if="selectedItems.length > showItemLimit">+ {{selectedItems.length - 1}} more</span>
          <span class="rpl-select__label-visually-hidden"> Selected</span>
        </template>
        <span v-else :id="`${schema.model}-rpl-select-trigger`">{{placeholder}}</span>
        <rpl-icon class="rpl-select__trigger-icon" symbol="down" color="primary" />
      </div>
      <div class="rpl-select__dropdown" v-show="isOpen">
        <div
          class="rpl-select__listbox"
          ref="listbox"
          tabindex="-1"
          :aria-multiselectable="schema.multiselect && 'true'"
          :aria-activedescendant="activedescendant"
          role="listbox"
          @keyup.enter.prevent="toggleOpen"
          @keydown.up="handleKeys"
          @keydown.down="handleKeys"
          @keyup.esc="close"
        >
          <div
            :id="option.uuid"
            :ref="option.uuid"
            class="rpl-select__listitem"
            :aria-selected="schema.multiselect ? option.selected : false"
            :class="{'rpl-select__listitem--selected': option.selected && !schema.multiselect, 'rpl-select__listitem--focussed': option.focussed && schema.multiselect}"
            @click="clickItem(option)"
            @keyup.space="clickItem(option)"
            tabindex="-1"
            role="option"
            v-for="(option, index) in options"
            :key="`${option.id}${index}`"
          >
            <rpl-checkbox :presentational="true" v-if="schema.multiselect" :value="option.selected" class="rpl-select__checkbox" />
            <span class="rpl-select__listitem-label">{{option.name}}</span>
            <span v-if="schema.multiselect && option.selected" class="rpl-select__label-visually-hidden" >Checked</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { abstractField } from 'vue-form-generator'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplCheckbox from '../Checkbox.vue'
import breakpoint from '@dpc-sdp/ripple-global/mixins/breakpoint'
import clickoutside from '@dpc-sdp/ripple-global/mixins/clickoutside'

export default {
  name: 'RplSelect',
  mixins: [abstractField, breakpoint, clickoutside],
  components: {
    RplIcon,
    RplCheckbox
  },
  data () {
    return {
      isOpen: false,
      focussed: null
    }
  },
  computed: {
    showItemLimit () {
      return this.schema.showItemLimit || 4
    },
    placeholder () {
      return this.schema.placeholder || 'Select'
    },
    selectOptions () {
      return this.schema.selectOptions || {}
    },
    options () {
      let options = this.schema.values
      if (typeof options === 'function') {
        return options.apply(this, [this.model, this.schema])
      } else {
        return options.map(opt => {
          opt.selected = this.isSelected(opt)
          if (this.focussed) {
            opt.focussed = opt.id === this.focussed.id
          }
          opt.uuid = this.createUniqueId(opt)
          if (!opt.selected) {
            delete opt.selected
          }
          if (!opt.focussed) {
            delete opt.focussed
          }
          return opt
        })
      }
    },
    activedescendant () {
      if (this.schema.multiselect) {
        return this.focussed && this.createUniqueId(this.focussed)
      }
    },
    selectedItems () {
      return this.options.filter(opt => opt.selected)
    },
    selectedTitles () {
      return this.selectedItems
        .slice(0, this.selectedItems.length > this.showItemLimit ? 1 : this.selectedItems.length)
        .sort((a, b) => {
          const nameA = a.name.toLowerCase()
          const nameB = b.name.toLowerCase()
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }
          return 0
        })
        .map(itm => itm.name)
        .join(', ')
    },
    fieldId () {
      return this.getFieldID(this.schema)
    }
  },
  watch: {
    value (newVal, oldVal) {
      // fixes issue with errors not clearing after selecting new val
      if (newVal === null || newVal === undefined) {
        if (this.schema.multiselect) {
          newVal = []
        } else {
          newVal = ''
        }
      }
      if (this.schema.multiselect && newVal.length > 0) {
        if (this.errors && this.errors.length > 0) {
          this.vfg.clearValidationErrors()
        }
      }
    }
  },
  methods: {
    isAriaSelected (item) {
      if (this.schema.multiselet) {
        if (item.selected) {
          return 'true'
        }
        return 'false'
      }
      return false
    },
    createUniqueId (opt) {
      if (opt) {
        // Convert any string to valid CSS selector string
        // https://stackoverflow.com/a/7627603/1212791
        const id = opt.id.replace(/[^a-z0-9]/g, (s) => {
          const c = s.charCodeAt(0)
          if (c === 32) return '-'
          if (c >= 65 && c <= 90) return '_' + s.toLowerCase()
          return '__' + ('000' + c.toString(16)).slice(-4)
        })
        return `${this.fieldId}__${id}`
      }
      return null
    },
    toggleOpen () {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.onClickOutside(this.close)
        this.$nextTick(function () {
          if (this.selectedItems.length === 0) {
            if (this.schema.multiselect) {
              this.focusItem(this.options[0])
            } else {
              this.selectItem(this.options[0])
            }
          }
          this.$refs.listbox && this.$refs.listbox.focus()
        })
      } else {
        this.removeOutsideTest()
      }
    },
    close () {
      this.isOpen = false
    },
    clickItem (item) {
      this.selectItem(item)
      if (!this.schema.multiselect) {
        this.toggleOpen()
      }
    },
    selectItem (item) {
      if (this.schema.multiselect) {
        if (this.value.includes(item.id)) {
          this.value = this.value.filter(itm => itm !== item.id)
        } else {
          this.value.push(item.id)
        }
      } else {
        this.value = item.id
      }
    },
    isSelected (item) {
      if (item && this.value) {
        if (this.schema.multiselect && this.value.find(val => val === item.id)) {
          return true
        } else if (this.value === item.id) {
          return true
        }
        return false
      }
      return false
    },
    focusItem (selected) {
      this.focussed = selected
      const item = this.$el.querySelector(`#${selected.uuid}`)
      const listbox = this.$refs.listbox

      if (listbox.scrollHeight > listbox.clientHeight) {
        let scrollBottom = listbox.clientHeight + listbox.scrollTop
        let elementBottom = item.offsetTop + item.offsetHeight
        if (elementBottom > scrollBottom) {
          listbox.scrollTop = elementBottom - listbox.clientHeight
        } else if (item.offsetTop < listbox.scrollTop) {
          listbox.scrollTop = item.offsetTop
        }
      }
      if (item) {
        this.$nextTick(function () {
          item.focus()
        })
      }
    },
    handleKeys (e) {
      let selectedIdx
      let selected = null
      if (!this.schema.multiselect) {
        selectedIdx = this.options.findIndex(opt => opt.id === this.selectedItems[0].id)
      } else {
        selectedIdx = this.options.findIndex(opt => opt.focussed === true)
      }

      switch (e.keyCode) {
        case 38: // Up key
          selected = this.options[selectedIdx - 1]
          if (selected) {
            if (!this.schema.multiselect) {
              this.selectItem(selected)
            }
            this.focusItem(selected)
          }
          break
        case 40: // Down key
          if (this.options.length > (selectedIdx + 1)) {
            selected = this.options[selectedIdx + 1]
            if (!this.schema.multiselect) {
              this.selectItem(selected)
            }
            this.focusItem(selected)
          }
          break
      }
    },
    preventKeyboardScroll (e) {
      // up down and space keys
      const keys = ['Up', 'ArrowUp', 'Down', 'ArrowDown', ' ', 'Space', 'Tab']
      if (this.isOpen && keys.includes(e.key)) {
        e.preventDefault()
      } else if (document.activeElement === this.$el.querySelector('.rpl-select__trigger') && [' ', 'Space'].includes(e.key)) {
        // prevent space from scrolling window if the trigger button has focus
        e.preventDefault()
      }
    }
  },
  created () {
    if (!this.value) {
      if (this.schema.multiselect) {
        this.value = []
      } else {
        this.value = ''
      }
    }
  },
  mounted () {
    document.body.addEventListener('keydown', this.preventKeyboardScroll)
  },
  beforeDestroy () {
    document.body.removeEventListener('keydown', this.preventKeyboardScroll)
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "../scss/form";

$rpl-select-inner-padding: $rpl-space-4;
$rpl-select-dropdown-height: 18.5rem !default; /* 7 items */
$rpl-select-focus-bg-color: rpl-color("secondary") !default;
$rpl-select-focus-color: rpl-color("white") !default;
$rpl-select-selected-bg-color: rpl-color("primary") !default;
$rpl-select-selected-color: rpl-color("white") !default;

.rpl-select {
  $root: &;

  &__native {
    position: relative;
    @include rpl-breakpoint("s") {
      @include rpl_visually_hidden;
    }
    select {
      @include rpl_form_text_element;
      width: 100%;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
  }

  &__inner {
    display: none;
    @include rpl_form_text_element;
    @include rpl-breakpoint("s") {
      padding: 0;
      display: block;
    }
  }

  &__trigger {
    padding: $rpl-form-element-padding-m;
    position: relative;

    &-icon {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 1rem;
      margin: auto;
      transition: transform .25s;

      #{$root}--open & {
        transform: rotate(-180deg);
      }
    }

  }
  &__label-count {
    color: rpl-color('primary');
  }

  &__label-visually-hidden {
    @include rpl_visually_hidden;
  }

  &__dropdown {
    top: 0;
    background-color: $rpl-form-element-bg-color;
    position: relative;
    width: 100%;
  }

  &__listbox {
    outline: 0;
    position: absolute;
    top: -1px;
    z-index: 1;
    background: $rpl-form-element-bg-color;
    left: -1px;
    width: 100%;
    border: 1px solid $rpl-form-element-border-color;
    border-radius: $rpl-form-element-border-radius;
    border-top: 1px solid $rpl-form-element-border-color;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    max-height: $rpl-select-dropdown-height;
    overflow-y: scroll;
  }

  &__listitem {
    padding: $rpl-space-3 $rpl-form-element-padding-m-horizontal;
    background: $rpl-form-element-bg-color;

    &:not(#{$root}__listitem--selected):not(#{$root}__listitem--focussed) {
      &:nth-child(odd) {
        background-color: rpl-color("white");
      }
      &:hover {
        background-color: $rpl-select-focus-bg-color;
        color: $rpl-select-focus-color;
      }
    }

    &--selected {
      outline: 0;
      background-color: $rpl-select-selected-bg-color;
      color: $rpl-select-selected-color;
    }

    &--focussed {
      outline: 0;
      color: $rpl-select-focus-color;
      background-color: $rpl-select-focus-bg-color;
    }

    &-label {
      position: relative;
      top: $rpl-space / 2;
    }
  }

  &__checkbox {
    float: left;
    margin-right: 1rem;
  }
}
</style>
