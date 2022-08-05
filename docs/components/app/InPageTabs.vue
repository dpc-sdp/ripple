<script setup lang="ts">
const props = defineProps({
  tabs: {
    type: Array
  }
})
</script>
<template>
  <ul
    class="
      sticky
      z-50
      py-4
      mt-4
      flex flex-wrap
      text-sm
      font-medium
      surface surface-blurry
      text-center text-gray-500
      dark:border-gray-700
      dark:text-gray-400
      border-b-1 border-gray-600
    "
  >
    <li v-for="(tab, i) in tabs" :key="`tab-${i}`" class="mr-2">
      <a
        :href="`#${tab.id}`"
        aria-current="page"
        class="
          inline-block
          p-4
          py-2
          text-black-600
          border-b-2 border-gray-600
          active
          dark:bg-gray-800
          dark:text-blue-500
        "
        >{{ tab.text }}</a
      >
    </li>
  </ul>
</template>

<style scoped>
ul {
  top: 4.5rem;
}
</style>
