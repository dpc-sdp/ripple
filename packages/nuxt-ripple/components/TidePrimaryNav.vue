<template>
  <RplPrimaryNav
    :primaryLogo="{
      altText: 'Victoria government logo',
      href: '/'
    }"
    :secondaryLogo="siteLogo"
    :items="items || []"
    :showQuickExit="showQuickExit"
    :showSearch="showSearch"
    :searchUrl="searchUrl"
  >
    <template v-if="loginLink?.url" #userAction>
      <RplLink
        class="rpl-primary-nav__icon-link rpl-type-label-small rpl-type-weight-bold rpl-u-focusable-block"
        :url="loginLink.url"
        @click="handleLogin"
      >
        <RplIcon name="icon-user-circle-filled" />{{ loginText }}
      </RplLink>
    </template>
  </RplPrimaryNav>
</template>

<script setup lang="ts">
import { computed } from '#imports'
import { TideSiteData } from '../types'
import type { IRplFeatureFlags } from '@dpc-sdp/ripple-tide-api/types'
import { rplEventPayload, useRippleEvent } from '@dpc-sdp/ripple-ui-core'

export interface Props {
  siteLogo?: TideSiteData['siteLogo']
  items?: TideSiteData['menus']['menuMain']
  loginLink?: IRplFeatureFlags['primaryNavLogin']
  showQuickExit?: boolean
  showSearch?: boolean
  searchUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  siteLogo: undefined,
  items: () => [],
  loginLink: undefined,
  showQuickExit: false,
  showSearch: true,
  searchUrl: undefined
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-primary-nav', emit)

const loginText = computed(() => props.loginLink?.text || 'Login')

const handleLogin = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: props.loginLink?.url,
      text: loginText.value
    },
    { global: true }
  )
}
</script>
