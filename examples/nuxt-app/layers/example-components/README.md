## About this layer

A collection of custom components for specific use cases.

1. [components/global/TableExtraContentComponentExample.vue](components/global/TableExtraContentComponentExample.vue)<br> Use custom mappings for extra content in a non-standard column e.g.

    ```json
    "props": {
      "offset": 0,
      "showExtraContent": true,
      "caption": "My Table",
      "footer": "Some notes about the table",
      "headingType": { "horizontal": true, "vertical": true },
      "columns": [
        {
          "label": "Recommendation",
          "objectKey": "field_fv_recommendation_number"
        },
        { "label": "Title", "component": "TideSearchListingTableLink" },
        {
          "label": "Category",
          "objectKey": "field_fv_recommendation_category_name"
        },
        { "label": "Status", "objectKey": "fv_recommendation_status" }
      ],
      "extraContent": {
        "component": "TableExtraContentComponentExample",
        "props": {
          "label": "Details"
        }
      }
      ...
    ```

2. [components/global/TableExtraContentItemComponentExample.vue](components/global/TableExtraContentItemComponentExample.vue)<br> Call `getSearchResultValue` and map to component. e.g.
    ```json
    "extraContent": {
      "items": [
        {
          "objectKey": "Organisation"
        },
        {
          "label": "Funded for",
          "objectKey": "Funded For"
        },
        {
          "label": "Email",
          "objectKey": "Email",
          "component": "TideSearchListingTableEmail"
        },
        {
          "label": "Website",
          "objectKey": "Website/Links",
          "objectTextKey": "Organisation",
          "component": "TideSearchListingTableUrl"
        },
        {
          "objectKey": "Statewide Service",
          "component": "TableExtraContentItemComponentExample",
          "props": {
            "variant": "dark"
          }
        }
      ]
    }
    ```

3. [components/global/TideSearchBarComponentExample.vue](components/global/TideSearchBarComponentExample.vue)<br> Add a custom control to search bar, backed with a custom function:
    ```json
    "customQueryConfig": {
      "component": "TideSearchBarComponentExample",
      "function": "exampleQueryFunction"
    },
    ...
    ```

4. [components/global/TideSearchBelowFilter.vue](components/global/TideSearchBelowFilter.vue)<br> Testing the `belowFilter` component slot used in `searchConfig`, e.g.
    ```json
    "layoutConfig": {
      "belowFilter": {
        "component": "TideSearchBelowFilter"
      }
    },
    ...
    ```

5. [components/global/TideSearchEmpty.vue](components/global/TideSearchEmpty.vue)<br> Testing the `empty` component slot used in `searchConfig` used to override the default message for no results, e.g.
    ```json
    "results": {
      "empty": {
        "component": "TideSearchEmpty"
      },
      ...
    ```

6. [components/global/TideSearchResultExampleSkeleton.vue](components/global/TideSearchResultExampleSkeleton.vue)<br> Skeleton to demonstrate a specific search result composition
