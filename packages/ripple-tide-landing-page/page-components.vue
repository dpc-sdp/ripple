<template>
  <div class="vt-components" v-if="components && components.length > 0">
    <rpl-row row-gutter>
      <template v-for="cmp in mappedComponents">
        <rpl-col
          class="vt-component"
          cols="full"
          :colsBp="cmp.cols"
          :key="cmp.id"
          catchChildError
        >
          <component
            :data-component-name="cmp.name"
            :data-component-key="`${cmp.name}-${cmp.uuid}`"
            v-if="cmp && cmp.component"
            :key="`${cmp.name}-${cmp.uuid}`"
            :is="cmp.component"
            v-bind="cmp.data"
          ></component>
        </rpl-col>
      </template>
    </rpl-row>
  </div>
</template>

<script>
import { RplCol, RplRow } from '@dpc-sdp/ripple-grid'
import componentMapping from './component-loader'
export default {
  components: {
    RplCol,
    RplRow
  },
  props: {
    components: {
      type: Array
    }
  },
  computed: {
    mappedComponents () {
      if (this.components && this.components.length > 0) {
        return this.components
          .map((cmp, index) => {
            if (cmp && componentMapping.hasOwnProperty(cmp.component)) {
              return {
                uuid: cmp.uuid || index,
                name: cmp.component,
                component: componentMapping[cmp.component],
                classes: cmp.classes,
                cols: {},
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
