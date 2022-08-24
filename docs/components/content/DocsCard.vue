<template>
  <LazyRplCardCallToAction
    el="div"
    class="rpl-col-12-m my-4"
    :title="title"
  >
    <template #meta>
      {{meta}}
    </template>
    <slot>
    </slot>
  </LazyRplCardCallToAction>
</template>

<script setup>
defineProps({
  image: {
    type: [String, undefined],
    default: undefined
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