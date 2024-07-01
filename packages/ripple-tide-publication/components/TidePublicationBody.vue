<template>
  <div v-if="details" class="tide-publication__details">
    <RplDescriptionList :items="processed"></RplDescriptionList>
  </div>
  <TideDynamicComponents
    v-if="components?.length > 0"
    :components="components"
    :has-sidebar="true"
    :full-width="false"
  ></TideDynamicComponents>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TideDynamicPageComponent, formatDate } from '#imports'

interface Props {
  details?: any
  components: Array<TideDynamicPageComponent>
}

const props = withDefaults(defineProps<Props>(), {
  details: undefined
})

interface IRplDescriptionListItem {
  term: string
  description: any
}

const processed = computed(() => {
  const list: Array<IRplDescriptionListItem> = []

  if (props.details?.author) {
    list.push({
      term: 'Published by:',
      description: props.details.author
    })
  }
  if (props.details?.date) {
    list.push({
      term: 'Date:',
      description: formatDate(new Date(props.details.date))
    })
  }
  if (props.details?.copyright) {
    list.push({
      term: 'Copyright:',
      description: props.details.copyright
    })
  }

  return list
})
</script>
