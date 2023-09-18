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
const termClass = computed(() => ({ 'rpl-u-visually-hidden': iconOnly.value }))
</script>

<template>
  <div v-if="inline" class="rpl-description-list__inline-wrap">
    <RplIcon
      v-if="iconName && !iconOnly"
      :name="iconName"
      :colour="iconColour"
      aria-hidden="true"
    />
    <div :class="`rpl-description-list__inline-${variant}`">
      <dt class="rpl-description-list__term">
        <RplIcon
          v-if="iconName && iconOnly"
          :name="iconName"
          :colour="iconColour"
          aria-hidden="true"
        /><span :class="termClass">{{ term }}</span>
      </dt>
      <dd class="rpl-description-list__description"><slot /></dd>
    </div>
  </div>
  <template v-else>
    <dt
      :class="`rpl-description-list__term rpl-description-list__term-${variant}`"
    >
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
