<template>
  <div class="rpl-form-file">
    <div class="rpl-form-file__wrapper" :class="{ 'rpl-form-file__wrapper--disabled': isDisabled }">
      <input
        ref="input"
        type="file"
        class="rpl-form-file__input"
        :id="identifier"
        :disabled="isDisabled"
        :placeholder="placeholder"
        :readonly="readonly"
        :multiple="multiple"
        :accept="mimeTypes"
        @change="onChange"
        @dragenter="onDragOver"
        @dragleave="onDragOff"
        @drop="onDragOff"
      />
      <div class="rpl-form-file__dropzone form-control" :class="{ 'rpl-form-file__dropzone--over': dragOver }">
        <div class="rpl-form-file__dropzone-inner">
          <span class="rpl-form-file__placeholder" v-html="placeholderText" />
          <span  v-if="!placeholder" class="rpl-form-file__or">OR</span>
          <span class="rpl-form-file__button">{{ selectText }}</span>
        </div>
      </div>
    </div>
    <div v-if="allowedTypes" class="rpl-form-file__requirements">
      <span class="rpl-form-file__requirements-types">Accepted file types: {{ extensions }}</span>
      <span v-if="maxFiles && maxFiles > 1" class="rpl-form-file__requirements-limit">Maximum number of files: {{ maxFiles }}</span>
    </div>
    <ul v-if="value" class="rpl-form-file__list">
      <li v-for="(item, index) in value" :key="index" class="rpl-form-file__list-item">
        <div class="rpl-form-file__list-inner">
          <rpl-icon role="presentation" class="rpl-form-file__icon" :color="getStatusColour(item.status)" :symbol="getStatusIcon(item.status)" />
          <div class="rpl-form-file__info">
            <div v-if="item.error" class="rpl-form-file__error" aria-live="polite">{{ item.error }}</div>
            <span class="rpl-form-file__name">{{ item.file.name }}</span>
            <span class="rpl-form-file__meta">{{ getFileType(item.file.name) }} | {{ getSizeInMB(item.file.size) }} mb</span>
            <div v-if="item.status === 'invalid'" class="rpl-form-file__invalid-actions">
              <button @click.prevent="replaceFile(index)" class="rpl-form-file__link" :aria-label="`Replace ${item.file.name}`">Replace</button>
              <span>or</span>
              <button @click.prevent="removeFile(index)" class="rpl-form-file__link" :aria-label="`Remove ${item.file.name}`">Remove</button>
            </div>
            <button
              v-if="item.status === 'error'"
              @click.prevent="retryFile(index)"
              class="rpl-form-file__retry rpl-form-file__link"
              :aria-label="`Retry uploading ${item.file.name}`"
              aria-live="polite"
            >
              File failed to upload, click here to retry
            </button>
          </div>
          <button class="rpl-form-file__remove rpl-form-file__link" @click.prevent="removeFile(index)" :aria-label="`Remove ${item.file.name}`">
            <rpl-icon role="presentation" color="dark_neutral_1" class="rpl-form-file__icon" symbol="close" />
          </button>
        </div>
        <div v-if="item.status === 'pending'" class="rpl-form-file__progress">
          <progress :value="item.progress" max="100" :aria-label="`Uploaded ${item.progress}% of ${item.file.name}`" />
          <span aria-hidden="true">{{ item.progress }}%</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { RplIcon } from "@dpc-sdp/ripple-icon"

