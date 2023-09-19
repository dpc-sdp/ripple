<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/RplIcon.vue'
import { RplIconNames } from '../icon/constants'
import { RplColorThemes } from '../../lib/constants'
import { IRplDescriptionListVariant } from './constants'

interface Props {
  inline?: boolean
  term: string
  variant?: IRplDescriptionListVariant
  iconName?: (typeof RplIconNames)[number]
  iconColour?: (typeof RplColorThemes)[number]
}

const props = withDefaults(defineProps<Props>(), {
  inline: false,
  variant: 'default',
  iconName: undefined,
  iconColour: 'default'
})

const iconOnly = computed(() => props.variant === 'icon')
const iconClasses = computed(() => ({
  'rpl-description-list--with-icon': props.iconName,
  'rpl-description-list--only-icon': iconOnly.value
}))
const termClass = computed(() => ({ 'rpl-u-visually-hidden': iconOnly.value }))
</script>

<template>
  <div
    v-if="inline"
    :class="{ 'rpl-description-list__inline-wrap': true, ...iconClasses }"
  >
    <dt class="rpl-description-list__term">
      <RplIcon
        v-if="iconName"
        :name="iconName"
        :colour="iconColour"
        aria-hidden="true"
      /><span :class="termClass">{{ term }}</span>
    </dt>
    <dd class="rpl-description-list__description"><slot /></dd>
  </div>
  <template v-else>
    <dt :class="{ 'rpl-description-list__term': true, ...iconClasses }">
      <RplIcon
        v-if="iconName"
        :name="iconName"
        :colour="iconColour"
        aria-hidden="true"
      /><span :class="termClass">{{ term }}</span>
    </dt>
    <dd class="rpl-description-list__description"><slot /></dd>
  </template>
</template>

<style src="./RplDescriptionList.css" />
