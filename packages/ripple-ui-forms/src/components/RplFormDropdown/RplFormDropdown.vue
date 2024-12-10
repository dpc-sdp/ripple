<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, ref, watch, nextTick, inject, type Ref } from 'vue'
import { onClickOutside, useDebounceFn } from '@vueuse/core'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'
import MultiValueLabel from './MultiValueLabel.vue'
import MultiValueTagList from './MultiValueTagList.vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { sanitisePIIField } from '../../lib/sanitisePII'

export interface RplFormDropdownOption {
  id: string
  label: string
  value: string
}

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
  options: RplFormDropdownOption[]
  maxItemsDisplayed?: number
  pii?: boolean
  unselectedValue?: any
  /**
   * Only applicable when for non-searchable single selects. If true, no 'placeholder' option
   * is added and the user can't deselect a value, only choose a different value.
   *
   * Useful for when the field has a default value and the user must choose a value.
   */
  preventDeselect?: boolean
  searchable?: boolean
  noResultsLabel?: string
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
  unselectedValue: undefined,
  preventDeselect: false,
  searchable: false,
  noResultsLabel: 'No results found'
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
const searchCache = ref('')
const searchRef = ref<Ref<HTMLInputElement | null>>(null)
const searchValue = ref('')
const searchFocused = ref(false)
const filtering = ref(false)
const toggleRef = ref<Ref<HTMLElement>>(null)
const tagListRef = ref(null)
const focusTag = ref(0)

const menuId = computed(() => `${props.id}__menu`)

const isOpen = ref<boolean>(false)
const activeOptionId = ref<string | null>(null)

const singleSearch = computed(() => !props.multiple && props.searchable)
const multiSearch = computed(() => props.multiple && props.searchable)

const emptyOption = computed(() => {
  return props.options.find((opt) => !opt.value && opt.id !== defaultOptionId)
})

const processedOptions = computed(() => {
  let options = props.options || []

  if (
    !props.preventDeselect &&
    !emptyOption.value &&
    !props.multiple &&
    !props.searchable
  ) {
    options = [
      {
        id: defaultOptionId,
        label: props.placeholder,
        value: props.unselectedValue
      },
      ...(props.options || [])
    ]
  }

  // Only return options matching search value when searching
  if (searchValue.value && filtering.value) {
    const searchQuery = searchValue.value.toLowerCase()

    options = options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery)
    )
  }

  return options
})

onClickOutside(containerRef, () => {
  handleClose(false)
})

const getOptionLabel = (optionValue: string): string | undefined => {
  const option = (props.options || []).find((opt) => opt.value === optionValue)

  return option?.label
}

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

const processSearch = useDebounceFn(() => {
  let options = [...(props.options || [])]
  if (activeOptionId.value) {
    const index = options.map((o) => o.id).indexOf(activeOptionId.value)
    options = options.slice(index + 1).concat(options.slice(0, index + 1))
  }
  let found = options.find((o) =>
    o.label.toLowerCase().startsWith(searchCache.value)
  )
  if (found) {
    handleOpen()
    activeOptionId.value = found.id
  }
  searchCache.value = ''
})

// Handles when a user just starts typing when the dropdown is focused;
// this will either enter the search input or jump to the matching option (native style)
const handleTyping = (event: KeyboardEvent): void => {
  if (event.key?.length === 1 && !searchFocused.value) {
    if (props.searchable && !isOpen.value) {
      // Open the menu so we can type into the search input straight away
      handleOpen()
    } else {
      // Native select style search; it'll jump to the matching option
      searchCache.value = searchCache.value + event.key.toLowerCase()
      processSearch()
    }
  }
}

const focusSearch = (): void => {
  activeOptionId.value = null

  nextTick(() => {
    searchRef.value?.focus()
    searchFocused.value = true
  })
}

// If there's a single search match let's select it
const handleSearchSubmit = () => {
  if (
    processedOptions.value.length === 1 &&
    isMatchingSearchResult(processedOptions.value[0].label)
  ) {
    handleSelectOption(processedOptions.value[0])

    if (multiSearch.value) {
      searchValue.value = ''
    }
  }
}

