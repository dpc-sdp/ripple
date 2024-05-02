<script setup lang="ts">
// @ts-expect-error TS2307 import is an asset
import aboriginalFlag from './../../assets/flags/flag-aboriginal.svg?data'
// @ts-expect-error TS2307 import is an asset
import torresStraitIslanderFlag from './../../assets/flags/flag-torres-strait-islander.svg?data'

interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message:
    'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.'
})
</script>

<template>
  <div class="rpl-acknowledgement rpl-u-screen-only">
    <div class="rpl-acknowledgement__flags">
      <img
        :src="aboriginalFlag"
        alt="Aboriginal flag"
        width="55"
        height="38"
        class="rpl-image rpl-image--cover rpl-acknowledgement__flag"
        loading="lazy"
        fetchpriority="auto"
      />
      <img
        :src="torresStraitIslanderFlag"
        alt="Torres Strait Islander flag"
        width="55"
        height="38"
        class="rpl-image rpl-image--cover rpl-acknowledgement__flag"
        loading="lazy"
        fetchpriority="auto"
      />
    </div>
    <p class="rpl-acknowledgement__message rpl-type-p rpl-type-weight-bold">
      {{ message }}
    </p>
  </div>
</template>

<style src="./RplAcknowledgement.css" />
