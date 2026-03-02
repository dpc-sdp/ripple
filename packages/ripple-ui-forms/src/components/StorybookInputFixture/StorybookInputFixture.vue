<script setup lang="ts">
import RplFormLabel from './../RplFormLabel/RplFormLabel.vue'
import RplFormValidationError from './../RplFormValidationError/RplFormValidationError.vue'
import { computed, provide } from 'vue'

interface Props {
  useFieldset?: boolean
  invalid?: boolean
  label?: string
  labelId?: string
  fieldId?: string
  value?: string | string[]
}

const props = withDefaults(defineProps<Props>(), {
  useFieldset: false,
  invalid: false,
  label: 'Label',
  labelId: null,
  fieldId: null,
  value: null
})

const fakeError = { test: { value: 'Field is invalid' } }

provide('form', {
  id: 'sb-form',
  name: 'SB Form'
})

const hasValue = computed(() => {
  return (
    (Array.isArray(props.value) && props.value.length) ||
    (typeof props.value === 'string' && props.value)
  )
})
</script>

<template>
  <form class="rpl-form">
    <div class="rpl-form__outer" :data-invalid="invalid" data-submitted="true">
      <fieldset
        v-if="useFieldset"
        id="checkbox-group"
        class="rpl-form__fieldset"
        aria-describedby="help-checkbox-group"
      >
        <RplFormLabel :id="labelId" isRequired tag="legend" :for="fieldId">
          {{ label }}
        </RplFormLabel>
        <RplFormValidationError v-if="invalid" :messages="fakeError" />
        <slot />
      </fieldset>
      <div v-else class="rpl-form__wrapper">
        <RplFormLabel :id="labelId" isRequired :for="fieldId">
          {{ label }}
        </RplFormLabel>
        <RplFormValidationError v-if="invalid" :messages="fakeError" />
        <div class="rpl-form__inner">
          <slot />
        </div>
      </div>
    </div>
  </form>
  <div v-if="hasValue">
    <div class="rpl-type-p rpl-u-margin-t-8">
      <h4 class="rpl-type-h4">Output value</h4>
      <p v-if="typeof value === 'string'">{{ value }}</p>
      <ul v-else>
        <li v-for="(item, index) in value" :key="index">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>
