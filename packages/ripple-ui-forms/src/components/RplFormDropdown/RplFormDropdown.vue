<script setup lang="ts">
import { RplIcon } from '@dpc-sdp/ripple-ui-core'
import { computed, ref, watch, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'

export interface RplFormDropdownProps {
  id: string
  labelId: string
  value: string | string[]
  disabled?: boolean
  variant?: 'default' | 'reverse'
  multiple: boolean
  placeholder?: string
  onChange: (value: string | string[]) => void
  options: {
    id: string
    label: string
    value: string
    disabled?: boolean
  }[]
}

const props = withDefaults(defineProps<RplFormDropdownProps>(), {
  disabled: false,
  variant: 'default',
  placeholder: '',
  onChange: () => undefined,
  options: () => []
})

const emit = defineEmits<{ (e: 'onChange', value: string[]): void }>()

const containerRef = ref(null)
const inputRef = ref(null)
const menuRef = ref(null)
const optionRefs = ref([])

const inputId = computed(() => `${props.id}__input`)
const menuId = computed(() => `${props.id}__menu`)

const isOpen = ref<boolean>(false)
const activeOptionId = ref<string | null>(null)

onClickOutside(containerRef, () => {
  handleClose(false)
})

const getDefaultActiveId = (): string => {
  const firstOptionId = props.options[0].id

  if (props.multiple) {
    // Always start from the first option if we're in multi select mode
    return firstOptionId
  } else {
    // In single select mode, try to start from the currently selected item
    const selectedOption = props.options.find(
      (opt) => opt.value === props.value
    )

    // Get the id of currently selected option, if we're in a single selection mode.
    return selectedOption ? selectedOption.id : firstOptionId
  }
}

const handleToggle = (fromKeyboard = false): void => {
  if (isOpen.value) {
    handleClose(fromKeyboard)
  } else {
    handleOpen(fromKeyboard)
  }
}

const handleOpen = (fromKeyboard = false): void => {
  isOpen.value = true

  if (fromKeyboard && props.options?.length) {
    activeOptionId.value = getDefaultActiveId()
  }
}

const handleClose = (focusBackOnInput = false): void => {
  isOpen.value = false
  activeOptionId.value = null

  if (focusBackOnInput) {
    inputRef.value.focus()
  }
}

const handleArrowUp = () => {
  if (!isOpen.value) {
    isOpen.value = true
  }

  const currentActiveIndex = props.options.findIndex(
    (opt) => opt.id === activeOptionId.value
  )

  if (currentActiveIndex < 0) {
    activeOptionId.value = getDefaultActiveId()
  } else if (currentActiveIndex < props.options.length - 1) {
    activeOptionId.value = props.options[currentActiveIndex + 1].id
  }
}

const handleArrowDown = () => {
  if (!isOpen.value) {
    isOpen.value = true
  }

  const currentActiveIndex = props.options.findIndex(
    (opt) => opt.id === activeOptionId.value
  )

  if (currentActiveIndex < 0) {
    activeOptionId.value = getDefaultActiveId()
  } else if (currentActiveIndex > 0) {
    activeOptionId.value = props.options[currentActiveIndex - 1].id
  }
}

const handleSelectOption = (optionValue) => {
  if (props.multiple) {
    let newValue

    if (!Array.isArray(props.value)) {
      // Value is empty, just create a new array
      newValue = [optionValue]
    } else if (props.value.includes(optionValue)) {
      // Value is already selected, so remove it from the list
      newValue = props.value.filter((existingOption) => {
        return existingOption !== optionValue
      })
    } else {
      // Value is not selected, so add it to the list
      newValue = [...props.value, optionValue]
    }
    useFormkitFriendlyEventEmitter(props, emit, 'onChange', newValue)
  } else {
    handleClose(true)
    useFormkitFriendlyEventEmitter(props, emit, 'onChange', optionValue)
  }
}

const isOptionSelected = (optionValue) => {
  if (props.multiple) {
    return (props.value || []).includes(optionValue)
  } else {
    return props.value === optionValue
  }
}

watch(activeOptionId, async (newId, oldId) => {
  if (newId !== null) {
    // Must wait for next tick so that the right event handlers get called
    await nextTick()

    const optionEl = optionRefs.value.find((r) => {
      return r.id === newId
    })

    if (optionEl) {
      optionEl.focus()
    }
  }
})

const isMenuItemKeyboardFocused = (optionId: string): boolean => {
  return activeOptionId.value === optionId
}

const selectedOptions = computed(() => {
  return (props.options || []).filter((opt) => props.value.includes(opt.value))
})

const singleValueDisplay = computed((): string => {
  return selectedOptions.value?.length ? selectedOptions.value[0].label : ''
})

const hasValue = computed((): boolean => {
  if (props.multiple) {
    return !props.value || !props.value.length
  } else {
    return !props.value
  }
})
</script>

<template>
  <div
    ref="containerRef"
    class="rpl-form-dropdown"
    @keydown.down="handleArrowUp"
    @keydown.up="handleArrowDown"
    @keydown.esc="handleClose(true)"
    @keydown.exact.tab="handleClose(false)"
    @keydown.shift.tab="handleClose(false)"
  >
    <div
      :id="inputId"
      ref="inputRef"
      :class="{
        'rpl-form-dropdown-input': true,
        'rpl-u-focusable-outline': true,
        'rpl-u-focusable--force-on': isOpen
      }"
      :aria-controls="menuId"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-labelledby="labelId"
      role="combobox"
      tabindex="0"
      @click="handleToggle(false)"
      @keydown.space="handleToggle(true)"
    >
      <span
        v-if="hasValue"
        class="rpl-form-dropdown-input__placeholder rpl-type-p"
        >{{ placeholder }}</span
      >
      <span v-else-if="multiple" class="rpl-type-p">asdasd</span>
      <span v-else class="rpl-type-p"> {{ singleValueDisplay }} </span>
      <RplIcon name="icon-chevron-down" size="s" />
    </div>
    <div
      v-if="isOpen"
      :id="menuId"
      ref="menuRef"
      class="rpl-form-dropdown-menu"
      role="listbox"
      :aria-labelledby="labelId"
      tabindex="-1"
    >
      <div
        v-for="option in options"
        :id="option.id"
        :key="option.id"
        ref="optionRefs"
        role="option"
        :class="{
          'rpl-form-dropdown-option': true,
          'rpl-type-p': true,
          'rpl-u-focusable-block': true,
          'rpl-u-focusable--force-on': isMenuItemKeyboardFocused(option.id)
        }"
        :aria-selected="isOptionSelected(option.value)"
        tabindex="-1"
        @keydown.space="handleSelectOption(option.value)"
        @click="handleSelectOption(option.value)"
      >
        <RplIcon
          v-if="isOptionSelected(option.value)"
          name="icon-check"
        ></RplIcon>
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style src="./RplFormDropdown.css"></style>
