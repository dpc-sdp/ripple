<script setup lang="ts">
import layers from '../../../packages/ripple-ui-core/tokens/settings/layers.yaml'

interface Props {
  type: 'border' | 'border.radius' | 'elevation'
}

const props = defineProps<Props>()

const layerStyles = computed(() => {
  let style: string = layers?.[props.type] || {}

  if (props.type.includes('.')) {
    const [base, path] = props.type.split('.')
    style = layers?.[base]?.[path] || style
  }

  return Object.keys(style)
    .filter(Number)
    .map((key) => ({
      key,
      value: style[key].value,
      token: `rpl-${props.type.replace('.', '-')}-${key}`
    }))
})
</script>

<template>
  <div class="rpl-table rpl-table--no-stripes">
    <div class="rpl-table__scroll-container" tabindex="0">
      <table class="w-full">
        <thead>
          <tr>
            <th>Visual</th>
            <th>Value</th>
            <th>CSS Variable</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="style in layerStyles" :key="style.token">
            <td>
              <span
                v-if="type === 'border'"
                class="docs-layer-style-preview docs-layer-style-preview--border"
                :style="`border-width: var(--rpl-border-${style.key})`"
              />
              <span
                v-if="type === 'border.radius'"
                class="docs-layer-style-preview docs-layer-style-preview--border-radius"
                :style="`border-radius: var(--rpl-border-radius-${style.key})`"
              />
              <span
                v-if="type === 'elevation'"
                class="docs-layer-style-preview docs-layer-style-preview--elevation"
                :style="`box-shadow: var(--rpl-elevation-${style.key})`"
              />
            </td>
            <td>
              {{ style.value }}
            </td>
            <td>{{ style.token }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
td {
  width: 40%;
  vertical-align: middle;

  &:first-child {
    width: 20%;
  }
}

.docs-layer-style-preview {
  display: block;
  width: var(--rpl-sp-12);
  border: var(--rpl-border-1) solid var(--rpl-clr-neutral-600);
}

.docs-layer-style-preview--border-radius,
.docs-layer-style-preview--elevation {
  height: var(--rpl-sp-6);
}
</style>
