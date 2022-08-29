<script lang="ts"> export default { name: 'RplFile' }</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/icon.vue'
import { isExternalLink } from '../../lib/helpers'
import { RplPropLabel, RplPropStringRequired, RplPropUrl } from '../../lib/constants'

const props = defineProps({
  name: RplPropStringRequired,
  url: RplPropUrl,
  extension: RplPropStringRequired,
  size: RplPropStringRequired,
  updated: RplPropLabel,
  caption: RplPropLabel,
})

const isExternal = computed(() => isExternalLink(props.url))
</script>

<template>
  <figure class="rpl-file">
    <a
      tabindex="-1"
      class="rpl-file__link"
      :aria-label="`${name} File type: ${extension}. Size: ${size}. ${isExternal ? 'Opens in new tab.' : ''}`"
      :href="url"
      :download="isExternal ? null : ''"
      :target="isExternal ? '_blank' : null">
      <RplIcon name="icon-document-lined" class="rpl-file__icon" size="l" colour="default"></RplIcon>
      <div class="rpl-file__info">
        <span class="rpl-file__name rpl-type-label rpl-type-weight-bold rpl-u-focusable rpl-u-focusable--inline" tabindex="0">{{ name }}</span>
        <div class="rpl-file__meta rpl-type-label-small">
          <span class="rpl-file__type">{{ extension }}</span>
          <span class="rpl-file__size">{{ size }}</span>
          <div v-if="updated" class="rpl-file__updated">Updated {{ updated }}</div>
        </div>
      </div>
    </a>
    <figcaption v-if="caption" class="rpl-file__caption rpl-type-label" v-html="caption"></figcaption>
  </figure>
</template>
