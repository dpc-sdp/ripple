<script lang="ts" setup>
const route = useRoute()
const { sections } = useAppConfig()

const sectionSlug = route.params.slug[0]
const sectionConfig = sections[sectionSlug as keyof typeof sections]
const footerVariant = sectionConfig?.neutralFooter ? 'neutral' : 'default'
</script>

<template>
  <RplFooter :variant="footerVariant">
    <template #custom-content>
      <RplAcknowledgement />
      <p class="rpl-u-margin-t-6 rpl-type-label-small">
        This site is powered by
        <RplTextLink url="https://www.netlify.com/" target="_blank">
          Netlify
        </RplTextLink>
      </p>
    </template>
  </RplFooter>
</template>