export default {
  name: "rpl-form-file",
  components: { RplIcon },
  props: {
    maxSize: Number,
    maxFiles: Number,
    allowedTypes: Array,
    multiple: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String,
    identifier: String,
    reset: Number,
    handlePost: Function,
    handleDelete: Function
  },
  data () {
    return {
      value: [],
      dragOver: false
    }
  },
  watch: {
    reset () {
      this.value = []
    }
  },
  methods: {
    onDragOver () {
      this.dragOver = true
    },
    onDragOff () {
      this.dragOver = false
    },
    onChange (e) {
      this.removeInvalidFiles()

      const files = this.prepareFiles(e.target.files)

      this.value = [...this.value, ...files]

      const pendingFiles = files.filter(file => file.status === 'pending')

      this.uploadFiles(pendingFiles)
    },
    removeInvalidFiles () {
      this.value = this.value.filter(file => file.status !== 'invalid')
    },
    prepareFiles (rawFiles) {
      let files = Array.from(rawFiles)

      if (this.maxFiles) {
        files = files.slice(0, this.maxFiles - this.value.length)
      }

      return files.map(file => {
        const id = `${Date.now()}-${file.name}`
        const error = this.validateFile(file)
        const status = error ? 'invalid' : 'pending'

        return { id, file, error, status, progress: 0 }
      })
    },
    retryFile (index) {
      this.value[index].status = 'pending'

      this.uploadFiles([this.value[index]])
    },
    replaceFile (index) {
      this.removeFile(index)

      this.$nextTick(() => this.$refs.input.click())
    },
    removeFile (index) {
      const item = this.value[index]

      if (item.status === 'pending' && item?.source) {
        item.source.cancel()
      }

      if (item.status === 'success') {
        this.handleDelete(item)
        this.$emit('update', this.getUploadedIds())
      }

      this.value = this.value.filter((file, i) => i !== index)
    },
    updateProgress (id, { loaded, total }, source = null) {
      const index = this.value.findIndex(file => file.id === id)

      if (this.value[index]) {
        this.value[index].progress = Math.round((loaded * 100) / total)
      }
      if (source && !this.value[index]?.source) {
        this.value[index].source = source
      }
    },
    getUploadedIds () {
      const ids = this.value.filter(file => file.status === 'success').map(file => file.id)

      if (ids.length) return this.multiple ? ids : ids[0]

      return this.multiple ? [] : ''
    },
    getStatusIcon (status) {
      if (['invalid', 'error'].includes(status)) return 'alert_information'

      return status === 'pending' ? 'loading_star' : 'tick'
    },
    getStatusColour (status) {
      return ['invalid', 'error'].includes(status) ? 'danger' : 'primary'
    },
    getSizeInMB (size) {
      return Math.ceil(size * 0.000001 * 100) / 100
    },
    getFileType (name) {
      return name.split('.').pop().toUpperCase()
    },
    validateFile (file) {
      const extension = file.type.split('/').pop()

      if (this.allowedTypes && !this.mimeTypes.includes(file.type)) {
        return `File is not in a supported format (${extension}), please remove this file and select a ${this.extensions}`
      }
      if (this.maxSize && this.getSizeInMB(file.size) > this.maxSize) {
        return `File is too large (${this.getSizeInMB(file.size)}mb), please remove this file and select a file less than ${this.maxSize} MB`
      }

      return null
    },
    uploadFiles (files) {
      for (const file of files) {
        this.uploadFile(file).then((data) => {
          this.value = this.value.map(item => item.id === file.id ? { ...item, ...data } : item)

          if (data?.status === 'success') {
            this.$emit('update', this.getUploadedIds())
          }
        })
      }
    },
    async uploadFile (item) {
      const response = await this.handlePost(item, this.updateProgress)

      if (response.status === 'error' && !response?.message) {
        response.message = 'Error uploading file'
      }

      return response
    }
  },
  computed: {
    placeholderText () {
      if (this.placeholder) return this.placeholder

      return `Drag and drop your ${this.multiple ? 'files' : 'file'} to upload`
    },
    selectText () {
      return this.multiple ? 'Select files' : 'Select a file'
    },
    mimeTypes () {
      return this.allowedTypes.map(type => type.mimeType)
    },
    extensions () {
      return (new Intl.ListFormat('en', { style: 'long', type: 'disjunction' }))
        .format(this.allowedTypes.map(type => type.extension.toUpperCase()))
    },
    isDisabled () {
      const uploadedFiles = this.getUploadedIds()
      const hasSingleFile = !this.multiple && uploadedFiles
      const reachedMaxFiles = this.maxFiles && uploadedFiles.length >= this.maxFiles

      return this.disabled || hasSingleFile || reachedMaxFiles
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "~@dpc-sdp/ripple-global/scss/components/button";
@import "scss/form";

$rpl-file-additional-text: rpl-color("dark_neutral_1") !default;
$rpl-file-dropzone-bg-color: rpl-color("mid_neutral_2") !default;

.rpl-form-file {
  &__wrapper {
    position: relative;

    @include rpl_typography_font($font-size: 's');

    &--disabled {
      background-color: $rpl-form-element-bg-color;

      .rpl-form-file__input {
        cursor: initial;

        &:hover + .rpl-form-file__dropzone,
        &:focus + .rpl-form-file__dropzone {
          border-color: $rpl-form-element-border-color;
        }
      }
    }
  }

  &__input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: pointer;

    &:hover,
    &:focus {
      + .rpl-form-file__dropzone {
        background-color: $rpl-form-element-bg-color;
        border-color: $rpl-form-element-border-color-focus;
      }
    }

    &:focus-visible {
      + .rpl-form-file__dropzone {
        outline: 2px $rpl-form-element-border-color-focus auto;
      }
    }
  }

  &__dropzone {
    @include rpl_form_text_element;

    text-align: center;
    border: 2px dashed $rpl-form-element-border-color;
    background-color: transparent;
    transition: background-color 0.25s;

    @include rpl_breakpoint_down('s') {
      padding: 0;
      border-width: 0;
    }

    &-inner {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: $rpl-space-4;
      padding: $rpl-space-2;

      @include rpl_breakpoint_down('s') {
        padding: 0;
        align-items: start;
      }
    }

    &--over {
      background-color: $rpl-file-dropzone-bg-color;
    }
  }

  &__or,
  &__placeholder {
    @include rpl_breakpoint_down('s') {
      display: none;
    }
  }

  &__placeholder {
    @include rpl_typography_font($font-family: "semibold");
  }

  &__button {
    @include rpl_button;

    color: inherit;
    border: 2px solid;
  }

  &__requirements {
    color: $rpl-file-additional-text;
    margin-top: $rpl-space-2;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: $rpl-space-2;
  }

  &__list {
    padding: 0;
    margin: $rpl-space * 5 0 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: $rpl-space-4;

    @include rpl_typography_font($font-size: 's');

    &-inner {
      display: flex;
      align-items: flex-start;
      gap: $rpl-space-3;
    }
  }

  &__icon {
    margin-top: rem(2px);
    // Icon sizes are inconsistent
    height: rem(16px) !important;
    width: rem(16px) !important;

    &.rpl-icon--loading_star {
      animation: rplFileSpinner 2s linear infinite;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__name {
    display: block;
  }

  &__meta {
    color: $rpl-file-additional-text;
    text-transform: uppercase;
    margin-top: $rpl-space-2;

    @include rpl_typography_font($font-size: 'xs');
  }

  &__error {
    color: $rpl-form-required-color;
    margin-bottom: $rpl-space-2;

    @include rpl_typography_font($font-family: "semibold");
  }

  &__link {
    border: none;
    padding: 0;
    text-align: left;
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
  }

  &__invalid-actions {
    display: flex;
    gap: $rpl-space-2;
    margin-top: $rpl-space-2;
  }

  &__retry {
    margin-top: $rpl-space-2;
  }

  &__remove {
    display: flex;
    margin-left: auto;
  }

  &__progress {
    display: flex;
    gap: $rpl-space-3;
    align-items: center;
    margin-top: $rpl-space-2;

    progress {
      flex-grow: 1;
      border: none;
      height: rem(4px);
      border-radius: rem(2px);

      &[value] {
        background-color: $rpl-form-element-bg-color;
      }

      &::-webkit-progress-bar {
        background-color: $rpl-form-element-bg-color;
      }

      &::-webkit-progress-value {
        background-color: $rpl-form-element-border-color-focus;
        transition: all 0.25s;
      }

      &::-moz-progress-bar {
        background-color: $rpl-form-element-border-color-focus;
        transition: all 0.25s;
      }
    }
  }
}

@keyframes rplFileSpinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
