<template>
  <div class="app-sidebar" v-if="sidebarComponents">
    <template v-for="(cmp, index) in orderedSidebarComponents">
      <component :is="cmp.component" v-bind="cmp.data" :key="`${index}-${cmp.order}`" class="rpl-component-gutter"></component>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    'sidebarComponents': Array
  },
  computed: {
    orderedSidebarComponents () {
      return this.sidebarComponents.filter(a => a).sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
    }
  }
}
</script>
