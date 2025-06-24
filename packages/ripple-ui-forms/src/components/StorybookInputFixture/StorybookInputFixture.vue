<script setup lang="ts">
import RplFormLabel from './../RplFormLabel/RplFormLabel.vue'
import RplFormValidationError from './../RplFormValidationError/RplFormValidationError.vue'
import { provide } from 'vue'

interface Props {
  useFieldset?: boolean
  invalid?: boolean
  label?: string
  labelId?: string
  fieldId?: string
}

withDefaults(defineProps<Props>(), {
  useFieldset: false,
  invalid: false,
  label: 'Label',
  labelId: null,
  fieldId: null
})

const fakeError = { test: { value: 'Field is invalid' } }

provide('form', {
  id: 'sb-form',
  name: 'SB Form'
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
</template>
