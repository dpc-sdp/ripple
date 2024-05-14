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
        class="rpl-form__input-dec rpl-u-focusable-outline"
        type="button"
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
        class="rpl-form__input-inc rpl-u-focusable-outline"
        type="button"
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
  --local-button-dimension: var(--rpl-sp-11);

  .rpl-form__input-icon {
    color: var(--rpl-clr-link);
  }

  input[type='number'] {
    height: var(--local-button-dimension);
    text-align: center;
    color: var(--rpl-clr-type-default);
    padding: var(--rpl-sp-3)
      calc(var(--rpl-sp-5) * 2 + var(--rpl-sp-4) + var(--rpl-sp-3)); /* pad + icon + margin  */
  }

  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  .rpl-form__input-icon__prefix {
    left: var(--rpl-sp-5);
  }

  .rpl-form__input-icon__suffix {
    right: var(--rpl-sp-5);
  }

  .rpl-form__input-inc,
  .rpl-form__input-dec {
    border: 1px solid var(--rpl-clr-neutral-600);
    cursor: pointer;
    height: var(--local-button-dimension);
    width: var(--local-button-dimension);
    padding: var(--rpl-sp-3) var(--rpl-sp-5);
    display: flex;
    z-index: 1;

    &:hover {
      border-color: var(--rpl-clr-dark);
    }

    &:hover .rpl-icon {
      color: var(--rpl-clr-primary);
    }
  }

  .rpl-form__input-inc {
    border-radius: 0 var(--rpl-border-radius-2) var(--rpl-border-radius-2) 0;
    margin-left: calc(-1 * var(--local-button-dimension));
  }

  .rpl-form__input-dec {
    border-radius: var(--rpl-border-radius-2) 0 0 var(--rpl-border-radius-2);
    margin-right: calc(-1 * var(--local-button-dimension));
  }

  .rpl-form__input-wrap {
    width: 100%;
  }
}

[data-invalid='true'] .rpl-form__input-dec,
[data-invalid='true'] .rpl-form__input-inc {
  border-color: var(--rpl-clr-error);
}
</style>
