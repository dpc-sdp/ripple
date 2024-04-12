<script setup lang="ts">
import { computed } from 'vue'
import { getAnchorLinkId } from '@dpc-sdp/ripple-tide-api'

interface Props {
  components: Array<any>
  headingLevel: 'h2' | 'h3'
}

const props = withDefaults(defineProps<Props>(), {
  components: () => [],
  headingLevel: 'h2'
})

const items = computed(() => {
  const flatList = (props.components || []).reduce((links, component) => {
    if (component.title) {
      return [
        ...links,
        {
          text: component.title,
          id: getAnchorLinkId(component.title),
          type: 'h2'
        }
      ]
    } else if (component.internalAnchors) {
      return [...links, ...component.internalAnchors]
    } else {
      return links
    }
  }, [])

  return flatList.reduce((hierarchy, anchor) => {
    if (anchor.type === 'h2') {
      return [
        ...hierarchy,
        {
          text: anchor.text,
          url: `#${anchor.id}`
        }
      ]
    } else if (props.headingLevel === 'h3') {
      const topItem = hierarchy.length ? hierarchy[hierarchy.length - 1] : null

      return [
        ...hierarchy.slice(0, -1),
        {
          ...(topItem || { text: '', url: '' }),
          items: [
            ...(topItem?.items || []),
            {
              text: anchor.text,
              url: `#${anchor.id}`
            }
          ]
        }
      ]
    } else {
      return hierarchy
    }
  }, [])
})
</script>

<template>
  <RplInPageNavigation
    v-if="items?.length"
    title="On this page"
    :items="items"
    data-cy="in-page-nav"
  />
</template>
