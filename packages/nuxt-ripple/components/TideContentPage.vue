<template>
  <slot
    v-if="page && site"
    :name="`${componentName}Page`"
    v-bind="{ page, site }"
  >
    <component :is="`${componentName}`" :page="page" :site="site">
      <template #sidebar>
        <slot name="aboveSidebar"></slot>
        <slot v-if="page.sidebar" name="sidebar">
          <TideSidebarSiteSectionNav
            v-if="page.sidebar.siteSectionNav"
            :nav="page.sidebar.siteSectionNav"
          />
          <TideSidebarRelatedLinks
            v-if="page.sidebar.relatedLinks?.length"
            title="Related links"
            :items="page.sidebar.relatedLinks"
          />
          <TideSidebarRelatedLinks
            v-if="page.sidebar.whatsNext?.length"
            title="What's next"
            :items="page.sidebar.whatsNext"
          />
          <TideSidebarContactUs
            v-if="page.sidebar.contacts?.length"
            :contacts="page.sidebar.contacts"
          />
          <TideSidebarSocialShare
            v-if="page.sidebar.socialShareNetworks?.length"
            :networks="page.sidebar.socialShareNetworks"
            :page-title="page.title"
          />
        </slot>
        <slot name="belowSidebar"></slot>
      </template>
    </component>
  </slot>
</template>

<script setup lang="ts">
// @ts-ignore
import { useRoute, useRuntimeConfig, useFetch, createError } from '#imports'
import { computed, unref } from 'vue'
import { pascalCase } from 'change-case'

const route = useRoute()
const { public: config } = useRuntimeConfig()
const siteId = config.tide?.site

const { data: site, error: siteError } = await useFetch('/api/tide/site', {
  baseURL: config.API_URL || '',
  params: {
    id: siteId
  }
})

if (siteError.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'We have a glitch in our system.',
    message: `<p>We are aware of the issue. We appreciate your patience while we’re looking into it.</p>`
  })
}

const { data: page, error: pageError } = await useFetch('/api/tide/page', {
  baseURL: config.API_URL || '',
  params: {
    path: route.path,
    site: siteId
  }
})

if (pageError.value || !page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Sorry, we couldn't find the page you were looking for.",
    message: `
        <p>Have a look at the web address to make sure it was typed correctly. We may also have deleted this page.</p>
        <p>If none of our suggestions help you find the information you were looking for, please <a href="/connect-with-us" class="rpl-text-link rpl-u-focusable-inline">contact us</a>.</p>
      `,
    data: JSON.stringify({ site: unref(site) })
  })
}

const componentName = computed(
  () => page.value && `Tide${pascalCase(page.value.type)}`
)
</script>
