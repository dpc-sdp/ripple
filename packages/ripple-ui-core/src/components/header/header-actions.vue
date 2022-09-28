<script lang="ts">
export default { name: 'RplHeaderActions' }
</script>

<script setup lang="ts">
import RplTextLink from '../text-link/text-link.vue'
import RplIcon from '../icon/icon.vue'
import RplButton from '../button/button.vue'
import { ContextLink, CoreLink } from './constants'

interface Props {
  primary: CoreLink // TODO
  secondary: ContextLink
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
      class="rpl-header-actions__button"
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
        {{ secondary.text }}
        <RplIcon name="icon-arrow-right" size="s" />
      </RplTextLink>
    </div>
  </div>
</template>

<style src="./header-actions.css" />
