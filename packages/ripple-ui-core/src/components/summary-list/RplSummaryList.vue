<script setup lang="ts">
interface RplSummaryListItem {
  id: string
  label: string
  value?: string
  action?: string
}

interface Props {
  title?: string
  displayAction?: boolean
  items?: RplSummaryListItem[]
}

withDefaults(defineProps<Props>(), {
  title: undefined,
  displayAction: false,
  items: () => []
})
</script>

<template>
  <div v-if="items.length" class="rpl-summary-list">
    <h3 v-if="title" class="rpl-summary-list__title rpl-type-h3">
      {{ title }}
    </h3>
    <div class="rpl-table">
      <table>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <th scope="row" class="rpl-summary-list__label rpl-type-h4-fixed">
              <slot name="label" :item="item">
                {{ item.label }}
              </slot>
            </th>
            <td class="rpl-summary-list__value rpl-type-p">
              <slot name="value" :item="item">
                {{ item.value }}
              </slot>
            </td>
            <td
              v-if="displayAction"
              class="rpl-summary-list__action rpl-type-p"
            >
              <slot name="action" :item="item" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style src="./RplSummaryList.css"></style>
