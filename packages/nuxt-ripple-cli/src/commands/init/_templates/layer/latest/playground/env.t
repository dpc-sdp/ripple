---
to: .playground/.env
---
# The values in this file are FOR DEVELOPMENT ONLY - none of these values are read in the production build!
# If your site needs a new environment variable please log an issue with SDP support so it can be added via the config management database
# If the value is a constant that does not need to chnage per enviironment, consider using app.config.ts instead - https://nuxt.com/docs/guide/directory-structure/app-config

# Tide Drupal CMS URL - change this to the project CMS as required
NUXT_PUBLIC_TIDE_BASE_URL=https://develop.content.reference.sdp.vic.gov.au
# Tide site taxonomy id - change this to the project site ID as required
NUXT_PUBLIC_TIDE_SITE=8888
# Set the desired log level
LOG_LEVEL=debug

# App search API key
NUXT_PUBLIC_TIDE_APP_SEARCH_SEARCH_KEY=
# App search endpoint
NUXT_PUBLIC_TIDE_APP_SEARCH_ENDPOINT_BASE=
# App search engine
NUXT_PUBLIC_TIDE_APP_SEARCH_ENGINE_NAME=
# Elasticsearch host
NUXT_PUBLIC_TIDE_ELASTICSEARCH_HOST=
# Elasticsearch index
NUXT_PUBLIC_TIDE_ELASTICSEARCH_INDEX=
