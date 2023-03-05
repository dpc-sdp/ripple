<script setup lang="ts">
interface Props {
  sizes: string[]
}

const props = defineProps<Props>()

const mappedSizes = computed(() =>
  props.sizes.map((size) => ({
    value: Object.values(size)[0],
    size: Object.keys(size)[0]
  }))
)
</script>

<template>
  <div class="rpl-table rpl-table--no-stripes">
    <table class="w-full">
      <thead>
        <tr>
          <th>Preview</th>
          <th>Value</th>
          <th>Size</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="size in mappedSizes" :key="size.size">
          <td>
            <RplIcon name="icon-search" colour="default" :size="size.size" />
          </td>
          <td>{{ size.value }}</td>
          <td>{{ size.size }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
