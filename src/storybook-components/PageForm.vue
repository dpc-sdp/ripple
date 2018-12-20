<template>
  <rpl-base-layout class="demo">

    <template slot="header">
      <rpl-site-header
        :logo="mock.header.logo"
        :links="mock.header.links"
        :breakpoint="mock.header.breakpoint"
        :searchTerms="mock.header.searchTerms"
        showSearch
        sticky
        @open="menuOpenFunc"
        @search="searchFunc"
      />
    </template>

    <rpl-page-layout
      :sidebar="true"
      class="main rpl-container"
      :backgroundGraphic="mock.landingPage.backgroundGraphic"
    >
      <template slot="aboveContent">
        <rpl-hero-banner
          title="Test Form"
          introText="Test form on a landing page."
          class="rpl-site-constrain--on-all"
        />
      </template>

      <rpl-row row-gutter class="demo-main">
        <rpl-col cols="full">
          <rpl-form :formData="formData" />
        </rpl-col>
      </rpl-row>

      <template slot="sidebar">
        <rpl-related-links :title="mock.relatedLinks.title" :links="mock.relatedLinks.links" class="rpl-component-gutter"/>
      </template>

    </rpl-page-layout>

    <template slot="footer">
      <rpl-site-footer v-bind="mock.footer" />
    </template>

  </rpl-base-layout>

</template>

<script>
// This is a page for demo the hero banner graphics for the landing page component.

import { RplBaseLayout, RplPageLayout } from '@dpc-sdp/ripple-layout'
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplSiteFooter from '@dpc-sdp/ripple-site-footer'
import RplSiteHeader from '@dpc-sdp/ripple-site-header'

// Form
import RplForm from '@dpc-sdp/ripple-form'

// Sidebar
import RplRelatedLinks from '@dpc-sdp/ripple-related-links'

// Banner
import RplHeroBanner from '@dpc-sdp/ripple-hero-banner'

export default {
  name: 'SPageForm',
  components: {
    // Layout
    RplBaseLayout,
    RplPageLayout,
    RplContainer,
    RplRow,
    RplCol,
    RplSiteHeader,
    RplSiteFooter,

    // Card
    RplForm,

    // Sidebar
    RplRelatedLinks,

    // Banner
    RplHeroBanner
  },
  props: {
    mock: Object
  },
  data () {
    return {
      formData: {
        model: {
          vuemultiselect: null
        },

        schema: {
          fields: [
            {
              type: 'vueMultiSelect',
              model: 'vuemultiselect',
              label: 'Single-select drop down',
              hint: 'Implemented using vue-multiselect',
              placeholder: 'Select a single topic',
              selectOptions: {
                multiSelect: false,
                closeOnSelect: true,
                searchable: false,
                showLabels: false
              },
              values: ['Topic A', 'Topic B', 'Topic C', 'Topic D', 'Topic E', 'Topic F', 'Topic G']
            },

            {
              type: 'submit',
              buttonText: 'Submit'
            }
          ]
        },

        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        },

        formState: {}
      }
    }
  },
  methods: {
    // Methods for site header.
    searchFunc: function (value) {
      alert('Search for: "' + value + '"')
    },

    // Methods for site header.
    menuOpenFunc: function (menuOpenState) {
      document.body.style.overflow = menuOpenState ? 'hidden' : ''
    }
  }
}
</script>
