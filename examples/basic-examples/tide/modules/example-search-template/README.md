# Search template mapping config

When creating new search functionality, instead of calling ElasticSearch backend directly, please use the provided interface using `tide.search-template.js`

Each search template needs to export a object with two properties :

`requestMapping`

A function that takes GET params passed to the call and returns a valid ElasticSearch query DSL - https://www.elastic.co/guide/en/elasticsearch/reference/7.8/query-dsl.html
This allows you to customize any aspect of the search query by simply modifying the behaviour. See `packages/ripple-tide-search-api/services/template-utils.js` for utility helpers for common functionality such as pagination.

`responseMapping`

This can be either a function _or_ an object.

### As a function

A function that iterates over each response and returns a mapped response. Here you can transform the ES response to an object provided to your component.

### As an object

By passing an object you can provide a mapping for responses of each _type_. Each key in the object should exactly match the _type_ value. Each key in that object can pass either:

1. An array of field keys to match, this should be in order of preference. The first field to match will be returned. See Summary field below
1. A function that is passed the returned hit. This allows you to resolve the field however you like, see link example below. Note: a static field can be returned using an arrow function

```
{
  page: {
    title: ['title'],
    summary: ['field_landing_page_summary', 'summary_processed', 'body'],
    link: (item) => capitalize(item.type[0]).replace('_', ' ')),
    staticField: () => 'Lorem ipsum'
  }
}
```

# Add a new search endpoint

To add a new endpoint you just need to add a new top level key eg:

```
import { requestMapping, responseMapping, defaultMapping } from '@dpc-sdp/ripple-nuxt-tide/modules/landing-page/tide.search-template'

module.exports = {
  endpointName: {
    requestMapping,
    responseMapping: {
      default: {
        title: ['title]
      }
    }
  }
}

```

The endpoint will be available at `/search/v2/endpointName` - See packages/ripple-tide-search-api/README.md fo more info