<script lang="ts">
export default { name: 'RplDocument' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { isExternalLink } from '../../lib/helpers'

interface Props {
  url: string
}

const props = defineProps<Props>()

const isExternal = computed(() => isExternalLink(props.url))

const ariaLabel = computed(() => {
  let label = props.name
  if (props.extension) {
    label += ` File type: ${props.extension}`
  }
  if (props.size) {
    label += ` Size: ${props.size}`
  }
  if (isExternal.value) {
    label += `Opens in new tab`
  }
  return label
})
</script>

<template>
  <figure :class="{ 'rpl-document': true, 'rpl-document--centered': !$slots.meta }">
    <a
      tabindex="-1"
      class="rpl-document__link"
      :href="url"
      :aria-label="ariaLabel"
      :download="isExternal ? null : ''"
      :target="isExternal ? '_blank' : null"
    >
      <div v-if="$slots.icon" class="rpl-document__icon">
        <slot name="icon"></slot>
      </div>
      <div class="rpl-document__info">
        <div
          v-if="$slots.name"
          class="rpl-document__name rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline"
          tabindex="0">
            <slot name="name"></slot>
        </div>
        <div v-if="$slots.name" class="rpl-document__meta rpl-type-label-small">
          <slot name="meta"></slot>
        </div>
      </div>
    </a>
    <figcaption
      v-if="$slots.caption"
      class="rpl-document__caption rpl-type-p-small"
    >
      <slot name="caption"></slot>
    </figcaption>
  </figure>
</template>

<style src="./document.css" />
