<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, inject, ref, watch, useAttrs } from 'vue'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter'
import { IRplFormProvidedState } from '../../types'
import { sanitisePIIField } from '../../lib/sanitisePII'

enum FileStatus {
  pending = 'pending',
  success = 'success',
  error = 'error',
  invalid = 'invalid'
}

interface FileUpload {
  id: string
  status: keyof typeof FileStatus
  error?: string | null
}

interface FileItem extends FileUpload {
  file: File
  progress: number
}

interface Props {
  id: string
  name: string
  value?: string[]
  label?: string
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  globalEvents?: boolean
  pii?: boolean
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
  allowedTypes?: { mimeType: string; extension: string }[]
  placeholder?: string
  onChange?: (value: string | string[]) => void
  handleUpload?: (
    id: string,
    file: File,
    onProgress: (progress: number) => void
  ) => Promise<{ id: string; status: FileStatus; error?: string }>
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  label: undefined,
  invalid: false,
  disabled: false,
  required: false,
  globalEvents: true,
  pii: true,
  multiple: false,
  maxFiles: undefined,
  maxSize: undefined,
  allowedTypes: () => [],
  placeholder: undefined,
  onChange: undefined,
  handleUpload: undefined
})

const attrs = useAttrs()

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-file', emit)

const form: IRplFormProvidedState | undefined = inject('form')

const emitUpdate = () => {
  const uploadedFiles = internalFiles.value
    .filter((file) => file.status === FileStatus.success)
    .map((file) => file.id)

  useFormkitFriendlyEventEmitter(props, emit, 'onChange', uploadedFiles)

  emitRplEvent(
    'update',
    {
      action: 'update',
      id: props.id,
      label: props?.label,
      contextId: form?.id,
      contextName: form?.name,
      value: sanitisePIIField(props.pii, uploadedFiles)
    },
    { global: props.globalEvents }
  )
}

// Refs
const inputRef = ref<HTMLInputElement | null>(null)
const dragging = ref(false)
const focusing = ref(false)
const errors = ref<string | null>(null)
const internalFiles = ref<FileItem[]>([])

// Computed
const acceptMultiple = computed(() => {
  return props.multiple || props.maxFiles > 1
})
const fileLimit = computed(() => {
  if (!acceptMultiple.value) return 1

  return props.maxFiles ? props.maxFiles : null
})
const filePlural = computed(() => (acceptMultiple.value ? 'files' : 'file'))
const placeholderText = computed(
  () => props.placeholder ?? `Drag and drop your ${filePlural.value} to upload`
)

const acceptedTypes = computed(() => {
  if (!props.allowedTypes?.length) return null

  return props.allowedTypes.map((type) => type.mimeType).join(',')
})

const extensions = computed(() => {
  if (!props.allowedTypes?.length) return null

  return props.allowedTypes
    .map((type) => type.extension.toUpperCase())
    .join(', ')
})

// Helpers
const getFileType = (name: string) => {
  return name.split('.').pop()?.toUpperCase() || ''
}

const getFileSize = (size: number) => {
  return Math.ceil(size * 0.000001 * 100) / 100
}

const getStatusIcon = (status: string) => {
  if (status === FileStatus.error || status === FileStatus.invalid) {
    return 'icon-exclamation-circle-filled'
  }

  return status === FileStatus.pending ? 'icon-loading' : 'icon-document-lined'
}

const getStatusColour = (status: string) => {
  if (status === FileStatus.error || status === FileStatus.invalid) {
    return 'error'
  }

  return 'default'
}

const getStatusText = (item: FileItem) => {
  const statusText = {
    success: 'uploaded successfully.',
    invalid: 'is invalid.',
    pending: 'upload in progress.',
    error: 'has failed to upload.'
  }

  if (item.error) {
    return `${item.file.name} ${item.error}`
  }

  return `${item.file.name} ${statusText[item.status]}`
}

const isValidType = (file: File): boolean => {
  const fileExtension = file.name.toLowerCase().split('.').pop()
  const allowedMimeTypes = props.allowedTypes?.map((type) => type.mimeType)
  const allowedExtensions = props.allowedTypes?.map((type) => type.extension)

  if (!allowedMimeTypes?.length && !allowedExtensions?.length) {
    return true
  }

  const validMimeType = allowedMimeTypes.includes(file.type)
  const validExtension = allowedExtensions.includes(fileExtension)

  return validMimeType && validExtension
}

const validateFile = (file: File) => {
  if (!isValidType(file)) {
    return `File is not in a supported format, please remove this file and select a ${extensions.value}`
  }

  if (props.maxSize && getFileSize(file.size) > props.maxSize) {
    return `File is too large, please remove this file and select a file less than ${props.maxSize} MB`
  }

  return null
}

