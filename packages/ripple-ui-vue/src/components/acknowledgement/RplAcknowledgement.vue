<script setup lang="ts">
import aboriginalFlag from '@dpc-sdp/ripple-ui-shared/assets/flags/flag-aboriginal.svg?data'
import torresStraitIslanderFlag from '@dpc-sdp/ripple-ui-shared/assets/flags/flag-torres-strait-islander.svg?data'

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

<style
  src="@dpc-sdp/ripple-ui-styles/components/acknowledgement/RplAcknowledgement.css"
/>
