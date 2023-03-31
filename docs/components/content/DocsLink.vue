<template>
  <RplTextLink
    :url="url"
    target="_blank"
    :class="{
      'docs-link': true,
      'rpl-type-p': !isSmall,
      'rpl-type-p-small': isSmall
    }"
  >
    <RplIcon
      v-if="isExternal && iconPosition === 'start'"
      name="icon-link-external-square-filled"
      class="docs-link-icon"
    />
    <slot />
    <RplIcon
      v-if="isExternal && iconPosition === 'end'"
      name="icon-link-external-square-filled"
      class="docs-link-icon"
    />
  </RplTextLink>
</template>

<script lang="ts" setup>
interface Props {
  url: string
  isExternal?: boolean
  isSmall?: boolean
  iconPosition?: 'start' | 'end'
}

withDefaults(defineProps<Props>(), {
  isSmall: false,
  isExternal: false,
  iconPosition: 'start'
})
</script>

<style scoped>
.docs-link {
  --local-clr-link: var(--rpl-clr-dark);
  display: flex;
  align-items: center;
  gap: var(--rpl-sp-2);
}

.docs-link-icon {
  color: var(--rpl-clr-link);
}
</style>
