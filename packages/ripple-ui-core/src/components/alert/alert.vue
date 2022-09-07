<script setup lang="ts">
import { computed, ref } from 'vue'
import { RplAlertTypes } from './constants'
import onResizeHeight from './../../composables/onResizeHeight'
import { RplIconNames } from './../icon/constants'
import RplIcon from './../icon/icon.vue'
import RplTextLink from './../text-link/text-link.vue'
import { rplEventBus } from '../../index'

rplEventBus.register('rpl-alert/dismiss')
const emit = defineEmits(['dismiss'])

interface Props {
  variant?: RplAlertTypes,
  iconName?: typeof RplIconNames[number],
  message?: string,
  linkText?: string,
  linkUrl?: string,
  dismissed?: string,
  alertId: string,
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'information',
  iconName: 'icon-information-circle-filled',
  message: '',
  linkText: '',
  linkUrl: '',
  dismissed: '',
})

const onClose = () => {
  rplEventBus.emit('rpl-alert/dismiss', props.alertId)
  emit('dismiss', props.alertId)
}
const classes = computed(() => {
  return {
    'rpl-alert': true,
    [`rpl-alert--${props.variant}`]: props.variant,
    'rpl-alert--closed': props.dismissed
  }
})

const alertRef = ref(null)

onResizeHeight(alertRef, (height) => {
  alertRef.value.style.setProperty('--local-container-height', `${height}px`)
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
      <rpl-icon
        class="rpl-alert__icon-info"
        size="m"
        nopad
        :name="iconName"
      ></rpl-icon>
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
          {{ linkText }}<rpl-icon name="icon-chevron-right"></rpl-icon>
        </RplTextLink>
      </div>
      <button
        class="
          rpl-alert__btn-close
          rpl-u-focusable rpl-u-focusable--alt-colour rpl-u-focusable--inline
        "
        @click="onClose"
      >
        <rpl-icon title="Dismiss alert" name="icon-cancel"></rpl-icon>
      </button>
    </div>
  </div>
</template>

<style src="./alert.css" />
