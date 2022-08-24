<template>
  <LazyRplCard el="div">
    <template v-if="icon" #upper>
      <Icon
        :name="icon"
        class="flex-shrink-0 w-12 h-12 m-4 mb-0 text-emerald-500"
      />
    </template>
    <template #title>
      <h3
        :class="[
          'rpl-card__cta',
          'rpl-type-h3',
          'rpl-u-focusable',
          'rpl-u-focusable--inline'
        ]"
      >
        <RplTextLink :url="url">{{ title }}</RplTextLink>
      </h3>
    </template>
    <slot> </slot>
  </LazyRplCard>
</template>

<script setup>
defineProps({
  image: {
    type: [String, undefined],
    default: undefined
  },
  icon: {
    type: [String, undefined]
  },
  title: {
    type: String
  },
  url: {
    type: [String, undefined],
    default: undefined
  }
})
</script>
