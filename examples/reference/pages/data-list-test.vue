<template>
  <rpl-page-layout class="app-main" :sidebar="false">
    <div>
      <h1>Example data listing page</h1>
      <p>Instructional copy goes here</p>
      <RplDataListing v-bind="dataProps" />
    </div>
  </rpl-page-layout>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import { RplPageLayout } from '@dpc-sdp/ripple-layout'
import RplDataListing from "@dpc-sdp/ripple-data-vic-api/components/rpl-data-listing.vue"

export default {
  components: {
    RplRow,
    RplCol,
    RplPageLayout,
    RplDataListing
  },
  data () {
    return {
      dataProps: {
        dataSet: "buyingcode",
        enableMap: false,
        columns: [
          "Business name",
          "Certificate Number",
          "ABN",
          "Activation date",
          "Expiry date"
        ],
        sortOptions: [],
        submitOnFormUpdate: true,
        tableResultsMiddleware: [
          (ctx, next) => {
            if (ctx.results && Array.isArray(ctx.results)) {
              ctx.results = ctx.results.map((r) => {
                return [
                  r.EntityName,
                  r.CertificateNumber,
                  r.ABN,
                  r.IssueDate,
                  r.ExpiryDate
                ]
              })
            }
            next()
          }
        ],
        searchForm: {
          formState: {},
          formOptions: {
            validateAfterLoad: true,
            validateAfterChanged: true
          },
          model: {
            search: undefined
          },
          schema: {
            groups: [
              {
                fields: [
                  {
                    type: "input",
                    inputType: "text",
                    label: "Search business name, certificate number or ABN",
                    model: "search",
                    placeholder: "Search"
                  },
                  {
                    type: "rplsubmitloader",
                    buttonText: "Search",
                    loading: false
                  }
                ]
              }
            ]
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.bfv-fairjobs-table {
  .form-group {
    flex: 2;
  }
  .field-rplsubmitloader {
    flex: 1;
  }
}
</style>
