<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/RplIcon.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import { RplSocialShareNetworks } from './constants'
import { usePopupWindow } from '../../composables/usePopupWindow'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  network: string
  title: string
  url: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'openShareWindow', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-social-share', emit)

const key = computed(() => props.network.toLowerCase())

const shareTemplate = computed(() =>
  RplSocialShareNetworks[props.network]
    .replace('$t', encodeURIComponent(props.title))
    .replace('$u', encodeURIComponent(props.url))
)

const openPopup = usePopupWindow(shareTemplate.value, key.value)

const handleClick = () => {
  openPopup()

  emitRplEvent(
    'openShareWindow',
    {
      action: 'click',
      text: props.network,
      value: props.url
    },
    { global: true }
  )
}
</script>

<template>
  <RplTextLink
    :url="shareTemplate"
    :aria-label="`Share this page on ${network}`"
    class="rpl-social-share-link rpl-type-p-small"
    @click.prevent="handleClick"
  >
    <RplIcon class="rpl-social-share__icon" :name="`icon-${key}`"></RplIcon>
    <span>{{ network }}</span>
  </RplTextLink>
</template>
