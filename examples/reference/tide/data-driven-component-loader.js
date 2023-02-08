const loadComponent = (configs) => {
  try {
    let dataDrivenComp = null

    switch (configs.name) {
      case 'sdp_data_pipelines_csl':
        dataDrivenComp = {
          name: () => import(/* webackChunkName: 'rpl-data-listing' */ '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/components/DataListing'),
          props: require('./data-listings/sdp_data_pipelines_csl').default
        }
        break
    }

    return dataDrivenComp
  } catch (error) {
    console.error(error)
  }
}

export default loadComponent
