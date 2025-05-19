<script setup lang="ts">
import { computed, inject, Ref } from 'vue'
import { FormKitSchemaNode } from '@formkit/core'
import { isValid, parse } from 'date-fns'
import { formatDate } from '@dpc-sdp/ripple-ui-core'

interface Props {
  title?: any
  actionLabel?: any
  omitFinalStep?: boolean
}

interface FormReviewItemValue {
  id: string
  q: string
  a?: string
}

interface FormReviewItem {
  key: string
  step?: string
  name?: string
  items: FormReviewItemValue[]
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Review form',
  actionLabel: 'Change',
  omitFinalStep: true
})

const form: {
  schema: any[]
  values: Ref<object>
  multiStep: boolean
  goToField: Function
  stepsId: string
} = inject('form', {})

const shouldDisplayField = (field: any, values: any) => {
  return (
    field?.hasOwnProperty('name') &&
    values?.hasOwnProperty(field.name) &&
    field?.['$formkit'] !== 'RplFormHidden' &&
    field?.['$formkit'] !== 'hidden'
  )
}

const getOptionLabel = (field: any, value: any) => {
  if (!field.options || !Array.isArray(field.options)) return value

  return (
    field.options.find(
      (option: { value: string; label: string }) => option.value === value
    )?.label || value
  )
}
const getDisplayedValue = (field: any, value: string | boolean) => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  if (field?.dateFormat && value) {
    const date = parse(value, field.dateFormat, new Date())

    return isValid(date) ? formatDate(date) : value
  }
  return value
}

const getItemValues = (field: any, value: any): FormReviewItemValue => {
  return {
    id: field.id,
    q: field.label || field.checkboxLabel || field.name,
    a: field.options
      ? Array.isArray(value)
        ? value.map((val) => getOptionLabel(field, val)).join(', ')
        : getOptionLabel(field, value)
      : getDisplayedValue(field, value)
  }
}

const processSchemaItems = (
  schema: FormKitSchemaNode[],
  values: any
): FormReviewItemValue[] => {
  if (!Array.isArray(schema)) return []

  return schema
    .filter((field: any) => shouldDisplayField(field, values))
    .flatMap((field: any) => {
      if (field?.children?.length) {
        return processSchemaItems(field.children, values[field?.name])
      }

      return getItemValues(field, values[field?.name])
    })
}

const items = computed<FormReviewItem[]>(() => {
  let values = form.values.value || {}

  if (!values || !Object.values(values)?.length) {
    return []
  }

  if (form.multiStep) {
    values = values[form.stepsId] || values

    const stepItems = form.schema
      .filter((i) => i.$step)
      .map((step) => ({
        key: step.key,
        step: step.key,
        name: step.title,
        items: processSchemaItems(step.schema, values[step.key])
      }))

    return props.omitFinalStep ? stepItems.slice(0, -1) : stepItems
  }

  return [
    {
      key: 'default',
      items: processSchemaItems(form.schema, values)
    }
  ]
})
</script>

<template>
  <div v-if="items.length" class="rpl-form-review">
    <h3 v-if="title" class="rpl-u-visually-hidden">{{ title }}</h3>

    <div
      v-for="entry in items"
      :key="entry.key"
      :class="`rpl-form-review--${entry.key} rpl-form-review__wrap`"
    >
      <h3 v-if="entry?.name" class="rpl-form-review__step rpl-type-h3">
        {{ entry.name }}
      </h3>
      <div class="rpl-table">
        <table>
          <tbody>
            <tr v-for="field in entry.items" :key="field.id">
              <th
                scope="row"
                class="rpl-form-review__question rpl-type-h4-fixed"
              >
                {{ field.q }}
              </th>
              <td class="rpl-form-review__answer rpl-type-p">
                {{ field.a || 'Not provided' }}
              </td>
              <td class="rpl-form-review__action rpl-type-p">
                <a
                  class="rpl-text-link rpl-u-focusable-inline"
                  :href="`#${field.id}`"
                  @click.prevent="
                    form.goToField(field.id, entry?.step, actionLabel)
                  "
                >
                  {{ actionLabel }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style src="./RplFormReview.css"></style>
