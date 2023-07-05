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
  inputValue?: string
  suggestions?: string[]
  maxSuggestionsDisplayed?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  autoFocus: false,
  inputLabel: 'Search',
  submitLabel: 'Search',
  inputValue: '',
  suggestions: () => [],
  maxSuggestionsDisplayed: 10
})

const emit = defineEmits<{
  (e: 'onSubmit', value: string): void
  (e: 'update:inputValue', value: string): void
  (e: 'search', payload: rplEventPayload & { action: 'submit' }): void
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

const handleSubmit = () => {
  emit('onSubmit', internalValue.value)

  emitRplEvent(
    'search',
    {
      action: 'submit',
      text: props.inputLabel,
      value: internalValue.value
    },
    { global: true }
  )
}

const handleInputChange = (e) => {
  internalValue.value = e.target.value
  emit('update:inputValue', e.target.value)

  isOpen.value = true
}

const handleSelectOption = (optionValue, focusBackOnInput) => {
  if (focusBackOnInput) {
    inputRef.value.focus()
  }

  internalValue.value = optionValue
  emit('update:inputValue', optionValue)
  emit('onSubmit', optionValue)
  isOpen.value = false
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
    internalValue.value = newModelValue
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
</script>

<template>
  <form
    :class="`rpl-search-bar rpl-search-bar--${variant}`"
    :style="{
      '--local-max-items': maxSuggestionsDisplayed
    }"
    @submit.prevent="handleSubmit"
  >
    <div
      ref="containerRef"
      class="rpl-search-bar__input-wrap"
      @keydown.down.prevent="handleArrowUp"
      @keydown.up.prevent="handleArrowDown"
      @keydown.esc.prevent="handleClose(true)"
      @keydown.exact.tab="handleClose(false)"
      @keydown.shift.tab="handleClose(false)"
    >
      <label class="rpl-u-visually-hidden" :for="id">{{ inputLabel }}</label>
      <input
        v-bind="$attrs"
        :id="id"
        ref="inputRef"
        v-model="internalValue"
        :aria-owns="menuId"
        autocomplete="off"
        aria-autocomplete="list"
        :aria-expanded="isOpen"
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
      />

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
          :id="option"
          :key="option"
          ref="optionRefs"
          :data-option-id="option"
          role="option"
          :class="{
            'rpl-search-bar__menu-option': true,
            'rpl-u-focusable-block': true,
            'rpl-u-focusable--force-on': isMenuItemKeyboardFocused(option)
          }"
          tabindex="-1"
          @keydown.space.prevent="handleSelectOption(option, true)"
          @keydown.enter.prevent="handleSelectOption(option, true)"
          @click="handleSelectOption(option, false)"
          @keydown="handleKeydown"
        >
          {{ option }}
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
          class="rpl-search-bar-submit__label rpl-type-label rpl-type-weight-bold"
          >Search</span
        >
        <span class="rpl-search-bar-submit__icon">
          <RplIcon name="icon-search" size="m" />
        </span>
      </button>
    </div>
  </form>
</template>

<style src="./RplSearchBar.css" />
