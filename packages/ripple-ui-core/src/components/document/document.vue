<script lang="ts">
export default { name: 'RplDocument' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/icon.vue'
import { isExternalLink } from '../../lib/helpers'

interface Props {
  name: string
  url: string
  extension?: string
  size?: string
  updated?: string
  caption?: string
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  extension: undefined,
  size: undefined,
  updated: undefined,
  caption: undefined,
  icon: 'document-lined'
})

const isExternal = computed(() => isExternalLink(props.url))
const hasMeta = computed(() => props.extension || props.size || props.updated)

const ariaLabel = computed(() => {
  let label = props.name

  if (props.extension) {
    label += ` File type: ${props.extension}`
  }

  if (props.size) {
    label += ` Size: ${props.size}`
  }

  return label
})
</script>

<template>
  <figure :class="{ 'rpl-document': true, 'rpl-document--centered': !hasMeta }">
    <a
      tabindex="-1"
      class="rpl-document__link"
      :aria-label="ariaLabel"
      :href="url"
      :download="isExternal ? null : ''"
      :target="isExternal ? '_blank' : null"
    >
      <RplIcon :name="`icon-${icon}`" size="l" colour="default" />
      <div class="rpl-document__info">
        <span
          tabindex="0"
          class="rpl-document__name rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline">
          {{ name }}
        </span>
        <div v-if="hasMeta" class="rpl-document__meta rpl-type-label-small">
          <span v-if="extension" class="rpl-document__type">{{ extension }}</span>
          <span v-if="size" class="rpl-document__size">{{ size }}</span>
          <div v-if="updated" class="rpl-document__updated">
            Updated {{ updated }}
          </div>
        </div>
      </div>
    </a>
    <figcaption
      v-if="caption"
      class="rpl-document__caption rpl-type-p-small"
      v-html="caption"
    />
  </figure>
</template>

<style src="./document.css" />
