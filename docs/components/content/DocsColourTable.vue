<script setup lang="ts">
import {
  getColourName,
  getColourOptions,
  getColourToken,
  getColourValue
} from '#imports'

interface Props {
  colours: string[]
}

const props = defineProps<Props>()

const colours = computed(() => {
  const options = getColourOptions(props.colours)

  return Object.keys(options).map((key) => ({
    name: getColourName(key),
    value: getColourValue(options[key]),
    token: getColourToken(key)
  }))
})
</script>

<template>
  <div class="rpl-table rpl-table--no-stripes">
    <div class="rpl-table__scroll-container" tabindex="0">
      <table class="w-full">
        <thead>
          <tr>
            <th>Swatch</th>
            <th>Colour</th>
            <th>Value</th>
            <th>CSS Variable</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="color in colours" :key="color.name">
            <td><DocsSwatch :colour="`var(--${color.token})`" /></td>
            <td>{{ color.name }}</td>
            <td>{{ color.value }}</td>
            <td>{{ color.token }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
td {
  width: 28%;
  vertical-align: middle;

  &:first-child {
    width: 16%;
  }

  &:nth-child(2) {
    text-transform: capitalize;
  }
}
</style>
