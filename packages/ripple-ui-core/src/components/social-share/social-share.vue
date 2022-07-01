<script lang="ts">
export default { name: 'RplSocialShare' }
</script>

<script setup lang="ts">
import { PropType } from 'vue'
import { RplSocialShareItemArray } from './constants'
import RplTextLink from '../text-link/text-link.vue'
import RplIcon from '../icon/icon.vue'

defineProps({
  title: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: 'Share this'
  },
  items: {
    type: Array as PropType<typeof RplSocialShareItemArray[]>,
    default: () => []
  }
})
</script>

<template>
  <div class="rpl-social-share">
    <h3 v-if="title" class="rpl-type-h3">{{ title }}</h3>
    <ul v-if="items.length > 0" class="rpl-social-share__items rpl-type-p">
      <li
        v-for="(item, index) of items"
        :key="index"
        class="rpl-social-share__item"
      >
        <RplTextLink
          :url="item.url"
          :theme="false"
          class="rpl-social-share__link rpl-icon-and-text rpl-u-focusable"
        >
          <RplIcon
            v-if="item.icon"
            class="rpl-icon-and-text__icon"
            :name="item.icon"
          ></RplIcon>
          <span class="rpl-icon-and-text__label rpl-type-label-small">{{
            item.label
          }}</span>
        </RplTextLink>
      </li>
    </ul>
  </div>
</template>

<style src="./social-share.css" />
