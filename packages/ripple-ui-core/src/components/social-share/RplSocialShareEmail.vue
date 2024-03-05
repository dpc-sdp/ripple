<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/RplIcon.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  title: string
  subject: string
  body: string
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
const handleClick = () => {
  emitRplEvent(
    'openShareWindow',
    {
      action: 'share',
      text: 'Email',
      label: props?.label
    },
    { global: true }
  )
}

const mailtoUrl = computed(
  () =>
    `mailto:?subject=${props.subject}&body=${props.body} %0D%0A %0D%0A ${props.url}`
)
</script>

<template>
  <RplTextLink
    :url="mailtoUrl"
    aria-label="Share this page via email"
    class="rpl-social-share-link rpl-type-p-small"
    @click="handleClick"
  >
    <RplIcon class="rpl-social-share__icon" name="icon-mail" />
    <span>Email</span>
  </RplTextLink>
</template>
