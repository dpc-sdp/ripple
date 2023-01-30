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

        <div>
          <div v-for="release in releases" :key="release.name">
            {{ release }}
            <ProseH2 :id="release.name">{{ release.name }}</ProseH2>
            <ContentRenderer :document="release" />
          </div>
        </div>
      </main>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
const githubReleases = githubReleases()
const { data: releases } = await useAsyncData('releases', () => githubReleases())

</script>
