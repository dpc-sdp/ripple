<script lang="ts">
export default { name: 'RplFile' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import RplIcon from '../icon/icon.vue'
import RplDocument from '../document/document.vue'

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

const hasMeta = computed(() => props.extension || props.size || props.updated)
</script>

<template>
  <RplDocument :url="url">
    <template #icon>
      <RplIcon name="icon-document-lined" size="l" colour="default" />
    </template>
    <template #name>
      {{ name }}
    </template>
    <template v-if="hasMeta" #meta>
      <span v-if="extension" class="rpl-file__type">{{ extension }}</span>
      <span v-if="size" class="rpl-file__size">{{ size }}</span>
      <div v-if="updated" class="rpl-file__updated">
        Updated {{ updated }}
      </div>
    </template>
    <template v-if="caption" #caption>
      <span v-html="caption"></span>
    </template>
  </RplDocument>
</template>

<style src="./file.css" />
