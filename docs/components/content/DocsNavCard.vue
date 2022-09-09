<template>
  <a
    :href="url"
    class="flex flex-row items-center border rounded px-8 py-5 hover:shadow"
  >
    <div class="flex flex-col">
      <span
        :class="[
          'rpl-card__cta',
          'rpl-type-h3',
          'rpl-u-focusable',
          'rpl-u-focusable--inline'
        ]"
      >
        {{ title }}
      </span>
      <div class="my-2">
        <slot> </slot>
      </div>
    </div>
    <Icon
      name="fa6-solid:arrow-right"
      class="w-6 h-6 text-emerald-500 right-8 top-50% ml-auto"
    />
  </a>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  url: string
}>()
</script>
