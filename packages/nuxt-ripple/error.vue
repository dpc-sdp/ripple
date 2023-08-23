<template>
  <template v-if="is500">
    <div v-html="styleBlockFor500"></div>
    <div class="rpl-error-message" :data-cy="`error-${props.error.statusCode}`">
      <h1 class="rpl-error-message__title rpl-type-weight-bold">
        {{ title }}
      </h1>
      <h2 class="rpl-error-message__intro rpl-type-p-large">
        {{ props.error?.statusMessage }}
      </h2>
      <div class="rpl-error-message__body rpl-type-p">
        <div class="rpl-content">
          <RplContent :html="props.error.message" />
        </div>
      </div>
      <a
        href="/"
        type="button"
        class="rpl-button rpl-button--filled rpl-button--default rpl-u-focusable-block rpl-error-message__button"
        aria-busy="false"
        ><span class="rpl-button__label rpl-type-label rpl-type-weight-bold"
          >Go back home</span
        ></a
      >
    </div>
  </template>
  <TideBaseLayout
    v-else
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
import { computed, onMounted } from 'vue'
import errorCSS from './error.css?inline'

interface Props {
  error: any
}

const props = defineProps<Props>()

const is500 = computed(() => props.error?.statusCode === 500)
const title = computed(() => (is500.value ? 'Sorry!' : 'Oops!'))
const site = is500.value ? undefined : await useTideSite()
const styleBlockFor500 = ref(`<style>${errorCSS}</style>`)

onMounted(() => {
  // Since the template is skipped on 500, need to tell cypress that the page is ready
  if (is500.value) {
    document.body.setAttribute('data-nuxt-hydrated', 'true')
  }
})
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
