<template>
  <div class="rpl-select" :class="{'rpl-select--open' : isOpen}">
    <div v-if="!$breakpoint.s" class="rpl-select__native">
      <select :multiple="schema.multiselect" v-model="value">
        <option v-if="!schema.multiselect" disabled value="">{{placeholder}}</option>
        <option :value="option.id" v-for="(option) in options" :key="option.id">{{option.name}}</option>
      </select>
      <rpl-icon class="rpl-select__trigger-icon" symbol="down" color="primary" />
    </div>
    <div class="rpl-select__inner">
      <div
        class="rpl-select__trigger"
        tabindex="0"
        aria-haspopup="listbox"
        :aria-labelledby="`${schema.model}-rpl-select-trigger ${schema.model}-rpl-select-value`"
        :aria-expanded="isOpen ? 'true' : false"
        role="button"
        ref="trigger"
        @click="toggleOpen"
        v-on:keyup.enter.prevent="toggleOpen"
      >
        <template v-if="value && value.length > 0">
          <span :id="`${schema.model}-rpl-select-value`">{{selectedTitles}}</span>
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
          @keydown.up.self="handleKeys"
          @keydown.down.self="handleKeys"
          @keyup.space="clickItem(options.find(i => i.focussed))"
          @keyup.esc.self="close"
          @keyup.tab.self="close"
        >
          <div
            :id="option.uuid"
            class="rpl-select__listitem"
            :aria-selected="option.selected"
            :class="{'rpl-select__listitem--selected': option.selected && !schema.multiselect, 'rpl-select__listitem--focussed': option.focussed && schema.multiselect}"
            @click="clickItem(option)"
            tabindex="-1"
            role="option"
            v-for="(option, index) in options"
            :key="`${option.id}${index}`"
          >
            <rpl-checkbox :presentational="true" v-if="schema.multiselect" :value="option.selected" class="rpl-select__checkbox" />
            {{option.name}}
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
          opt.focussed = opt.id === this.focussed
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
      return this.selectedItems ? this.createUniqueId(this.selectedItems[0]) : false
    },
    selectedItems () {
      return this.options.filter(opt => opt.selected)
    },
    selectedTitles () {
      return this.selectedItems.map(itm => itm.name).join(', ')
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
    createUniqueId (opt) {
      if (opt) {
        return `${this.fieldId}__${opt.id}`
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
          this.$refs.listbox.focus()
        })
      } else {
        this.removeOutsideTest()
        this.$refs.trigger.focus()
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
      this.focussed = selected.id
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
    },
    handleKeys (e) {
      let selectedIdx
      let selected = null
      if (!this.schema.multiselect) {
        selectedIdx = this.options.findIndex(opt => opt.id === this.selectedItems[0].id)
      } else {
        selectedIdx = this.options.findIndex(opt => opt.focussed === true)
      }
      switch (e.key) {
        case 'Up':
        case 'ArrowUp':
          selected = this.options[selectedIdx - 1]
          if (selected) {
            if (!this.schema.multiselect) {
              this.selectItem(selected)
            }
            this.focusItem(selected)
          }
          break
        case 'Down': // IE/Edge specific value
        case 'ArrowDown':
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
      const keys = ['Up', 'ArrowUp', 'Down', 'ArrowDown', ' ', 'Space']
      if (this.isOpen && keys.includes(e.key)) {
        e.preventDefault()
      }
    }
  },
  mounted () {
    document.body.addEventListener('keydown', this.preventKeyboardScroll)
    if (this.schema.multiselect && !this.value) {
      this.value = []
    }
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
$rpl-select-dropdown-height: 10rem !default;

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
    height: $rpl-select-dropdown-height;
    overflow-y: scroll;
  }

  &__listitem {
    padding: $rpl-space-3 $rpl-form-element-padding-m-horizontal;
    background: $rpl-form-element-bg-color;

    &:nth-child(odd) {
      background-color: rpl-color("white");
    }

    &:hover {
      background-color: rpl-color("secondary");
      color: white;
    }

    &--selected[aria-selected="true"] {
      background-color: rpl-color("primary");
      color: white;
    }

    &--focussed {
      color: white !important;
      background-color: rpl-color("secondary") !important;
    }
  }

  &__checkbox {
    float: left;
    margin-right: 1rem;
  }
}
</style>
