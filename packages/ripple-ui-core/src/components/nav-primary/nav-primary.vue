<script lang="ts">
export default { name: 'RplNavPrimary' }
</script>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  primaryLogoSrc?: string
  secondaryLogoSrc?: string
}

withDefaults(defineProps<Props>(), {
  primaryLogoSrc: 'https://www.vic.gov.au/_nuxt/img/logo-primary.d4f973b.png',
  secondaryLogoSrc: 'https://www.ripple.sdp.vic.gov.au/cobrand-logo.png'
})

const open = ref(false)
</script>

<template>
  <div class="rpl-nav-primary">
    <div class="rpl-nav-primary__logos">
      <slot name="logos">
        <div class="rpl-nav-primary__logo-primary">
          <img :src="primaryLogoSrc" alt="vic gov logo" />
        </div>
        <div class="rpl-nav-primary__logo-secondary">
          <img :src="secondaryLogoSrc" alt="secondary logo" />
        </div>
      </slot>
    </div>
    <div class="rpl-nav-primary__menu"></div>
    <div class="rpl-nav-primary__open-menu">
      <slot v-if="open" name="open"></slot>
    </div>
  </div>
</template>

<style src="./nav-primary.css" />
