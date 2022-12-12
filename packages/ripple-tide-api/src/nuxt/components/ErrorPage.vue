<template>
  <TideBaseLayout
    :pageTitle="`${props.error?.statusCode} - ${props.error?.statusMessage}`"
    :pageDescription="props.error?.statusMessage"
    :site="site"
    class="tide-error"
  >
    <template #breadcrumbs><span></span></template>
    <template #aboveBody>
      <RplHeaderGraphic :image="true" placement="top" />
    </template>
    <template #body>
      <RplErrorMessage
        :title="title"
        :intro="props.error?.statusMessage"
        :link="{ url: '/', text: 'Go back home' }"
        :data-cy="`error-${props.error.statusCode}`"
      >
        <div v-if="props.error?.message">
          <RplContent :html="props.error.message" />
        </div>
      </RplErrorMessage>
    </template>
  </TideBaseLayout>
</template>

<script setup lang="ts">
import { RplHeaderGraphic, RplErrorMessage } from '@dpc-sdp/ripple-ui-core'
import { computed } from 'vue'

interface Props {
  error: any
}

const props = defineProps<Props>()

const is404 = computed(() => props.error?.statusCode === '404')
const title = computed(() => (is404.value ? 'Oops!' : 'Sorry!'))
const site = computed(() =>
  is404.value ? JSON.parse(props.error.data)?.site || null : null
)
</script>

<style>
.tide-error .rpl-error-message {
  --local-margin-top: var(--rpl-sp-7);
  --local-margin-bottom: var(--rpl-sp-7);

  margin-top: var(--local-margin-top);
  margin-bottom: var(--local-margin-bottom);

  @media (--rpl-bp-s) {
    --local-margin-top: var(--rpl-sp-9);
  }

  @media (--rpl-bp-m) {
    --local-margin-top: var(--rpl-sp-7);
  }

  @media (--rpl-bp-l) {
    --local-margin-top: var(--rpl-sp-12);
    --local-margin-bottom: var(--rpl-sp-5);
  }

  @media (--rpl-bp-xl) {
    --local-margin-top: var(--rpl-sp-13);
  }
}
</style>
