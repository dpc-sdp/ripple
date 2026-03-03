<script lang="ts">
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import { ref, watch, nextTick, computed, Ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'

interface Props {
  id: string
  label?: string
  labelId: string
  value?: string | string[]
  onChange?: (value: string | null) => void
  disabled?: boolean
  variant?: 'default' | 'reverse'
  multiple?: boolean
  placeholder?: string
  required?: boolean
  invalid?: boolean
  maxItemsDisplayed?: number
  showNoResults?: boolean
  getOptionId?: (item: any) => string
  isOptionSelectable?: (option: any) => boolean
  isFreeText?: boolean
  iconPosition?: 'left' | 'none'
  getSuggestions?: (input: string) => Promise<any>
  getSuggestionValue?: (suggestion: any) => Promise<any>
  renderSuggestionLabel?: (item: any) => string
  renderValueLabel?: (item: any) => string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  showNoResults: false,
  label: 'Search',
  onChange: () => undefined,
  maxItemsDisplayed: 6,
  placeholder: '',
  getOptionId: (opt) => opt.id,
  isOptionSelectable: (opt) => true,
  isFreeText: false,
  iconPosition: 'none',
  getSuggestions: () => Promise.resolve([]),
  getSuggestionValue: (option) => Promise.resolve(option),
  renderSuggestionLabel: (item) => item?.label,
  renderValueLabel: (item) => item?.label
})

