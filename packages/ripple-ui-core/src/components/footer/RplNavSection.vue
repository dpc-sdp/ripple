<script setup lang="ts">
import RplList from '../list/RplList.vue'
import { INavSectionItem } from './constants'
import RplIcon from '../icon/RplIcon.vue'
import RplExpandable from '../expandable/RplExpandable.vue'
import { computed, ref } from 'vue'
import { useExpandable } from '../../composables/useExpandable'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'
import RplTextLink from '../text-link/RplTextLink.vue'

interface Props {
  id: string
  section: INavSectionItem
  isExpandable?: boolean
  index?: number
}

const props = withDefaults(defineProps<Props>(), {
  isExpandable: false,
  index: undefined
})

const emit = defineEmits<{
  (e: 'expand', payload: rplEventPayload & { action: 'open' | 'close' }): void
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-footer', emit)

const isExpanded = ref(false)

const { toggleProps, triggerProps } = useExpandable(
  `footer-nav-section-${props.id}`,
  isExpanded
)

const items = computed(() => {
  if (props.section.url && props.isExpandable) {
    return [
      {
        text: props.section.text,
        url: props.section.url
      },
      ...(props.section.items || [])
    ]
  } else {
    return props.section.items || []
  }
})

const singleLevel = computed(() => props.section?.single)
const canExpand = computed(() => props.isExpandable && !singleLevel.value)

const handleToggle = () => {
  if (!canExpand.value) return

  isExpanded.value = !isExpanded.value

  emitRplEvent(
    'expand',
    {
      id: toggleProps.value.id,
      action: isExpanded.value ? 'open' : 'close',
      text: props.section.text,
      index: props?.index + 1
    },
    { global: true }
  )
}

const handleClick = (event) => {
  emitRplEvent(
    'navigate',
    {
      ...event,
      action: 'click',
      label: props.section.text,
      index: props?.index + 1
    },
    { global: true }
  )
}
</script>

<template>
  <div
    :class="{
      'rpl-footer-nav-section': true,
      'rpl-footer-nav-section--expanded': isExpanded
    }"
  >
    <div
      :class="{
        'rpl-footer-nav-section__header': true
      }"
    >
      <component
        :is="canExpand ? 'button' : 'div'"
        :class="{
          'rpl-footer-nav-section__header-inner': true,
          'rpl-footer-nav-section__header-inner-button': canExpand,
          'rpl-u-focusable-block': canExpand
        }"
        v-bind="canExpand ? toggleProps : {}"
        @click="handleToggle"
      >
        <h3
          class="rpl-footer-nav-section__title rpl-type-label rpl-type-weight-bold"
        >
          <RplTextLink
            v-if="!canExpand && section?.url"
            :url="section.url"
            class="rpl-list__link"
            @click="
              () => handleClick({ value: section.url, text: section?.text })
            "
          >
            {{ section.text }}
          </RplTextLink>
          <template v-else>{{ section.text }}</template>
          <RplIcon
            v-if="canExpand"
            role="presentation"
            name="icon-chevron-down"
            size="xs"
            class="rpl-footer-nav-section__expand-icon"
          />
        </h3>
      </component>
    </div>

    <component
      :is="canExpand ? RplExpandable : 'div'"
      v-if="!singleLevel"
      :expanded="canExpand ? isExpanded : undefined"
      v-bind="canExpand ? triggerProps : null"
    >
      <RplList
        :items="items"
        item-class="rpl-type-p-small rpl-u-margin-b-3"
        :max-depth="0"
        @item-click="handleClick"
      />
    </component>
  </div>
</template>

<style src="./RplNavSection.css" />
