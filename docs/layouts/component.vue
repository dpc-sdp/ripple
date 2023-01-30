<template>
  <AppLayout>
    <div class="
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
      <AppSidebar class="lg:col-span-2"></AppSidebar>
      <main class="
          lg:col-span-8
          pt-8
          lg:pt-1
          relative
          flex flex-col flex-1
          lg:mt-0
          lg:pt-8
          text-gray-900
          dark:text-gray-200
        ">
        <div class="border-b mb-12">
          <div class="pb-4 mb-4">
            <h1 class="rpl-type-h1 mb-4">
              {{ page.title }}
            </h1>
            <p class="rpl-type-p">{{ page.description }}</p>
          </div>
          <div class="flex mb-4">
            <RplChip class="mr-2" :class="{ 'rpl-type-weight-bold': activeTab === 'design' }" label="Usage"
              @click="switchTab('design')" />
            <RplChip class="mr-2" :class="{ 'rpl-type-weight-bold': activeTab === 'code' }" label="Code"
              @click="switchTab('code')" />
          </div>
        </div>
        <ContentRenderer tag="RplContent" v-if="page && !page._empty" :key="page._id" :value="page">
        </ContentRenderer>
        <!-- Design -->
        <ContentRenderer v-show="designPage && !designPage._empty && activeTab === 'design'" :key="designPage._id"
          :value="designPage">
        </ContentRenderer>
        <!-- Code -->
        <ContentRenderer v-show="codePage && !codePage._empty && activeTab === 'code'" :key="codePage._id"
          :value="codePage">
        </ContentRenderer>
        <a href="https://github.com/dpc-sdp/ripple-framework/discussions/categories/feature-proposals-rfc"
          class=" my-2 rpl-type-label-small ">
          <Icon class="w-5 mr-2 h-6 text-slate-800" aria-hidden="true" name="mdi:github" />
          <span class="underline">Suggest a change to this component</span>
        </a>
      </main>
      <aside class="lg:col-span-2 ml-8 relative" v-if="links && links.length > 0">
        <nav>
          <h3 class="rpl-type-h3 mb-2">Links</h3>
          <div class="flex flex-col align-middle">
            <template v-for="link in links">
              <a :href="link.url" class=" my-2 rpl-type-label-small ">
                <Icon class="w-5 mr-2 h-6 text-slate-800" aria-hidden="true" :name="link.icon" />
                <span class="underline">{{ link.text }}</span>
              </a>
            </template>
          </div>

        </nav>
      </aside>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useContent, useContentHead, computed } from '#imports'
const { params } = useRoute()

const { page, toc } = useContent()

const { data: codePage } = await useAsyncData('code', () => queryContent().where({ _partial: true, _path: `/components/_${params.slug[1]}/code` }).findOne())
const { data: designPage } = await useAsyncData('design', () => queryContent().where({ _partial: true, _path: `/components/_${params.slug[1]}/design` }).findOne())

useContentHead(page)

const links = computed(() => {
  const links = []
  const pageLinks = page.value?.links
  if (pageLinks) {
    if (pageLinks.figma) {
      links.push({
        text: 'Figma',
        url: pageLinks.figma,
        icon: 'logos:figma'
      })
    }
    if (pageLinks.storybook) {
      links.push({
        text: 'Storybook',
        url: pageLinks.storybook,
        icon: 'logos:storybook-icon'
      })
    }
  }
  return links
})

const activeTab = ref('design')

function switchTab(newTab: string) {
  activeTab.value = newTab
}
</script>

<style>
:root {
  --rpl-clr-gradient-vertical: linear-gradient(180deg, #545454 0%, #3e3e3e 80%);
}
</style>
