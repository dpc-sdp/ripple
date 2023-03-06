<script setup lang="ts">
import { RplIconGroups } from '@dpc-sdp/ripple-ui-core'

interface Props {
  group: 'alert' | 'social' | 'standard'
}

const props = defineProps<Props>()

const icons = computed(() => {
  const iconGroup = RplIconGroups?.[props.group] || []

  return iconGroup.map((value: string) => ({
    value,
    name: value
      .replace('icon-', '')
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }))
})
</script>

<template>
  <ul class="docs-icon-table">
    <li v-for="icon in icons">
      <RplIcon :name="icon.value" colour="default" size="l" />
      <span class="rpl-type-p-small">{{ icon.name }}</span>
    </li>
  </ul>
</template>

<style scoped>
.docs-icon-table {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  margin-left: 0;
  padding-left: 0;
  gap: 0;
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: -1px;
    gap: var(--rpl-sp-2);
    border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);

    /* override ripple-ui-core: .rpl-content ul > li:last-of-type */
    &:nth-child(n) {
      padding: var(--rpl-sp-5) var(--rpl-sp-3) var(--rpl-sp-3);
    }

    &::before {
      display: none;
    }
  }
}
</style>
