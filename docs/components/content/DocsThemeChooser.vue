<template>
  <div class="rpl-form__outer">
    <RplFormLabel>Theme option</RplFormLabel>
    <RplFormOptionButtons
      v-model="theme"
      :onChange="handleThemeChange"
      :value="theme"
      :options="[
        {
          id: 'light',
          label: 'Theme 1',
          value: 'light'
        },
        {
          id: 'dark',
          label: 'Theme 2',
          value: 'dark'
        },
        {
          id: 'default',
          label: 'Default',
          value: 'default'
        }
      ]"
    />
  </div>
  <div class="docs-theme-chooser-examples">
    <slot />
  </div>
</template>

<script lang="ts" setup>
interface Props {
  id: string
}

const props = defineProps<Props>()

const theme = ref('light')

const handleThemeChange = (val) => {
  theme.value = val
}

provide('exampleTheme', theme)
</script>

<style scoped>
.docs-theme-chooser-examples {
  margin-top: var(--rpl-sp-4);
}
</style>
