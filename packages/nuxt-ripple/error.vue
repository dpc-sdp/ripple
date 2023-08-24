<template>
  <template v-if="is500">
    <RplErrorMessage
      :title="title"
      :intro="props.error?.statusMessage"
      :link="{ url: '/', text: 'Go back home' }"
      :data-cy="`error-${props.error.statusCode}`"
      class="tide-error-500"
    >
      <RplContent :html="props.error.message" />
    </RplErrorMessage>
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

interface Props {
  error: any
}

const props = defineProps<Props>()

const is500 = computed(() => props.error?.statusCode === 500)
const title = computed(() => (is500.value ? 'Sorry!' : 'Oops!'))
const site = is500.value ? undefined : await useTideSite()

console.log(props.error.stack)

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

.tide-error-500 {
  margin: 0 30px;
  min-height: 100vh;
  justify-content: center;
}
</style>
