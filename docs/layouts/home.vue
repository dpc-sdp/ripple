<template>
  <AppLayout>
    <Container class="
        px-4
        sm:px-6
        mx-auto
        max-w-full
        lg:max-w-7xl
        relative
        flex flex-col-reverse
        pb-4
        sm:pb-6
        lg:grid lg:grid-cols-12
        lg:gap-8
        min-h-page
      ">
      <main class="
          lg:col-span-12
          pt-8
          lg:pt-1
          relative
          flex flex-col flex-1
          lg:mt-0
          lg:pt-8
          text-gray-900
          dark:text-gray-200
        ">
        <BlockHero>
          <template #title>
            {{ subheader }}
          </template>
          <template #description>
            {{ description }}
          </template>
          <template #cta v-if="page?.primarycta || page?.secondarycta">
            <div class="block">
              <h3 class="rpl-type-h3-fixed mb-4">Get started</h3>
              <div class="inline-flex gap-3">
                <RplButton el="a" :href="page.primarycta?.link" iconName="icon-arrow-right" variant="outlined">
                  {{ page.primarycta?.label }}
                </RplButton>
                <RplButton el="a" :href="page.secondarycta?.link" iconName="icon-arrow-right" variant="outlined">
                  {{ page.secondarycta?.label }}
                </RplButton>
              </div>
            </div>
          </template>
          <template #right>
            <img src="/img/SDP-logo.png" />
          </template>
        </BlockHero>

        <ContentRenderer tag="RplContent" class="content-full" v-if="page && !page._empty" :key="page._id"
          :value="page">
        </ContentRenderer>
      </main>
      <footer>
        <a href="https://www.netlify.com">
          <img src="https://www.netlify.com/v3/img/components/netlify-light.svg" alt="Deploys by Netlify" width="114"
            height="51" /> </a>

      </footer>
    </Container>
  </AppLayout>
</template>

<script setup lang="ts">
import { useContent, useContentHead } from '#imports'
const colorMode = useColorMode()
const netlifyImg =
  colorMode.value === 'dark'
    ? 'https://www.netlify.com/v3/img/components/netlify-dark.svg'
    : 'https://www.netlify.com/v3/img/components/netlify-light.svg'
const { page, toc } = useContent()
const { subheader, description } = useAppConfig()
useContentHead(page)
</script>

<style>
:root {
  --rpl-clr-gradient-vertical: linear-gradient(180deg, #545454 0%, #3e3e3e 80%);
}

.content-full.rpl-content {
  max-width: 100%;
}
</style>
