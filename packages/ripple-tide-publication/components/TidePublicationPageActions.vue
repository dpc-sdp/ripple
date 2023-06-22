<template>
  <div class="tide-publication__actions rpl-u-margin-b-9">
    <RplPageAction>
      <template v-if="documents.length > 0" #upper>
        <RplFile v-for="file in documents" :key="file.id" v-bind="file" />
      </template>
      <RplDocument :url="printUrl">
        <template #icon>
          <RplIcon name="icon-print-lined" size="l" colour="default" />
        </template>
        <template #name> Print full document </template>
      </RplDocument>
    </RplPageAction>
  </div>
</template>

<script setup lang="ts">
interface Props {
  documents?: any
  printUrl: string
}

withDefaults(defineProps<Props>(), {
  documents: () => []
})
</script>
