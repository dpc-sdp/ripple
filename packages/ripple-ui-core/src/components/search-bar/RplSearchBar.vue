<script lang="ts">
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import { ref, watch, nextTick, computed, onMounted, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import RplIcon from '../icon/RplIcon.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

const RplSearchBarVariants = ['default', 'reverse', 'menu']

interface Props {
  variant?: (typeof RplSearchBarVariants)[number]
  id: string
  autoFocus?: boolean
  inputLabel?: string
  inputValue?: string | Record<string, any>
  submitLabel?: string | boolean
  suggestions?: any[]
  maxSuggestionsDisplayed?: number
  placeholder?: string
  globalEvents?: boolean
  showNoResults?: boolean
  getSuggestionVal?: (item: any) => string
  getOptionLabel?: Function
  isOptionSelectable?: Function
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  autoFocus: false,
  showNoResults: false,
  inputLabel: 'Search',
  submitLabel: 'Search',
  inputValue: '',
  suggestions: () => [],
  maxSuggestionsDisplayed: 10,
  placeholder: '',
  globalEvents: true,
  getSuggestionVal: (item) => item,
  getOptionLabel: (opt) => opt.toString(),
  isOptionSelectable: (opt) => true,
  showLabel: false
})

const emit = defineEmits<{
  (e: 'update:inputValue', value: string): void
  (e: 'submit', payload: rplEventPayload & { action: 'search' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-search-bar', emit)

const internalValue = ref('')
const containerRef = ref(null)
const inputRef = ref(null)
const menuRef = ref(null)
const optionRefs = ref([])
const focusTimeout = ref(null)

const menuId = computed(() => `${props.id}__menu`)

const isOpen = ref<boolean>(false)
const activeOptionId = ref<string | null>(null)

onMounted(() => {
  if (props.autoFocus) {
    focusTimeout.value = setTimeout(() => inputRef.value.focus(), 100)
  }
})

onUnmounted(() => {
  clearTimeout(focusTimeout.value)
})

onClickOutside(containerRef, () => {
  handleClose(false)
})

const handleSubmit = (type: 'button' | 'enter') => {
  emitRplEvent(
    'submit',
    {
      action: 'search',
      id: props.id,
      value: internalValue.value,
      text: type === 'button' ? props.submitLabel : null,
      type
    },
    { global: props.globalEvents }
  )
}

const handleInputChange = (e) => {
  internalValue.value = e.target.value
  emit('update:inputValue', e.target.value)
  isOpen.value = true
}

const handleSelectOption = (optionValue: any, focusBackOnInput) => {
  const optionLabel = props.getOptionLabel(optionValue)

  if (focusBackOnInput) {
    inputRef.value.focus()
  }

  internalValue.value = props.getSuggestionVal(optionValue)
  emit('update:inputValue', optionValue)
  isOpen.value = false

  emitRplEvent(
    'submit',
    {
      action: 'search',
      id: props.id,
      text: props.getSuggestionVal(optionValue),
      value: optionValue,
      type: 'suggestion'
    },
    { global: props.globalEvents }
  )
}

const getDefaultActiveId = (): string => {
  return props.suggestions[0]
}

const handleOpen = (fromKeyboard = false): void => {
  isOpen.value = true

  if (fromKeyboard && props.suggestions?.length) {
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
  const currentActiveIndex = props.suggestions.findIndex(
    (opt) => opt === activeOptionId.value
  )

  if (currentActiveIndex < 0) {
    activeOptionId.value = getDefaultActiveId()
  } else if (currentActiveIndex < props.suggestions.length - 1) {
    activeOptionId.value = props.suggestions[currentActiveIndex + 1]
  }
}

const handleArrowDown = () => {
  const currentActiveIndex = props.suggestions.findIndex(
    (opt) => opt === activeOptionId.value
  )

  if (currentActiveIndex < 0) {
    activeOptionId.value = getDefaultActiveId()
  } else if (currentActiveIndex > 0) {
    activeOptionId.value = props.suggestions[currentActiveIndex - 1]
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
    inputRef.value.focus()
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

watch(
  () => props.inputValue,
  (newModelValue) => {
    internalValue.value = props.getSuggestionVal(newModelValue)
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

const slug = (label: string) => label.toLowerCase().replace(/[^\w-]+/g, '-')
</script>

<template>
  <form
    :class="`rpl-search-bar rpl-search-bar--${variant}`"
    :style="{
      '--local-max-items': maxSuggestionsDisplayed
    }"
    @submit.prevent="handleSubmit('button')"
  >
    <label
      :class="{
        'rpl-search-bar__label': true,
        'rpl-u-visually-hidden': !showLabel,
        'rpl-type-h4-fixed': true
      }"
      :for="id"
      >{{ inputLabel }}</label
    >
    <div class="rpl-search-bar__inner">
      <div
        ref="containerRef"
        class="rpl-search-bar__input-wrap"
        @keydown.down.prevent="handleArrowUp"
        @keydown.up.prevent="handleArrowDown"
        @keydown.esc.prevent="handleClose(true)"
        @keydown.exact.tab="handleClose(false)"
        @keydown.shift.tab="handleClose(false)"
      >
        <input
          v-bind="$attrs"
          :id="id"
          ref="inputRef"
          v-model="internalValue"
          :aria-owns="menuId"
          autocomplete="off"
          aria-autocomplete="list"
          :aria-expanded="isOpen"
          :placeholder="placeholder"
          role="combobox"
          :class="{
            'rpl-search-bar__input': true,
            'rpl-u-focusable-outline': true,
            'rpl-u-focusable-outline--no-border': true,
            'rpl-u-focusable--force-on': isOpen
          }"
          type="search"
          @input="handleInputChange"
          @focus="handleOpen(false)"
          @keydown.enter.prevent="handleSubmit('enter')"
        />

        <template
          v-if="
            showNoResults &&
            suggestions.length === 0 &&
            !!internalValue &&
            isOpen
          "
        >
          <slot name="noresults">
            <div class="rpl-search-bar__menu">
              <span class="rpl-search-bar__menu-noresults"> No results </span>
            </div>
          </slot>
        </template>

        <div
          v-if="suggestions.length && isOpen"
          :id="menuId"
          ref="menuRef"
          class="rpl-search-bar__menu"
          role="listbox"
          tabindex="-1"
        >
          <div
            v-for="option in suggestions"
            :id="slug(getOptionLabel(option))"
            :key="`opt-${slug(getOptionLabel(option))}`"
            ref="optionRefs"
            :data-option-id="getOptionLabel(option)"
            :role="isOptionSelectable(option) ? 'option' : null"
            :class="{
              'rpl-search-bar__menu-option': true,
              'rpl-u-focusable-block': true,
              'rpl-u-focusable--force-on': isMenuItemKeyboardFocused(
                slug(getOptionLabel(option))
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
              {{ getOptionLabel(option) }}
            </slot>
          </div>
        </div>
      </div>
      <div class="rpl-search-bar__right">
        <button
          type="submit"
          aria-label="search"
          class="rpl-search-bar-submit rpl-u-focusable-inline"
        >
          <span
            v-if="submitLabel"
            class="rpl-search-bar-submit__label rpl-type-label rpl-type-weight-bold"
            >{{ submitLabel }}</span
          >
          <span class="rpl-search-bar-submit__icon">
            <RplIcon name="icon-search" size="m" />
          </span>
        </button>
      </div>
    </div>
  </form>
</template>

<style src="./RplSearchBar.css" />
