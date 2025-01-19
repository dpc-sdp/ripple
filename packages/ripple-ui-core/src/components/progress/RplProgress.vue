<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { computed, ref } from 'vue'
import { bpMin } from '../../lib/breakpoints'
import RplIcon from '../icon/RplIcon.vue'
import RplExpandable from '../expandable/RplExpandable.vue'

interface Props {
  id: string
  title?: string | null
  currentStepId: string | null
  steps?: IRplProgressItem[]
  expandable?: boolean
  autoExpandable?: boolean
  initiallyExpanded?: boolean
}

interface IRplProgressItem {
  id: string
  label: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Progress',
  currentStepId: null,
  steps: () => [],
  expandable: false,
  autoExpandable: false,
  initiallyExpanded: false
})

const breakpoints = useBreakpoints(bpMin)
const isSmallScreen = breakpoints.smaller('l')

const isExpanded = ref(props.initiallyExpanded)

const activeStepIndex = computed(() => {
  const idx = (props.steps || []).findIndex(
    (step) => step.id === props.currentStepId
  )

  return idx >= 0 ? idx : null
})

const isExpandable = computed(() => {
  if (props.autoExpandable) {
    return isSmallScreen.value
  }

  return props.expandable
})

const headerTag = computed(() => {
  return isExpandable.value ? 'button' : 'div'
})

const toggleId = computed(() => `${props.id}_toggle`)
const panelId = computed(() => `${props.id}_panel`)

const headerAttrs = computed(() => {
  if (isExpandable.value) {
    return {
      id: toggleId.value,
      'aria-expanded': isExpanded.value,
      'aria-controls': panelId.value
    }
  }

  return {}
})

const panelAttrs = computed(() => {
  if (isExpandable.value) {
    return {
      id: panelId.value,
      'aria-labelledBy': toggleId.value
    }
  }

  return {}
})

const handleClick = () => {
  if (isExpandable.value) {
    isExpanded.value = !isExpanded.value
  }
}

const isStepActive = (step) => {
  return step?.id === props.currentStepId
}

const isStepComplete = (stepIndex) => {
  return stepIndex < activeStepIndex.value
}
</script>

<template>
  <div
    :class="{
      'rpl-progress': true,
      'rpl-progress--expandable': isExpandable,
      'rpl-progress--expanded': isExpanded
    }"
  >
    <component
      :is="headerTag"
      :class="{
        'rpl-progress__header': true,
        'rpl-u-focusable-block': isExpandable
      }"
      v-bind="headerAttrs"
      @click="handleClick"
    >
      <div class="rpl-progress__header-inner">
        <h2 class="rpl-progress__title rpl-type-h3">{{ title }}</h2>
        <p class="rpl-progress__subtitle rpl-type-label">
          <slot name="subTitle"
            >{{
              typeof activeStepIndex === 'number'
                ? `Step ${activeStepIndex + 1} of ${steps.length}`
                : ''
            }}
          </slot>
        </p>
      </div>
      <div v-if="isExpandable" class="rpl-progress__chevron">
        <RplIcon name="icon-chevron-down" />
      </div>
    </component>
    <RplExpandable :expanded="isExpandable ? isExpanded : true">
      <ol class="rpl-progress__steps" v-bind="panelAttrs">
        <li
          v-for="(step, stepIndex) in steps"
          :key="step.id"
          :class="{
            'rpl-progress-step': true,
            'rpl-type-p-large-fixed': !isStepActive(step),
            'rpl-type-h3-fixed': isStepActive(step),
            'rpl-progress-step--complete': isStepComplete(stepIndex),
            'rpl-progress-step--active': isStepActive(step)
          }"
        >
          <RplIcon
            v-if="isStepComplete(stepIndex)"
            class="rpl-progress__complete-icon"
            name="icon-check-circle-filled"
          />
          <span class="rpl-progress-step__label">{{ step.label }}</span>
          <span v-if="isStepComplete(stepIndex)" class="rpl-u-visually-hidden"
            >(complete)</span
          >
          <span v-if="isStepActive(stepIndex)" class="rpl-u-visually-hidden"
            >(current)</span
          >
        </li>
      </ol>
    </RplExpandable>
  </div>
</template>

<style src="./RplProgress.css" />
