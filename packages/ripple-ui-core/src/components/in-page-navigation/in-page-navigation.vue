<script lang="ts">
export default { name: 'RplInPageNavigation' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplInPageNavigationItemArray } from './constants'
import RplIcon from '../icon/icon.vue'
import RplTextLink from '../text-link/text-link.vue'

defineProps({
  title: {
    type: String as PropType<string>,
    default: 'On this page'
  },
  links: {
    type: Array as PropType<typeof RplInPageNavigationItemArray[]>,
    default: () => []
  }
})

const sub = (item: typeof RplInPageNavigationItemArray) => {
  return String(item.type) === 'h3'
}
</script>

<template>
  <div class="rpl-in-page-navigation">
    <h3 class="rpl-in-page-navigation__title rpl-type-h3">
      {{ title }}
    </h3>
    <ul v-if="links.length > 0" class="rpl-in-page-navigation__items">
      <li
        v-for="(item, index) of links"
        :key="index"
        class="rpl-in-page-navigation__item rpl-type-p-small"
      >
        <RplTextLink :url="item.url" class="rpl-in-page-navigation__link">
          <RplIcon
            v-if="sub(item)"
            class="rpl-in-page-navigation__icon"
            :name="`icon-indent`"
          ></RplIcon
          >{{ item.text }}
        </RplTextLink>
      </li>
    </ul>
  </div>
</template>

<style src="./in-page-navigation.css" />
