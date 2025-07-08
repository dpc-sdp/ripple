<script setup lang="ts">
import { getColourValue, getColourName, getColourToken } from '#imports'

const gradients = computed(() => {
  const options = getColourOptions(['clr.gradient'])

  return Object.keys(options).map((key) => ({
    name: getColourName(key),
    value: getColourValue(options[key]),
    token: getColourToken(key)
  }))
})

const colours = computed(() => {
  let colourStops = []
  const options = getColourOptions(['theme.clr.gradient'])

  for (const [name, value] of Object.entries(options)) {
    colourStops.push({
      value,
      position: name.split('.').pop()
    })
  }

  return colourStops
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
            <th>CSS Variable</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gradient in gradients" :key="gradient.name">
            <td>
              <DocsSwatch :colour="`var(--${gradient.token})`" />
            </td>
            <td>{{ gradient.name }}</td>
            <td>{{ gradient.token }}</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th></th>
            <th>Value</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="colour in colours" :key="colour.name">
            <td><DocsSwatch :colour="colour.value" /></td>
            <td>{{ colour.value }}</td>
            <td>{{ colour.position }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
td {
  vertical-align: middle;

  &:first-child {
    width: 16%;
  }

  &:nth-child(2) {
    text-transform: capitalize;
  }
}
</style>
