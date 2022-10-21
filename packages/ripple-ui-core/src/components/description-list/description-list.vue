<script lang="ts">
export default { name: 'RplDescriptionList' }
</script>

<script setup lang="ts">
import { RplDescriptionListItem } from './constants'

defineProps<{
  items: Array<RplDescriptionListItem>
}>()
</script>

<template>
  <dl class="rpl-description-list rpl-type-p">
    <template v-for="row in items">
      <template v-for="(description, term) in row" :key="term">
        <dt class="rpl-description-list__term">{{ term }}</dt>
        <dd class="rpl-description-list__description">{{ description }}</dd>
      </template>
    </template>
  </dl>
</template>

<style src="./description-list.css" />
