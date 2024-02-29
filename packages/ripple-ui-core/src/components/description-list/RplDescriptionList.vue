<script setup lang="ts">
import type {
  IRplDescriptionListItem,
  IRplDescriptionListVariant
} from './constants'
import RplDescriptionListItem from './RplDescriptionListItem.vue'

interface Props {
  inline?: boolean
  items?: Array<IRplDescriptionListItem>
  variant?: IRplDescriptionListVariant
}

withDefaults(defineProps<Props>(), {
  inline: false,
  items: () => [],
  variant: 'default'
})
</script>

<template>
  <dl
    :class="{
      'rpl-description-list': true,
      'rpl-description-list--inline': inline,
      'rpl-type-p': true
    }"
  >
    <template v-for="row in items" :key="row.term">
      <RplDescriptionListItem
        :inline="inline"
        :term="row.term"
        :hide-term="row?.hideTerm"
        :variant="variant"
        :icon-name="row?.iconName"
        :icon-colour="row?.iconColour"
      >
        {{ row.description }}
      </RplDescriptionListItem>
    </template>
    <slot />
  </dl>
</template>

<style src="./RplDescriptionList.css" />
