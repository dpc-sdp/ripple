<template>
  <NuxtLink
    :to="url"
    class="docs-nav-link rpl-type-p-small rpl-u-focusable-block"
  >
    <RplIcon
      v-if="icon && iconPosition === 'start'"
      :name="icon"
      size="xs"
      class="rpl-u-margin-r-1"
    />
    <span><slot /></span>
    <RplIcon
      v-if="icon && iconPosition === 'end'"
      :name="icon"
      size="xs"
      class="rpl-u-margin-r-1"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  url: string
  icon?: string
  iconPosition?: 'start' | 'end'
}

withDefaults(defineProps<Props>(), {
  icon: '',
  iconPosition: 'start'
})
</script>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.docs-nav-link {
  display: flex;
  align-items: baseline;
  gap: var(--rpl-sp-1);
  padding: var(--rpl-sp-3) var(--local-vertical-nav-item-gutter);
  font-weight: bold;
}

.docs-nav-link:hover {
  background-color: var(--local-vertical-nav-hover-bg);
  text-decoration: underline;
}

.docs-nav-link:active {
  background-color: var(--local-vertical-nav-hover-bg);
}
</style>
