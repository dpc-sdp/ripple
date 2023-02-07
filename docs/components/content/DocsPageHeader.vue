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
  description: '',
  links: () => []
})
</script>

<template>
  <header class="rpl-u-margin-b-12">
    <h1 class="rpl-type-h1 mb-4">
      {{ title }}
    </h1>
    <p class="rpl-type-p-large">{{ description }}</p>
    <ul class="links rpl-u-margin-t-4">
      <li v-for="(link, index) in links" :key="index">
        <RplTextLink :url="link.url" class="rpl-type-p">{{
          link.text
        }}</RplTextLink>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.links {
  display: flex;
  gap: var(--rpl-sp-5);
}
</style>
