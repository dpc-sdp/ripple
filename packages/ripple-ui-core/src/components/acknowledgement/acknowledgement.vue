<script lang="ts">
export default { name: 'RplAcknowledgement' }
</script>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: 'The Victorian Government acknowledges Aboriginal and Torres Strait Islander people as the Traditional Custodians of the land and acknowledges and pays respect to their Elders, past and present.'
  },
})
</script>

<template>
  <div class="rpl-acknowledgement">
    <img class="rpl-acknowledgement__flag" src="../../assets/flags/flag-aboriginal.svg" alt="Aboriginal flag" />
    <img class="rpl-acknowledgement__flag" src="../../assets/flags/flag-torres-strait-islander.svg" alt="Torres Strait Islander flag" />
    <p class="rpl-acknowledgement__message rpl-type-p rpl-type-weight-bold">
      {{ message }}
    </p>
  </div>
</template>

<style src="./acknowledgement.css" />
