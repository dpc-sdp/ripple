<script setup lang="ts">
import useCachedInputError from '../../composables/useCachedInputError'

interface Props {
  fieldName: string
}

const props = withDefaults(defineProps<Props>(), {})

const error = useCachedInputError(props.fieldName)
</script>

<template>
  <div class="rpl-form__outer" :data-invalid="!!error">
    <slot />
  </div>
</template>
