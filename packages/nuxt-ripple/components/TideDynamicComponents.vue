<script setup lang="ts">
import type {
  TideDynamicPageComponent,
  TideDynamicComponentGroup
} from '../types'
import { computed } from 'vue'
import groupDynamicComponents from '../utils/groupDynamicComponents'
import { getAnchorLinkId } from '@dpc-sdp/ripple-tide-api'

interface Props {
  components: TideDynamicPageComponent<any>[]
  fullWidth?: boolean
  hasSidebar?: boolean
  pageBackground?: string
}
const props = withDefaults(defineProps<Props>(), {
  fullWidth: false,
  hasSidebar: false,
  pageBackground: 'default'
})

const grouped: TideDynamicPageComponent<any> | TideDynamicComponentGroup =
  computed(() => {
    return groupDynamicComponents(props.components)
  })
</script>

<template>
  <template v-for="item in grouped" :key="item.id">
    <RplCardGrid v-if="item.grouping" :hasSidebar="hasSidebar">
      <RplPageComponent
        v-for="child in item.components"
        :id="
          child.title
            ? getAnchorLinkId(child.title)
            : `page-component-${child.id}`
        "
        :key="child.id"
        :data-component-id="child.id"
        :data-component-type="child.component"
        :title="child.title"
        :class="$attrs.class"
      >
        <component :is="child.component" v-bind="child.props"></component>
      </RplPageComponent>
    </RplCardGrid>
    <RplPageComponent
      v-else
      :id="
        item.title ? getAnchorLinkId(item.title) : `page-component-${item.id}`
      "
      :data-component-id="item.id"
      :data-component-type="item.component"
      :title="item.title"
      :class="$attrs.class"
      :fullWidth="fullWidth"
    >
      <component
        :is="item.component"
        :hasSidebar="hasSidebar"
        :hasTitle="!!item.title"
        :pageBackground="pageBackground"
        v-bind="item.props"
      ></component>
    </RplPageComponent>
  </template>
</template>
