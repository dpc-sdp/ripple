<script setup lang="ts">
import RplList from '../list/RplList.vue'
import { INavSectionItem } from './constants'
import RplIcon from '../icon/RplIcon.vue'
import RplExpandable from '../expandable/RplExpandable.vue'
import { computed, ref } from 'vue'
import { useExpandable } from '../../composables/useExpandable'

interface Props {
  id: string
  section: INavSectionItem
  isExpandable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isExpandable: false
})

const isExpanded = ref(false)

const { toggleProps, triggerProps } = useExpandable(
  `footer-nav-section-${props.id}`,
  isExpanded
)

const items = computed(() => {
  if (props.section.url) {
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
        :is="isExpandable ? 'button' : 'div'"
        :class="{
          'rpl-footer-nav-section__header-inner': true,
          'rpl-footer-nav-section__header-inner-button': isExpandable,
          'rpl-u-focusable-block': isExpandable
        }"
        v-bind="isExpandable ? toggleProps : {}"
        @click="isExpanded = !isExpanded"
      >
        <h3
          class="rpl-footer-nav-section__title rpl-type-label rpl-type-weight-bold"
        >
          {{ section.text }}

          <RplIcon
            v-if="isExpandable"
            role="presentation"
            name="icon-chevron-down"
            size="xs"
            class="rpl-footer-nav-section__expand-icon"
          />
        </h3>
      </component>
    </div>

    <component
      :is="isExpandable ? RplExpandable : 'div'"
      :expanded="isExpandable ? isExpanded : undefined"
      v-bind="isExpandable ? triggerProps : null"
    >
      <RplList
        :items="items"
        item-class="rpl-type-p-small rpl-u-margin-b-3"
        :max-depth="0"
      />
    </component>
  </div>
</template>

<style src="./RplNavSection.css" />
