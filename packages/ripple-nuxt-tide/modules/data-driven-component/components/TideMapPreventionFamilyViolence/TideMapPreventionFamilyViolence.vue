<template>
  <div class="tide-map">
    <h2 v-if="title" class="tide-map__title">{{title}}</h2>
    <RplMarkup v-if="description" :html="description"/>
    <p
      class="rpl-visually-hidden"
    >The following is an interactive map component, showing the location of programs being run in support of the Prevention of Family Violence initiative.</p>
    <div>
      <div ref="tideMapContainer" class="tide-map__container">
        <div :class="expandedMapClass">
          <rpl-button
            class="full-screen-btn"
            theme="primary"
            @click.native.prevent="toggleMapFullScreen"
          >
            <rpl-text-icon
              :symbol="buttonIcon"
              color="white"
              size="m"
              placement="before"
              :text="buttonText"
            />
          </rpl-button>
          <div class="tide-map__container__expand-btn-container" >
            <tideMapExpandButton :expanded="expanded" @click="toggleExpand"/>
          </div>
          <rpl-map :baseMapUrl="baseMapUrl" :customMethods="customMethods" :minZoom="6" :refreshOn="refreshOn"/>

        </div>
        <div class="tide-map__sidebar-container">
          <tideMapSidebarHome
            :categories="allCategories"
            :areas="allAreas"
            :projects="projects"
            :selectedProjects="selectedProjects"
            :parentSelectedProject="selectedProject"
            v-on:set-selected-project="setSelectedProject"
            v-on:back-clicked="clickBack"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// This component is referenced by the Data-Driven Component
// from Drupal, used for now to display the Free Wifi map.
// Props set in ~/modules/nuxt-tide-landing-page/lib/config/tide.config.js
import RplMarkup from '@dpc-sdp/ripple-markup'
import RplButton from '@dpc-sdp/ripple-button'
import { RplTextIcon } from '@dpc-sdp/ripple-icon'
import { RplMap } from '@dpc-sdp/ripple-map'
import ol from '@dpc-sdp/ripple-map/lib/ol'
import TideMapSidebarHome from './TideMapSidebarHome'
import TideMapExpandButton from './TideMapExpandButton'
import { emptyArray, toggleFullScreen, isFullscreen } from './helper'
const { createImageIconStyle } = ol

const baseMapUrl = 'https://api.mapbox.com/styles/v1/myvictoira/cjio5h4do0g412smmef4qpsq5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXl2aWN0b2lyYSIsImEiOiJjamlvMDgxbnIwNGwwM2t0OWh3ZDJhMGo5In0.w_xKPPd39cwrS1F4_yy39g'
const themeColor = '#0052c2'
const disabledColor = '#666'
const clusterColor = '#FFFFFF'

const _allCategories = [
  { key: 'children_young_people', title: 'Children and young people' },
  { key: 'higher_education', title: 'Higher education' },
  { key: 'aboriginal', title: 'Aboriginal' },
  { key: 'lgbqti', title: 'LGBQTI' },
  { key: 'seniors', title: 'Seniors' },
  { key: 'parents', title: 'Parents' },
  { key: 'disability_focus', title: 'Disability focus' },
  {
    key: 'culturally_linguistically_diverse',
    title: 'Culturally linguistically diverse'
  },
  {
    key: 'education_children_young_people',
    title: 'Education, children and young people'
  },
  { key: 'sports_recreation', title: 'Sports recreation' },
  { key: 'arts', title: 'Arts' },
  { key: 'research_or_action_research', title: 'Research or action research' },
  { key: 'workplace_cultural_change', title: 'Workplace cultural change' },
  {
    key: 'public_spaces_infrastructure_and_facilities',
    title: 'Public spaces, infrastructure and facilities'
  },
  { key: 'technology_online', title: 'Technology online' },
  {
    key: 'health_family_and_community_services',
    title: 'Health, family and community services'
  },
  { key: 'media', title: 'Media' },
  { key: 'bystander', title: 'Bystander' }
]

const _projects = []
const _selectedProjects = []
const _selectedProject = [] // Even though this is a single item, I had to use an array to get the ref for vue to be able to communicate to the global methods.
const _allAreas = []
const _features = []

// Calling the feature.changed method seems to cause all other features to re render (Which is what we want)
const triggerMapRedraw = () => _features.length > 0 && _features[0].changed()
const setSelectedProject = proj => {
  emptyArray(_selectedProject)
  if (proj) {
    _selectedProject.push(proj)
  }
}

