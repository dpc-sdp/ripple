<template>
  <div class="rpl-select" :class="{'rpl-select--open' : isOpen, 'rpl-select--disabled': disabled }">
    <div class="rpl-select__inner">
      <div
        class="rpl-select__trigger"
        tabindex="0"
        aria-haspopup="listbox"
        :aria-labelledby="`${config.fieldId}-rpl-select-trigger ${config.fieldId}-rpl-select-value`"
        :aria-expanded="isOpen ? 'true' : false"
        role="button"
        ref="trigger"
        :id="`${config.fieldId}-rpl-select-value`"
        @click="toggleOpen"
        @keyup.space.prevent="toggleOpen"
        @keyup.enter.prevent="toggleOpen"
        @keyup.down.prevent="toggleOpen"
      >
        <template v-if="selectedText">
          <span >{{selectedText}}</span>
          <template v-if="config.multiselect && selectedTitles.join('; ').length >= selectedCharLength">
            <span class="rpl-select__label-count" v-if="selectedItems.length > 1">+ {{selectedItems.length - 1}} more</span>
            <span class="rpl-select__label-visually-hidden"> selected</span>
          </template>
        </template>
        <span v-else :id="`${config.fieldId}-rpl-select-trigger`">{{config.placeholder || 'Select'}}</span>
        <rpl-icon class="rpl-select__trigger-icon" symbol="down" color="primary"  />
      </div>
      <div class="rpl-select__dropdown" v-show="isOpen">
        <div
          class="rpl-select__listbox"
          ref="listbox"
          tabindex="-1"
          :aria-multiselectable="config.multiselect && 'true'"
          :aria-activedescendant="activedescendant"
          aria-label="Select items"
          role="listbox"
          @keyup.enter.prevent="toggleOpen"
          @keydown.up="handleKeys"
          @keydown.down="handleKeys"
          @keydown.tab="close"
          @keyup.esc="close"
        >
          <div
            :id="option.uuid"
            :ref="option.uuid"
            class="rpl-select__listitem"
            :aria-selected="config.multiselect ? option.selected : false"
            :class="{'rpl-select__listitem--selected': option.selected && !config.multiselect, 'rpl-select__listitem--focussed': option.focussed && config.multiselect}"
            @click="clickItem(option)"
            @keyup.space="clickItem(option)"
            tabindex="-1"
            role="option"
            v-for="(option, index) in options"
            :key="`${option.id}${index}`"
          >
            <rpl-checkbox :presentational="true" v-if="config.multiselect" :value="option.selected" class="rpl-select__checkbox" />
            <span class="rpl-select__listitem-label">{{option.name}}</span>
            <span v-if="config.multiselect && option.selected" class="rpl-select__label-visually-hidden" >Checked</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RplIcon from '@dpc-sdp/ripple-icon'
import RplCheckbox from './Checkbox.vue'
import clickoutside from '@dpc-sdp/ripple-global/mixins/clickoutside'
import { truncateText } from '@dpc-sdp/ripple-global/utils/helpers'

