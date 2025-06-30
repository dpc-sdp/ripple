<script setup lang="ts">
type DocsTypeClassType = {
  style: [string, { values: object[] }, string]
}

interface Props {
  type: DocsTypeClassType[]
}

const props = defineProps<Props>()

const mappedTypes = computed(() => {
  return props.type.map(({ style }) => {
    const [name, value, selector] = Object.values(style)

    return {
      name,
      values: value?.values.map((line: string) => ({
        name: Object.keys(line)[0],
        value: Object.values(line)[0]
      })),
      selector
    }
  })
})
</script>

<template>
  <div class="rpl-table rpl-table--no-stripes">
    <div class="rpl-table__scroll-container" tabindex="0">
      <table class="w-full">
        <thead>
          <tr>
            <th>Style</th>
            <th>Values</th>
            <th>CSS Class</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="type in mappedTypes" :key="type.name">
            <td class="docs-type-preview">
              <span :class="type.selector">
                {{ type.name }}
              </span>
            </td>
            <td>
              <div v-for="value in type.values" :key="value.name">
                {{ value.name }}: {{ value.value }}
              </div>
            </td>
            <td>{{ type.selector }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.docs-type-preview {
  width: 45%;
}
</style>
