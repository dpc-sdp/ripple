import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, provide } from 'vue'
import { svgPlaceholder } from 'ripple-storybook/utils'
import { RplAccordion } from '@dpc-sdp/ripple-ui-core/vue'
import RplMap from './RplMap.vue'
import RplMapPopUpAccordion from '../popup/RplMapPopUpAccordion.vue'
import RplMapProviderEsri from './providers/RplMapProviderEsri.vue'
import RplMapProviderVicMap from './providers/RplMapProviderVicMap.vue'
import featureData from './__fixture__/largeset.json'
import ExampleVectorLayer from './__fixture__/VectorLayer.example.vue'
import '@dpc-sdp/ripple-ui-core/style/components'

const Template = (args: any) => ({
  components: {
    RplMap,
    RplMapPopUpAccordion,
    RplMapProviderEsri,
    RplMapProviderVicMap,
    RplAccordion,
    ExampleVectorLayer
  },
  setup() {
    const rplMapRef = ref(null)
    const popup = ref({
      isOpen: false,
      position: [0, 0],
      feature: null
    })
    const deadSpace = ref({
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    })

    function setRplMapRef(mapInstance) {
      rplMapRef.value = mapInstance
    }

    provide('rplMapInstance', {
      rplMapRef,
      setRplMapRef,
      popup,
      deadSpace
    })
    const getClusteredFeatures = (itms) => {
      return itms.map((itm, idx) => {
        return {
          id: `${idx}-${itm.title}`,
          title: itm.title,
          content: itm.description
        }
      })
    }
    return {
      getClusteredFeatures,
      args
    }
  },
  template: `
    <RplMap projection="EPSG:3857" v-bind="args">
      <template #map-provider>
        <rpl-map-provider-esri v-if="args.provider === 'esri'" />
        <rpl-map-provider-vic-map v-if="args.provider === 'vicmap'" />
      </template>
      <template v-if="args.vectorLayers" #shapes="{ mapFeatures }">
        <ExampleVectorLayer :results="mapFeatures" />
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
        <RplMapPopUpAccordion v-else :features="getClusteredFeatures(selectedFeatures)" :getTitle="(f) => f.title">
          <template #feature="{ feature }">
            <p class="rpl-type-p-small">{{ feature.content }}</p>
          </template>
        </RplMapPopUpAccordion>
      </template>
    </RplMap>
  `
})

type ExtendedMapPropsProps = Partial<typeof RplMap> & {
  features: any
}

export default {
  title: 'Maps/Core',
  component: RplMap,
  render: Template,
  tags: ['skip'],
  args: {
    id: '123'
  }
} satisfies Meta<ExtendedMapPropsProps>

type Story = StoryObj<ExtendedMapPropsProps>

export const Esri: Story = {
  args: {
    id: 'map-esri',
    features: featureData,
    provider: 'esri'
  }
}

export const Vicmap: Story = {
  args: {
    id: 'map-vicmap',
    provider: 'vicmap',
    projection: 'EPSG:3857',
    features: featureData
  }
}

export const VectorLayers: Story = {
  args: {
    id: 'map-vector-layers',
    projection: 'EPSG:3857',
    features: featureData,
    provider: 'vicmap',
    popupType: 'popover',
    vectorLayers: true
  }
}

export const ClusteringNearer: Story = {
  args: {
    id: 'map-clustering-nearer',
    features: featureData,
    provider: 'vicmap',
    clusteringDistance: 25
  }
}

export const ClusteringDisabled: Story = {
  args: {
    id: 'map-clustering-disabled',
    features: featureData,
    provider: 'vicmap',
    clusteringDistance: 0
  }
}

export const WithLayerList: Story = {
  args: {
    id: 'map-with-layer-list',
    features: featureData,
    provider: 'vicmap',
    selectedLayers: ['red', 'green'],
    layerList: [
      {
        id: 'red',
        label: 'Red layer',
        image: svgPlaceholder({
          width: 44,
          height: 44,
          fgColor: '#fff',
          bgColor: '#ffb2b2'
        })
      },
      {
        id: 'green',
        label: 'Green layer',
        image: svgPlaceholder({
          width: 44,
          height: 44,
          fgColor: '#fff',
          bgColor: '#caffae'
        })
      },
      {
        id: 'blue',
        label: 'Blue layer',
        image: svgPlaceholder({
          width: 44,
          height: 44,
          fgColor: '#fff',
          bgColor: '#aee9ff'
        })
      }
    ]
  }
}
