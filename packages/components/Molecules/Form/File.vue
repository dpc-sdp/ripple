<template>
  <div class="rpl-form-file__wrapper">
    <input
      type="file"
      class="rpl-form-file__input"
      :id="identifier"
      :disabled="disabled"
      :placeholder="placeholder"
      :readonly="readonly"
      :multiple="multiple"
      :accept="allowedTypes"
      @change="onChange"
      @dragenter="onDragOver"
      @dragleave="onDragOff"
      @drop="onDragOff"
    />
    <div class="rpl-form-file__dropzone form-control" :class="{ 'rpl-form-file__dropzone--over' : dragOver }">
      <span v-if="!value.length" class="rpl-form-file__placeholder">{{ placeholderText }}</span>
      <ul v-else class="rpl-form-file__list">
        <li v-for="(file, index) in value" :key="index" class="rpl-form-file__list-item">
          <rpl-icon
            role="presentation"
            color="primary"
            class="rpl-form-file__icon"
            symbol="document_transparent"
          />
          <span class="rpl-form-file__name">{{ file.name }}</span>
          <button
            class="rpl-form-file__remove"
            @click.prevent="removeFile(index)"
            :aria-label="`Remove ${file.name}`"
          >
            <rpl-icon
              role="presentation"
              size="s"
              color="danger"
              symbol="close"
            />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { RplIcon } from "@dpc-sdp/ripple-icon"

export default {
  name: 'rpl-form-file',
  components: { RplIcon },
  props: {
    state: Array,
    maxSize: Number,
    maxFiles: Number,
    allowedTypes: Array,
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String,
    identifier: String
  },
  data () {
    return {
      value: [],
      dragOver: false
    }
  },
  methods: {
    onChange (e) {
      const files = Array.from(e.target.files)

      this.value = files

      this.$emit('update', files)
    },
    removeFile (index) {
      this.value = this.value.filter((file, i) => i !== index)

      this.$emit('update', this.value)
    },
    onDragOver () {
      this.dragOver = true
    },
    onDragOff () {
      this.dragOver = false
    }
  },
  computed: {
    multiple () {
      return this.maxFiles > 1
    },
    placeholderText () {
      if (this.placeholder) {
        return this.placeholder
      }

      return this.multiple ? 'Select files' : 'Select file'
    }
  },
  created () {
    if (this.state) {
      this.value = this.state
    }
  },
  watch: {
    state (newVal) {
      this.value = newVal
    }
  }
}
</script>

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";
@import "scss/form";

$rpl-file-input-border-colour: rpl-color('primary') !default;
$rpl-file-input-border-focus: rem(3px) solid $rpl-file-input-border-colour !default;

.rpl-form-file {
  &__wrapper {
    position: relative;
  }

  &__input {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    &:focus {
      + .rpl-form-file__dropzone {
        border-color: $rpl-form-element-border-color-focus;
      }
    }

    &:focus-visible {
      + .rpl-form-file__dropzone {
        outline: 1px $rpl-file-input-border-colour auto;
      }
    }
  }

  &__dropzone {
    @include rpl_form_text_element;

    border-style: dashed;
    transition: background-color 0.25s;

    &--over {
      background-color: rpl-color('mid_neutral_2');
    }
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: $rpl-space-3;

    &-item {
      display: flex;
      align-items: center;
      gap: $rpl-space-2;
    }
  }

  &__icon {
    max-height: rem(18px);
  }

  &__remove {
    line-height: 0.5;
    padding: $rpl-space-2;
    position: relative;
    background-color: transparent;
    border: none;
    z-index: 1;
  }
}
</style>
