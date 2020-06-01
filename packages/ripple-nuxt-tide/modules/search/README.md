# Search

## Features

An interface for search services.

Supported search services

1. Elasticsearch

## Usage

### Enable module

Enable it in `nuxt.config.js`.

```js
{
  tide: {
    modules: {
      search: 1
    },
    search: {
      service: 'elasticsearch',
      index: 'yourSearchIndex',
      url: 'Your search server url',
      log: '', // Set to 'trace' for debugging
      auth: {
        username: 'yourUser',
        password: 'yourPass'
      },
      loadOnDemand: 1 // Split the search js from global bundle. For new site, always set to 1.
    },
  }
}
```