// Jump to the tag list when navigating left of an empty search input
const handleSearchLeft = () => {
  if (
    !searchValue.value &&
    multiSearch.value &&
    selectedOptions.value?.length
  ) {
    focusTag.value = focusTag.value + 1
  }
}

const handleSearchUpdate = (event: Event) => {
  filtering.value = true

  // If the single search value is cleared the selected option should be cleared
  if (singleSearch.value && props.value && event.target?.value === '') {
    useFormkitFriendlyEventEmitter(props, emit, 'onChange', null)
  }
}

const handleSearchBlur = () => {
  searchFocused.value = false
}

watch(
  () => props.value,
  (newOptions, oldOptions) => {
    // Make sure search input is in view for multi-select search
    if (
      isOpen.value &&
      multiSearch.value &&
      newOptions?.length > oldOptions?.length
    ) {
      nextTick(() =>
        searchRef.value?.scrollIntoView({
          block: 'nearest',
          inline: 'start'
        })
      )
    }
  }
)

const handleToggle = (
  fromKeyboard = false,
  event?: KeyboardEvent | MouseEvent
): void => {
  // Prevent the default action when we're not searching
  if (fromKeyboard && !searchFocused.value) {
    event.preventDefault()
  }

  // Only toggle (close) searchable dropdowns with the toggle
  if (isOpen.value && props.searchable && event?.target !== toggleRef.value) {
    return
  }

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
      value: sanitisePIIField(props.pii, props.value, processedOptions.value)
    },
    { global: true }
  )
}

const handleOpen = (fromKeyboard = false): void => {
  isOpen.value = true

  if (singleSearch.value && props.value && !searchValue.value) {
    searchValue.value = getOptionLabel(props.value as string)
  }

  if (fromKeyboard && processedOptions.value?.length && !props.searchable) {
    activeOptionId.value = getDefaultActiveId()
  } else if (props.searchable) {
    focusSearch()
  }
}

const handleClose = (focusBackOnInput = false, fromSelection = false): void => {
  isOpen.value = false
  activeOptionId.value = null

  if (focusBackOnInput) {
    inputRef.value.focus()
  }

  // For a single search we restore the search value if it wasn't fully deleted
  if (
    !fromSelection &&
    singleSearch.value &&
    searchValue.value &&
    searchValue.value !== props.value
  ) {
    searchValue.value = getOptionLabel(props.value as string)
  }

  // For a multi search we always remove the search value
  if (multiSearch.value && searchValue.value) {
    searchValue.value = ''
  }

  filtering.value = false
  searchFocused.value = false
}

const handleArrowDown = () => {
  const open = isOpen.value

  if (!open) {
    isOpen.value = true
  }

  if (!processedOptions.value.length) return

  const currentActiveIndex = processedOptions.value.findIndex(
    (opt) => opt.id === activeOptionId.value
  )

  if (!open && props.searchable) {
    focusSearch()
  } else if (searchFocused.value && filtering.value) {
    activeOptionId.value = processedOptions.value[0].id
  } else if (currentActiveIndex < 0) {
    activeOptionId.value = getDefaultActiveId()
  } else if (currentActiveIndex < processedOptions.value.length - 1) {
    activeOptionId.value = processedOptions.value[currentActiveIndex + 1].id
  }
}

const handleArrowUp = () => {
  const open = isOpen.value

  if (!open) {
    isOpen.value = true
  }

  if (!processedOptions.value.length) return

  const currentActiveIndex = processedOptions.value.findIndex(
    (opt) => opt.id === activeOptionId.value
  )

  if (
    (!open && props.searchable) ||
    (props.searchable && currentActiveIndex < 1)
  ) {
    focusSearch()
  } else if (currentActiveIndex < 0) {
    activeOptionId.value = getDefaultActiveId()
  } else if (currentActiveIndex > 0) {
    activeOptionId.value = processedOptions.value[currentActiveIndex - 1].id
  }
}

