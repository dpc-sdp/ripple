<template>
  <TideBaseLayout
    :pageTitle="`${props.error?.statusCode} - ${props.error?.statusMessage}`"
    :site="site"
    :page="{}"
    :siteSection="{}"
    class="tide-error"
  >
    <template #breadcrumbs><span></span></template>
    <template #aboveBody>
      <RplHeaderGraphic
        :image="site?.cornerGraphic?.top?.src || true"
        placement="top"
      />
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
import { useTideSite } from '#imports'
import { computed } from 'vue'

interface Props {
  error: any
}

const props = defineProps<Props>()

const is404 = computed(() => props.error?.statusCode === 404)
const title = computed(() => (is404.value ? 'Oops!' : 'Sorry!'))
const site = is404.value ? await useTideSite() : undefined
</script>

<style>
.tide-error .rpl-layout__main {
  margin-top: var(--rpl-sp-6);

  @media (--rpl-bp-l) {
    margin-top: var(--rpl-sp-12);
    margin-bottom: var(--rpl-sp-1);
  }
}
</style>
