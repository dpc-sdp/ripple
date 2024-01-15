<script setup lang="ts">
import { getNode, FormKitNode } from '@formkit/core'

interface Props {
  id: string
  label: string
  placeholder: string
  dependantLabel: string
  dependantPlaceholder: string
  multiple: boolean
  options?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => []
})

const groupValues = ref({})
const selectedParent = ref('')
const initialChild = ref(null)
let formNode: FormKitNode | undefined
let formChildNode: FormKitNode | undefined

const parentOptions = computed(() => {
  return props.options.filter((option) => !option.parent)
})

const childOptions = computed(() => {
  if (!selectedParent.value) return []

  const selectedOption = props.options?.find(
    (option) => option.value === selectedParent.value
  )

  return props.options.filter((opt) => opt.parent === selectedOption?.id)
})

const handleSelect = (value: string) => {
  if (selectedParent.value !== value) {
    selectedParent.value = value

    // When the parent select is updated, the child select value is cleared, this is the desired case
    // except for the initial load when we what the supplied child value to persist
    if (formNode && initialChild.value) {
      nextTick(() => {
        formNode.input({
          [`${props.id}-parent`]: value,
          [`${props.id}-child`]: initialChild.value
        })
        initialChild.value = null
      })
    }
  }
}

onMounted(() => {
  formNode = getNode(`${props.id}`)
  formChildNode = getNode(`${props.id}-child`)

  if (formChildNode?.value) {
    initialChild.value = formChildNode?.value
  }
})
</script>

<template>
  <FormKit :id="`${id}`" :key="`${id}`" v-model="groupValues" type="group">
    <div class="rpl-col-12 rpl-col-6-m">
      <FormKit
        :id="`${id}-parent`"
        :key="`${id}-parent`"
        :name="`${id}-parent`"
        type="RplFormDropdown"
        :multiple="false"
        :label="label"
        :placeholder="placeholder"
        :options="parentOptions"
        @input="handleSelect"
      />
    </div>
    <div class="rpl-col-12 rpl-col-6-m">
      <FormKit
        :id="`${id}-child`"
        :key="`${id}-child-${selectedParent}`"
        :name="`${id}-child`"
        :disabled="!selectedParent || !childOptions.length"
        type="RplFormDropdown"
        :multiple="multiple"
        :label="dependantLabel"
        :placeholder="dependantPlaceholder"
        :options="childOptions"
      />
    </div>
  </FormKit>
</template>
