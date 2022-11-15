<script lang="ts">
export default { name: 'TidePublicationSideNav' }
</script>

<template>
  <RplVerticalNav :title="title" :items="items"></RplVerticalNav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: any
  publication: any
  children: any
}

const props = withDefaults(defineProps<Props>(), {
  children: []
})

/* eslint-disable no-undef */
// @ts-ignore Nuxt auto import
const route = useRoute()
/* eslint-enable no-undef */

const items = computed(() => [
  {
    ...props.publication,
    id: 'root',
    active: props.publication.url === route.path
  },
  ...props.children.map((child: any) => {
    return {
      ...child,
      active: child.url === route.path,
      items: [
        {
          ...child,
          active: child.url === route.path
        }
      ]
    }
  })
])
</script>
