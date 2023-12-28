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
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined
})

const emit = defineEmits<{
  (e: 'openShareWindow', payload: rplEventPayload & { action: 'share' }): void
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
      action: 'share',
      text: props.network,
      label: props?.label
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
    <span>{{ network === 'X' ? 'X (formerly Twitter)' : network }}</span>
  </RplTextLink>
</template>
