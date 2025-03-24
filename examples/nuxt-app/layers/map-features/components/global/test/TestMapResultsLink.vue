<template>
  <TideSearchResultLink :url="item.url[0]" class="rpl-type-p">
    {{ item.test_title[0] }}
  </TideSearchResultLink>
</template>

<script setup lang="ts">
interface Props {
  item: any
}
withDefaults(defineProps<Props>(), {})
</script>
