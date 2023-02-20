<script lang="ts" setup>
interface Props {
  title: string
  description?: string
  links?: {
    text: string
    url: string
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  links: () => []
})
</script>

<template>
  <RplIntroHeader
    class="custom"
    :title="title"
    iconName="icon-information-circle-filled"
    :links="{
      items: links
    }"
  >
    <template #default>
      <slot></slot>
    </template>
  </RplIntroHeader>
</template>

<style scoped>
.custom {
  background: var(--rpl-clr-neutral-100);
}
</style>
