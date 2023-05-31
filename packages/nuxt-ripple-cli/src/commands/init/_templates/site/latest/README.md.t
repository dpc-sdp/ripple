---
to: README.md
---

# <%= name %>

## Important information

SDP Ripple 2.1 project for <%= name %>

Before working on this project please ensure you have undertaken onboarding with the SDP team.
Please go to https://www.vic.gov.au/outsourcing-content-development-industry-partners and follow instructions for onboarding new developers.

Please see [SDP developer support documentation](https://digital-vic.atlassian.net/wiki/spaces/SDD) for important information on SDP development practices. You should have been granted access as part of the onboarding.

If you require access or have further questions please use our support portal https://digital-vic.atlassian.net/ or email sdp.devs@dpc.vic.gov.au

## Development

For documentation on using the Ripple design system please see: https://ripple-docs.netlify.app/.

For more information on the Nuxt see: [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction).

> **Note:**
> Ripple 2 makes use of [Nuxt Layers](https://nuxt.com/docs/getting-started/layers) to deliver reusable functionality. Please see https://ripple-docs.netlify.app/modules for more info on developing Ripple modules.
> This project should not be used for developing new functionality, instead it should be created in a module an added through the [extends](https://nuxt.com/docs/api/configuration/nuxt-config#extends) key in `nuxt.config.ts`

## Setup

Make sure you are using the supported node version listed in .nvmrc. We recommend using [Node Version Manager](https://github.com/nvm-sh/nvm) to install the recommended version.

```bash
nvm use
```
Then use [Node Package Manager (NPM)](https://docs.npmjs.com/) to install project dependencies.

> **Note:**
> Please **do not use package managers other than NPM** (such as yarn, PNPM). Our release management tooling assumes NPM as a package manager.

```bash
# npm
npm install
```

## Connecting to Tide Drupal backend.

[@dpc-sdp/ripple-tide-api](https://www.npmjs.com/package/@dpc-sdp/ripple-tide-api) provides the connection between a Nuxt Ripple frontend and a Tide Drupal backend.
See the [Ripple documentation](https://ripple-docs.netlify.app/) for more info.

## Adding Drupal server endpoint and site ID

Ripple is setup to connect to a reference implementation of Tide at https://develop.content.reference.sdp.vic.gov.au/ with a site ID of 8888
If you are working on a different backend site you will need to set the following environment variables (the values of which should have been provided in onboarding), for example:

```
NUXT_PUBLIC_TIDE_CONTENT_API_BASE_URL=https://develop.content.YOURSITE.sdp.vic.gov.au/
NUXT_PUBLIC_TIDE_CONTENT_API_SITE=1234
```

You can set these locally by creating a .env file with the values you wish to override. For production, they should be set in Lagoon by adding a value to the [SDP CMDB](https://github.com/dpc-sdp/sdp-cmdb)

## Development

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Run the production build:

```bash
npm run start
```

Locally preview production build:

```bash
npm run preview
```

## Hosting on Lagoon

Please see [SDP developer support documentation](https://digital-vic.atlassian.net/wiki/spaces/SDD) for more information on production hosting.
