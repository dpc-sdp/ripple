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
            <h1 class="rpl-type-h1 mb-4">{{ page.title }}</h1>
          </div>
          <RplSearchBar class=""></RplSearchBar>
        </div>
        <ul class="rpl-storybook__page rpl-grid">
          <RplCardNavCard v-for="(link, index) in modules" :key="index" class="rpl-col-6" :title="link.title"
            :url="link._path" el="li">
            <template #meta>
              <RplTag variant="neutral" label="Core" />
            </template>
            {{ link.description }}
          </RplCardNavCard>
        </ul>

      </main>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
const { params } = useRoute()
const { page } = useContent()

const { data: modules } = await useAsyncData(params.slug[0], () => queryContent(params.slug[0]).where({ title: { $ne: page.title }, _partial: false }).find())

</script>

<style>
:root {
  --rpl-clr-gradient-vertical: linear-gradient(180deg, #545454 0%, #3e3e3e 80%);
}
</style>
