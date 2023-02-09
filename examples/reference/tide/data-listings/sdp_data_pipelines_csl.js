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
  queryFields: ["suburb", "postcode", "street", "intersects_with"],
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
    }
  ],
  columnHeadings: [
    "Suburb",
    "Location",
    {
      label: "Map link",
      component: () => import("@dpc-sdp/ripple-link/TextLink.vue")
    }
  ],
  tableResultsMiddleware: [
    (ctx, next) => {
      if (ctx.results && Array.isArray(ctx.results)) {
        ctx.results = ctx.results.map(r => {
          const location = r.intersectsWith ? `${r.street} - ${r.intersectsWith}` : r.street
          return [`${r.suburb} - ${r.postcode}`, location, r.link]
        })
      }
      next()
    }
  ]
}
