# @dpc-sdp/ripple-tide-search-api

This package exposes an API for connecting to Tide's internal search API.

By abstracting the Tide search implementation (currently Elasticsearch) we are able to support multiple search interfaces in the future.

The basic idea is that you pass only the required parameters for a search query and configure a search template when instantiating the API which is responsible for transforming the request to the search service and the response returned.

## Search templates

Templates to transform elasticsearch requests and responses.

Templates can be extended at runtime by passing in a template to config option passed to appHandler
A template is an object with functions for transforming the request sent to a search service and / or the response returned from this API

### Example search template
```
example: {
  requestMapping: (params) => {
    return {
      query: {
        match_all: {}
      }
    }
  },
  responseMapping: (res) => {
    return res
  }
}
```

## Search with DSL via POST request
To run searches using custom ElasticSearch DSL, you can run a `POST` request to  `/search-api/v2/dsl`. Send the `POST` request with the body containing `JSON` of the DSL.

### Example Request Headers
```
Content-Type: application/json; charset=utf-8
```
### Example Request Body (JSON)
```
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "type": "health_alert"
          }
        },
        {
          "match": {
            "field_node_site": "4"
          }
        }
      ]
    }
  },
  "sort": [
    {
      "field_news_date": "desc"
    }
  ]
}
```
