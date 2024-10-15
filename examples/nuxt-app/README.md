# Nuxt-app

A Nuxt 3 app with all Ripple and SDP core inclusions.

Separate [example layers](#example-layers) are included under [/layers](/layers) to demonstrate specific features and use cases. These can be disabled in [nuxt.config.ts](nuxt.config.ts) if needed.

## Dev mode

Copy [.example.env](.example.env) to `.env` if using non-reference back end / site ID.

Install monorepo deps

```bash
pnpm i
```

Start the server in dev mode

```bash
pnpm -F nuxt-app dev
```

Now serving on [http://localhost:3000](http://localhost:3000)

## Build mode (production-like)

Build the app to `.output`

```bash
pnpm -F nuxt-app build
```

Start the server on `.output` in build mode

```bash
pnpm -F nuxt-app start
```

Same as above, but using `.env` for runtime environment

```bash
pnpm -F nuxt-app preview
```

Now serving on [http://localhost:3000](http://localhost:3000)

## Example layers

1. [layers/example-components](layers/example-components)<br> Examples of custom components (used in cypress tests)

2. [layers/fixture-api](layers/fixture-api)<br> Use json fixtures instead of back end API calls

3. [layers/map-features](layers/map-features)<br> Map features including popup, side panel and shape layer (used in cypress tests)

4. [layers/ripple-ui-forms-ext](layers/ripple-ui-forms-ext)<br> Extend `ripple-ui-forms` with a custom control
