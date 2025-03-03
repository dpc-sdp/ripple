<template>
  <template v-if="is500">
    <RplErrorMessage
      :title="title"
      :intro="props.error?.statusMessage"
      :link="{ url: '/', text: 'Go back home' }"
      :data-cy="`error-${props.error.statusCode}`"
      class="tide-error-500"
    >
      <p v-if="props.error?.message">
        {{ props.error.message }}
      </p>
    </RplErrorMessage>
  </template>
  <TideBaseLayout
    v-else
    :pageTitle="page.title"
    :site="site"
    :page="page"
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
        <RplContent v-if="props.error.statusCode === 404">
          <p>
            Have a look at the web address to make sure it was typed correctly.
            We may also have deleted this page.
          </p>
          <p>
            If none of our suggestions help you find the information you were
            looking for, please
            <a
              href="/connect-with-us"
              class="rpl-text-link rpl-u-focusable-inline"
              >contact us</a
            >.
          </p>
        </RplContent>
        <p v-else>
          {{ props.error.message }}
        </p>
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
const page = computed(() => ({
  title: `${props.error?.statusCode} - ${props.error?.statusMessage}`,
  statusCode: props.error?.statusCode
}))

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