export default {
  name: 'RplSelect',
  mixins: [clickoutside],
  components: {
    RplIcon,
    RplCheckbox
  },
  data () {
    return {
      isOpen: false,
      focussed: null,
      value: null
    }
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {
          multiselect: false,
          placeholder: 'Select',
          fieldId: 'select',
          inputName: null,
          label: ''
        }
      }
    },
    values: {
      type: Array,
      default: () => {
        return []
      }
    },
    state: {
      type: [String, Array, Object]
    },
    disabled: {
      type: Boolean
    },
    selectedCharLength: {
      type: Number,
      default: 20
    }
  },
  computed: {
    options () {
      const options = JSON.parse(JSON.stringify(this.values))
      return options.map(opt => {
        if (this.focussed) {
          opt.focussed = opt.id === this.focussed.id
        }
        opt.uuid = this.createUniqueId(opt)

        if (this.isSelected(opt)) {
          opt.selected = true
        }

        return opt
      })
    },
    activedescendant () {
      if (this.config.multiselect) {
        return this.focussed && this.createUniqueId(this.focussed)
      }
    },
    selectedItems () {
      return this.options.filter(opt => opt.selected)
    },
    selectedTitles () {
      return this.selectedItems.map(itm => itm.name)
    },
    selectedText () {
      if (this.selectedTitles && this.selectedTitles.join('; ').length < this.selectedCharLength) {
        return this.selectedTitles.map(itm => truncateText(itm, this.selectedCharLength - 1), ' ...').join('; ')
      } else {
        return truncateText(this.selectedTitles[0], this.selectedCharLength - 1, ' ...')
      }
    }
  },
  methods: {
    truncateText,
    isAriaSelected (item) {
      if (this.multiselet) {
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
        const id = opt.id && `${opt.id}`.replace(/[^a-z0-9]/g, (s) => {
          const c = s.charCodeAt(0)
          if (c === 32) return '-'
          if (c >= 65 && c <= 90) return '_' + s.toLowerCase()
          return '__' + ('000' + c.toString(16)).slice(-4)
        })
        return `${this.config.fieldId}__${id}`
      }
      return null
    },
    toggleOpen () {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.onClickOutside(this.close)
        this.$nextTick(function () {
          if (this.selectedItems.length === 0) {
            this.focusItem(this.options[0])
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
      if (!this.config.multiselect) {
        this.toggleOpen()
      }
    },
    selectItem (item) {
      if (this.config.multiselect) {
        if (this.value.includes(item.id)) {
          this.value = this.value.filter(itm => itm !== item.id)
        } else {
          this.value.push(item.id)
        }
        this.$emit('rpl-select-update', this.value)
      } else {
        this.value = item.id
        this.$emit('rpl-select-update', this.value, item)
      }
    },
    isSelected (item) {
      if (typeof item !== 'undefined' && typeof this.value !== 'undefined') {
        if (this.config.multiselect && Array.isArray(this.value) && this.value.find(val => val === item.id)) {
          return true
        } else if (this.value === item.id) {
          return true
        }
        return false
      }
      return false
    },
    focusItem (selected) {
      if (selected) {
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
      }
    },
    handleKeys (e) {
      let selectedIdx
      let selected = null
      if (!this.config.multiselect) {
        selectedIdx = this.options.findIndex(opt => {
          if (this.selectedItems && Array.isArray(this.selectedItems) && this.selectedItems.length > 0) {
            return opt.id === this.selectedItems[0].id
          } else {
            return 0
          }
        })
      } else {
        selectedIdx = this.options.findIndex(opt => opt.focussed === true)
      }
      switch (e.keyCode) {
        case 38: // Up key
          selected = this.options[selectedIdx - 1]
          if (selected) {
            if (!this.config.multiselect) {
              this.selectItem(selected)
            }
            this.focusItem(selected)
          }
          break
        case 40: // Down key
          if (this.options.length > (selectedIdx + 1)) {
            selected = this.options[selectedIdx + 1]
            if (!this.config.multiselect) {
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
    },
    onChange (e) {
      this.$emit('rpl-select-update', this.value)
    }
  },
  created () {
    if (this.state) {
      this.value = this.state
    } else {
      if (this.config.multiselect) {
        this.value = []
      } else {
        this.value = ''
      }
    }
  },
  watch: {
    state (newVal, oldVal) {
      this.value = newVal
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
@import "./scss/form";
$rpl-select-item-height: rem(42px) !default;
$rpl-select-dropdown-height: $rpl-select-item-height * 7 !default; /* 7 items */
$rpl-select-focus-bg-color: rpl-color("secondary") !default;
$rpl-select-focus-color: rpl-color("white") !default;
$rpl-select-selected-bg-color: rpl-color("primary") !default;
$rpl-select-selected-color: rpl-color("white") !default;
$rpl-select-icon-h: rem(7.5px) !important !default;
$rpl-select-icon-w: rem(12px) !important !default;
$rpl-select-active-border: 1px solid rpl-color('primary') !default;
$rpl-select-disabled-bg-color: #fafafc !default;
$rpl-select-disabled-color: rpl-color('mid_neutral_1') !default;
$rpl-select-checkbox-margin: 0;

.rpl-select {
  $root: &;

  &__trigger {
    position: relative;
    cursor: default;
    @include rpl_form_text_element;
    @include rpl_form_text;
    &-icon {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 1rem;
      margin: auto;
      transition: transform .25s;
      height: $rpl-select-icon-h;
      width: $rpl-select-icon-w;
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
    width: calc(100% - 2px);
    margin: auto;
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
    overflow-y: auto;
    /* Always display scrollbar */
    &::-webkit-scrollbar {
      appearance: none;
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rpl-color('mid_neutral_1');
      box-shadow: 0 0 1px rgba(255,255,255,.5);
    }
  }

  &__listitem {
    display: flex;
    align-items: center;
    padding-left: $rpl-form-element-padding-s-horizontal;
    padding-right: $rpl-form-element-padding-s-horizontal;
    @include rpl_breakpoint(m) {
      padding-left: $rpl-form-element-padding-m-horizontal;
      padding-right: $rpl-form-element-padding-m-horizontal;
    }
    height: $rpl-select-item-height;
    background: $rpl-form-element-bg-color;
    @include rpl_form_text;
    cursor: default;
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
      padding-top: 2px;
    }
  }

  &__checkbox {
    float: left;
    margin-right: $rpl-select-checkbox-margin;
  }
  &--disabled {
    #{$root}__trigger {
      cursor: not-allowed;
      pointer-events: none;
      background-color: $rpl-select-disabled-bg-color;
      color: $rpl-select-disabled-color;
      &-icon {
        fill: $rpl-select-disabled-color;
      }
    }
  }
  &--open {
    #{$root}__trigger {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border: $rpl-select-active-border;
    }
    #{$root}__listbox {
      border: $rpl-select-active-border;
      border-top: none;
    }
  }
}
</style>
