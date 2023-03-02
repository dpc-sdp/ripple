<script setup lang="ts">
import {
  getColourGroup,
  getColourOptions,
  getColourValue,
  getColourName,
  getColourToken
} from '#imports'

interface Props {
  colours: string | string[]
}

const props = defineProps<Props>()

const colours = computed(() => {
  const grouped = !Array.isArray(props.colours)
  const options = grouped
    ? getColourGroup(props.colours)
    : getColourOptions(props.colours)

  return Object.keys(options).map((key) => {
    const ref = grouped
      ? `${props.colours}${key !== '_' ? '.' + key : ''}`
      : key

    return {
      name: getColourName(ref),
      value: getColourValue(options[key]),
      token: getColourToken(ref)
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
            <th>Swatch</th>
            <th>Colour</th>
            <th>Value</th>
            <th>CSS Variable</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="color in colours" :key="color.name">
            <td><Swatch :colour="`var(--${color.token})`" /></td>
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
    padding-left: var(--rpl-sp-8);
  }

  &:nth-child(2) {
    text-transform: capitalize;
  }
}
</style>
