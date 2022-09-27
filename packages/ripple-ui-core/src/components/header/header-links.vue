<script lang="ts">
export default { name: 'RplHeaderLinks' }
</script>

<script setup lang="ts">
import RplList from '../list/list.vue'
import { CoreLink } from './constants'
import RplTextLink from '../text-link/text-link.vue'
import RplIcon from '../icon/icon.vue'
import { RplListItemArray } from '../list/constants'

interface Props {
  title?: string
  items: RplListItemArray[]
  moreLink?: CoreLink
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
      item-class="rpl-header-links__item rpl-type-p"
    />
    <RplTextLink
      v-if="moreLink"
      :url="moreLink.url"
      class="rpl-header__icon-link rpl-header-links__item rpl-type-p rpl-type-weight-bold"
    >
      {{ moreLink.text }} <RplIcon name="icon-arrow-right" size="xs" />
    </RplTextLink>
  </div>
</template>

<style src="./header-links.css" />
