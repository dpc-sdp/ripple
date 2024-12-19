export default defineAppConfig({
  ripple: {
    featureFlags: {
      contentCollectionSearchConnector: 'elasticsearch'
    },
    dataDrivenComponents: {
      // add key of field_data_driven_component and value of component name to render
      // eg: find_a_council_map: 'VicCouncilLookup'
      location_search_banner: 'TideLandingPageMapSearchBanner'
    }
  }
})
