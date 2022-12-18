<script lang="ts">
export default {
  name: 'RplSearchBar',
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { RplSearchBarVariants } from './constants'
import { rplEventBus } from '../../index'
import { ref, watch } from 'vue'
import RplIcon from '../icon/icon.vue'

const RPL_SUBMIT_EVENT = 'rpl-search-bar/onSubmit'
rplEventBus.register(RPL_SUBMIT_EVENT)

const emit =
  defineEmits<{
    (e: 'onSubmit', value: string): void
    (e: 'update:inputValue', value: string): void
  }>()

interface Props {
  variant?: typeof RplSearchBarVariants[number]
  id: string
  inputLabel?: string
  inputValue?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  inputLabel: 'Search',
  submitLabel: 'Search',
  inputValue: ''
})

const internalValue = ref('')

const handleSubmit = (e) => {
  rplEventBus.emit(RPL_SUBMIT_EVENT, internalValue.value)
  emit('onSubmit', internalValue.value)
}

const handleInputChange = (e) => {
  internalValue.value = e.target.value
  emit('update:inputValue', e.target.value)
}

watch(() => props.inputValue, (newModelValue) => {
  internalValue.value = newModelValue
}, { immediate: true })
</script>

<template>
  <form :class="`rpl-search-bar rpl-search-bar--${variant}`" @submit.prevent="handleSubmit">
    <label class="rpl-u-visually-hidden" :for="id">{{ inputLabel }}</label>
    <input v-bind="$attrs" :id="id" v-model="internalValue" class="
        rpl-search-bar__input
        rpl-u-focusable-outline rpl-u-focusable-outline--no-border
      " type="search" @input="handleInputChange" />
    <div class="rpl-search-bar__right">
      <button type="submit" aria-label="search" class="rpl-search-bar-submit rpl-u-focusable-inline">
        <span class="
            rpl-search-bar-submit__label
            rpl-type-label rpl-type-weight-bold
          ">Search</span>
        <span class="rpl-search-bar-submit__icon">
          <RplIcon name="icon-search" size="m" />
        </span>
      </button>
    </div>
  </form>
</template>



























<style src="./search-bar.css" />
