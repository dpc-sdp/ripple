<template>
  <RplLayout :background="background">
    <template #aboveHeader>
      <RplIconSprite />
      <slot name="aboveHeader">
        <RplAlert
          v-for="alert in site?.alerts"
          v-bind="alert"
          :key="alert.alertId"
        />
      </slot>
    </template>
    <template #primaryNav>
      <slot name="primaryNav">
        <RplPrimaryNav
          :primaryLogo="{
            src: '/img/primary-nav-logo-primary.svg',
            altText: 'Victoria government logo',
            href: '/'
          }"
          :secondaryLogo="site?.siteLogo"
          :items="site?.menus.menuMain"
          :showQuickExit="site?.showQuickExit"
        ></RplPrimaryNav>
      </slot>
    </template>
    <template #breadcrumbs>
      <slot name="breadcrumbs">
        <TideBreadcrumbs
          :siteMenu="site?.menus.menuMain"
          :currentPath="route.path"
          :currentPageTitle="pageTitle"
        />
      </slot>
    </template>
    <template #aboveBody>
      <slot name="aboveBody"></slot>
    </template>
    <template #body="{ hasSidebar }">
      <slot name="body" :hasSidebar="hasSidebar"></slot>
      <div data-cy="topic-tags">
        <RplChip
          v-for="tag in topicTags"
          :key="tag.url"
          :label="tag.text"
          :url="tag.url"
        />
      </div>

      <TideUpdatedDate v-if="updatedDate" :date="updatedDate" />
    </template>
    <template #belowBody>
      <slot name="belowBody"></slot>
    </template>
    <template #aboveSidebar>
      <slot name="aboveSidebar"></slot>
    </template>
    <template #sidebar>
      <slot name="sidebar"></slot>
    </template>
    <template #belowSidebar>
      <slot name="aboveSidebar"></slot>
    </template>
    <template #footer>
      <slot name="footer">
        <RplFooter
          :nav="site?.menus.menuMain"
          :links="site?.menus.menuFooter"
          :copyright="site?.copyright"
          :acknowledgement="site?.acknowledgementFooter"
          :logos="site?.footerLogos"
          :credit="footerImageCaption"
        >
          <template #copyright>
            <div data-cy="footer-copyright" v-html="site?.copyrightHtml"></div>
          </template>
        </RplFooter>
      </slot>
    </template>
  </RplLayout>
</template>

<script setup lang="ts">
// @ts-ignore
import { useHead, useSiteTheme, useAppConfig, useRoute } from '#imports'
import { RplChip } from '@dpc-sdp/ripple-ui-core'
import { onMounted } from 'vue'
import { TideTopicTag } from '../../mapping/topic-tags/topic-tags-mapping'

interface Props {
  site: any
  background?: string
  pageTitle: string
  pageLanguage?: string
  pageDescription?: string
  footerImageCaption?: string
  topicTags?: TideTopicTag[]
  updatedDate?: string | null
}

const props = withDefaults(defineProps<Props>(), {
  background: 'default',
  pageLanguage: 'en-AU',
  pageDescription: '',
  footerImageCaption: '',
  topicTags: () => [],
  updatedDate: null
})

onMounted(() => {
  // Used for knowing when page is ready for cypress testing
  document.body.setAttribute('data-nuxt-hydrated', 'true')
})

const route = useRoute()

const style = useSiteTheme(props.site?.value?.theme || useAppConfig().theme)
useHead({
  title: props.pageTitle,
  htmlAttrs: {
    lang: props.pageLanguage
  },
  style: style && [
    {
      children: `body { ${style} }`
    }
  ],
  meta: [
    {
      name: 'description',
      content: props.pageDescription
    }
  ]
})
</script>
