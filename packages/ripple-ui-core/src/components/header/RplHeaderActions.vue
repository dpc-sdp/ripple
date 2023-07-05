<script setup lang="ts">
import RplTextLink from '../text-link/RplTextLink.vue'
import RplIcon from '../icon/RplIcon.vue'
import RplButton from '../button/RplButton.vue'
import { IRplHeaderLinkExtended } from './constants'
import { RplLink } from '../../lib/constants'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  primary?: RplLink
  secondary?: IRplHeaderLinkExtended
}

withDefaults(defineProps<Props>(), {
  primary: undefined,
  secondary: undefined
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-header', emit)

const handleClick = (item) => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      text: item.text,
      value: item.url,
      type: 'hero'
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-header-actions">
    <RplButton
      v-if="primary"
      :url="primary.url"
      class="rpl-header-actions__primary"
      el="a"
      @click="() => handleClick(primary)"
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
        @click="() => handleClick(secondary)"
      >
        <span>{{ secondary.text }}</span
        ><RplIcon name="icon-arrow-right" size="xs" />
      </RplTextLink>
    </div>
  </div>
</template>

<style src="./RplHeaderActions.css" />
