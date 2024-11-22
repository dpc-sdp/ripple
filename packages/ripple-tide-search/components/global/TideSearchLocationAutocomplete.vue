<template>
  <RplSearchBar
    id="tide-address-lookup"
    :inputLabel="label"
    :showLabel="showLabel"
    variant="reverse"
    :submitLabel="false"
    :inputValue="
      inputValue?.useGeolocation ? userGeolocation || null : inputValue
    "
    :suggestions="results"
    :showNoResults="true"
    :maxSuggestionsDisplayed="8"
    :placeholder="placeholder"
    :getOptionId="(itm: any) => itm?.id || itm?.name"
    :getSuggestionVal="(itm: any) => itm?.name || ''"
    :getOptionLabel="(itm: any) => itm?.name || ''"
    :isBusy="isGettingLocation"
    :isFreeText="false"
    :submitOnClear="true"
    @submit="submitAction"
    @update:input-value="onUpdate"
  >
    <template #suggestion="{ option: { option } }">
      <span>{{ option?.name }}</span>

      <component
        :is="tagsComponent"
        v-if="tagsComponent"
        :option="option"
      ></component>
      <RplTag
        v-else-if="option?.postcode"
        :label="option?.postcode"
        variant="dark"
        class="rpl-u-margin-l-3"
      />
      <RplTag
        v-else-if="option?.tag"
        :label="option?.tag"
        variant="dark"
        class="rpl-u-margin-l-3"
      />
    </template>
  </RplSearchBar>
</template>

<script setup lang="ts">
import { ref } from '#imports'
import { useDebounceFn } from '@vueuse/core'
import { addressResultType } from '../../types'

interface Props {
  inputValue?: any
  /**
   * @deprecated use suggestionsConfig instead to customise suggestions
   */
  suggestionsIndex?: string
  /**
   * @deprecated use suggestionsConfig instead to customise suggestions
   */
  suggestionsKey?: string
  label?: string
  placeholder?: string
  tagsComponent?: string
  /**
   * @deprecated use suggestionsConfig instead to customise suggestions
   */
  mapResultsFnName?: string
  isGettingLocation?: boolean
  userGeolocation: any
  suggestionsConfig: {
    function: string
    args: Record<string, any>
  }
  showLabel?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  inputValue: null,
  suggestionsIndex: 'vic-postcode-localities',
  suggestionsKey: 'name',
  label: 'Search by postcode or suburb',
  placeholder: 'Enter postcode or suburb',
  tagsComponent: undefined,
  mapResultsFnName: '',
  isGettingLocation: false,
  userGeolocation: null,
  showLabel: true
})

const results = ref([])

const emit = defineEmits<{
  (e: 'update', payload: addressResultType): void
}>()

const pendingZoomAnimation = ref(false)

async function submitAction(e: any) {
  const item = e.payload

  // The search bar component sometimes returns a string, sometimes an object, we just ignore the non-empty strings
  if (item && typeof item === 'string') {
    return
  }

  if (item?.arcGISMagicKey) {
    const arcGISAddress = await getAddressFromArcGISMagicKey(
      item.arcGISMagicKey
    )
    emit('update', {
      ...item,
      ...(arcGISAddress || {}),
      arcGISMagicKey: undefined
    })
  } else {
    emit('update', item || null)
  }

  // Because this was a user initiated action, we want to animate the zoom
  pendingZoomAnimation.value = true
}

const fetchSuggestions = async (query: string) => {
  try {
    if (props.suggestionsConfig?.function) {
      const suggestionsFn = useAppConfigFunction(
        props.suggestionsConfig.function,
        'suggestionsFunctions'
      )

      return await suggestionsFn(query, props.suggestionsConfig.args)
    }

    return await useLegacySuggestions(
      query,
      props.suggestionsIndex,
      props.suggestionsKey,
      props.mapResultsFnName
    )
  } catch (e) {
    console.error(e)
  }
}

const onUpdate = useDebounceFn(async (q: string): Promise<void> => {
  if (!q) {
    results.value = []
    return
  }

  // If the query is not a string, then a value has been selected from the dropdown
  // and we shouldn't try to fetch suggestions
  if (typeof q !== 'string') {
    return
  }

  const res = await fetchSuggestions(q)
  if (!res || res.length === 0) {
    results.value = []
  } else {
    results.value = res
  }
}, 300)
</script>
