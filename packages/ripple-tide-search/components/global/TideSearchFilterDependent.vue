<script setup lang="ts">
import { getNode } from '@formkit/core'

interface Props {
  id: string
  multiple?: boolean
  options?: any[]
  variant?: string
  columns?: string
  levels: {
    label: string
    placeholder: string
    multiple?: boolean
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  multiple: false,
  variant: 'default',
  columns: 'rpl-col-6-m',
  levels: () => []
})

const groupValues: { [key: string]: any } = ref({})
const selectOptions: { [key: string]: any } = reactive(
  Object.fromEntries(
    Array.from(Array(props.levels.length).keys()).map((i) => [
      `${props.id}-${i + 1}`,
      []
    ])
  )
)

const keyedOptions = computed(() => {
  return props.options.reduce((grouped, item) => {
    let key = item?.parent

    if (!grouped[key]) grouped[key] = []

    grouped[key].push(item)

    return grouped
  }, {})
})

const parentOptions = computed(() =>
  props.options.filter((option) => !option.parent)
)

const getChildOptions = (parent: string | string[]): object[] => {
  const selectedIds = props.options?.filter((option) =>
    Array.isArray(parent)
      ? parent.includes(option.value)
      : parent === option.value
  )

  return selectedIds
    .map((item) => keyedOptions.value[item.id])
    .filter(Boolean)
    .flat()
}

const getChildSelection = (value: string | string[], options: object[]) => {
  if (Array.isArray(value)) {
    return value.filter((selection) =>
      options.some((option: any) => option.value === selection)
    )
  }

  return options.some((option: any) => option.value === value) ? value : null
}

const getUpdatedValues = (
  selected: object
): {
  options: { [key: string]: object[] }
  selection: { [key: string]: any }
} => {
  const selection: { [key: string]: any } = {}
  const options: { [key: string]: object[] } = {}

  Object.entries(selected).forEach(([key, value]) => {
    const depth = Number(key.match(/\d+$/)?.[0])

    if (depth === 1) {
      selection[key] = value
      options[key] = parentOptions.value
    } else {
      options[key] = getChildOptions(selection[`${props.id}-${depth - 1}`])
      selection[key] = getChildSelection(value, options[key])
    }
  })

  return { options, selection }
}

watch(
  groupValues,
  (curr) => {
    const { options, selection } = getUpdatedValues(curr)

    // Update child options based on parent selection
    Object.entries(options).forEach(([key, value]) => {
      if (selectOptions[key]?.length) selectOptions[key].length = 0

      value.forEach((val: object) => selectOptions[key].push(val))
    })

    // If the updated options results in a selection no longer being available, we need to remove that selection
    Object.entries(selection).forEach(([key, value]) => {
      let change = false

      if (Array.isArray(curr[key])) {
        change = curr[key].filter((val: string) => !value.includes(val)).length
      } else {
        change = curr[key] !== value
      }

      if (change) {
        nextTick(() => getNode(key)?.input(selection[key]))
      }
    })
  },
  { deep: true }
)
</script>

<template>
  <FormKit :id="`${id}`" :key="`${id}`" v-model="groupValues" type="group">
    <div
      v-for="i in levels.length"
      :key="`${id}-${i}`"
      :class="`rpl-col-12 ${columns}`"
    >
      <FormKit
        :id="`${id}-${i}`"
        :name="`${id}-${i}`"
        type="RplFormDropdown"
        :multiple="levels?.[i - 1]?.multiple ?? multiple"
        :label="levels?.[i - 1]?.label"
        :placeholder="levels?.[i - 1]?.placeholder"
        :options="selectOptions[`${id}-${i}`] || []"
        :disabled="!selectOptions[`${id}-${i}`]?.length"
        :variant="variant"
      />
    </div>
  </FormKit>
</template>
