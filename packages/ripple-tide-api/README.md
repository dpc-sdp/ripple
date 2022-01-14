# Ripple Tide API module

`@dpc-sdp/ripple-tide-api`

<a href="https://www.npmjs.com/package/@dpc-sdp/ripple-tide-api">
  <img src="https://img.shields.io/npm/v/@dpc-sdp/ripple-tide-api.svg" alt="Version">
</a>

*This module is a replacement for @dpc-sdp/ripple-nuxt-tide*

## Overview

Ripple Tide API is a Nuxt JS 2.x module for fetching data from a Tide Drupal JSON API endpoint and creating a lightweight Express JS based middleware API using Nuxt serverMiddleware function.

### API Endpoints

Ripple Tide API creates the following API endpoints:

**`/tide-api/v2/site/{SITEID}`**

Site level data endpoint, pass numeric `{SITEID}` eg: `4` parameter to retrieve the site taxonomy data from Tide JSON API endpoint `/api/v1/taxonomy_term/sites` 

**`/tide-api/v2/page`**

Page data endpoint, uses the `path` parameter to find the JSON API node data via a request to the `/api/v1/route` endpoint. Requires `site` paramater to be passed too.

**`/tide-api/v2/schema`**

OpenAPI 3.0 (AKA Swagger) schema for validating data against in contract tests.

**`/tide-api/v2/docs`**

Auto generated Swagger documentation based upon OpenAPI schema. 


## Built with

* [Nuxt](https://nuxtjs.org)
* [Express](https://expressjs.com/)
* [Swagger](https://swagger.io/specification/)

