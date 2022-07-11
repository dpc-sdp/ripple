<script setup lang="ts">
import { PropType, computed, ref, onMounted, onUnmounted } from 'vue'
import { RplAlertTypes } from './constants'
import onResize from './../../composables/onResize'
import { RplIconNames } from './../icon/constants'
import RplIcon from './../icon/icon.vue'
import RplTextLink from './../text-link/text-link.vue'
import { rplEventBus } from '../../index'

rplEventBus.register('rpl-alert/dismiss')
const emit = defineEmits(['dismiss'])

const props = defineProps({
  variant: {
    type: String as PropType<typeof RplAlertTypes[number]>,
    default: 'information'
  },
  iconName: {
    type: String as PropType<typeof RplIconNames[number]>,
    default: 'icon-information-circle-filled'
  },
  message: {
    type: String,
    default: ''
  },
  linkText: {
    type: String,
    default: undefined
  },
  linkUrl: {
    type: String,
    default: undefined
  },
  dismissed: {
    type: Boolean,
    default: false
  },
  alertId: {
    type: String,
    required: true
  }
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

onMounted(() => {
  // sets container height variable on resize for animation
  const alertContainer = alertRef.value
  onResize(alertContainer, (el) => {
    alertContainer.style.setProperty(
      '--local-container-height',
      `${el.contentRect.height}px`
    )
  })
})
</script>

<template>
  <div :class="classes" ref="alertContainer">
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
        colour="white"
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
          class="rpl-alert__link rpl-type-label"
          :url="linkUrl"
        >
          <span>{{ linkText }}</span>
          <rpl-icon
            size="s"
            colour="white"
            name="icon-chevron-right"
          ></rpl-icon>
        </RplTextLink>
      </div>
      <button class="rpl-alert__btn-close" @click="onClose">
        <rpl-icon
          title="Dismiss alert"
          size="s"
          name="icon-cancel"
          colour="white"
        ></rpl-icon>
      </button>
    </div>
  </div>
</template>

<style src="./alert.css" />
