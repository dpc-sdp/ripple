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
          always-auth: true
          registry-url: 'https://npm.pkg.github.com/'
          node-version: 18
          scope: '@dpc-sdp'
      - name: Install Dependencies
        run: npm ci
        env:
          NODE_AUTH_TOKEN: ${{secrets.GPR_NPM_INSTALL_TOKEN}}
      - run: npm run build
      - run: npm run lint
      - run: npm run test:unit

  Integration:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          always-auth: true
          registry-url: 'https://npm.pkg.github.com/'
          node-version: 18
          scope: '@dpc-sdp'
      - name: Cypress run
        uses: cypress-io/github-action@v6
        env:
          DEBUG: '@cypress/github-action'
          NUXT_PUBLIC_TIDE_BASE_URL: 'https://test.base.url/'
          NUXT_PUBLIC_TIDE_SITE: 'TEST_SITE'
          NUXT_PUBLIC_API_URL: 'http://localhost:3001'
          API_PORT: '3001'
          NODE_AUTH_TOKEN: ${{secrets.GPR_NPM_INSTALL_TOKEN}}
        with:
          build: npm run build
          start: npm start
          wait-on: 'http://localhost:3000/assets/fonts/VIC-Regular.woff2'

