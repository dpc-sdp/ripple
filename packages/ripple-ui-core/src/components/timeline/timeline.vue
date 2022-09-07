<script lang="ts">
export default { name: 'RplTimeline' }
</script>

<script setup lang="ts">
import { RplTimelineItem } from './constants'
import RplTextLink from '../text-link/text-link.vue'

interface Props {
  title?: string | null
  items?: RplTimelineItem[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Timeline heading',
  items: () => []
})

const subtitle = (item: RplTimelineItem) => {
  if (item.dateStart && item.dateEnd) {
    // return this.formatDateRange(item.dateStart, item.dateEnd)
    return `${item.dateStart} - ${item.dateEnd}`
  } else if (item.subtitle) {
    return item.subtitle
  }
  return null
}
const hasSubtitle = (item: RplTimelineItem) => {
  return item.dateStart || item.dateEnd || item.subtitle
}
const classes = (item: RplTimelineItem, index: number) => {
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
</script>

<template>
  <div class="rpl-timeline">
    <h2 v-if="title" class="rpl-type-h2-fixed rpl-timeline__heading">
      {{ title }}
    </h2>
    <ul v-if="items.length > 1" class="rpl-timeline__items rpl-type-p">
      <li
        v-for="(item, index) of items"
        :key="index"
        :class="classes(item, index)"
      >
        <img
          v-if="item.image"
          ref="image"
          :src="item.image"
          alt=""
          class="rpl-timeline__item-image"
        />
        <h3
          v-if="item.title"
          class="rpl-type-h3-fixed rpl-timeline__item-title"
        >
          <RplTextLink
            v-if="item.url"
            class="rpl-timeline__item-link"
            :url="item.url"
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

<style src="./timeline.css" />
