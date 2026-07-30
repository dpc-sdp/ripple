<script setup lang="ts">
import { ref, watch } from 'vue'
import RplFormFile from '../packages/ripple-ui-forms/src/components/RplFormFile/RplFormFile.vue'

interface FileItem {
  id: string
  ref?: string
  status: 'success' | 'error' | 'invalid'
  error?: string | null
  file: {
    name: string
    type: string
    size: number
  }
}

interface Props {
  id: string
  name: string
  label: string
  value?: FileItem[] | null
  disabled?: boolean
  multiple?: boolean
  placeholder?: string
  maxFiles?: number
  maxSize?: number
  allowedTypes?: { mimeType: string; extension: string }
  status?: 'success' | 'error' | 'invalid',
  customScenario?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  multiple: false,
  value: null,
  placeholder: undefined,
  maxFiles: undefined,
  maxSize: undefined,
  allowedTypes: undefined,
  status: undefined,
  customScenario: undefined
})

const value = ref<FileItem[] | null>(props.value)

// Watch for external changes to the value prop
watch(() => props.value, (newValue) => {
  value.value = newValue
})

const emit = defineEmits<{
  onChange: [files: FileItem[]]
}>()

const handleUpload = (props.customScenario === 'progress-bar') ?
  async (id: string, file: File, onUpdate: (complete: number) => void) => {
    setTimeout(() => onUpdate(50), 100)
    return new Promise((resolve) => {
      setTimeout(() => {
        onUpdate(100)
        resolve({ ref: 'file-1-sever-ref', status: 'success' })
      }, 200)
    })
  } :
  async (
    file: File,
    options: { id: string; fieldId: string; formId: string },
    // onUpdate: (complete: number | boolean) => void
  ) => {
    return {
      id: options.id,
      status: props.status || 'success',
      error: props.status === 'error' ? 'Sorry, upload failed!' : null
    }
  }


const handleChange = (files: FileItem[]) => {
  value.value = files
  emit('onChange', files)
}
</script>

<template>
  <RplFormFile
    :id="id"
    :name="name"
    :label="label"
    :value="value as any"
    :disabled="disabled"
    :multiple="multiple"
    :placeholder="placeholder"
    :max-files="maxFiles"
    :max-size="maxSize"
    :allowed-types="allowedTypes"
    :handle-upload="handleUpload as any"
    @onChange="handleChange as any"
  />
</template>
