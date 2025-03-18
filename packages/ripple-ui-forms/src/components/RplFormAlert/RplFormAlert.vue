<script setup lang="ts">
import { computed, ref } from 'vue'
import useFormFocus from '../../composables/useFormFocus'

interface Props {
  status: 'error' | 'success'
  title: string
  fields?: {
    fieldId: string
    text: string
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  fields: () => []
})

const { focusFormElement, scrollToFormElement } = useFormFocus()

const classes = computed(() => {
  return {
    'rpl-form-alert': true,
    [`rpl-form-alert--${props.status}`]: props.status
  }
})

const containerRef = ref(null)

const iconName = computed(() => {
  return props.status === 'success'
    ? 'icon-check-circle-filled'
    : 'icon-exclamation-circle-filled'
})

const focus = () => {
  if (containerRef.value) {
    containerRef.value.focus({ preventScroll: true })

    scrollToFormElement(containerRef.value)
  }
}

defineExpose({
  focus
})
</script>

<template>
  <div ref="containerRef" :class="classes" tabindex="-1">
    <h3 class="rpl-form-alert__title rpl-type-label-large">
      <RplIcon :name="iconName" size="m" />
      {{ title }}
    </h3>
    <div class="rpl-form-alert__description rpl-type-p">
      <slot></slot>
    </div>
    <ul v-if="fields && fields.length" class="rpl-form-alert__fields">
      <li
        v-for="field in fields"
        :key="field.fieldId"
        class="rpl-form-alert__field"
      >
        <a
          class="rpl-form-alert__field-link rpl-type-p rpl-text-link rpl-u-focusable-inline"
          :href="`#${field.fieldId}`"
          @click.prevent="focusFormElement(field.fieldId)"
        >
          {{ field.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style src="./RplFormAlert.css"></style>
