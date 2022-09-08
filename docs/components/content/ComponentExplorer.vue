<template>
  <div>
    <div class="flex h-full items-center mt-4 content-end">
      <label class="rpl-type-label rpl-type-weight-bold mr-2"
        >Select variant</label
      >
      <select
        style="background-position: right 1rem center"
        class="
          focus:ring-indigo-500
          focus:border-indigo-500
          py-1
          pl-2
          pr-8
          border-slate-400 border
          bg-transparent
          text-gray-800
          sm:text-sm
          rounded-md
        "
        v-model="selected"
      >
        <option v-for="(opt, idx) in variants" :key="`opt-{idx}`" :value="idx">
          {{ opt.variantName }}
        </option>
      </select>
    </div>
    <component-example>
      <component :is="component" v-bind="selectedVariant"></component>
    </component-example>
    <div v-if="showProps" class="my-4">
      <h4>Props</h4>
      <div class="prose prose-slate overflow-hidden my-8 max-w-full">
        <table class="border-collapse table-auto w-full text-sm">
          <tbody>
            <tr v-for="(propValue, propKey) in selectedVariantProps">
              <td class="rpl-type-label-small rpl-type-weight-bold">
                {{ propKey }}
              </td>
              <td>
                {{ propValue }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppSelect1 from '../app/AppSelect.vue'
const props = defineProps({
  component: String,
  variants: Array,
  showProps: Boolean
})
const selected = ref(0)
const selectedVariant = computed(() => {
  return props.variants[selected.value]
})
const selectedVariantProps = computed(() => {
  const removeKey = (obj, prop) => {
    let { [prop]: omit, ...res } = obj
    return res
  }
  if (selectedVariant) {
    return removeKey(selectedVariant.value, 'variantName')
  }
  return selectedVariant
})
</script>
