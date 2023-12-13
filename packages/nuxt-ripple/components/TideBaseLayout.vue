<template>
  <RplLayout
    :background="background"
    :direction="direction"
    :language="language"
  >
    <template #aboveHeader>
      <RplIconSprite />
      <slot name="aboveHeader"></slot>
      <TideAlerts :draftAlert="showDraftAlert" :siteAlerts="site?.siteAlerts" />
    </template>
    <template #primaryNav>
      <slot name="primaryNav">
        <RplPrimaryNav
          :primaryLogo="{
            altText: 'Victoria government logo',
            href: '/'
          }"
          :secondaryLogo="site?.siteLogo"
          :items="site?.menus.menuMain || []"
          :showQuickExit="site?.showQuickExit"
          :showSearch="!featureFlags?.disablePrimaryNavSearch"
        >
        </RplPrimaryNav>
      </slot>
    </template>
    <template #breadcrumbs>
      <slot name="breadcrumbs">
        <TideBreadcrumbs
          v-if="showBreadcrumbs"
          :siteMenu="site?.menus.menuMain"
          :currentPath="route.path"
          :currentPageTitle="pageTitle"
          :besideQuickExit="site?.showQuickExit"
        />
      </slot>
    </template>
    <template #aboveBody="{ hasBreadcrumbs }">
      <slot name="aboveBody" :hasBreadcrumbs="hasBreadcrumbs">
        <TideHeroHeader
          v-if="page.header"
          :header="page.header"
          :hasBreadcrumbs="hasBreadcrumbs"
          :hideBottomCornerGraphic="!!page?.primaryCampaign"
          :cornerTop="site?.cornerGraphic?.top"
          :cornerBottom="site?.cornerGraphic?.bottom"
        />
      </slot>
    </template>
    <template #body="{ hasSidebar }">
      <slot name="body" :hasSidebar="hasSidebar"></slot>
      <TideTopicTags
        v-if="!featureFlags?.disableTopicTags && topicTags.length"
        :items="topicTags"
      />
      <TideUpdatedDate v-if="updatedDate" :date="updatedDate" />
    </template>
    <template #belowBody>
      <slot name="belowBody"></slot>
      <TideContentRating
        v-if="showContentRating"
        :siteSectionName="siteSection ? siteSection.name : ''"
      />
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
          :nav="footerNav"
          :links="site?.menus.menuFooter"
          :copyright="site?.copyright"
          :acknowledgement="site?.acknowledgementFooter"
          :logos="site?.footerLogos"
          :credit="footerImageCaption"
          :variant="featureFlags?.footerTheme || 'default'"
        >
          <template v-if="site?.copyrightHtml" #copyright>
            <div data-cy="footer-copyright" v-html="site?.copyrightHtml"></div>
          </template>
        </RplFooter>
      </slot>
    </template>
  </RplLayout>
</template>

<script setup lang="ts">
// @ts-ignore
import {
  useAppConfig,
  useRoute,
  useNuxtApp,
  useTideLanguage,
  useLogger
} from '#imports'
import { computed, onMounted, provide, ref } from 'vue'
import { defu as defuMerge } from 'defu'
import { TideSiteData } from '../types'
import { TideTopicTag } from '../mapping/base/topic-tags/topic-tags-mapping'
import { TideSiteSection } from '@dpc-sdp/ripple-tide-api/types'

export interface Props {
  site: TideSiteData
  background?: string
  pageTitle: string
  pageLanguage?: string
  footerImageCaption?: string
  topicTags?: TideTopicTag[]
  updatedDate?: string | null
  siteSection: TideSiteSection | null
  page: any
  showContentRating?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  background: 'default',
  pageLanguage: 'en-AU',
  footerImageCaption: '',
  topicTags: () => [],
  updatedDate: null,
  siteSection: null,
  showContentRating: false
})

// Feature flags will be available on component instances with inject('featureFlags') - See https://vuejs.org/guide/components/provide-inject.html#inject
// Site flags provided by drupal will override the app config flags
const featureFlags = ref(
  defuMerge(
    props.site?.featureFlags || {},
    useAppConfig()?.ripple?.featureFlags || {}
  )
)
provide('featureFlags', featureFlags.value)

// Sets language global values
const { locale, direction, language } = useTideLanguage(props.page)
provide('language', { locale, direction, language })

onMounted(() => {
  // Used for knowing when page is ready for cypress testing
  document.body.setAttribute('data-nuxt-hydrated', 'true')
})

const route = useRoute()
const showBreadcrumbs = computed(() => route.path !== '/')
const showDraftAlert = computed(() => props.page?.status === 'draft')

const footerNav = computed(() => {
  const menuMain = props.site?.menus.menuMain || []

  if (props.site?.socialLinks?.length) {
    return [
      ...menuMain,
      {
        text: 'Connect with us',
        id: '__footer_connect_with_us',
        items: props.site?.socialLinks
      }
    ]
  }

  return menuMain
})

const nuxtApp = useNuxtApp()
const logger = useLogger()

logger.info('Calling tide:page hook...', {
  label: 'TideBaseLayout'
})

/*
 * This hook can be called from plugins to extend Tide managed pages behaviour - see /plugins folder for examples
 */
nuxtApp.callHook('tide:page', props)
</script>
