<script setup lang="ts">
import {
  getColourGroup,
  getColourValue,
  getColourName,
  getColourToken
} from '#imports'

const gradients = computed(() => {
  const options = getColourGroup('clr.gradient')

  return Object.keys(options).map((key) => {
    const ref = `clr.gradient${key !== '_' ? '.' + key : ''}`

    return {
      name: getColourName(ref),
      value: getColourValue(options[key]),
      token: getColourToken(ref)
    }
  })
})

const colours = computed(() => {
  let colourStops = []
  const options = getColourGroup('theme.clr.gradient')

  for (const [position, value] of Object.entries(options)) {
    colourStops.push({
      value,
      position: `${position}%`
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
              <Swatch :colour="`var(--${gradient.token})`" />
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
            <td><Swatch :colour="colour.value" /></td>
            <td class="docs-colour-name">{{ colour.value }}</td>
            <td>{{ colour.position }}</td>
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
    padding-left: var(--rpl-sp-8);
  }

  &:nth-child(2) {
    text-transform: capitalize;
  }
}
</style>
