<script setup lang="ts">
import RplCampaignBanner from './RplCampaignBanner.vue'
import RplImage from '../image/RplImage.vue'
import RplButton from '../button/RplButton.vue'
import { RplLink } from '../../lib/constants'
import { IRplImageType } from '../image/constants'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  title: string
  image?: IRplImageType
  link?: RplLink
}

const props = withDefaults(defineProps<Props>(), {
  image: undefined,
  link: undefined
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-campaign-banner', emit)

const handleClick = () => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      label: props.title,
      text: props.link?.text,
      value: props.link?.url,
      type: 'primary'
    },
    { global: true }
  )
}
</script>

<template>
  <RplCampaignBanner class="rpl-campaign-banner--primary">
    <template v-if="image" #media>
      <RplImage
        v-bind="image"
        :aspect="{ xs: 'wide', s: 'panorama' }"
        sizes="xs:715px"
        alt=""
        data-cy="image"
      />
    </template>
    <template #title>
      <h2 class="rpl-campaign-banner__title rpl-type-h2" data-cy="title">
        {{ title }}
      </h2>
    </template>
    <slot></slot>
    <div v-if="link" class="rpl-campaign-banner__action">
      <RplButton el="a" :url="link.url" data-cy="cta" @click="handleClick">
        {{ link.text }}
      </RplButton>
    </div>
    <template v-if="$slots.meta" #meta>
      <slot name="meta"></slot>
    </template>
  </RplCampaignBanner>
</template>
