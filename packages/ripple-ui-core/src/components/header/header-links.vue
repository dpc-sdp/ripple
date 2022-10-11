<script lang="ts">
export default { name: 'RplHeaderLinks' }
</script>

<script setup lang="ts">
import RplList from '../list/list.vue'
import RplTextLink from '../text-link/text-link.vue'
import RplIcon from '../icon/icon.vue'
import { RplListItemArray } from '../list/constants'
import { RplLink } from '../../lib/constants'

interface Props {
  title?: string
  items: RplListItemArray[]
  moreLink?: RplLink
}

withDefaults(defineProps<Props>(), {
  title: undefined,
  moreLink: undefined
})
</script>

<template>
  <div class="rpl-header-links">
    <h2 v-if="title" class="rpl-header-links__title rpl-type-h4">
      {{ title }}
    </h2>
    <RplList
      :items="items"
      container-class="rpl-header-links__list"
      item-class="rpl-header-links__item rpl-header__text-large-fixed rpl-type-p"
      icon-placement="after"
    />
    <RplTextLink
      v-if="moreLink"
      :url="moreLink.url"
      class="
        rpl-header__text-large-fixed rpl-header__icon-link
        rpl-header-links__more
        rpl-type-p rpl-type-weight-bold
      "
    >
      <span>{{ moreLink.text }}</span
      ><RplIcon name="icon-arrow-right" size="xs" />
    </RplTextLink>
  </div>
</template>

<style src="./header-links.css" />
