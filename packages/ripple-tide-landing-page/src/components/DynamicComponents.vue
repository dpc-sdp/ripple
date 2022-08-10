<template>
  <div
    v-for="cmp in components"
    :key="`component-${cmp.id}`"
    :data-component-id="cmp.id"
    :data-component-type="cmp.component"
    :class="$attrs.class"
  >
    <component :is="cmp.component" v-bind="cmp.props"></component>
  </div>
</template>

<script setup lang="ts">
defineProps({
  components: {
    type: Array,
    required: true
  }
})
</script>
