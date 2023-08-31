<template>
  <div class="tide-open-form">
    <a class="openforms-embed tide-open-form__link" :href="formLink"
      >Click here to view form.</a
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  formLink: string
}

withDefaults(defineProps<Props>(), {})

onMounted(() => {
  let openFormsEmbedScript = document.createElement('script')
  openFormsEmbedScript.setAttribute(
    'src',
    'https://au.openforms.com/Scripts/embed-iframe.js?immediate=true'
  )
  document.head.appendChild(openFormsEmbedScript)
})
</script>

<style></style>
