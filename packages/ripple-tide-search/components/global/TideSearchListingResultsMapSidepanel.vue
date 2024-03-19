<template>
  <RplMapSidePanel
    v-if="variant === 'desktop' || (variant === 'mobile' && !popup?.isOpen)"
    :isBusy="isBusy"
    :isStandalone="variant === 'mobile'"
    :class="`tide-search-sidepanel--${variant}`"
    :pagingStart="pagingStart"
    :pagingEnd="pagingEnd"
    :totalResults="totalResults"
    :currentPage="currentPage"
    :totalPages="totalPages"
    @paginate="handlePageChange"
  >
    <component
      :is="
        mapConfig.sidePanel?.resultsComponent ||
        'TideSearchResultMapSidepanelItem'
      "
      v-for="item in results"
      :key="item.id"
      v-bind="item.props"
      :isActive="
        popup?.isOpen &&
        item.props.result.unique_id ===
          (popup?.feature ? popup?.feature[0].unique_id : '')
      "
      @click="handleSidePanelClick(item, activatePin)"
    />
  </RplMapSidePanel>

  <div
    v-if="variant === 'mobile'"
    ref="mobilePopupRef"
    :class="`tide-search-sidepanel--${variant}`"
  >
    <RplMapPopUp
      type="standalone"
      :isOpen="popup?.isOpen"
      @close="popup.isOpen = false"
    >
      <template #header>
        <TideSearchListingResultsPopupTitle
          :popupConfig="mapConfig.props.popup"
          :titleObjPath="mapConfig.props.titleObjPath"
        />
      </template>
      <TideSearchListingResultsPopupContent
        :popupConfig="mapConfig.props.popup"
        :titleObjPath="mapConfig.props.titleObjPath"
      />
    </RplMapPopUp>
  </div>
</template>

<script setup lang="ts">
import { get } from 'lodash-es'
import { fromLonLat } from 'ol/proj'

interface Props {
  variant: 'mobile' | 'desktop'
  mapConfig: any
  results: any
  activatePin: any
  mapHeight: number
  showToggle: boolean
  isStandalone: boolean
  isBusy: boolean
  panelLocation?: 'left' | 'right'
  pagingStart: number
  pagingEnd: number
  totalResults: number
  totalPages: number
  currentPage: number
}

const props = withDefaults(defineProps<Props>(), {
  panelLocation: 'left',
  isStandalone: false,
  showToggle: false
})

const emit = defineEmits<{
  (
    e: 'paginate',
    payload: rplEventPayload & { action: 'prev' | 'next' | 'page' }
  ): void
}>()

const { popup } = inject('rplMapInstance')

const mobilePopupRef = ref(null)

const handleSidePanelClick = async (item, activatePin) => {
  const location = get(
    item.props.result,
    props.mapConfig?.props?.locationObjPath
  )

  if (location && props.mapConfig && item.props) {
    const locationLatLng = location.split(',')
    const lat = parseFloat(locationLatLng[0])
    const lng = parseFloat(locationLatLng[1])

    activatePin(fromLonLat([lng, lat]), item.props.result)
  }

  await nextTick()

  if (mobilePopupRef.value) {
    scrollToElementTopWithOffset(mobilePopupRef.value, 72, false)
  }
}

const handlePageChange = (event) => {
  emit('paginate', event)
}
</script>

<style>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.tide-search-sidepanel--mobile {
  @media (--rpl-bp-m) {
    display: none;
  }
}

.tide-search-sidepanel--desktop {
  display: none;

  @media (--rpl-bp-m) {
    display: block;
  }
}
</style>
