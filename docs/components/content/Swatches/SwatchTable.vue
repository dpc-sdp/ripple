<script setup lang="ts">
defineProps({
  headings: {
    type: Array,
    default: () => ['Colour', 'Description', 'Token', 'Status']
  },
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="shadow-sm overflow-hidden my-8">
    <table class="border-collapse table-auto w-full text-sm">
      <thead>
        <tr>
          <th
            v-for="(heading, idx) in headings"
            :key="`heading-${idx}`"
            class="
              border-b
              dark:border-slate-600
              font-medium
              p-4
              pl-8
              pt-0
              pb-3
              text-slate-400
              dark:text-slate-200
              text-left
            "
          >
            {{ heading }}
          </th>
        </tr>
      </thead>
      <tbody class="bg-white dark:bg-slate-800">
        <tr v-for="(row, rIdx) in items" :key="`row-${rIdx}`">
          <td
            v-for="(col, cIdx) in row"
            :key="`row-${rIdx}-col-${cIdx}`"
            class="
              border-b border-slate-100
              dark:border-slate-700
              p-4
              pl-8
              text-slate-500
              dark:text-slate-400
            "
          >
            {{ col }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
