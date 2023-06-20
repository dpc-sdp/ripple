---
to: README.md
---

# <%= name %>

A layer is just like a regular Nuxt project, for more information on layers see: [Nuxt Layers](https://nuxt.com/docs/getting-started/layers)

## Setup

Install all dependencies:

```bash
npm install
```

## Development

The `.playground` directory should help you to develop your layer.

Running `npm run dev` will prepare and boot `.playground` directory, which imports your layer itself.

## Publishing

To publish, you only have to check if `files` in `package.json` are valid, then run:

```bash
npm publish --access public
```

Once done, you will only have to run:

```bash
npm install --save <%= h.changeCase.kebabCase(name) %>
```

Then add the dependency to into the main Nuxt apps `extends` in `nuxt.config`:

```ts
defineNuxtConfig({
  extends: [
    '<%= h.changeCase.kebabCase(name) %>'
  ]
})
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the production application:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
