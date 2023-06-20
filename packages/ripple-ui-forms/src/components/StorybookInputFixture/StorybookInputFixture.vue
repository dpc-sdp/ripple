<script setup lang="ts">
import RplFormLabel from './../RplFormLabel/RplFormLabel.vue'
import RplFormValidationError from './../RplFormValidationError/RplFormValidationError.vue'

interface Props {
  useFieldset: boolean
  invalid: boolean
}

withDefaults(defineProps<Props>(), { useFieldset: false, invalid: false })

const fakeError = { test: { value: 'Field is invalid' } }
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
        <RplFormLabel isRequired tag="legend">Label</RplFormLabel>
        <slot />
      </fieldset>
      <div v-else class="rpl-form__wrapper">
        <RplFormLabel isRequired>Label</RplFormLabel>
        <RplFormValidationError v-if="invalid" :messages="fakeError" />
        <div class="rpl-form__inner">
          <slot />
        </div>
      </div>
    </div>
  </form>
</template>
