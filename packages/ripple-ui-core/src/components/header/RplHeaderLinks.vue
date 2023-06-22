<script setup lang="ts">
import RplList from '../list/RplList.vue'
import RplButton from '../button/RplButton.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import RplIcon from '../icon/RplIcon.vue'
import { IRplListItemArray } from '../list/constants'
import { RplLink } from '../../lib/constants'

interface Props {
  title?: string
  items: IRplListItemArray[]
  type?: 'link' | 'button'
  moreLink?: RplLink
}

withDefaults(defineProps<Props>(), {
  title: undefined,
  type: 'link',
  moreLink: undefined
})
</script>

<template>
  <div :class="`rpl-header-links rpl-header-links--${type}`">
    <h2 v-if="title" class="rpl-header-links__title rpl-type-h4">
      {{ title }}
    </h2>
    <RplList
      v-if="type === 'link'"
      :items="items"
      container-class="rpl-header-links__list"
      item-class="rpl-header-links__item rpl-header__text-large-fixed rpl-type-p"
      icon-placement="after"
    />
    <div v-else class="rpl-header-links__list">
      <RplButton
        v-for="item in items"
        :key="item.url"
        :url="item.url"
        el="a"
        class="rpl-header-links__item"
      >
        {{ item.text }}
      </RplButton>
    </div>
    <div v-if="moreLink" class="rpl-header-links__more">
      <RplTextLink
        :url="moreLink.url"
        class="rpl-header__text-large-fixed rpl-header__icon-link rpl-type-p rpl-type-weight-bold"
      >
        <span>{{ moreLink.text }}</span
        ><RplIcon name="icon-arrow-right" size="xs" />
      </RplTextLink>
    </div>
  </div>
</template>

<style src="./RplHeaderLinks.css" />
