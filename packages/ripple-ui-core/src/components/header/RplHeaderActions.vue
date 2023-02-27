<script setup lang="ts">
import RplTextLink from '../text-link/RplTextLink.vue'
import RplIcon from '../icon/RplIcon.vue'
import RplButton from '../button/RplButton.vue'
import { IRplHeaderLinkExtended } from './constants'
import { RplLink } from '../../lib/constants'

interface Props {
  primary?: RplLink
  secondary?: IRplHeaderLinkExtended
}

withDefaults(defineProps<Props>(), {
  primary: undefined,
  secondary: undefined
})
</script>

<template>
  <div class="rpl-header-actions">
    <RplButton
      v-if="primary"
      :url="primary.url"
      class="rpl-header-actions__primary"
      el="a"
    >
      {{ primary.text }}
    </RplButton>
    <div class="rpl-header-actions__secondary">
      <p
        v-if="secondary.title"
        class="rpl-header-actions__secondary-title rpl-header__text-large-fixed rpl-type-p"
      >
        {{ secondary.title }}
      </p>
      <RplTextLink
        v-if="secondary"
        :url="secondary.url"
        class="rpl-header-actions__secondary-link rpl-header__icon-link"
      >
        <span>{{ secondary.text }}</span
        ><RplIcon name="icon-arrow-right" size="xs" />
      </RplTextLink>
    </div>
  </div>
</template>

<style src="./RplHeaderActions.css" />
