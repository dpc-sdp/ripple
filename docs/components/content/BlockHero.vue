<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  cta: {
    type: Array as PropType<string[]>,
    required: false
  },
  secondary: {
    type: Array as PropType<string[]>,
    required: false
  },
  snippet: {
    type: String,
    required: false
  },
  video: {
    type: Array as PropType<string[]>,
    required: false
  }
})
</script>

<template>
  <section class="py-12 sm:py-16 lg:py-20">
    <div class="grid gap-8 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <p v-if="$slots.top" class="mb-2 text-center lg:text-left">
          <ContentSlot :use="$slots.top" unwrap="p" />
        </p>

        <h1
          class="
            u-text-gray-900
            text-center text-4xl
            font-extrabold
            tracking-tight
            sm:text-5xl
            lg:text-left lg:text-6xl
          "
        >
          <ContentSlot :use="$slots.title" unwrap="p" />
        </h1>

        <p
          class="
            u-text-gray-500
            mt-4
            max-w-3xl
            text-center text-lg
            lg:text-left
          "
        >
          <ContentSlot :use="$slots.description" unwrap="p" />
        </p>

        <div v-if="$slots.extra" class="mt-6">
          <ContentSlot :use="$slots.extra" unwrap="p" />
        </div>

        <div
          class="
            mt-4
            flex flex-col
            items-center
            justify-center
            lg:justify-start
            gap-4
            sm:mt-10
            sm:flex-row
            sm:gap-6
          "
        >
          <template v-if="$slots.cta">
            <ContentSlot :use="$slots.cta" unwrap="p" />
          </template>
          <a
            v-if="secondary"
            :href="secondary[1]"
            class="u-text-gray-500 hover:u-text-gray-700 py-px font-medium"
          >
            {{ secondary[0] }}
          </a>
        </div>
      </div>
      <div v-if="$slots.right">
        <ContentSlot :use="$slots.right" unwrap="p" />
      </div>
    </div>
  </section>
</template>
