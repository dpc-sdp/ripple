<template>
  <div>
    <button
      :class="{
        'rpl-map-geolocate-btn': true,
        'rpl-u-focusable-inline': true
      }"
      :disabled="isBusy"
      @click="handleGeoLocateClick"
    >
      <RplIcon name="icon-current-location"></RplIcon>
      <span class="rpl-type-label rpl-type-weight-bold">
        <slot> Use my current location </slot>
      </span>
    </button>
    <RplFormValidationError v-if="error" :message="error" />
  </div>
</template>
<script setup lang="ts">
import { defineEmits } from 'vue'
import { RplIcon } from '@dpc-sdp/ripple-ui-core/vue'

interface Props {
  isBusy: boolean
  error: string | null
}

withDefaults(defineProps<Props>(), {
  isBusy: false
})

const emit = defineEmits(['success', 'error'])

async function handleGeoLocateClick() {
  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject)
    })

    emit('success', pos)
  } catch (error) {
    emit('error', error)
  }
}
</script>

<style src="./RplMapGeolocateButton.css" />