// Handlers
const uploadFile = async (item: FileItem): Promise<FileUpload> => {
  if (!props.handleUpload) {
    console.error('No upload handler provided')

    return {
      id: item.id,
      status: FileStatus.error,
      error: 'Sorry file cannot be uploaded at this time.'
    }
  }

  try {
    return await props.handleUpload(item.id, item.file, (progress: number) => {
      const index = internalFiles.value.findIndex((f) => f.id === item.id)

      if (index !== -1) {
        internalFiles.value[index].progress = progress
      }
    })
  } catch (e) {
    return {
      id: item.id,
      status: FileStatus.error,
      error: 'Error uploading file'
    }
  }
}

const uploadFiles = async (files: FileItem[]) => {
  const uploads = files.map(async (file) => {
    const response = await uploadFile(file)

    internalFiles.value = internalFiles.value.map((item: FileItem) => {
      if (item.id !== file.id) return item
      return { ...item, ...response }
    })

    if (response.status === FileStatus.success) {
      emitUpdate()
    }

    return response
  })

  await Promise.all(uploads)
}

const prepareFiles = (newFiles: FileList) => {
  let files = Array.from(newFiles)

  return files.map((file) => {
    const name = file.name.replace(/[^a-zA-Z0-9]/g, '')
    const id = `${Date.now()}-${Math.random()}-${name}`
    const error = validateFile(file)
    const status = error ? FileStatus.invalid : FileStatus.pending

    return { id, file, error, status, progress: 0 } as FileItem
  })
}

const processFiles = (files: FileList) => {
  errors.value = null

  if (!files?.length) return

  // Check if adding new files would exceed the limit
  if (
    fileLimit.value &&
    files.length + internalFiles.value.length > fileLimit.value
  ) {
    errors.value = `There is a limit of ${fileLimit.value} ${filePlural.value}. Please remove a file before adding another.`
    return
  }

  // Update internal state
  const preparedFiles = prepareFiles(files)

  internalFiles.value = [...internalFiles.value, ...preparedFiles]

  // Get the pending files that need to be uploaded
  const pendingFiles = preparedFiles.filter(
    (file) => file.status === FileStatus.pending
  )

  uploadFiles(pendingFiles)
}

const handleChange = (e: Event) => {
  const input = e.target as HTMLInputElement

  if (input.files?.length) {
    processFiles(input.files)
  }

  input.value = ''
}

const retryFile = (index: number) => {
  const item = internalFiles.value[index]

  item.status = FileStatus.pending
  item.progress = 0
  item.error = null

  uploadFiles([item])
}

const removeFile = (index: number) => {
  errors.value = null

  internalFiles.value = internalFiles.value.filter((_, i) => i !== index)

  emitUpdate()
}

const replaceFile = (index: number) => {
  removeFile(index)

  inputRef.value?.click()
}

const ariaDescribedByIds = computed(() => {
  let describedby =
    typeof attrs['aria-describedby'] === 'string'
      ? attrs['aria-describedby']
      : ''
  const ids = describedby.trim().split(' ')

  if (props.allowedTypes?.length || props.maxFiles) {
    ids.push(`${props.id}-file-requirements`)
  }
  if (errors.value) {
    ids.push(`${props.id}-file-errors`)
  }

  return ids.join(' ')
})

watch(
  () => props.value,
  (newFiles, oldFiles) => {
    if (Array.isArray(oldFiles) && oldFiles.length && newFiles === null) {
      internalFiles.value = []
    }
  }
)
</script>

