<script lang="ts">
export default { name: 'RplHeaderActions' }
</script>

<script setup lang="ts">
import RplTextLink from '../text-link/text-link.vue'
import RplIcon from '../icon/icon.vue'
import RplButton from '../button/button.vue'
import { RplHeaderLinkExtended } from './constants'
import { RplLink } from '../../lib/constants'

interface Props {
  primary?: RplLink
  secondary?: RplHeaderLinkExtended
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
      <p v-if="secondary.title" class="rpl-type-p">
        {{ secondary.title }}
      </p>
      <RplTextLink
        v-if="secondary"
        :url="secondary.url"
        class="rpl-header__icon-link rpl-type-label rpl-type-weight-bold"
      >
        <span>{{ secondary.text }}</span
        ><RplIcon name="icon-arrow-right" size="xs" />
      </RplTextLink>
    </div>
  </div>
</template>

<style src="./header-actions.css" />
