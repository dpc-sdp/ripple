<template>
  <div>
    <div v-if="variants.length > 1" class="flex h-full items-center mt-4 content-end">
      <label class="rpl-type-label rpl-type-weight-bold mr-2">Select variant</label>
      <select style="background-position: right 1rem center" class="
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
        " v-model="selected">
        <option v-for="(opt, idx) in variants" :key="`opt-{idx}`" :value="idx">
          {{ opt.variantName }}
        </option>
      </select>
    </div>
    <component-example>
      <component :is="component" v-bind="selectedVariant"></component>
    </component-example>
    <div v-if="showProps && selectedVariantProps?.length > 0" class="my-4">
      <h4 class="rpl-type-h4">Props</h4>
      <div class="rpl-table my-8">
        <div class="rpl-table__scroll-container">
          <table class="w-full">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Required</th>
                <th scope="col">Type</th>
                <th scope="col">Options</th>
                <th scope="col">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in selectedVariantProps">
                <td>
                  {{ prop.name }}
                </td>
                <td>
                  {{ prop.description }}
                </td>
                <td>
                  {{ prop.required }}
                </td>
                <td>
                  {{ prop.type }}
                </td>
                <td>
                  {{ getOptionsFromSchema(prop) }}
                </td>
                <td>
                  <template v-if="prop && prop.name">
                    {{ selectedVariant[prop.name] }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- TODO - refactor this into a component -->
    <div v-if="showEvents && selectedVariantEvents?.length > 0" class="my-4">
      <h4 class="rpl-type-h4">Events</h4>
      <div class="rpl-table my-8">
        <table class="w-full">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in selectedVariantEvents">
              <td>
                {{ prop.name }}
              </td>
              <td>
                {{ prop.description }}
              </td>
              <td>
                {{ prop.type }}
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
import { useAsyncData } from '#imports'
import { NuxtComponentMetaNames } from '#nuxt-component-meta/types'


interface Props {
  component: string
  variants: string[]
  showProps?: boolean
  showEvents?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showProps: true,
  showEvents: true
})


const specificComponentName = ref<NuxtComponentMetaNames>(props.component)
const { data: specificComponentMeta } = await useAsyncData('componentMeta', async () => await useComponentMeta(specificComponentName))

const selected = ref(0)
const selectedVariant = computed(() => {
  return props.variants[selected.value]
})
const selectedVariantProps = computed(() => {
  return specificComponentMeta.value?.meta?.props
})
const selectedVariantEvents = computed(() => {
  return specificComponentMeta.value?.meta?.events
})

const getOptionsFromSchema = (prop => {
  if (prop.schema?.schema) {
    if (prop.schema?.kind === 'enum') {
      return JSON.stringify(prop.schema?.schema.filter(itm => itm !== 'undefined').join(', '))
    }
  }
  return ''
})
</script>
