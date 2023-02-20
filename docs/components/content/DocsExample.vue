<template>
  <div class="docs-example">
    <div class="docs-example-header">
      <RplTextLink :url="storybookPreviewUrl" target="_blank"
        >Open this example in a new tab</RplTextLink
      >
    </div>
    <iframe :src="storybookPreviewUrl" width="100%" height="70"></iframe>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  id: string
}

const props = defineProps<Props>()

const { storybookBaseUrl } = useAppConfig()

const theme = 'Default'

const storybookPreviewUrl = computed(
  () =>
    `${storybookBaseUrl}/iframe.html?args=&id=${props.id}&viewMode=story&&globals=themeVariableCss.name:${theme};themeVariableCss.id:${theme};themeVariableCss.value:${theme}`
)
</script>

<style scoped>
.docs-example {
  border: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
}

.docs-example-header {
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  padding: 0 var(--rpl-sp-4);
}
</style>
