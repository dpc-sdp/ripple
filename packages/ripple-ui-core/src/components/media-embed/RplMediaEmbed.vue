<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  RplMediaEmbedTypes,
  RplMediaEmbedVariants,
  RplMediaEmbedSizes
} from './constants'
import RplImage from '../image/RplImage.vue'
import RplIcon from '../icon/RplIcon.vue'
import RplModal from '../modal/RplModal.vue'
import RplContent from '../content/RplContent.vue'
import RplExpandable from '../expandable/RplExpandable.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

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
  fullscreenLabel?: string
  dataContent?: string
  dataLabel?: string
  downloadUrl?: string
  downloadLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: undefined,
  size: undefined,
  showTitle: false,
  transcriptUrl: undefined,
  caption: undefined,
  sourceCaption: undefined,
  allowFullscreen: false,
  fullscreenLabel: undefined,
  dataContent: undefined,
  dataLabel: undefined,
  downloadUrl: undefined,
  downloadLabel: undefined
})

const emit = defineEmits<{
  (e: 'viewTranscript', payload: rplEventPayload & { action: 'click' }): void
  (
    e: 'viewFullscreen',
    payload: rplEventPayload & { action: 'enter' | 'exit' }
  ): void
  (e: 'viewData', payload: rplEventPayload & { action: 'open' | 'close' }): void
  (e: 'downloadImage', payload: rplEventPayload & { action: 'download' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-media-embed', emit)

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

const transcriptContentLabel = computed(() => {
  return 'View transcript'
})
const dataContentLabel = computed(() => {
  if (props.dataLabel) {
    return props.dataLabel
  }

  return `${!isDataContentOpen.value ? 'View' : 'Close'} '${props.title}' data`
})
const fullscreenContentLabel = computed(() => {
  return props.fullscreenLabel || `View '${props.title}' fullscreen`
})
const downloadContentLabel = computed(() => {
  return props.downloadLabel || `Download' ${props.title}'`
})

const toggleFullscreen = (event) => {
  isFullScreenOpen.value = !isFullScreenOpen.value

  emitRplEvent(
    'viewFullscreen',
    {
      action: isFullScreenOpen.value ? 'enter' : 'exit',
      text: event?.label || fullscreenContentLabel.value,
      label: props.title
    },
    { global: true }
  )
}

const toggleData = () => {
  isDataContentOpen.value = !isDataContentOpen.value

  emitRplEvent(
    'viewData',
    {
      action: isDataContentOpen.value ? 'open' : 'close',
      text: dataContentLabel.value,
      label: props.title
    },
    { global: true }
  )
}

const handleTranscript = () => {
  emitRplEvent(
    'viewTranscript',
    {
      action: 'click',
      text: transcriptContentLabel.value,
      label: props.title
    },
    { global: true }
  )
}

const handleDownload = () => {
  emitRplEvent(
    'downloadImage',
    {
      action: 'download',
      text: downloadContentLabel.value,
      label: props.title,
      value: props?.downloadUrl
    },
    { global: true }
  )
}
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
        :aspect="{ xs: imageAspect }"
        sizes="xs:768px"
        :circle="variant === 'avatar'"
        :class="imageClasses"
      />

      <!-- Video -->
      <div
        v-else-if="type === 'video'"
        class="rpl-media-embed__video-container"
      >
        <iframe
          class="rpl-media-embed__video rpl-u-screen-only"
          :src="src"
          allow="autoplay; fullscreen; picture-in-picture"
          allowfullscreen
          data-chromatic="ignore"
          :title="title"
        >
        </iframe>
        <RplTextLink class="rpl-type-p rpl-u-print-only" :url="src">
          {{ title }}
        </RplTextLink>
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
        <RplTextLink
          class="rpl-media-embed__transcript-link rpl-media-embed__action rpl-u-focusable-inline rpl-type-p"
          :url="transcriptUrl"
          @click="handleTranscript"
        >
          <RplIcon name="icon-view" />{{ transcriptContentLabel }}
        </RplTextLink>
      </li>

      <!-- Fullscreen button -->
      <li v-if="allowFullscreen">
        <button
          class="rpl-media-embed__fullscreen-button rpl-media-embed__action rpl-u-focusable-inline rpl-type-p rpl-u-screen-only"
          type="button"
          @click="toggleFullscreen"
        >
          <RplIcon name="icon-enlarge-square-filled" />{{
            fullscreenContentLabel
          }}
        </button>
      </li>

      <!-- View data toggle & content -->
      <li v-if="dataContent">
        <button
          class="rpl-media-embed__view-data-toggle rpl-media-embed__action rpl-u-focusable-inline rpl-type-p rpl-u-screen-only"
          @click="toggleData"
        >
          <RplIcon v-if="isDataContentOpen" name="icon-cancel" />
          <RplIcon v-else name="icon-table-lined" />{{ dataContentLabel }}
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
        <RplTextLink
          class="rpl-media-embed__download-link rpl-media-embed__action rpl-u-focusable-inline rpl-type-p"
          :url="downloadUrl"
          download
          @click="handleDownload"
        >
          <RplIcon name="icon-download" class="rpl-u-screen-only" />{{
            downloadContentLabel
          }}
        </RplTextLink>
      </li>
    </ul>

    <RplModal
      :is-open="isFullScreenOpen"
      class-name="rpl-media-embed__modal"
      @close="toggleFullscreen"
    >
      <RplImage :src="props.src" :alt="props.caption" fit="contain" />
      <template #below>
        <div class="rpl-media-embed__content">
          <h3 class="rpl-type-h3 rpl-u-margin-b-2">{{ props.title }}</h3>
          <p class="rpl-type-p">{{ props.caption }}</p>
        </div>
      </template>
    </RplModal>
  </div>
</template>
