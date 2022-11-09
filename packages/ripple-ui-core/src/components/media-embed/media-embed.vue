<script lang="ts">
export default { name: 'RplMediaEmbed' }
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RplIcon from '../icon/icon.vue'
import RplContent from '../content/content.vue'
import RplExpandable from '../expandable/expandable.vue'

interface Props {
  title: string
  src: string
  showTitle?: boolean
  transcriptUrl?: string
  caption?: string
  sourceCaption?: string
  allowFullscreen?: boolean
  dataContent?: string
  downloadUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  showTitle: true,
  transcriptUrl: undefined,
  caption: undefined,
  sourceCaption: undefined,
  allowFullscreen: true,
  dataContent: undefined,
  downloadUrl: undefined
})

const isDataContentOpen = ref(false)

const isActionsListEmpty = computed(() => {
  if (
    props.transcriptUrl ||
    props.allowFullscreen ||
    props.dataContent ||
    props.downloadUrl
  ) {
    return false
  }

  return true
})
</script>

<template>
  <div class="rpl-media-embed">
    <!-- Title -->
    <h3 v-if="props.showTitle" class="rpl-type-h3 rpl-u-margin-b-3">
      {{ props.title }}
    </h3>

    <!-- Figure (iframe, caption, source info) -->
    <figure class="rpl-media-embed__figure">
      <iframe
        class="rpl-media-embed__iframe"
        :title="props.title"
        :src="props.src"
      ></iframe>

      <figcaption
        v-if="props.caption || props.sourceCaption"
        class="rpl-media-embed__figcaption"
      >
        <p v-if="props.caption" class="rpl-media-embed__caption rpl-type-p">
          {{ props.caption }}
        </p>
        <p
          v-if="props.sourceCaption"
          class="rpl-media-embed__source-caption rpl-type-p-small"
        >
          {{ props.sourceCaption }}
        </p>
      </figcaption>
    </figure>

    <!-- Actions list -->
    <ul v-if="!isActionsListEmpty" class="rpl-media-embed__actions-list">
      <!-- Transcript link -->
      <li v-if="props.transcriptUrl">
        <a
          class="
            rpl-media-embed__transcript-link rpl-media-embed__action
            rpl-type-p
          "
          target="_blank"
          :href="props.transcriptUrl"
        >
          <RplIcon name="icon-view" />View transcript
        </a>
      </li>

      <!-- Fullscreen button -->
      <li v-if="props.allowFullscreen">
        <button
          class="
            rpl-media-embed__fullscreen-button rpl-media-embed__action
            rpl-type-p
          "
          type="button"
        >
          <RplIcon name="icon-enlarge-square-filled" />View '{{ props.title }}'
          fullscreen
        </button>
      </li>

      <!-- View data toggle & content -->
      <li v-if="props.dataContent">
        <button
          class="
            rpl-media-embed__view-data-toggle rpl-media-embed__action
            rpl-type-p
          "
          @click="isDataContentOpen = !isDataContentOpen"
        >
          <span v-if="isDataContentOpen">
            <RplIcon name="icon-cancel" />Close '{{ props.title }}' data
          </span>
          <span v-else>
            <RplIcon name="icon-table-lined" />View '{{ props.title }}'' data
          </span>
        </button>

        <RplExpandable
          :aria-hidden="isDataContentOpen ? null : 'true'"
          :expanded="isDataContentOpen"
          class="rpl-media-embed__view-data-content"
        >
          <RplContent :html="props.dataContent"></RplContent>
        </RplExpandable>
      </li>

      <!-- Download link -->
      <li v-if="props.downloadUrl">
        <a
          class="
            rpl-media-embed__download-link rpl-media-embed__action
            rpl-type-p
          "
        >
          <RplIcon name="icon-download" />Download '{{ props.title }}'
        </a>
      </li>
    </ul>
  </div>
</template>

<style src="./media-embed.css" />
