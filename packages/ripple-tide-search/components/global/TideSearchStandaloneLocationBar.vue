<template>
  <TideSearchLocationAutocomplete
    :label="label"
    :placeholder="placeholder"
    :tagsComponent="tagsComponent"
    :suggestionsConfig="suggestionsConfig"
    :showLabel="showLabel"
    :suggestionsIndex="suggestionsIndex"
    :suggestionsKey="suggestionsKey"
    :mapResultsFnName="mapResultsFnName"
    @update="handleSelect"
  />
</template>

<script setup lang="ts">
import { getScopedQueryParams } from '#imports'

interface Props {
  searchUrl: string
  openInNewWindow?: boolean
  label?: string
  placeholder?: string
  tagsComponent?: string
  suggestionsConfig?: {
    function: string
    args: Record<string, any>
  }
  showLabel: boolean
  /**
   * @deprecated use suggestionsConfig instead to customise suggestions
   */
  suggestionsIndex?: string
  /**
   * @deprecated use suggestionsConfig instead to customise suggestions
   */
  suggestionsKey?: string
  /**
   * @deprecated use suggestionsConfig instead to customise suggestions
   */
  mapResultsFnName?: string
}

const props = withDefaults(defineProps<Props>(), {
  openInNewWindow: false,
  label: 'Search by postcode or suburb',
  placeholder: 'Enter postcode or suburb',
  tagsComponent: undefined,
  suggestionsConfig: undefined,
  showLabel: false,
  isGettingLocation: false,
  userGeolocation: null,
  mapResultsFnName: '',
  suggestionsIndex: 'vic-postcode-localities',
  suggestionsKey: 'name'
})

const handleSelect = async (val: any) => {
  const locationParams = getScopedQueryParams('location', val)

  await navigateTo(
    {
      path: props.searchUrl,
      query: {
        ...locationParams
      }
    },
    props.openInNewWindow
      ? {
          open: {
            target: '_blank'
          }
        }
      : undefined
  )
}
</script>