const emit = defineEmits<{
  (e: 'onChange', value: string | null): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-autocomplete', emit)

const internalInputValue = ref('')
const containerRef = ref(null)
const inputRef: Ref<HTMLInputElement | null> = ref(null)
const menuRef = ref(null)
const optionRefs = ref([])

const menuId = computed(() => `${props.id}__menu`)

const isOpen = ref<boolean>(false)
const activeOptionId = ref<string | null>(null)

const isInputFocused = ref(false)

const suggestions = ref<any[]>([])

onClickOutside(containerRef, () => {
  handleClose(false)
})

const handleInputChange = async (e) => {
  internalInputValue.value = e.target.value
  isOpen.value = true

  if (props.isFreeText) {
    useFormkitFriendlyEventEmitter(props, emit, 'onChange', e.target.value)
  }

  suggestions.value = await getSuggestions((e.target as HTMLInputElement).value)
}

const handleSelectOption = async (
  optionValue: any,
  focusBackOnInput: boolean
) => {
  if (focusBackOnInput) {
    inputRef.value?.focus()
  }

  const fullValue = await props.getSuggestionValue(optionValue)
  const optionLabel = props.renderValueLabel(fullValue)

  internalInputValue.value = optionLabel

  isOpen.value = false

  if (props.isFreeText) {
    useFormkitFriendlyEventEmitter(props, emit, 'onChange', optionLabel)
  } else {
    useFormkitFriendlyEventEmitter(props, emit, 'onChange', fullValue)
  }
}

const getDefaultActiveId = (): string => {
  return props.getOptionId(suggestions.value[0])
}

const handleOpen = (fromKeyboard = false): void => {
  isOpen.value = true

  if (fromKeyboard && suggestions.value?.length) {
    activeOptionId.value = getDefaultActiveId()
  }
}

const handleClose = (focusBackOnInput = false): void => {
  isOpen.value = false
  activeOptionId.value = null

  if (focusBackOnInput) {
    inputRef.value?.focus()
  }
}

const handleInputFocus = async () => {
  isInputFocused.value = true
  await nextTick()
  inputRef.value?.focus()
}

const handleBlur = () => {
  isInputFocused.value = false
}

const handleClear = async () => {
  internalInputValue.value = ''
  suggestions.value = []

  useFormkitFriendlyEventEmitter(props, emit, 'onChange', null)

  await nextTick()
  inputRef.value?.focus()
}

const handleArrowDown = () => {
  const currentActiveIndex = suggestions.value.findIndex(
    (opt) => props.getOptionId(opt) === activeOptionId.value
  )

  if (currentActiveIndex < 0) {
    activeOptionId.value = getDefaultActiveId()
  } else if (currentActiveIndex < suggestions.value.length - 1) {
    activeOptionId.value = props.getOptionId(
      suggestions.value[currentActiveIndex + 1]
    )
  }
}

const handleArrowUp = () => {
  const currentActiveIndex = suggestions.value.findIndex(
    (opt) => props.getOptionId(opt) === activeOptionId.value
  )

  if (currentActiveIndex < 0) {
    activeOptionId.value = getDefaultActiveId()
  } else if (currentActiveIndex > 0) {
    activeOptionId.value = props.getOptionId(
      suggestions.value[currentActiveIndex - 1]
    )
  }
}

const isPrintableKeyCode = (keyCode) => {
  return (
    (keyCode > 47 && keyCode < 58) || // number keys
    keyCode === 32 ||
    keyCode === 8 || // spacebar or backspace
    (keyCode > 64 && keyCode < 91) || // letter keys
    (keyCode > 95 && keyCode < 112) || // numpad keys
    (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
    (keyCode > 218 && keyCode < 223) // [\]' (in order)
  )
}

const handleKeydown = (e) => {
  if (isPrintableKeyCode(e.keyCode)) {
    inputRef.value?.focus()
  }
}

const isMenuItemKeyboardFocused = (optionId: string): boolean => {
  return activeOptionId.value === optionId
}

const focusOption = (optionId) => {
  const optionEl = optionRefs.value.find((r) => {
    return r.dataset.optionId === optionId
  })
  const menu = menuRef.value

  // This makes the scrolling much nicer when using the arrow keys
  if (menu && menu.scrollHeight > menu.clientHeight) {
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

watch(
  () => props.value,
  (newModelValue) => {
    internalInputValue.value = props.isFreeText
      ? newModelValue
      : props.renderSuggestionLabel(newModelValue)
  },
  { immediate: true }
)

watch(activeOptionId, async (newId) => {
  if (newId !== null) {
    // Must wait for next tick so that the right event handlers get called
    await nextTick()
    focusOption(newId)
  }
})

const slug = (label: string) => {
  return label.toLowerCase().replace(/[^\w-]+/g, '-')
}

const getSuggestions = async (input: string): Promise<any[]> => {
  if (!props.getSuggestions) {
    console.warn('No suggestions handler provided')

    return []
  }

  try {
    return await props.getSuggestions(input)
  } catch (e) {
    return []
  }
}
</script>

<template>
  <div
    :class="{
      'rpl-form-autocomplete': true,
      [`rpl-form-autocomplete--${variant}`]: !!variant,
      'rpl-form-autocomplete--with-clear-btn': !!value || !!internalInputValue,
      [`rpl-form-autocomplete--icon-${iconPosition}`]: true
    }"
    :style="{
      '--local-max-items': maxItemsDisplayed
    }"
  >
    <div
      :class="{
        'rpl-form-autocomplete__inner': true,
        'rpl-u-focusable-outline': true,
        'rpl-u-focusable-outline--no-border': true,
        'rpl-u-focusable--force-on': isOpen
      }"
      @keydown.up.prevent="handleArrowUp"
      @keydown.down.prevent="handleArrowDown"
      @keydown.esc.prevent="handleClose(true)"
      @keydown.exact.tab="handleClose(false)"
      @keydown.shift.tab="handleClose(false)"
    >
      <div ref="containerRef" class="rpl-form-autocomplete__input-wrap">
        <RplIcon
          v-if="iconPosition === 'left'"
          name="icon-search"
          size="m"
          role="presentation"
          class="rpl-form-autocomplete__icon rpl-form-autocomplete__icon--left"
        />
        <div
          v-if="!isFreeText && value && !isInputFocused && !isOpen"
          tabindex="0"
          class="rpl-form-autocomplete__input"
          @focus="handleInputFocus()"
        >
          <slot name="suggestion" :option="{ option: value }">
            {{ renderValueLabel(value) }}
          </slot>
        </div>
        <input
          v-else
          :id="id"
          ref="inputRef"
          v-model="internalInputValue"
          :aria-owns="menuId"
          autocomplete="off"
          aria-autocomplete="list"
          :aria-labelledby="labelId"
          :aria-expanded="isOpen"
          :aria-disabled="disabled"
          :aria-required="required"
          :aria-invalid="invalid"
          :placeholder="placeholder"
          role="combobox"
          class="rpl-form-autocomplete__input"
          type="text"
          @input="handleInputChange"
          @focus="handleOpen(false)"
          @blur="handleBlur()"
        />
      </div>
      <div class="rpl-form-autocomplete__right">
        <button
          v-if="!isFreeText && (internalInputValue || value)"
          type="button"
          aria-label="Clear search"
          class="rpl-form-autocomplete__clear rpl-u-focusable-inline"
          @click="handleClear()"
        >
          <RplIcon name="icon-cancel-circle-filled" />
        </button>
      </div>

      <template
        v-if="
          showNoResults &&
          suggestions.length === 0 &&
          !!internalInputValue &&
          isOpen
        "
      >
        <slot name="noresults">
          <div class="rpl-form-autocomplete__menu">
            <span class="rpl-form-autocomplete__menu-noresults">
              No results
            </span>
          </div>
        </slot>
      </template>
      <div
        v-if="suggestions.length && isOpen"
        :id="menuId"
        ref="menuRef"
        class="rpl-form-autocomplete__menu"
        role="listbox"
        :aria-labelledby="labelId"
        tabindex="-1"
      >
        <div
          v-for="option in suggestions"
          :id="slug(getOptionId(option))"
          :key="`opt-${slug(getOptionId(option))}`"
          ref="optionRefs"
          :data-option-id="getOptionId(option)"
          :role="isOptionSelectable(option) ? 'option' : null"
          :class="{
            'rpl-form-autocomplete__menu-option': true,
            'rpl-u-focusable-block': true,
            'rpl-u-focusable--force-on': isMenuItemKeyboardFocused(
              getOptionId(option)
            )
          }"
          tabindex="-1"
          @keydown.space.prevent="
            isOptionSelectable(option) && handleSelectOption(option, true)
          "
          @keydown.enter.prevent="
            isOptionSelectable(option) && handleSelectOption(option, true)
          "
          @click="
            isOptionSelectable(option) && handleSelectOption(option, false)
          "
          @keydown="isOptionSelectable(option) && handleKeydown"
        >
          <slot name="suggestion" :option="{ option }">
            {{ renderSuggestionLabel(option) }}
          </slot>
        </div>
      </div>
    </div>

    <slot name="belowInput" />
  </div>
</template>

<style src="./RplFormAutocomplete.css" />
