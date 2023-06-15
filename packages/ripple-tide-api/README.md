# Ripple Tide API

> An API layer for interacting with a Tide (Drupal) backend in a Ripple site.

## Installation

To use this package in your Nuxt project first install it with `npm`

```bash
npm install @dpc-sdp/ripple-tide-api
```

## Usage

The main purpose of this package is to provide Tide services that can be used to interact with a Tide backend. It also provides an error logger and a number of helper methods for working with the data returned from Tide.

The two main services are `TidePageApi` and `TideSite` these handle fetching page content and global site data, and are utilised by `@dpc-sdp/nuxt-ripple`. 
See: https://github.com/dpc-sdp/ripple-framework/blob/develop/packages/nuxt-ripple/server/plugins/tide.ts
