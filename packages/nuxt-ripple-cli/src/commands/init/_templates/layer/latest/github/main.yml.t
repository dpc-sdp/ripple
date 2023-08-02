---
to: "<%= gitHubActions ? `.github/workflows/main.yml` : null %>"
---
name: Build & Test
on: [push]
jobs:
  Build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install Dependencies
        run: npm ci
      - run: npm run build
      - run: npm run lint
      - run: npm run test:unit

  Integration:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Cypress run
        uses: cypress-io/github-action@v5
        env:
          DEBUG: '@cypress/github-action'
          NUXT_PUBLIC_TIDE_BASE_URL: 'https://develop.content.reference.sdp.vic.gov.au/'
          NUXT_PUBLIC_TIDE_SITE: '8888'
          NUXT_PUBLIC_API_URL: 'http://localhost:3001'
          API_PORT: '3001'
        with:
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:3000/api/tide/site?id=8888'

