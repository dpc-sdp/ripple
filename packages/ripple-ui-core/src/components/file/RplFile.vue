<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/RplIcon.vue'
import RplDocument from '../document/RplDocument.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'
import { RplIconSizes } from '../icon/constants'

interface Props {
  name?: string
  url?: string
  extension?: string
  size?: string
  updated?: string
  caption?: string
  iconSize?: (typeof RplIconSizes)[number]
}

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  url: undefined,
  extension: undefined,
  size: undefined,
  updated: undefined,
  caption: undefined,
  iconSize: 'l'
})

const emit = defineEmits<{
  (e: 'download', payload: rplEventPayload & { action: 'download' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-file', emit)

const onDownload = ({ action, value }) => {
  emitRplEvent(
    'download',
    {
      action,
      value,
      text: props.name,
      type: props.extension,
      size: props.size
    },
    { global: true }
  )
}

const hasInfo = computed(() => props.extension || props.size || props.updated)
</script>

<template>
  <RplDocument
    :url="url"
    :global-events="false"
    :class="`rpl-file--icon-${iconSize}`"
    @download="onDownload"
  >
    <template #icon>
      <RplIcon name="icon-document-lined" :size="iconSize" colour="default" />
    </template>
    <template v-if="name" #name>
      {{ name }}
    </template>
    <template v-if="hasInfo" #info>
      <span v-if="extension" class="rpl-file__meta">{{ extension }}</span>
      <span v-if="size" class="rpl-file__meta">{{ size }}</span>
      <div v-if="updated" class="rpl-file__updated">Updated {{ updated }}</div>
    </template>
    <template v-if="caption" #caption>
      <span v-html="caption"></span>
    </template>
  </RplDocument>
</template>