const customMethods = {
  readFeatureData: features => {
    features.forEach(f => {
      const id = f.getId()
      const found = _projects.find(p => p.id === id)
      if (found) {
        return
      }
      const title = f.get('project_name')
      const program = f.get('program_name')
      const providedBy = f.get('providing_agency')
      const details = f.get('overview_initiative')
      const councils = f.get('council_name')
      const href = f.get('agency_public_content_web')
      const project = {
        id,
        title: title ? title.trim() : '',
        program,
        providedBy,
        details,
        href,
        categories: [],
        areas: []
      }
      _projects.push(project)
      _features.push(f)
      _allCategories.forEach(c => {
        if (f.get(c.key)) {
          project.categories.push(c)
        }
      })

      if (councils) {
        const areas = councils.split('\r\n')
        areas.forEach(a => {
          // Don't want to add empty values
          if (!a || !a.trim()) {
            return
          }
          const areaVal = a.trim()
          const newAreaObject = { key: areaVal, title: areaVal, isArea: true }
          project.areas.push(newAreaObject)

          // Don't want to add duplicated
          if (!_allAreas.find(ma => ma.key === newAreaObject.key)) {
            _allAreas.push(newAreaObject)
          }
        })
      }
    })
  },
  themeFeatureStyleFunction: (feature, resolution) => {
    const features = feature.get('features')
    customMethods.readFeatureData(features)
    const size = 30
    const fontSizeInPx = '3.7'
    const clusterSize = features.length
    const isCluster = clusterSize > 1
    const clusterSizeText =
      clusterSize > 99
        ? `99<tspan style="font-size:${fontSizeInPx * 0.75}px">+</tspan>`
        : clusterSize.toString()

    let circleFill = isCluster ? clusterColor : themeColor
    let circleOutline = themeColor
    let textColor = isCluster ? themeColor : clusterColor
    const featureIds = features.map(f => f.getId()).sort()
    let match = true
    if (_selectedProject.length > 0) {
      // Try match selectedProject to feature
      const selectedId = _selectedProject[0].id
      match = featureIds.some(id => id === selectedId)
    } else {
      if (_selectedProjects.length > 0) {
        // Try match selectedProjects to feature - the feature can change when zooming so this stops working when feature is changed during a zoom event.
        const projectIds = _selectedProjects.map(p => p.id).sort()
        match = projectIds.length === featureIds.length
        if (match) {
          match = true
          for (let i = 0; i < projectIds.length; i++) {
            if (match && projectIds[i] !== featureIds[i]) {
              match = false
            }
          }
        }
      }
    }

    if (!match) {
      circleFill = disabledColor
      circleOutline = disabledColor
      textColor = clusterColor
    }
    // NOTE: the whitespace in the <text> element is
    // important: `>${clusterSizeText}</text>`
    // IE doesn't trim all the whitespace and it leads
    // to off-center text
    const svgDefinition =
      'data:image/svg+xml;charset=utf-8,' +
      encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg"
          width="${size}"
          height="${size}"
          viewBox="0 0 8 8">
          <circle
            stroke="${circleOutline}"
            fill="${circleFill}"
            stroke-width="1"
            cx="4"
            cy="4"
            r="3.5"/>
          <text
            x="50%"
            y="50%"
            dy="1.25"
            text-anchor="middle"
            fill="${textColor}"
            style="font-size:${fontSizeInPx}px;
              font-weight: bold;
              font-family:VIC-Regular, Arial, Helvetica, sans-serif;"
          >${clusterSizeText}</text>
        </svg>
      `)

    return [createImageIconStyle(svgDefinition, 'anonymous', [size, size])]
  },
  createThemeLayer: ol => {
    const isIE =
      navigator.appName === 'Microsoft Internet Explorer' ||
      !!(
        navigator.userAgent.match(/Trident/) ||
        navigator.userAgent.match(/rv:11/)
      )
    const themeSource = new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      url: extent =>
        `https://myvic-app-dev-gis.beta.vic.gov.au/geoserver/wfs?service=WFS&version=1.1.0&request=GetFeature&typename=myvic:family_violence&outputFormat=application/json&srsname=EPSG:3857&bbox=${extent.join()},EPSG:3857`,
      strategy: ol.loadingstrategy.bbox
    })

    const clusterSource = new ol.source.ClusterSource({
      source: themeSource,
      distance: 40
    })

    if (isIE) {
      // internet explorer throws an error when using AnimatedCluster
      return new ol.layer.Vector({
        source: clusterSource,
        style: customMethods.themeFeatureStyleFunction
      })
    }

    return new ol.source.AnimatedCluster({
      animationDuration: 600,
      source: clusterSource,
      style: customMethods.themeFeatureStyleFunction
    })
  },
  featureMapper: feature => {
    // This is the method thats called when clicking on a feature on the map
    const features = feature.get('features')
    emptyArray(_selectedProjects)
    emptyArray(_selectedProject)
    const count = features.length
    if (count > 0) {
      features.forEach(f => {
        const id = f.getId()
        const p = _projects.find(p => p.id === id)
        if (count === 1) {
          setSelectedProject(p)
        } else {
          _selectedProjects.push(p)
        }
      })
    }

    triggerMapRedraw()
  }
}

