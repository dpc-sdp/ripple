<template>
  <RplContent data-component-type="search-listing-no-results">
    <slot>
      <p class="rpl-type-h3">
        Sorry! We couldn't find any matches{{
          displayQuery ? ` for ${displayQuery}` : ''
        }}.
      </p>
      <p>To improve your search results:</p>
      <ul>
        <li>use different or fewer keywords</li>
        <li>change or clear search filters</li>
        <li>check spelling.</li>
      </ul>
    </slot>
  </RplContent>
</template>

<script setup lang="ts">
import { useRoute, ref } from '#imports'

interface Props {
  query?: string
}

const props = withDefaults(defineProps<Props>(), {
  query: undefined
})

const displayQuery = ref<string>(props.query || (useRoute().query?.q as string))
</script>
