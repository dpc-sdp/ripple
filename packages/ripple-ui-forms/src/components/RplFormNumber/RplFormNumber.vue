<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'
// @ts-expect-error vue SFC
import useFormkitFriendlyEventEmitter from '../../composables/useFormkitFriendlyEventEmitter.js'
import { useRippleEvent } from '@dpc-sdp/ripple-ui-core'
import type { rplEventPayload } from '@dpc-sdp/ripple-ui-core'
import { sanitisePIIField } from '../../lib/sanitisePII'

interface Props {
  id: string
  disabled?: boolean
  className?: string
  value: string
  onChange: (value: string | string[]) => void
  type?: string
  mode?: 'alt'
  name: string
  label?: string
  min?: number
  max?: number
  step?: number
  variant?: 'default' | 'reverse'
  invalid?: boolean
  required?: boolean
  globalEvents?: boolean
  throttle?: number
  pii?: boolean
  onInput?: (payload: Event) => void
  onBlur?: (payload: Event) => void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'number',
  mode: undefined,
  value: '0',
  className: 'rpl-form__input',
  onChange: () => undefined,
  label: undefined,
  min: undefined,
  max: undefined,
  step: 1,
  disabled: false,
  required: false,
  invalid: false,
  variant: 'default',
  globalEvents: false,
  throttle: 500,
  pii: true,
  onInput: () => null,
  onBlur: () => null
})

const emit = defineEmits<{
  (e: 'onChange', value: string[]): void
  (e: 'update', payload: rplEventPayload & { action: 'update' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-form-number', emit)

const form: any = inject('form')

const classes = computed(() => {
  return {
    [`${props.className}`]: true,
    [`${props.className}--with-prefix-icon`]: props.mode,
    [`${props.className}--with-suffix-icon`]: props.mode,
    [`${props.className}--type-number-alt`]: props.mode,
    [`${props.className}--${props.variant}`]: true,
    [`${props.className}--type-${props.type}`]: props.type,
    [`${props.className}--disabled`]: props.disabled,
    [`${props.className}--invalid`]: props.invalid
  }
})

const current = ref<number>(parseInt(props.value || '0'))

watch(
  () => props.value,
  (newValue) => {
    current.value = parseInt(newValue)
  }
)

const commitValue = (val: number) => {
  emitRplEvent(
    'update',
    {
      action: 'update',
      id: props.id,
      type: props.type,
      label: props?.label,
      contextId: form?.id,
      contextName: form?.name,
      value: sanitisePIIField(props.pii, val)
    },
    { global: props.globalEvents }
  )
}

const withinBounds = (value: number) => {
  if (props.min !== undefined && value < props.min) {
    return props.min
  }
  if (props.max !== undefined && value > props.max) {
    return props.max
  }
  return value
}

const handleDecrement = () => {
  current.value = withinBounds(current.value - props.step)
  useFormkitFriendlyEventEmitter(props, emit, 'onChange', current.value)
  commitValue(current.value)
}

const handleChange = useDebounceFn(() => {
  commitValue(parseInt(props.value))
}, props.throttle)

const handleIncrement = () => {
  current.value = withinBounds(current.value + props.step)
  useFormkitFriendlyEventEmitter(props, emit, 'onChange', current.value)
  commitValue(current.value)
}
</script>

<template>
  <div :class="classes">
    <div class="rpl-form__input-wrap">
      <button
        v-if="props.mode"
        class="rpl-form__input-dec"
        @click.prevent="handleDecrement"
      >
        <span class="rpl-u-visually-hidden">Decrease value</span>
        <RplIcon
          name="icon-map-zoom-out"
          :class="`${props.className}-icon ${props.className}-icon__prefix`"
          size="s"
        />
      </button>
      <input
        :id="id"
        type="number"
        :value="value"
        class="rpl-u-focusable-outline"
        :disabled="disabled"
        :required="required"
        :aria-required="required"
        :aria-invalid="invalid"
        v-bind="$attrs"
        :name="name"
        :min="min"
        :max="max"
        @blur="onBlur"
        @input="onInput"
        @change="handleChange"
        @focus=";($event.target as HTMLInputElement).select()"
      />
      <button
        v-if="props.mode"
        class="rpl-form__input-inc"
        @click.prevent="handleIncrement"
      >
        <span class="rpl-u-visually-hidden">Increase value</span>
        <RplIcon
          name="icon-map-zoom-in"
          :class="`${props.className}-icon ${props.className}-icon__suffix`"
          size="s"
        />
      </button>
    </div>
  </div>
</template>

<style src="../RplFormInput/RplFormInput.css" />

<style>
.rpl-form__input--type-number-alt {
  .rpl-form__input-icon {
    color: var(--rpl-clr-type-default);
  }

  input[type='number'] {
    padding-left: 4.75rem;
    padding-right: 4.75rem;
    text-align: center;
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  .rpl-form__input-inc,
  .rpl-form__input-dec {
    cursor: pointer;
    height: 4.75rem;
    width: 4.75rem;
    display: flex;
    z-index: 1;

    &:hover .rpl-icon {
      color: var(--rpl-clr-primary);
    }
  }

  .rpl-form__input-inc {
    margin-left: -4.75rem;
  }

  .rpl-form__input-dec {
    margin-right: -4.75rem;
  }
}
</style>