export default {
  name: 'TideMapPreventionFamilyViolence',
  components: {
    RplMarkup,
    RplMap,
    TideMapExpandButton,
    TideMapSidebarHome,
    RplTextIcon,
    RplButton
  },
  props: {
    title: String,
    description: String
  },
  data: function () {
    return {
      baseMapUrl,
      customMethods,
      allCategories: _allCategories,
      allAreas: _allAreas,
      projects: _projects,
      selectedProjects: _selectedProjects,
      selectedProject: _selectedProject,
      isFullScreen: false,
      expanded: false,
      refreshOn: false,
      buttonText: 'Enter full screen',
      buttonIcon: 'fullscreen'
    }
  },
  computed: {
    expandedMapClass () {
      return this.expanded ? 'tide-map__map-container map-expanded' : 'tide-map__map-container'
    }
  },
  mounted () {
    // We need to listen to the Document global fullscreen change event as user can use "Esc" to escape the fullscreen which will bypass our component toggle event.
    document.addEventListener('fullscreenchange', this.toggleButtonText)
  },
  methods: {
    toggleButtonText () {
      if (isFullscreen()) {
        this.buttonText = 'Exit full screen'
        this.buttonIcon = 'close'
      } else {
        this.buttonText = 'Enter full screen'
        this.buttonIcon = 'fullscreen'
      }
    },
    toggleExpand () {
      this.expanded = !this.expanded
      this.refreshMapSize()
    },
    refreshMapSize () {
      // Not sure why, but the rpl map api has a watch on the refreshOn prop. This watch method triggers a map resize when the refreshOn prop is set to true.
      // Toggling it off an on with a timeout seems to consistently trigger the method and resize the map - Yay.
      this.refreshOn = false
      setTimeout(() => (this.refreshOn = true), 100)
    },
    toggleMapFullScreen () {
      toggleFullScreen(this.$refs.tideMapContainer)
      this.isFullScreen = !this.isFullScreen
      this.refreshMapSize()
    },
    clickBack () {
      if (_selectedProject.length > 0) {
        // Clear selectedProject first
        emptyArray(_selectedProject)
      } else {
        // Otherwise clear selectedProjects
        emptyArray(_selectedProjects)
      }
      triggerMapRedraw()
    },
    setSelectedProject (proj) {
      setSelectedProject(proj)
      triggerMapRedraw()
    }
  }
}
</script>

<style lang="scss">
@import '~@dpc-sdp/ripple-global/scss/settings';
@import '~@dpc-sdp/ripple-global/scss/tools';

.tide-map {
  &tide-map__title {
    @include rpl_mobile_padding;

    @include rpl_breakpoint(m) {
      padding-left: 0;
      padding-right: 0;
    }
  }
}

/* Do the following when large (wide) screen */
.tide-map__container:fullscreen {
  .tide-map__sidebar-container,
  .tide-map__map-container {
    height: 100vh;
  }
}
.tide-map__container {
  width: 100%;
  display: flex;
  .tide-map__sidebar-container {
    width: 450px;
    min-width: 450px;
    margin-right: 0 !important;
    float: left !important;
    order: 1;
  }
  .tide-map__map-container {
    width: 100%;
    margin-left: 0 !important;
    order: 2;
    position: relative;
  }
  .tide-map__sidebar-container,
  .tide-map__map-container {
    height: 600px;
  }
  .full-screen-btn {
    top: $rpl-space-2;
    right: $rpl-space-2;
    z-index: 1000;
    width: auto;
    position: absolute;
    .rpl-icon--close {
      height: $rpl-space-2 !important;
      width: $rpl-space-2 !important;
    }
  }
  .tide-map__container__expand-btn-container {
    display: none;
  }
  // Hack to make the map fullscreen
  .rpl-map {
    height: 100%;
    &__map {
      height: 100%;
    }
    &__container {
      height: 100%;
      padding-top: 0px;
    }
  }
}

/* Do the following when small(narrow) screen */
@media (max-width: 768px) {
  h1 {
    font-size: 1em !important;
  }
  .tide-map__container {
    .rpl-text-label--emphasis.rpl-text-label--small {
      font-size: 0.75rem;
    }

    &:fullscreen .rpl-text-label--emphasis.rpl-text-label--small {
      font-size: 0.875rem;
    }
    .tide-map__container__expand-btn-container {
      position: absolute;
      z-index: 1000;
      bottom: $rpl-space-2;
      right: $rpl-space-2;
      display: block;
    }
  }
  .tide-map__container,
  .tide-map__container:fullscreen {
    .full-screen-btn {
      font-size: 1rem;
      padding-top: $rpl-space-2;
      padding-bottom: $rpl-space-2;
    }
    display: block;
    .tide-map__sidebar-container {
      height: 70vh;
      min-width: 0px;
    }
    .tide-map__map-container {
      height: 30vh;
      &.map-expanded {
        height: 60vh;
      }
    }
    .tide-map__sidebar-container,
    .tide-map__map-container {
      width: 100% !important;
      float: none !important;
    }
  }
}
</style>
