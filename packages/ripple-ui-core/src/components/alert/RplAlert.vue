<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import { RplAlertTypes } from './constants'
import onResizeHeight from '../../composables/onResizeHeight'
import { RplIconNames } from '../icon/constants'
import RplIcon from '../icon/RplIcon.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  variant?: RplAlertTypes
  iconName?: (typeof RplIconNames)[number]
  message?: string
  linkText?: string
  linkUrl?: string
  dismissed?: boolean
  alertId: string
  isDismissible?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'information',
  iconName: 'icon-information-circle-filled',
  message: '',
  linkText: '',
  linkUrl: '',
  dismissed: false,
  isDismissible: true
})

const emit = defineEmits<{
  (e: 'dismiss', payload: rplEventPayload & { action: 'close' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-alert', emit)

const closeLabel = 'Dismiss alert'

const onClose = () => {
  emitRplEvent(
    'dismiss',
    {
      id: props.alertId,
      action: 'close',
      label: props.message,
      text: closeLabel
    },
    { global: true }
  )
}
const classes = computed(() => {
  return {
    'rpl-alert': true,
    [`rpl-alert--${props.variant}`]: props.variant,
    'rpl-alert--closed': props.dismissed,
    'rpl-u-screen-only': true
  }
})

const alertRef: Ref<HTMLDivElement | null> = ref(null)

onResizeHeight(alertRef, (height) => {
  if (alertRef.value) {
    if (alertRef.value.style.display !== 'none') {
      alertRef.value.style.setProperty(
        '--local-container-height',
        `${height}px`
      )
    }
  }
})
</script>

<template>
  <div ref="alertRef" :class="classes">
    <div
      v-if="!dismissed"
      class="rpl-alert__inner"
      role="region"
      :aria-labelledby="`alert-message-${props.alertId}`"
    >
      <RplIcon class="rpl-alert__icon-info" size="m" nopad :name="iconName" />
      <div class="rpl-alert__message-wrap">
        <div
          :id="`alert-message-${props.alertId}`"
          class="rpl-alert__message rpl-type-label rpl-type-weight-bold"
        >
          {{ message }}
        </div>
        <RplTextLink
          v-if="linkText && linkUrl"
          class="rpl-alert__link rpl-type-p rpl-u-focusable--alt-colour"
          :url="linkUrl"
        >
          {{ linkText }}<RplIcon name="icon-arrow-right" />
        </RplTextLink>
      </div>
      <button
        v-if="isDismissible"
        class="rpl-alert__btn-close rpl-u-focusable-inline rpl-u-focusable--alt-colour"
        data-cy="dismiss"
        @click="onClose"
      >
        <RplIcon :title="closeLabel" name="icon-cancel" />
      </button>
    </div>
  </div>
</template>

<style src="./RplAlert.css" />
