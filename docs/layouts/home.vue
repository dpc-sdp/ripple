<template>
  <AppLayout>
    <Container
      class="
        px-4
        sm:px-6
        mx-auto
        max-w-full
        lg:max-w-8xl
        relative
        flex flex-col-reverse
        pb-4
        sm:pb-6
        lg:grid lg:grid-cols-12
        lg:gap-8
        min-h-page
      "
    >
      <main
        class="
          lg:col-span-12
          pt-8
          lg:pt-1
          relative
          flex flex-col flex-1
          lg:mt-0
          lg:pt-8
          text-gray-900
          dark:text-gray-200
        "
      >
        <BlockHero>
          <template #title>
            {{ theme?.subheader }}
          </template>
          <template #description>
            {{ theme?.description }}
          </template>
          <template #right>
            <img src="/img/SDP-logo.png" />
          </template>
        </BlockHero>

        <ContentRenderer
          tag="RplContent"
          v-if="page"
          :key="page._id"
          :value="page"
        >
        </ContentRenderer>
      </main>
    </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import { useContent, useContentHead } from '#imports'

const { page, toc } = useContent()
const theme = useTheme()
useContentHead(page)
</script>

<style>
:root {
  --rpl-clr-gradient-vertical: linear-gradient(180deg, #545454 0%, #3e3e3e 80%);
}
</style>
