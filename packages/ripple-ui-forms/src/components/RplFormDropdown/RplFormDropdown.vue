<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, ref, watch, nextTick, inject } from 'vue'
import { onClickOutside } from '@vueuse/core'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'
import MultiValueLabel from './MultiValueLabel.vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { sanitisePIIField } from '../../lib/sanitisePII'

export interface RplFormDropdownProps {
  id: string
  label?: string
  labelId: string
  value?: string | string[]
  disabled?: boolean
  variant?: 'default' | 'reverse'
  multiple?: boolean
  placeholder?: string
  required?: boolean
  invalid?: boolean
  onChange?: (value: string | string[]) => void
  options: {
    id: string
    label: string
    value: string
  }[]
  maxItemsDisplayed?: number
  pii?: boolean
  unselectedValue: any
}

const props = withDefaults(defineProps<RplFormDropdownProps>(), {
  value: undefined,
  label: undefined,
  disabled: false,
  variant: 'default',
  placeholder: 'Select',
  onChange: () => undefined,
  options: () => [],
  maxItemsDisplayed: 6,
  required: false,
  invalid: false,
  multiple: false,
  pii: true,
  unselectedValue: undefined
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
  (
    e: 'toggleOpen',
    payload: rplEventPayload & { action: 'open' | 'close' }
  ): void
}>()

const form: object = inject('form', undefined)
const { emitRplEvent } = useRippleEvent('rpl-form-dropdown', emit)

const defaultOptionId = '__default-option'

const containerRef = ref(null)
const inputRef = ref(null)
const menuRef = ref(null)
const optionRefs = ref([])

const menuId = computed(() => `${props.id}__menu`)

const isOpen = ref<boolean>(false)
const activeOptionId = ref<string | null>(null)

const emptyOption = computed(() => {
  return props.options.find((opt) => !opt.value && opt.id !== defaultOptionId)
})

const processedOptions = computed(() => {
  if (!emptyOption.value && !props.multiple) {
    return [
      {
        id: defaultOptionId,
        label: props.placeholder,
        value: props.unselectedValue
      },
      ...(props.options || [])
    ]
  }

  return props.options || []
})

onClickOutside(containerRef, () => {
  handleClose(false)
})

const getDefaultActiveId = (): string => {
  const firstOptionId = processedOptions.value[0].id

  if (props.multiple) {
    // Always start from the first option if we're in multi select mode
    return firstOptionId
  } else {
    // In single select mode, try to start from the currently selected item
    const selectedOption = processedOptions.value.find(
      (opt) => opt.value === props.value
    )

    // Get the id of currently selected option, if we're in a single selection mode.
    return selectedOption ? selectedOption.id : firstOptionId
  }
}

const getUniqueOptionId = (optionId: string): string => {
  return optionId ? `${props.id}-${optionId}` : ''
}

const handleToggle = (fromKeyboard = false): void => {
  if (isOpen.value) {
    handleClose(fromKeyboard)
  } else {
    handleOpen(fromKeyboard)
  }

  emitRplEvent(
    'toggleOpen',
    {
      action: isOpen.value ? 'open' : 'close',
      id: props.id,
      label: props?.label,
      contextId: form?.id,
      contextName: form?.name,
      value: Array.isArray(props.value) ? props.value.join(',') : props.value
    },
    { global: true }
  )
}

const handleOpen = (fromKeyboard = false): void => {
  isOpen.value = true

  if (fromKeyboard && processedOptions.value?.length) {
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

  const currentActiveIndex = processedOptions.value.findIndex(
    (opt) => opt.id === activeOptionId.value
  )

  if (currentActiveIndex < 0) {
    activeOptionId.value = getDefaultActiveId()
  } else if (currentActiveIndex < processedOptions.value.length - 1) {
    activeOptionId.value = processedOptions.value[currentActiveIndex + 1].id
  }
}

const handleArrowDown = () => {
  if (!isOpen.value) {
    isOpen.value = true
  }

  const currentActiveIndex = processedOptions.value.findIndex(
    (opt) => opt.id === activeOptionId.value
  )

  if (currentActiveIndex < 0) {
    activeOptionId.value = getDefaultActiveId()
  } else if (currentActiveIndex > 0) {
    activeOptionId.value = processedOptions.value[currentActiveIndex - 1].id
  }
}

const handleSelectOption = (optionValue) => {
  let newValue = optionValue

  if (props.multiple) {
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
    useFormkitFriendlyEventEmitter(props, emit, 'onChange', newValue)
  }

  emitRplEvent(
    'update',
    {
      action: 'update',
      id: props.id,
      label: props?.label,
      value: sanitisePIIField(props.pii, newValue),
      contextId: form?.id,
      contextName: form?.name
    },
    { global: true }
  )
}

const isOptionSelected = (optionValue) => {
  if (props.multiple) {
    return (props.value || []).includes(optionValue)
  } else {
    if (!optionValue && !props.value) {
      return true
    }

    return props.value === optionValue
  }
}

const focusOption = (optionId) => {
  const optionEl = optionRefs.value.find((r) => {
    return r.dataset.optionId === optionId
  })
  const menu = menuRef.value

  // This makes the scrolling much nicer when using the arrow keys
  if (menu.scrollHeight > menu.clientHeight) {
    let scrollBottom = menu.clientHeight + menu.scrollTop
    let elementBottom = optionEl.offsetTop + optionEl.offsetHeight
    if (elementBottom > scrollBottom) {
      menu.scrollTop = elementBottom - menu.clientHeight
    } else if (optionEl.offsetTop < menu.scrollTop) {
      menu.scrollTop = optionEl.offsetTop
    }
  }

  if (optionEl) {
    optionEl.focus()
  }
}

watch(activeOptionId, async (newId) => {
  if (newId !== null) {
    // Must wait for next tick so that the right event handlers get called
    await nextTick()
    focusOption(newId)
  }
})

const isMenuItemKeyboardFocused = (optionId: string): boolean => {
  return activeOptionId.value === optionId
}

const selectedOptions = computed(() => {
  return (processedOptions.value || []).filter((opt) =>
    (props.value || []).includes(opt.value)
  )
})

const singleValueDisplay = computed((): string => {
  if (emptyOption.value && !props.value) {
    return emptyOption.value.label
  }

  const selectedOption = (processedOptions.value || []).find(
    (opt) => props.value === opt.value
  )

  return selectedOption ? selectedOption.label : ''
})

const hasValue = computed((): boolean => {
  if (props.multiple) {
    return !!props.value && !!props.value.length
  } else {
    return !!props.value
  }
})
</script>

<template>
  <div
    ref="containerRef"
    :style="{
      '--local-max-items': maxItemsDisplayed
    }"
    :class="{
      'rpl-form-dropdown': true,
      [`rpl-form-dropdown--${props.variant}`]: true,
      'rpl-form-dropdown--invalid': invalid
    }"
    @keydown.down.prevent="handleArrowUp"
    @keydown.up.prevent="handleArrowDown"
    @keydown.esc.prevent="handleClose(true)"
    @keydown.exact.tab="handleClose(false)"
    @keydown.shift.tab="handleClose(false)"
  >
    <div
      v-bind="$attrs"
      :id="id"
      ref="inputRef"
      :class="{
        'rpl-form-dropdown-input': true,
        'rpl-u-focusable-outline': true,
        'rpl-u-focusable--force-on': isOpen
      }"
      :aria-controls="menuId"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :aria-disabled="disabled"
      :aria-required="required"
      :aria-invalid="invalid"
      :aria-labelledby="labelId"
      :aria-activedescendant="getUniqueOptionId(activeOptionId)"
      :disabled="disabled"
      role="combobox"
      :tabindex="disabled ? -1 : 0"
      @click="handleToggle(false)"
      @keydown.space.prevent="handleToggle(true)"
    >
      <span
        v-if="!hasValue && !emptyOption"
        class="rpl-form-dropdown-input__placeholder rpl-type-p"
        >{{ placeholder }}</span
      >
      <MultiValueLabel
        v-else-if="multiple"
        :selectedOptions="selectedOptions"
      />
      <span v-else class="rpl-form-dropdown-input__single-value rpl-type-p">
        {{ singleValueDisplay }}
      </span>
      <RplIcon
        name="icon-chevron-down"
        size="s"
        class="rpl-form-dropdown__chevron"
      />
    </div>
    <div
      v-if="isOpen"
      :id="menuId"
      ref="menuRef"
      class="rpl-form-dropdown-menu"
      role="listbox"
      :aria-multiselectable="!!multiple"
      :aria-required="required"
      :aria-invalid="invalid"
      :aria-labelledby="labelId"
      tabindex="-1"
    >
      <div
        v-for="option in processedOptions"
        :id="getUniqueOptionId(option.id)"
        :key="option.id"
        ref="optionRefs"
        :data-option-id="option.id"
        role="option"
        :class="{
          'rpl-form-dropdown-option': true,
          'rpl-type-p': true,
          'rpl-u-focusable-block': true,
          'rpl-u-focusable--force-on': isMenuItemKeyboardFocused(option.id)
        }"
        :aria-selected="isOptionSelected(option.value)"
        tabindex="-1"
        @keydown.space.prevent="handleSelectOption(option.value)"
        @keydown.enter.prevent="handleSelectOption(option.value)"
        @click="handleSelectOption(option.value)"
      >
        <span
          :class="{
            'rpl-form-dropdown-option__check': multiple,
            'rpl-form-dropdown-option__tick': !multiple
          }"
        >
          <RplIcon
            v-if="isOptionSelected(option.value)"
            name="icon-check"
          ></RplIcon>
        </span>
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style src="./RplFormDropdown.css"></style>