const handleDeleteKey = () => {
  // For searchable dropdowns open the input so the search text can be deleted
  if (props.searchable && !isOpen.value) {
    handleToggle()
  }

  // For multi search dropdowns without search text we can autofocus the last tag for deletion
  if (multiSearch.value && !searchValue.value) {
    nextTick(handleSearchLeft)
  }
}

const handleSelectOption = (option: RplFormDropdownOption) => {
  let optionValue = option.value
  let newValue: string | string[] = option.value

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
    if (props.searchable) {
      searchValue.value = option.label
    }

    handleClose(true, true)
    useFormkitFriendlyEventEmitter(props, emit, 'onChange', newValue)
  }

  emitRplEvent(
    'update',
    {
      action: 'update',
      id: props.id,
      label: props?.label,
      value: sanitisePIIField(props.pii, newValue, processedOptions.value),
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

const isMatchingSearchResult = (option: string): boolean => {
  if (!props.searchable || processedOptions.value?.length > 1) {
    return false
  }

  return option.toLowerCase().includes(searchValue.value.toLowerCase())
}

const isMenuItemKeyboardFocused = (optionId: string): boolean => {
  return activeOptionId.value === optionId
}

const selectedOptions = computed(() => {
  return (props.options || []).filter((opt) =>
    (props.value || []).includes(opt.value)
  )
})

const singleValueDisplay = computed((): string => {
  if (emptyOption.value && !props.value) {
    return emptyOption.value.label
  }

  const selectedOption = (props.options || []).find(
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
      'rpl-form-dropdown--invalid': invalid,
      'rpl-form-dropdown--multi-search': multiSearch
    }"
    @keydown.down.prevent="handleArrowDown"
    @keydown.up.prevent="handleArrowUp"
    @keydown.esc.prevent="handleClose(true)"
    @keydown.exact.tab="handleClose(false)"
    @keydown.shift.tab="handleClose(false)"
    @keydown.delete="handleDeleteKey"
    @keydown.exact="handleTyping"
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
      @click="(e) => handleToggle(false, e)"
      @keydown.space.exact="(e) => handleToggle(true, e)"
    >
      <template v-if="searchable">
        <MultiValueTagList
          v-if="multiple && hasValue"
          ref="tagListRef"
          :is-open="isOpen"
          :selectedOptions="selectedOptions"
          :toggleOption="handleSelectOption"
          :focusTag="focusTag"
          :focusSearch="focusSearch"
        />
        <span
          v-if="!isOpen && !hasValue && !emptyOption"
          class="rpl-form-dropdown-input__placeholder rpl-type-p"
          >{{ placeholder }}</span
        >
        <span
          v-else-if="!isOpen && !multiple"
          class="rpl-form-dropdown-input__single-value rpl-type-p"
        >
          {{ singleValueDisplay }}
        </span>
        <template v-if="isOpen">
          <input
            ref="searchRef"
            v-model="searchValue"
            :name="`${id}-search`"
            :aria-label="`Search options ${label && 'for ' + label}`"
            class="rpl-form-dropdown-search__input rpl-type-p"
            autocomplete="off"
            @keydown.enter.prevent="handleSearchSubmit"
            @keydown.left.stop="handleSearchLeft"
            @blur="handleSearchBlur"
            @input="handleSearchUpdate"
          />
        </template>
      </template>
      <template v-else>
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
      </template>
      <span ref="toggleRef" class="rpl-form-dropdown-input__toggle">
        <RplIcon
          name="icon-chevron-down"
          size="s"
          class="rpl-form-dropdown__chevron"
        />
      </span>
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
        v-if="searchable && searchValue && !processedOptions.length"
        class="rpl-form-dropdown-search__no-results rpl-type-p"
        aria-live="polite"
      >
        {{ noResultsLabel }}
      </div>
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
          'rpl-form-dropdown-option--highlight': isMatchingSearchResult(
            option.label
          ),
          'rpl-u-focusable--force-on': isMenuItemKeyboardFocused(option.id)
        }"
        :aria-selected="isOptionSelected(option.value)"
        tabindex="-1"
        @keydown.space.prevent="handleSelectOption(option)"
        @keydown.enter.prevent="handleSelectOption(option)"
        @click="handleSelectOption(option)"
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
