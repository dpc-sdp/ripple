<template>
  <RplPageComponent class="tide-grant__documents">
    <ul v-if="documents.length > 0" class="rpl-type-p">
      <li v-for="(file, i) in documents" :key="i">
        <RplFile v-bind="file" />
      </li>
    </ul>
  </RplPageComponent>
</template>

<script setup lang="ts">
import type { TideGrantDocument } from '../types'

interface Props {
  documents: Array<TideGrantDocument>
}

defineProps<Props>()
</script>
