<script setup lang="ts">
interface Props {
  // props for UI wrapper
  title: string
  intro: string
  image: string

  // props for search bar
  searchUrl: string
  openInNewWindow?: boolean

  // props to match custom collection locationQueryConfig
  label?: string
  placeholder?: string
  tagsComponent?: string
  suggestionsConfig: {
    function: string
    args: Record<string, any>
  }
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

withDefaults(defineProps<Props>(), {
  openInNewWindow: false,
  label: 'Search by postcode or suburb',
  placeholder: 'Enter postcode or suburb',
  tagsComponent: undefined,
  suggestionsConfig: undefined,
  isGettingLocation: false,
  userGeolocation: null,
  mapResultsFnName: '',
  suggestionsIndex: 'vic-postcode-localities',
  suggestionsKey: 'name'
})
</script>

<template>
  <RplSearchBanner :title="title" :intro="intro" :image="image">
    <TideSearchStandaloneLocationBar
      :searchUrl="searchUrl"
      :openInNewWindow="openInNewWindow"
      :label="label"
      :placeholder="placeholder"
      :tagsComponent="tagsComponent"
      :suggestionsConfig="suggestionsConfig"
      :suggestionsIndex="suggestionsIndex"
      :suggestionsKey="suggestionsKey"
      :mapResultsFnName="mapResultsFnName"
    />
  </RplSearchBanner>
</template>
