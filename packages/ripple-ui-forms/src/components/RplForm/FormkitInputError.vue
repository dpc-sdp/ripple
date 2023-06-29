<script setup lang="ts">
import RplFormValidationError from '../RplFormValidationError/RplFormValidationError.vue'
import useCachedInputError from '../../composables/useCachedInputError'

interface Props {
  fieldName: string
}

const props = withDefaults(defineProps<Props>(), {})

const error = useCachedInputError(props.fieldName)
</script>

<template>
  <RplFormValidationError v-if="error" :message="error" />
</template>
