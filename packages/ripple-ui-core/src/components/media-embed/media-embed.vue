<script lang="ts">
export default { name: 'RplMediaEmbed' }
</script>

<script setup lang="ts">
import { ref } from 'vue'
import RplIcon from '../icon/icon.vue'
import RplContent from '../content/content.vue'
import RplExpandable from '../expandable/expandable.vue'

interface Props {
  title: string
  src: string
  showTitle?: boolean
  transcriptUrl?: string
  caption?: string
  allowFullscreen?: boolean
  dataContent?: string
  downloadUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  transcriptUrl: undefined,
  caption: undefined,
  allowFullscreen: true,
  dataContent: undefined,
  downloadUrl: undefined
})

const isDataContentOpen = ref(false)
</script>

<template>
  <div class="rpl-media-embed">
    <!-- Title -->
    <h3 v-if="props.showTitle" class="rpl-type-h3">{{ props.title }}</h3>

    <!-- iframe -->
    <iframe
      class="rpl-media-embed__iframe"
      :title="props.title"
      :src="props.src"
    ></iframe>

    <!-- Transcript link -->
    <a
      v-if="props.transcriptUrl"
      class="rpl-media-embed__transcript-link"
      :href="props.transcriptUrl"
    >
      <RplIcon name="icon-view" /> View transcript
    </a>

    <!-- Caption -->
    <span v-if="props.caption" class="rpl-media-embed__caption">{{
      caption
    }}</span>

    <!-- Fullscreen button -->
    <button
      v-if="props.allowFullscreen"
      class="rpl-media-embed__fullscreen-button"
      type="button"
    >
      <RplIcon name="icon-enlarge-square-filled" /> View '{{ props.title }}''
      fullscreen
    </button>

    <!-- View data button -->
    <button
      v-if="props.dataContent"
      class="rpl-media-embed__view-data-toggle"
      @click="isDataContentOpen = !isDataContentOpen"
    >
      <span v-if="isDataContentOpen">
        <RplIcon name="icon-cancel" /> Close '{{ props.title }}' data
      </span>
      <span v-else>
        <RplIcon name="icon-table-lined" /> View '{{ props.title }}'' data
      </span>
    </button>

    <!-- View data content -->
    <RplExpandable
      :aria-hidden="isDataContentOpen ? null : 'true'"
      :expanded="isDataContentOpen"
      class="rpl-media-embed__view-data-content"
    >
      <RplContent :html="props.dataContent"></RplContent>
    </RplExpandable>

    <!-- Download link -->
    <a v-if="props.downloadUrl" class="rpl-media-embed__download-link">
      <RplIcon name="icon-download" /> Download '{{ props.title }}'
    </a>
  </div>
</template>

<style src="./media-embed.css" />
