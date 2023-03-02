<script setup lang="ts">
import layers from '../../../packages/ripple-ui-core/tokens/settings/type.yaml'

interface Props {
  type: 'weight' | 'size' | 'lh' | 'ls'
}

const props = defineProps<Props>()

const typeStyles = computed(() => {
  let style = layers.type[props.type]

  return Object.keys(style).map((key) => ({
    value: style[key].value,
    token: `rpl-type-${props.type}-${key}`
  }))
})
</script>

<template>
  <div class="rpl-table rpl-table--no-stripes">
    <div class="rpl-table__scroll-container" tabindex="0">
      <table class="w-full">
        <thead>
          <tr>
            <th>Value</th>
            <th>CSS Variable</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="style in typeStyles" :key="style.token">
            <td>{{ style.value }}</td>
            <td>{{ style.token }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
td {
  width: 50%;
}
</style>
