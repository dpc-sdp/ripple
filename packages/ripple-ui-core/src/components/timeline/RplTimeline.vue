<script setup lang="ts">
import RplTextLink from '../text-link/RplTextLink.vue'
import RplImage from '../image/RplImage.vue'
import { formatDateRange } from '../../lib/helpers'
import { IRplImageType } from '../image/constants'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  title?: string | null
  items?: IRplTimelineItem[]
}

interface IRplTimelineItem {
  image?: IRplImageType
  title: string
  subtitle: string
  dateStart: string
  dateEnd: string
  current: boolean
  description: string
  url: string
}

const props = withDefaults(defineProps<Props>(), {
  title: null,
  items: () => []
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-timeline', emit)

const subtitle = (item: IRplTimelineItem) => {
  if (item.dateStart && item.dateEnd) {
    // Format raw dates
    return formatDateRange({ from: item.dateStart, to: item.dateEnd })
  } else if (item.subtitle) {
    return item.subtitle
  }
  return null
}
const hasSubtitle = (item: IRplTimelineItem) => {
  return item.dateStart || item.dateEnd || item.subtitle
}
const classes = (item: IRplTimelineItem, index: number) => {
  const classList = ['rpl-timeline__item']
  if (item.image) {
    classList.push('rpl-timeline__item--with-image')
  }
  if (item.current) {
    classList.push('rpl-timeline__item--current')
  }
  if (index < props.items.map((x) => x.current).lastIndexOf(true)) {
    classList.push('rpl-timeline__item--active')
  }
  return classList.join(' ')
}

const handleClick = (item) => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      text: item?.title,
      value: item.url
    },
    { global: true }
  )
}
</script>

<template>
  <div class="rpl-timeline">
    <h2 v-if="title" class="rpl-type-h2-fixed rpl-timeline__heading">
      {{ title }}
    </h2>
    <ul v-if="items.length > 0" class="rpl-timeline__items rpl-type-p">
      <li
        v-for="(item, index) of items"
        :key="index"
        :class="classes(item, index)"
      >
        <RplImage
          v-if="item.image"
          v-bind="item.image"
          ref="image"
          class="rpl-timeline__item-image"
          circle
          :aspect="{ xs: 'square' }"
          sizes="xs:80px"
          alt=""
        />
        <h3
          v-if="item.title"
          class="rpl-type-h3-fixed rpl-timeline__item-title"
        >
          <RplTextLink
            v-if="item.url"
            class="rpl-timeline__item-link"
            :url="item.url"
            @click="() => handleClick(item)"
            >{{ item.title }}</RplTextLink
          >
          <template v-else>{{ item.title }}</template>
        </h3>
        <p
          v-if="hasSubtitle(item)"
          class="rpl-timeline__item-subtitle rpl-type-p"
        >
          {{ subtitle(item) }}
        </p>
        <div
          v-if="item.description"
          class="rpl-timeline__item-description"
          v-html="item.description"
        ></div>
      </li>
    </ul>
  </div>
</template>

<style src="./RplTimeline.css" />
