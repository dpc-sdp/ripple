<script lang="ts">
export default { name: 'RplSpinner' }
</script>

<script setup lang="ts">
import { RplIconSizes } from '../icon/constants'
import RplIcon from '../icon/icon.vue'

interface Props {
  size?: (typeof RplIconSizes)[number]
}

withDefaults(defineProps<Props>(), {
  size: 'm'
})
</script>

<template>
  <RplIcon :size="size" class="rpl-spinner">
    <!-- The order of these paths is important as it drives the animation -->
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12,0c-0.7,0-1.2,0.5-1.2,1.2v6c0,0.7,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2v-6C13.2,0.5,12.7,0,12,0z"
      />
      <path
        d="M16.2,9.5l4.2-4.2C21,4.7,21,4,20.5,3.5C20,3,19.3,3,18.8,3.5l-4.2,4.2c-0.5,0.5-0.5,1.2,0,1.7
  C15,9.9,15.8,9.9,16.2,9.5z"
      />
      <path
        d="M22.8,10.8h-6c-0.7,0-1.2,0.5-1.2,1.2s0.5,1.2,1.2,1.2h6c0.7,0,1.2-0.5,1.2-1.2S23.5,10.8,22.8,10.8z"
      />
      <path
        d="M16.2,14.5c-0.5-0.5-1.2-0.5-1.7,0c-0.5,0.5-0.5,1.2,0,1.7l4.2,4.2c0.5,0.5,1.2,0.5,1.7,0
  c0.5-0.5,0.5-1.2,0-1.7L16.2,14.5z"
      />
      <path
        d="M12,15.6c-0.7,0-1.2,0.5-1.2,1.2v6c0,0.7,0.5,1.2,1.2,1.2s1.2-0.5,1.2-1.2v-6C13.2,16.1,12.7,15.6,12,15.6z"
      />
      <path
        d="M7.8,14.5l-4.2,4.2C3,19.3,3,20,3.5,20.5C4,21,4.7,21,5.2,20.5l4.2-4.2c0.5-0.5,0.5-1.2,0-1.7
  C9,14.1,8.2,14.1,7.8,14.5z"
      />
      <path
        d="M8.4,12c0-0.7-0.5-1.2-1.2-1.2h-6C0.5,10.8,0,11.3,0,12s0.5,1.2,1.2,1.2h6C7.9,13.2,8.4,12.7,8.4,12z"
      />
      <path
        d="M5.2,3.5C4.7,3,4,3,3.5,3.5S3,4.7,3.5,5.2l4.2,4.2c0.5,0.5,1.2,0.5,1.7,0s0.5-1.2,0-1.7L5.2,3.5z"
      />
    </svg>
  </RplIcon>
</template>

<style src="./spinner.css" />
