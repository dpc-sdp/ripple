<template>
  <RplContent data-component-type="search-listing-no-results">
    <slot>
      <p class="rpl-type-h3">
        Sorry! We couldn't find any matches{{
          query || route?.query?.q ? ` for ${query || route?.query?.q}.` : '.'
        }}
      </p>
      <p>To improve your search results:</p>
      <ul>
        <li>use different or fewer keywords</li>
        <li>check spelling.</li>
      </ul>
    </slot>
  </RplContent>
</template>

<script setup lang="ts">
import { useRoute } from '#imports'

const route = useRoute()
interface Props {
  query?: string | undefined
}
withDefaults(defineProps<Props>(), {
  query: undefined
})
</script>
