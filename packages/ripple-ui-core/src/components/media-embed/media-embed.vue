<script lang="ts">
export default { name: 'RplMediaEmbed' }
</script>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  RplMediaEmbedTypes,
  RplMediaEmbedVariants,
  RplMediaEmbedSizes
} from './constants'
import RplImage from '../image/image.vue'
import RplIcon from '../icon/icon.vue'
import RplModal from '../modal/modal.vue'
import RplContent from '../content/content.vue'
import RplExpandable from '../expandable/expandable.vue'

interface Props {
  type: RplMediaEmbedTypes
  variant?: RplMediaEmbedVariants
  size?: RplMediaEmbedSizes
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
  variant: undefined,
  size: undefined,
  showTitle: false,
  transcriptUrl: undefined,
  caption: undefined,
  sourceCaption: undefined,
  allowFullscreen: false,
  dataContent: undefined,
  downloadUrl: undefined
})

const isFullScreenOpen = ref(false)
const isDataContentOpen = ref(false)

const imageAspect = computed(() => {
  if (props.type != 'image') {
    return undefined
  }

  switch (props.variant) {
    case 'landscape':
      return 'wide'
    case 'portrait':
      return 'full'
    case 'square':
      return 'square'
    case 'avatar':
      return 'square'
    default:
      return undefined
  }
})

const imageClasses = computed(() => {
  if (props.type != 'image') {
    return undefined
  }

  let classes = 'rpl-media-embed__image '

  if (props.variant) {
    classes += `rpl-media-embed__image--${props.variant} `
  }

  if (props.size) {
    classes += `rpl-media-embed__image--${props.size} `
  }

  return classes
})

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
    <h3 v-if="showTitle" class="rpl-type-h3 rpl-u-margin-b-3">
      {{ title }}
    </h3>

    <!-- Figure (iframe, caption, source info) -->
    <figure class="rpl-media-embed__figure">
      <!-- Image -->
      <RplImage
        v-if="type === 'image'"
        :src="src"
        :alt="caption"
        :aspect="imageAspect"
        :circle="variant === 'avatar'"
        :class="imageClasses"
      />

      <!-- Video -->
      <div
        v-else-if="type === 'video'"
        class="rpl-media-embed__video-container"
      >
        <iframe
          class="rpl-media-embed__video"
          :src="src"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          data-chromatic="ignore"
          :title="title"
        >
        </iframe>
      </div>

      <!-- Caption and source caption -->
      <figcaption
        v-if="caption || sourceCaption"
        class="rpl-media-embed__figcaption"
      >
        <p v-if="caption" class="rpl-media-embed__caption rpl-type-p">
          {{ caption }}
        </p>
        <p
          v-if="sourceCaption"
          class="rpl-media-embed__source-caption rpl-type-p-small"
        >
          {{ sourceCaption }}
        </p>
      </figcaption>
    </figure>

    <!-- Actions list -->
    <ul v-if="!isActionsListEmpty" class="rpl-media-embed__actions-list">
      <!-- Transcript link -->
      <li v-if="transcriptUrl">
        <a
          class="
            rpl-media-embed__transcript-link rpl-media-embed__action
            rpl-u-focusable-inline rpl-type-p
          "
          target="_blank"
          :href="transcriptUrl"
        >
          <RplIcon name="icon-view" />View transcript
        </a>
      </li>

      <!-- Fullscreen button -->
      <li v-if="allowFullscreen">
        <button
          class="
            rpl-media-embed__fullscreen-button rpl-media-embed__action
            rpl-u-focusable-inline rpl-type-p
          "
          type="button"
          @click="isFullScreenOpen = !isFullScreenOpen"
        >
          <RplIcon name="icon-enlarge-square-filled" />View '{{ title }}'
          fullscreen
        </button>
      </li>

      <!-- View data toggle & content -->
      <li v-if="dataContent">
        <button
          class="
            rpl-media-embed__view-data-toggle rpl-media-embed__action
            rpl-u-focusable-inline rpl-type-p
          "
          @click="isDataContentOpen = !isDataContentOpen"
        >
          <span v-if="isDataContentOpen">
            <RplIcon name="icon-cancel" />Close '{{ title }}' data
          </span>
          <span v-else>
            <RplIcon name="icon-table-lined" />View '{{ title }}'' data
          </span>
        </button>

        <RplExpandable
          :aria-hidden="isDataContentOpen ? null : 'true'"
          :expanded="isDataContentOpen"
          class="rpl-media-embed__view-data-content"
        >
          <RplContent :html="dataContent"></RplContent>
        </RplExpandable>
      </li>

      <!-- Download link -->
      <li v-if="downloadUrl">
        <a
          class="
            rpl-media-embed__download-link rpl-media-embed__action
            rpl-u-focusable-inline rpl-type-p
          "
          :href="downloadUrl"
          download
        >
          <RplIcon name="icon-download" />Download '{{ title }}'
        </a>
      </li>
    </ul>

    <RplModal
      :is-open="isFullScreenOpen"
      @close="() => (isFullScreenOpen = false)"
    >
      <RplImage :src="props.src" :alt="props.caption" />
      <template #below>
        <h3 class="rpl-type-h3 rpl-u-margin-b-2">{{ props.title }}</h3>
        <p class="rpl-type-p">{{ props.caption }}</p>
      </template>
    </RplModal>
  </div>
</template>

<style src="./media-embed.css" />
