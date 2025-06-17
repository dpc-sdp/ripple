import type { Meta, StoryObj } from '@storybook/vue3'
import { computed, ref, provide, watch } from 'vue'
import { RplAccordion, RplIcon } from '@dpc-sdp/ripple-ui-core/vue'
import '@dpc-sdp/ripple-ui-core/style/components'
import RplMap from './../map/RplMap.vue'
import RplMapSidePanel from './RplMapSidePanel.vue'
import RplMapSidePanelPagination from './RplMapSidePanelPagination.vue'
import RplMapSidePanelCount from './RplMapSidePanelCount.vue'
import RplMapSidePanelItem from './RplMapSidePanelItem.vue'
import RplMapProviderVicMap from './../map/providers/RplMapProviderVicMap.vue'
import featureData from './../map/__fixture__/features.json'
import { truncateText } from '../map/__fixture__/utils'
import useMapDeadSpace from '../../composables/useMapDeadSpace'

const Template = (args: any) => ({
  components: {
    RplMap,
    RplMapProviderVicMap,
    RplMapSidePanel,
    RplMapSidePanelItem,
    RplMapSidePanelPagination,
    RplMapSidePanelCount,
    RplAccordion,
    RplIcon
  },
  setup() {
    const rplMapRef = ref(null)
    const perPage = ref(10)
    const currentPage = ref(1)
    const activeItemId = ref(null)
    const rplMapSelectedFeatures = ref(null)
    const popup = ref({
      isOpen: false,
      position: [0, 0],
      feature: null
    })

    const deadSpace = useMapDeadSpace(true, 'sidebar', popup)

    function setRplMapRef(mapInstance) {
      rplMapRef.value = mapInstance
    }

    function setMapPanelPage({ value }) {
      currentPage.value = value
    }

    function handleItemClick({ value }) {
      if (value?.lat && value?.lng) {
        popup.value = {
          isOpen: true,
          position: [value.lng, value.lat],
          feature: [value]
        }
      }
    }

    const mapPanelItems = computed(() => {
      return args.features.slice(
        (currentPage.value - 1) * perPage.value,
        currentPage.value * perPage.value
      )
    })

    provide('rplMapInstance', {
      rplMapRef,
      setRplMapRef,
      rplMapSelectedFeatures,
      popup,
      deadSpace
    })

    watch(
      () => popup.value.isOpen,
      (isOpen, wasOpen) => {
        if (!isOpen && wasOpen) {
          activeItemId.value = null
        }
      }
    )

    return {
      truncateText,
      perPage,
      currentPage,
      setMapPanelPage,
      mapPanelItems,
      handleItemClick,
      activeItemId,
      args
    }
  },
  template: `
    <RplMap
      projection="EPSG:3857"
      v-bind="args"
    >
      <template #map-provider>
        <RplMapProviderVicMap />
      </template>
      <template #sidepanel="{ mapHeight }">
        <RplMapSidePanel
          :currentPage="currentPage"
          :pagingStart="currentPage"
          :pagingEnd="perPage"
          :totalResults="args.features.length"
          :totalPages="(args.features.length / perPage)"
          :mapHeight="mapHeight"
          :isBusy="false"
          @paginate="setMapPanelPage"
        >
          <RplMapSidePanelItem
            v-for="item in mapPanelItems"
            :key="item.title"
            :id="item.title"
            :title="item.title"
            :data="item"
            :activeId="activeItemId"
            @click="handleItemClick"
          >
            <template v-if="item.meta" #meta>
                <span class="rpl-map-side-panel__item-marker">
                  <RplIcon name="icon-pin" colour="default" />
                  {{ item.meta }}
                </span>
            </template>
            <p class="rpl-type-p">{{ truncateText(item.description, 50) }}</p>
            <template v-if="item.population" #footer>
              <span class="rpl-map-side-panel__item-population">Population: {{ item.population }}</span>
            </template>
          </RplMapSidePanelItem>
        </RplMapSidePanel>
      </template>
      <template #popupTitle="{ selectedFeatures }">
          <span v-if="selectedFeatures.length === 1">
            {{ selectedFeatures[0].title }}
          </span>
        <span v-else>
            {{ selectedFeatures.length }} items found in this area
          </span>
      </template>
      <template #popupContent="{ selectedFeatures }">
        <p class="rpl-type-p-small rpl-u-margin-t-4" v-if="selectedFeatures.length === 1">
          {{ selectedFeatures[0].description }}
        </p>
      </template>
    </RplMap>
  `
})

type ExtendedMapPropsProps = Partial<typeof RplMap> & {
  features: any
}

export default {
  title: 'Maps/Side Panel',
  component: RplMap,
  render: Template,
  args: {
    hasSidePanel: true
  }
} satisfies Meta<ExtendedMapPropsProps>

type Story = StoryObj<ExtendedMapPropsProps>

export const Default: Story = {
  args: {
    id: 'default',
    features: featureData
  }
}
