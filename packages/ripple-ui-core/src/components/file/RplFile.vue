<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/RplIcon.vue'
import RplDocument from '../document/RplDocument.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  name: string
  url: string
  extension?: string
  size?: string
  updated?: string
  caption?: string
}

const props = withDefaults(defineProps<Props>(), {
  extension: undefined,
  size: undefined,
  updated: undefined,
  caption: undefined
})

const emit = defineEmits<{
  (e: 'download', payload: rplEventPayload & { action: 'download' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-document', emit)

const onDownload = ({ id, action }) => {
  emitRplEvent(
    'download',
    { id, action, label: props.name, type: props.extension, size: props.size },
    { global: true }
  )
}

const hasInfo = computed(() => props.extension || props.size || props.updated)
</script>

<template>
  <RplDocument :url="url" @download="onDownload">
    <template #icon>
      <RplIcon name="icon-document-lined" size="l" colour="default" />
    </template>
    <template #name>
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
