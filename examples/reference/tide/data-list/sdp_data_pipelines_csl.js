export default {
  dataSet: "sdp_data_pipelines_scl",
  searchForm: {
    formState: {},
    model: {
      search: ""
    },
    schema: {
      groups: [
        {
          fields: [
            {
              type: "rplinput",
              inputType: "text",
              label: "Search locations",
              model: "search",
              placeholder:
                "Enter suburb, postcode, street name or offence location.."
            },
            {
              type: "rplsubmitloader",
              buttonText: "Search",
              loading: false
            }
          ]
        },
        {
          fields: [
            {
              type: "rplclearform",
              buttonText: "Clear search",
              styleClasses: ["form-group--center"]
            }
          ]
        }
      ]
    }
  },
  searchField: "search",
  queryFields: ["suburb^5", "postcode^3", "street^2", "offence_location"],
  sortOptions: [
    {
      id: "",
      name: "Default"
    },
    {
      id: "suburb-asc",
      key: "suburb",
      name: "Suburb (A-Z)",
      order: "asc"
    },
    {
      id: "suburb-desc",
      key: "suburb",
      name: "Suburb (Z-A)",
      order: "desc"
    },
    {
      id: "date-asc",
      key: "last_annual_test",
      name: "Last annual test (newest)",
      order: "asc"
    },
    {
      id: "date-desc",
      key: "last_annual_test",
      name: "Last annual test (oldest)",
      order: "desc"
    }
  ],
  columnHeadings: [
    "Suburb",
    "Location",
    {
      label: "Certificate",
      component: () => import("@dpc-sdp/ripple-link/TextLink.vue")
    },
    "Last annual test"
  ],
  tableResultsMiddleware: [
    (ctx, next) => {
      if (ctx.results && Array.isArray(ctx.results)) {
        ctx.results = ctx.results.map(data => {
          const field = name => data?.[name] || ''

          const suburb = field('suburb')
          const street = field('street')
          let certificate = field('certificate')

          if (certificate) {
            const extension = certificate.split('.')?.pop()?.toUpperCase()

            certificate = {
              target: '_blank',
              url: certificate,
              text: field('offence_location') + ` (${extension})`
            }
          }

          const lastAnnualTest = field('last_annual_test')

          return [
            suburb, street, certificate, lastAnnualTest
          ]
        })
      }
      next()
    }
  ]
}
