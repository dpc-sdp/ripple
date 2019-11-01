<template>
  <div class="app-sidebar" v-if="sidebarComponents" :class="childErrorClass">
    <rpl-dev-error v-if="gotChildError" :errors="childErrors" />
    <template v-for="(cmp, index) in orderedSidebarComponents">
      <component :is="cmp.component" v-bind="cmp.data" :key="`${index}-${cmp.order}`" class="rpl-component-gutter"></component>
    </template>
  </div>
</template>

<script>
import catchChildError from '@dpc-sdp/ripple-global/mixins/catch-child-error'
import { RplDevError } from '@dpc-sdp/ripple-global'

export default {
  name: 'AppSidebar',
  components: {
    RplDevError
  },
  mixins: [catchChildError],
  props: {
    sidebarComponents: Array,
    catchChildError: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    orderedSidebarComponents () {
      return this.sidebarComponents.filter(a => a).sort((a, b) => (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0))
    }
  }
}
</script>
