<template>
  <div class="rpl-components" v-if="componentMapping && componentMapping.length > 0">
    <rpl-row row-gutter>
      <rpl-col
        cols="full"
        v-for="cmp in mappedComponents"
        :colsBp="cmp.cols"
        :key="cmp.id"
        catchChildError
      >
        <component
          :data-component-name="cmp.name"
          :data-component-key="`${cmp.name}-${cmp.uuid}`"
          :class="cmp.class"
          v-if="cmp && cmp.component"
          :key="`${cmp.name}-${cmp.uuid}`"
          :is="cmp.component"
          v-bind="cmp.data"
        ></component>
      </rpl-col>
    </rpl-row>
  </div>
</template>

<script>
import { RplCol, RplRow } from '@dpc-sdp/ripple-grid'
import componentLoader from './component-loader'
export default {
  components: {
    RplCol,
    RplRow
  },
  props: {
    componentMapping: {
      type: Array
    }
  },
  computed: {
    mappedComponents () {
      if (this.componentMapping && this.componentMapping.length > 0) {
        return this.componentMapping
          .map((cmp, index) => {
            if (cmp && componentLoader.hasOwnProperty(cmp.component)) {
              return {
                uuid: cmp.uuid || index,
                name: cmp.component,
                component: this.$tideApi.getBodyComponent(cmp.component),
                class: cmp.class,
                cols: cmp.cols || {},
                data: cmp.props
              }
            }
          })
          .filter(cmp => cmp)
      }
    }
  }
}
</script>
