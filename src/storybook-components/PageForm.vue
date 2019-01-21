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
      class="main"
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
          <rpl-button theme="secondary" @click.native="toggleFormData()">{{ showData ? 'Hide' : 'Show' }} form data</rpl-button>
          <ul v-if="showData" class="page-form-data-demo">
            <li v-for="(model, key) in formData.model" :key="key">
              <strong>{{ key }}</strong> = <span>{{ model }}</span>
            </li>
          </ul>
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
import RplButton from '@dpc-sdp/ripple-button'

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
    RplHeroBanner,
    RplButton
  },
  props: {
    mock: Object
  },
  data () {
    return {
      showData: false,
      formData: {
        model: {
          vuemultiselect: null,
          dateRange: ['', ''],
          date: null,
          checkbox_required: false
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
              type: 'rpldatepicker',
              range: true,
              label: 'Date range',
              model: 'dateRange',
              startPlaceholder: 'Start',
              endPlaceholder: 'End'
            },

            {
              type: 'rpldatepicker',
              ranged: false,
              label: 'Single date',
              model: 'date',
              placeholder: 'Enter a date'
            },

            {
              type: 'rplcheckbox',
              inlineLabel: 'Required check box',
              model: 'checkbox_required',
              required: true
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
    toggleFormData () {
      this.showData = !this.showData
    },

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

<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";

.page-form-data-demo {
  border: 1px dashed rpl-color('extra_dark_neutral');
  padding: $rpl-space-4;
  list-style: none;
}
</style>
