<script setup lang="ts">
import { useNuxtApp, useRouter } from '#imports'
// @ts-ignore
import { isExternalUrl } from '@dpc-sdp/ripple-ui-core'

const router = useRouter()
const { $app_hostname } = useNuxtApp()

const props = defineProps<{
  title: string
  intro: string
  placeholder: string
  searchUrl: string
  openInNewWindow: boolean
  image: string
}>()

const handleSubmit = (event?: { value?: string }) => {
  const searchPath = encodeURI(
    props.searchUrl.replace(
      '[SEARCH-KEYWORDS]',
      encodeURIComponent(event!.value as string)
    )
  )

  const isInternalUrl = !isExternalUrl(searchPath, $app_hostname)

  if (props.openInNewWindow) {
    window.open(searchPath, '_blank')
  } else if (isInternalUrl) {
    router.push(searchPath)
  } else {
    window.location.href = searchPath
  }
}
</script>

<template>
  <div class="tide-map-search-banner rpl-u-screen-only">
    <div class="rpl-container rpl-container--left">
      <div class="rpl-grid">
        <div class="rpl-col-12 rpl-col-7-s tide-map-search-banner__search">
          <h2 class="rpl-type-h2">{{ title }}</h2>
          <p class="rpl-type-p rpl-u-margin-b-5 rpl-u-margin-t-1">
            {{ intro }}
          </p>
          <slot name="searchInput">
            <RplSearchBar
              id="map-search-banner"
              variant="reverse"
              :placeholder="placeholder"
              @submit="handleSubmit"
            />
          </slot>
        </div>
        <div class="rpl-col-12 rpl-col-5-s">
          <div
            class="tide-map-search-banner__map"
            :style="`background-image:url(${image})`"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';
.rpl-container.rpl-container--left {
  padding-right: 0;
  padding-left: 0;
  @media (--rpl-bp-s) {
    padding-left: var(--rpl-sp-4);
  }
}
.tide-map-search-banner {
  background: var(--rpl-clr-neutral-100);
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
}
.tide-map-search-banner .rpl-grid {
  display: flex;
  flex-direction: column-reverse;
  @media (--rpl-bp-s) {
    display: grid;
  }
}
.tide-map-search-banner__search {
  padding: var(--rpl-sp-6) var(--rpl-sp-4);
  @media (--rpl-bp-s) {
    padding-top: var(--rpl-sp-8);
    padding-bottom: var(--rpl-sp-9);
    display: flex;
    flex-direction: column;
    align-self: center;
  }
  @media (--rpl-bp-l) {
    padding-top: var(--rpl-sp-10);
    padding-bottom: var(--rpl-sp-11);
    padding-left: var(--rpl-sp-10);
  }
  @media (--rpl-bp-xl) {
    padding-left: var(--rpl-sp-12);
  }
}
.tide-map-search-banner__map {
  background-position: center;
  background-size: 250%;
  height: 240px;
  @media (--rpl-bp-s) {
    height: 100%;
  }
}
</style>