<template>
  <div
    :class="{
      ['rpl-form-file']: true,
      ['rpl-form-file--disabled']: disabled,
      ['rpl-form-file--invalid']: invalid
    }"
  >
    <div class="rpl-form-file__wrapper">
      <input
        :id="id"
        ref="inputRef"
        type="file"
        v-bind="$attrs"
        class="rpl-form-file__input"
        :name="name"
        :required="required"
        :disabled="disabled"
        :multiple="acceptMultiple"
        :accept="acceptedTypes"
        :aria-required="required"
        :aria-invalid="invalid"
        :aria-describedby="ariaDescribedByIds"
        @change="handleChange"
        @dragenter="dragging = true"
        @dragleave="dragging = false"
        @drop="dragging = false"
        @focus="focusing = true"
        @blur="focusing = false"
      />
      <div
        :class="{
          ['rpl-form-file__dropzone']: true,
          ['rpl-form-file__dropzone--over']: dragging
        }"
      >
        <span
          class="rpl-form-file__placeholder rpl-type-weight-bold rpl-type-p"
        >
          {{ placeholderText }}
        </span>
        <span class="rpl-form-file__or rpl-type-p-small">OR</span>
        <RplButton
          variant="outlined"
          theme="neutral"
          tabindex="-1"
          :class="{
            'rpl-form-file__button': true,
            'rpl-type-label': true,
            'rpl-u-focusable--force-on': focusing
          }"
        >
          Select {{ filePlural }}
        </RplButton>
      </div>
    </div>
    <div
      :id="`${id}-file-requirements`"
      class="rpl-form-file__requirements rpl-type-label-small rpl-u-margin-t-2"
    >
      <span
        v-if="allowedTypes?.length"
        class="rpl-form-file__requirements-types"
      >
        Accepted file types: {{ extensions }}
      </span>
      <span v-if="fileLimit" class="rpl-form-file__requirements-limit">
        Maximum files: {{ fileLimit }}
      </span>
    </div>
    <div
      v-if="errors"
      :id="`${id}-file-errors`"
      class="rpl-form-file__errors rpl-type-p rpl-type-weight-bold rpl-u-margin-t-4"
      aria-live="polite"
    >
      <RplIcon
        name="icon-exclamation-circle-filled"
        class="rpl-form-file__icon"
        colour="error"
      />
      <span>{{ errors }}</span>
    </div>
    <div
      class="rpl-form-file__status-updates rpl-u-visually-hidden"
      aria-live="polite"
    >
      <p v-for="file in internalFiles" :key="file.id">
        {{ getStatusText(file) }}
      </p>
    </div>
    <ul
      v-if="internalFiles.length"
      class="rpl-form-file__list rpl-u-margin-t-5"
    >
      <li
        v-for="(item, index) in internalFiles"
        :key="item.id"
        :class="`rpl-form-file__item rpl-form-file__item--${item.status}`"
        :data-status="item.status"
      >
        <div class="rpl-form-file__item-inner rpl-type-p">
          <RplIcon
            class="rpl-form-file__icon rpl-form-file__icon-status"
            :name="getStatusIcon(item.status)"
            :colour="getStatusColour(item.status)"
          />
          <div class="rpl-form-file__item-info">
            <div
              v-if="item.error"
              class="rpl-form-file__item-error rpl-type-weight-bold"
            >
              <span class="rpl-u-visually-hidden">{{ item.file.name }}</span>
              {{ item.error }}
            </div>
            <span class="rpl-form-file__item-name">
              {{ item.file.name }}
            </span>
            <span class="rpl-form-file__item-meta rpl-type-label-small">
              {{ getFileType(item.file.name) }} |
              {{ getFileSize(item.file.size) }} MB
            </span>
            <div
              v-if="
                item.status === FileStatus.invalid ||
                item.status === FileStatus.error
              "
              class="rpl-form-file__item-actions"
            >
              <template v-if="item.status === FileStatus.invalid">
                <button
                  type="button"
                  class="rpl-form-file__item-link rpl-u-focusable-block"
                  :aria-label="`Replace ${item.file.name}`"
                  @click.prevent="replaceFile(index)"
                >
                  Replace
                </button>
                <span>or</span>
                <button
                  type="button"
                  class="rpl-form-file__item-link rpl-u-focusable-block"
                  :aria-label="`Remove ${item.file.name}`"
                  @click.prevent="removeFile(index)"
                >
                  Remove
                </button>
              </template>
              <template v-if="item.status === FileStatus.error">
                <button
                  type="button"
                  class="rpl-form-file__item-retry rpl-form-file__item-link"
                  :aria-label="`Retry ${item.file.name}`"
                  @click.prevent="retryFile(index)"
                >
                  {{
                    item.error || 'File failed to upload, click here to retry'
                  }}
                </button>
              </template>
            </div>
          </div>
          <button
            type="button"
            class="rpl-form-file__item-remove rpl-u-focusable-block"
            :aria-label="`Remove ${item.file.name}`"
            @click.prevent="removeFile(index)"
          >
            <RplIcon name="icon-cancel" class="rpl-form-file__icon" />
          </button>
        </div>
        <div
          v-if="item.status === FileStatus.pending"
          class="rpl-form-file__item-progress"
        >
          <progress
            max="100"
            :value="item.progress"
            :aria-label="`Uploading ${item.file.name}`"
          />
          <span
            aria-hidden="true"
            class="rpl-form-file__item-progress-text rpl-type-label-small"
          >
            {{ item.progress }}%
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style src="./RplFormFile.css"></style>
