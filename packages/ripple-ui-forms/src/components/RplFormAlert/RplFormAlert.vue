<script setup lang="ts">
import { computed, ref } from 'vue'
import { RplIcon, RplList } from '@dpc-sdp/ripple-ui-core'

interface Props {
  status: 'error' | 'success'
  title: string
  fields: {
    fieldId: string
    text: string
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  fields: () => []
})

const classes = computed(() => {
  return {
    'rpl-form-alert': true,
    [`rpl-form-alert--${props.status}`]: props.status
  }
})

const containerRef = ref(null)

const fieldLinks = computed(() => {
  return (props.fields || []).map((field) => {
    return {
      url: `#${field.fieldId}`,
      text: field.text
    }
  })
})

const iconName = computed(() => {
  return props.status === 'success'
    ? 'icon-check-circle-filled'
    : 'icon-exclamation-circle-filled'
})

const focus = () => {
  if (containerRef.value) {
    containerRef.value.focus({ preventScroll: true })
    containerRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}

defineExpose({
  focus
})
</script>

<template>
  <div ref="containerRef" :class="classes">
    <h3 class="rpl-form-alert__title rpl-type-label-large">
      <RplIcon :name="iconName" size="m" />
      {{ title }}
    </h3>
    <div class="rpl-form-alert__description rpl-type-p">
      <slot></slot>
    </div>
    <RplList
      :items="fieldLinks"
      class="rpl-form-alert__fields"
      item-class="rpl-form-alert__field rpl-type-p"
    />
  </div>
</template>

<style src="./RplFormAlert.css"></style>
