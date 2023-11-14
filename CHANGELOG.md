# Changelog

## v2.4.9

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.4.8...v2.4.9)


### 🩹 Fixes

  - **@dpc-sdp/nuxt-ripple:** 🐛  ensure favicon generator uses correct site ([c627b5a3](https://github.com/dpc-sdp/ripple-framework/commit/c627b5a3))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.4.8

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.4.7...v2.4.8)


### 🩹 Fixes

  - **@dpc-sdp/nuxt-ripple:** 🐛  move favicon generate to before build ([869482b0](https://github.com/dpc-sdp/ripple-framework/commit/869482b0))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.4.7

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.4.6...v2.4.7)


### 🩹 Fixes

  - **@dpc-sdp/nuxt-ripple:** 🐛  fix for favicon generator not waiting ([0c2b37d8](https://github.com/dpc-sdp/ripple-framework/commit/0c2b37d8))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.4.6

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.4.5...v2.4.6)


### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-publication:** Fixed publication menu not showing after preview expires ([bd41710b](https://github.com/dpc-sdp/ripple-framework/commit/bd41710b))

### ❤️  Contributors

- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>

## v2.4.5

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.4.4...v2.4.5)


### 🩹 Fixes

  - **@dpc-sdp/nuxt-ripple-preview:** Only send token if it's not expired ([90528b89](https://github.com/dpc-sdp/ripple-framework/commit/90528b89))

### ❤️  Contributors

- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>

## v2.4.4

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.4.3...v2.4.4)


### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-api:** Changed the way sectionId is passed to mapping functions ([e113b1c2](https://github.com/dpc-sdp/ripple-framework/commit/e113b1c2))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.4.3

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.4.2...v2.4.3)


### 🩹 Fixes

  - **@dpc-sdp/nuxt-ripple:** 🐛  ensure route caching works in cdn environment ([f9651c89](https://github.com/dpc-sdp/ripple-framework/commit/f9651c89))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.4.2

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.4.1...v2.4.2)


### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-landing-page:** 🐛  handle case when no items in carousel ([e9a1af40](https://github.com/dpc-sdp/ripple-framework/commit/e9a1af40))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.4.1

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.4.0...v2.4.1)


### 🩹 Fixes

  - **@dpc-sdp/nuxt-ripple:** Ensure that redirect code runs even on (nuxt) cached pages ([6f095499](https://github.com/dpc-sdp/ripple-framework/commit/6f095499))
  - **@dpc-sdp/nuxt-ripple:** Added null check for redirect code ([4410cef5](https://github.com/dpc-sdp/ripple-framework/commit/4410cef5))

### 🏡 Chore

  - Updated babel / @babel/traverse ([f8796a39](https://github.com/dpc-sdp/ripple-framework/commit/f8796a39))
  - 🔖 release ripple 2.4.1 ([a015f463](https://github.com/dpc-sdp/ripple-framework/commit/a015f463))

### ❤️  Contributors

- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>


## v2.4.0

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.3.5...v2.4.0)


### 🚀 Enhancements

  - **@dpc-sdp/nuxt-ripple-cli:** ✨  generate favicon ([1f1c21e7](https://github.com/dpc-sdp/ripple-framework/commit/1f1c21e7))
  - **@dpc-sdp/nuxt-ripple:** 🚧  wip on adding favicon generation as module ([34279a16](https://github.com/dpc-sdp/ripple-framework/commit/34279a16))
  - **nuxt-ripple:** ✨  implement site fetch, favicon generate ([37a29489](https://github.com/dpc-sdp/ripple-framework/commit/37a29489))
  - **@dpc-sdp/ripple-ui-core:** Added css var for heading font ([5dbd7044](https://github.com/dpc-sdp/ripple-framework/commit/5dbd7044))
  - **@dpc-sdp/ripple-tide-search:** ✨  add secondary campaign to mapping, template ([ac537928](https://github.com/dpc-sdp/ripple-framework/commit/ac537928))
  - **nuxt-ripple:** ✨  add mapping for new footer logo field ([9b8217ba](https://github.com/dpc-sdp/ripple-framework/commit/9b8217ba))
  - ✨  replace twitter with x ([76d32333](https://github.com/dpc-sdp/ripple-framework/commit/76d32333))

### 🩹 Fixes

  - **@dpc-sdp/nuxt-ripple:** Ensured that language specific fonts override all other fonts ([80c2d1aa](https://github.com/dpc-sdp/ripple-framework/commit/80c2d1aa))
  - **@dpc-sdp/ripple-ui-core:** 💄  prevent hanging icon ([f31659fe](https://github.com/dpc-sdp/ripple-framework/commit/f31659fe))
  - **@dpc-sdp/nuxt-ripple:** 🐛  fix redirects adding to history state ([60dbea98](https://github.com/dpc-sdp/ripple-framework/commit/60dbea98))
  - **@dpc-sdp/ripple-ui-core:** 🐛  only render icon if item has text or url ([af34dce5](https://github.com/dpc-sdp/ripple-framework/commit/af34dce5))
  - **@dpc-sdp/ripple-ui-core:** 🐛  add check for secondary link in header ([efe022b5](https://github.com/dpc-sdp/ripple-framework/commit/efe022b5))
  - **nuxt-ripple:** 🐛  filter out alerts with missing type relation ([682328bd](https://github.com/dpc-sdp/ripple-framework/commit/682328bd))
  - **@dpc-sdp/ripple-ui-core:** 🐛  fix carousel links ([5b4e5b5b](https://github.com/dpc-sdp/ripple-framework/commit/5b4e5b5b))

### 💅 Refactors

  - **nuxt-ripple:** ♻️  use site data in favicon generator ([46552d07](https://github.com/dpc-sdp/ripple-framework/commit/46552d07))
  - **nuxt-ripple:** 🏷️  update appconfig interface ([2b178f33](https://github.com/dpc-sdp/ripple-framework/commit/2b178f33))
  - **@dpc-sdp/ripple-tide-search:** ♻️  move secondary campaign to right slot ([cae72da6](https://github.com/dpc-sdp/ripple-framework/commit/cae72da6))
  - **@dpc-sdp/ripple-tide-publication:** ♻️  change page link props at mapping, add test ([5d7bbc30](https://github.com/dpc-sdp/ripple-framework/commit/5d7bbc30))
  - **@dpc-sdp/ripple-ui-core:** ♻️  check for url or text ([e0e89fd5](https://github.com/dpc-sdp/ripple-framework/commit/e0e89fd5))
  - ♻️  replace icon at mapping level ([b2eb2fd3](https://github.com/dpc-sdp/ripple-framework/commit/b2eb2fd3))
  - **@dpc-sdp/ripple-ui-core:** ⏪️  revert hyphenation, add separate util class ([8614c759](https://github.com/dpc-sdp/ripple-framework/commit/8614c759))

### 📖 Documentation

  - 📝  update badges, add tools and frameworks ([ee110382](https://github.com/dpc-sdp/ripple-framework/commit/ee110382))
  - 📝  add more detail to readme ([690c239b](https://github.com/dpc-sdp/ripple-framework/commit/690c239b))
  - **docs:** 📝  add personal access token instructions ([db3997f1](https://github.com/dpc-sdp/ripple-framework/commit/db3997f1))
  - 📝  simplify badge labels ([779d9d8a](https://github.com/dpc-sdp/ripple-framework/commit/779d9d8a))
  - **docs:** 📝  split usage into separate docs, add nuxt load order fix ([2e41717e](https://github.com/dpc-sdp/ripple-framework/commit/2e41717e))

### 🏡 Chore

  - **deployment:** Add workflow file ([f5a1740b](https://github.com/dpc-sdp/ripple-framework/commit/f5a1740b))
  - 👷  update pnpm ([872ff090](https://github.com/dpc-sdp/ripple-framework/commit/872ff090))
  - Fix studio pnpm ver and allow greater ([5ebc4ae8](https://github.com/dpc-sdp/ripple-framework/commit/5ebc4ae8))
  - **docs:** ➕  add nuxt studio ([7b1cd87d](https://github.com/dpc-sdp/ripple-framework/commit/7b1cd87d))

### ✅ Tests

  - ✅  fix linter issues ([30420455](https://github.com/dpc-sdp/ripple-framework/commit/30420455))
  - **nuxt-ripple:** ✅  fix tests ([4dc9358a](https://github.com/dpc-sdp/ripple-framework/commit/4dc9358a))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>
- Dylankelly <dylan.kelly@dpc.vic.gov.au>
- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>

## v2.3.5

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.3.4...v2.3.5)


### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-api:** Passed headers to route, page and publication menu endpoints ([e760940d](https://github.com/dpc-sdp/ripple-framework/commit/e760940d))

### ❤️  Contributors

- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>

## v2.3.4

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.3.3...v2.3.4)


### 🚀 Enhancements

  - **@dpc-sdp/ripple-tide-publication:** Added proper publication header mapping ([aa657deb](https://github.com/dpc-sdp/ripple-framework/commit/aa657deb))

### 🩹 Fixes

  - **nuxt-ripple:** 🐛  enable external redirects ([6c0e4894](https://github.com/dpc-sdp/ripple-framework/commit/6c0e4894))
  - **@dpc-sdp/nuxt-ripple:** Fixed console error when request event was being fetched client side ([b8f94314](https://github.com/dpc-sdp/ripple-framework/commit/b8f94314))
  - **@dpc-sdp/ripple-tide-publication:** Fixed duplication side nav links ([a08742e4](https://github.com/dpc-sdp/ripple-framework/commit/a08742e4))

### 🏡 Chore

  - **@dpc-sdp/ripple-tide-publication:** 🐛  [R20-1574] fix publication preview menu issue ([b737e32b](https://github.com/dpc-sdp/ripple-framework/commit/b737e32b))
  - **@dpc-sdp/ripple-tide-publication:** 🚨  fix unused var ([acd09f34](https://github.com/dpc-sdp/ripple-framework/commit/acd09f34))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>
- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>

## v2.3.3

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.3.2...v2.3.3)


### 🏡 Chore

  - **@dpc-sdp/nuxt-ripple:** 🐛  fix redirect headers issue ([a5556f1c](https://github.com/dpc-sdp/ripple-framework/commit/a5556f1c))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.3.2

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.3.1...v2.3.2)


### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-api:** Fixed broken redirects after cache tags refactor ([26f67b7d](https://github.com/dpc-sdp/ripple-framework/commit/26f67b7d))

### ❤️  Contributors

- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>

## v2.3.1

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.3.0...v2.3.1)


### 🚀 Enhancements

  - **nuxt-ripple:** Pass through section-cache-tags response header ([cf3d6477](https://github.com/dpc-sdp/ripple-framework/commit/cf3d6477))
  - **@dpc-sdp/ripple-tide-api:** Merged site+alert cache tags with page cache tags ([98c2c956](https://github.com/dpc-sdp/ripple-framework/commit/98c2c956))

### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-api:** Increase menu depth for breadcrumbs ([43ea5efa](https://github.com/dpc-sdp/ripple-framework/commit/43ea5efa))
  - **@dpc-sdp/ripple-tide-publication:** Add missed optional chaining ([23e6807f](https://github.com/dpc-sdp/ripple-framework/commit/23e6807f))
  - **@dpc-sdp/ripple-tide-api:** Add optional chaining ([0f84540a](https://github.com/dpc-sdp/ripple-framework/commit/0f84540a))

### 💅 Refactors

  - **@dpc-sdp/ripple-tide-api:** Refactored http client to not swallow up headers ([da09ec47](https://github.com/dpc-sdp/ripple-framework/commit/da09ec47))

### ✅ Tests

  - **@dpc-sdp/ripple-tide-api:** Fixed unit tests ([57c92cd4](https://github.com/dpc-sdp/ripple-framework/commit/57c92cd4))

### ❤️  Contributors

- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>
- David Featherston <david.featherstone@dpc.vic.gov.au>

## v2.3.0

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.2.1...v2.3.0)


### 🚀 Enhancements

  - **@dpc-sdp/ripple-tide-search:** Add support for fallback values on filters ([8d518305](https://github.com/dpc-sdp/ripple-framework/commit/8d518305))
  - **@dpc-sdp/nuxt-ripple:** Make content rating choice required ([b5542f18](https://github.com/dpc-sdp/ripple-framework/commit/b5542f18))
  - **@dpc-sdp/nuxt-ripple:** Conditionally render rating submit action ([8f253fec](https://github.com/dpc-sdp/ripple-framework/commit/8f253fec))
  - **@dpc-sdp/ripple-tide-search:** Added sort dropdown to search listing page ([0d6b36ba](https://github.com/dpc-sdp/ripple-framework/commit/0d6b36ba))
  - **@dpc-sdp/ripple-tide-landing-page:** Updated data table component mapping and tests ([cbbf716a](https://github.com/dpc-sdp/ripple-framework/commit/cbbf716a))
  - **@dpc-sdp/ripple-ui-core:** ✨  add aria annotations on tabs ([daad51f5](https://github.com/dpc-sdp/ripple-framework/commit/daad51f5))
  - **@dpc-sdp/ripple-ui-core:** Allow supplying custom rpl icons ([2bdc083c](https://github.com/dpc-sdp/ripple-framework/commit/2bdc083c))
  - **@dpc-sdp/ripple-ui-core:** Add support for icons in description list component ([847c0e7f](https://github.com/dpc-sdp/ripple-framework/commit/847c0e7f))
  - **@dpc-sdp/ripple-ui-core:** Re-jig to remove nested div ([8855723e](https://github.com/dpc-sdp/ripple-framework/commit/8855723e))
  - **@dpc-sdp/ripple-tide-search:** Added sort dropdown to custom collection ([5ed78686](https://github.com/dpc-sdp/ripple-framework/commit/5ed78686))
  - **@dpc-sdp/ripple-tide-grant:** Use description list for grant overview ([736bcd43](https://github.com/dpc-sdp/ripple-framework/commit/736bcd43))
  - **@dpc-sdp/nuxt-ripple:** Add karenni font ([8fbb6a00](https://github.com/dpc-sdp/ripple-framework/commit/8fbb6a00))
  - **@dpc-sdp/ripple-tide-grant:** Remove un-needed props. in template ([2861b16b](https://github.com/dpc-sdp/ripple-framework/commit/2861b16b))

### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-search:** Merge conflicts ([0665db19](https://github.com/dpc-sdp/ripple-framework/commit/0665db19))
  - **@dpc-sdp/ripple-ui-core:** Make only title and url 'links' in search results ([de12cb9c](https://github.com/dpc-sdp/ripple-framework/commit/de12cb9c))
  - **@dpc-sdp/ripple-ui-core:** Add aria-hidden to url ([7ad8873b](https://github.com/dpc-sdp/ripple-framework/commit/7ad8873b))
  - **@dpc-sdp/ripple-ui-core:** Fix ts error, update readme ([51d6c216](https://github.com/dpc-sdp/ripple-framework/commit/51d6c216))
  - **@dpc-sdp/ripple-tide-search:** Fixed global filters not being applied to aggregations query ([8f7a2801](https://github.com/dpc-sdp/ripple-framework/commit/8f7a2801))
  - **docs:** Fixed prerender 404s from broken links ([f6171c4c](https://github.com/dpc-sdp/ripple-framework/commit/f6171c4c))
  - **docs:** Don't try to prerender storybook routes ([20df1cb1](https://github.com/dpc-sdp/ripple-framework/commit/20df1cb1))
  - **nuxt-ripple:** 🐛  exclude metatag canonical ([3b7733c5](https://github.com/dpc-sdp/ripple-framework/commit/3b7733c5))
  - **@dpc-sdp/ripple-tide-search:** Handled search result fields coming back as either string or array ([7398b3fb](https://github.com/dpc-sdp/ripple-framework/commit/7398b3fb))
  - **@dpc-sdp/ripple-tide-search:** Fix custom collection scroll issue ([53011c9a](https://github.com/dpc-sdp/ripple-framework/commit/53011c9a))
  - **@dpc-sdp/ripple-tide-search:** Fixed 'undefined' class name for results table ([6bd90b2c](https://github.com/dpc-sdp/ripple-framework/commit/6bd90b2c))
  - **@dpc-sdp/ripple-tide-search:** Added missing aria-expanded to search filter toggle ([d6601e81](https://github.com/dpc-sdp/ripple-framework/commit/d6601e81))

### 📖 Documentation

  - **docs:** 📝  use different theme for card highlight as vic gov is wrong ([d46a742a](https://github.com/dpc-sdp/ripple-framework/commit/d46a742a))
  - **docs:** Fixed card examples display ([58df9085](https://github.com/dpc-sdp/ripple-framework/commit/58df9085))

### 🏡 Chore

  - **@dpc-sdp/nuxt-ripple-analytics:** Change route name to page_title ([16a0eba9](https://github.com/dpc-sdp/ripple-framework/commit/16a0eba9))

### ✅ Tests

  - **@dpc-sdp/ripple-tide-search:** Added tests for sort dropdown feature of search listing ([4bdf8e4e](https://github.com/dpc-sdp/ripple-framework/commit/4bdf8e4e))
  - **@dpc-sdp/ripple-ui-core:** Fixed data table storybook tests ([68767ebc](https://github.com/dpc-sdp/ripple-framework/commit/68767ebc))
  - **@dpc-sdp/ripple-ui-core:** Updated data table stories to match chromatic snapshots ([eaffc069](https://github.com/dpc-sdp/ripple-framework/commit/eaffc069))
  - **@dpc-sdp/ripple-ui-core:** ✅  fix aria issues ([785de3f3](https://github.com/dpc-sdp/ripple-framework/commit/785de3f3))
  - **@dpc-sdp/ripple-tide-search:** Fixed up custom collection test table results ([bc8dc3b5](https://github.com/dpc-sdp/ripple-framework/commit/bc8dc3b5))

### ❤️  Contributors

- David Featherston <david.featherstone@dpc.vic.gov.au>
- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>
- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.2.1

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.2.0...v2.2.1)


### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-search:** Fixed site search filters not appearing ([720d9b0b](https://github.com/dpc-sdp/ripple-framework/commit/720d9b0b))

### ❤️  Contributors

- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>

## v2.2.0

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.9...v2.2.0)


### 🚀 Enhancements

  - **@dpc-sdp/ripple-tide-search:** ✨  add custom collection component ([8ecb6017](https://github.com/dpc-sdp/ripple-framework/commit/8ecb6017))
  - ✨  add accessible label for links opening in a new window ([7866c3ee](https://github.com/dpc-sdp/ripple-framework/commit/7866c3ee))
  - **@dpc-sdp/ripple-ui-core:** Made search result date label customisable ([9fba5885](https://github.com/dpc-sdp/ripple-framework/commit/9fba5885))
  - **@dpc-sdp/ripple-ui-core:** ✨  hyphenate headings ([ab440a1b](https://github.com/dpc-sdp/ripple-framework/commit/ab440a1b))
  - **@dpc-sdp/nuxt-ripple-analytics:** Move measurement ids and production flag ([e3ece92f](https://github.com/dpc-sdp/ripple-framework/commit/e3ece92f))
  - **@dpc-sdp/nuxt-ripple-analytics:** Add dataLayer event for error pages i.e. 400, 500, etc ([205a2da1](https://github.com/dpc-sdp/ripple-framework/commit/205a2da1))
  - **@dpc-sdp/ripple-ui-core:** ✨  add optiional noresults message to search bar ([d5905243](https://github.com/dpc-sdp/ripple-framework/commit/d5905243))
  - **nuxt-ripple:** Added social links to footer ([a656d684](https://github.com/dpc-sdp/ripple-framework/commit/a656d684))
  - **@dpc-sdp/ripple-ui-core:** A11y slider feedback, fix key-dates link ([cb259a17](https://github.com/dpc-sdp/ripple-framework/commit/cb259a17))
  - **@dpc-sdp/ripple-tide-publication:** Support singular authors ([8161837d](https://github.com/dpc-sdp/ripple-framework/commit/8161837d))
  - **@dpc-sdp/ripple-ui-core:** Improved custom date label in RplSearchResult ([9282b3dd](https://github.com/dpc-sdp/ripple-framework/commit/9282b3dd))
  - **@dpc-sdp/nuxt-ripple:** Added table of contents to sitemap page ([ef969b51](https://github.com/dpc-sdp/ripple-framework/commit/ef969b51))
  - **@dpc-sdp/nuxt-ripple:** Made sitemap toc configurable via cms ([c3d36b12](https://github.com/dpc-sdp/ripple-framework/commit/c3d36b12))

### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-search:** Fix cc mapping ([7de48e11](https://github.com/dpc-sdp/ripple-framework/commit/7de48e11))
  - **@dpc-sdp/ripple-tide-search:** 💄  add margin between error message ([9844062f](https://github.com/dpc-sdp/ripple-framework/commit/9844062f))
  - **eslint-config-ripple:** ➕  add required eslint dependencies ([e0c44b95](https://github.com/dpc-sdp/ripple-framework/commit/e0c44b95))
  - **nuxt-ripple:** 🐛  fix title undefined in search page ([60988fe5](https://github.com/dpc-sdp/ripple-framework/commit/60988fe5))
  - **@dpc-sdp/ripple-tide-search:** Fix search request proxy config ([2c0da907](https://github.com/dpc-sdp/ripple-framework/commit/2c0da907))
  - **@dpc-sdp/ripple-tide-search:** 🐛  disable autocomplete on custom collection ([7eb80638](https://github.com/dpc-sdp/ripple-framework/commit/7eb80638))
  - **@dpc-sdp/nuxt-ripple-analytics:** Fix undefined error ([f75f3d9d](https://github.com/dpc-sdp/ripple-framework/commit/f75f3d9d))
  - **@dpc-sdp/ripple-tide-search:** 🐛  fix autocomplete end point ([2304ad5d](https://github.com/dpc-sdp/ripple-framework/commit/2304ad5d))
  - **@dpc-sdp/ripple-ui-core:** Add max width to scrollable table story ([9083049e](https://github.com/dpc-sdp/ripple-framework/commit/9083049e))
  - **@dpc-sdp/nuxt-ripple-analytics:** Use new tide hook for dataLayer events ([e447970e](https://github.com/dpc-sdp/ripple-framework/commit/e447970e))
  - **@dpc-sdp/ripple-tide-publication:** Matched page api by merging configs ([cb4bbca6](https://github.com/dpc-sdp/ripple-framework/commit/cb4bbca6))
  - **@dpc-sdp/nuxt-ripple:** Fixed typo ([05825921](https://github.com/dpc-sdp/ripple-framework/commit/05825921))

### 💅 Refactors

  - **@dpc-sdp/ripple-tide-search:** ✨  use backend json field ([52970c23](https://github.com/dpc-sdp/ripple-framework/commit/52970c23))
  - **@dpc-sdp/ripple-tide-search:** ♻️  rename proxy handlers to match purpose ([cc3fc595](https://github.com/dpc-sdp/ripple-framework/commit/cc3fc595))
  - **@dpc-sdp/ripple-ui-core:** ♻️  use src if printSrc is not supplied ([6df87bd9](https://github.com/dpc-sdp/ripple-framework/commit/6df87bd9))
  - **@dpc-sdp/ripple-ui-core:** ♻️  restore print logo to default ([e1150cec](https://github.com/dpc-sdp/ripple-framework/commit/e1150cec))

### 📦 Build

  - Update lockfile ([dc8c026c](https://github.com/dpc-sdp/ripple-framework/commit/dc8c026c))
  - 💚  fix storybook, jest, axe incompat ([d6ce5b48](https://github.com/dpc-sdp/ripple-framework/commit/d6ce5b48))

### 🏡 Chore

  - **eslint-config-ripple:** Add ripple eslint to cli templates ([b54dd78f](https://github.com/dpc-sdp/ripple-framework/commit/b54dd78f))
  - **@dpc-sdp/nuxt-ripple-cli:** Updated new layer cli with correct publish action ([2e3fcc81](https://github.com/dpc-sdp/ripple-framework/commit/2e3fcc81))
  - **@dpc-sdp/nuxt-ripple-cli:** Added missing npmrc to site generator ([3201dad9](https://github.com/dpc-sdp/ripple-framework/commit/3201dad9))
  - **@dpc-sdp/nuxt-ripple-cli:** Removed caret from layer package.json template ([15d1b5d2](https://github.com/dpc-sdp/ripple-framework/commit/15d1b5d2))
  - **@dpc-sdp/ripple-ui-forms:** Remove counter from form inputs ([d834ba31](https://github.com/dpc-sdp/ripple-framework/commit/d834ba31))
  - **@dpc-sdp/ripple-tide-landing-page:** Remove counter from textareas ([991bd454](https://github.com/dpc-sdp/ripple-framework/commit/991bd454))
  - **@dpc-sdp/ripple-tide-landing-page:** Infer counter type as api doesn't always return it ([1ef7549e](https://github.com/dpc-sdp/ripple-framework/commit/1ef7549e))
  - 🚀  change publish process to be on release ([ab027fe2](https://github.com/dpc-sdp/ripple-framework/commit/ab027fe2))

### ✅ Tests

  - **@dpc-sdp/ripple-tide-search:** ✅  ignore resize observer exception in expander ([d3a1ea85](https://github.com/dpc-sdp/ripple-framework/commit/d3a1ea85))
  - **@dpc-sdp/ripple-tide-search:** 🧪  remove unimplemented test ([8f96db79](https://github.com/dpc-sdp/ripple-framework/commit/8f96db79))
  - **@dpc-sdp/ripple-tide-search:** Skip custom collection tests ([06fff8c1](https://github.com/dpc-sdp/ripple-framework/commit/06fff8c1))
  - **@dpc-sdp/ripple-tide-search:** 💚  fix custom collection tests ([c1a9acbc](https://github.com/dpc-sdp/ripple-framework/commit/c1a9acbc))
  - **nuxt-ripple:** Fixed footer tests and social links ([e047c198](https://github.com/dpc-sdp/ripple-framework/commit/e047c198))
  - **nuxt-app:** Remove old counter test ([f7d95822](https://github.com/dpc-sdp/ripple-framework/commit/f7d95822))

### 🎨 Styles

  - 🚚  rename flowchart ([4a25952e](https://github.com/dpc-sdp/ripple-framework/commit/4a25952e))
  - **@dpc-sdp/ripple-ui-core:** 💄  add bg on hyphenated example ([cea33a86](https://github.com/dpc-sdp/ripple-framework/commit/cea33a86))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>
- David Featherston <david.featherstone@dpc.vic.gov.au>
- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>

## v2.1.9

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.8...v2.1.9)


### 🚀 Enhancements

  - **@dpc-sdp/ripple-tide-landing-page:** ✨  add support for open forms ([ff41cbc7](https://github.com/dpc-sdp/ripple-framework/commit/ff41cbc7))

### ✅ Tests

  - **@dpc-sdp/ripple-tide-landing-page:** ✅  add weight in openforms height test ([365e5e32](https://github.com/dpc-sdp/ripple-framework/commit/365e5e32))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.1.8

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.7...v2.1.8)


### 🚀 Enhancements

  - **@dpc-sdp/ripple-tide-search:** Column classes, array-ify-ing, filter empty params ([be2a9af7](https://github.com/dpc-sdp/ripple-framework/commit/be2a9af7))
  - **@dpc-sdp/ripple-ui-forms:** Use filter.multiple to disable array-ifying values ([5e5dd8e5](https://github.com/dpc-sdp/ripple-framework/commit/5e5dd8e5))
  - **@dpc-sdp/nuxt-ripple-analytics:** Fix faulty isProduction check ([712c5514](https://github.com/dpc-sdp/ripple-framework/commit/712c5514))
  - **@dpc-sdp/nuxt-ripple-analytics:** Move useRuntimeConfig to route file ([0a0de979](https://github.com/dpc-sdp/ripple-framework/commit/0a0de979))

### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-search:** Espace query text before adding to DSL query ([f8c152b2](https://github.com/dpc-sdp/ripple-framework/commit/f8c152b2))
  - **nuxt-ripple:** 🐛  whitelist contact icons ([dc2b2428](https://github.com/dpc-sdp/ripple-framework/commit/dc2b2428))
  - **nuxt-app:** Fix media test ([ee0a1671](https://github.com/dpc-sdp/ripple-framework/commit/ee0a1671))
  - **@dpc-sdp/ripple-ui-core:** 🐛  check for label ([44041ad8](https://github.com/dpc-sdp/ripple-framework/commit/44041ad8))
  - Use derived page title instead of metatag value ([da87d6fe](https://github.com/dpc-sdp/ripple-framework/commit/da87d6fe))
  - **@dpc-sdp/nuxt-ripple:** 🐛  ensure page title is always set ([6cb599c3](https://github.com/dpc-sdp/ripple-framework/commit/6cb599c3))
  - **@dpc-sdp/nuxt-ripple:** 🐛  fix title definition ([6ee4b159](https://github.com/dpc-sdp/ripple-framework/commit/6ee4b159))
  - 🐛  handle undefined page.meta ([20b675a5](https://github.com/dpc-sdp/ripple-framework/commit/20b675a5))
  - **nuxt-ripple:** 🐛  fix issue where menus in share links cause a 500 error ([fbcabfff](https://github.com/dpc-sdp/ripple-framework/commit/fbcabfff))
  - **@dpc-sdp/ripple-tide-api:** 🐛  fetch menu for unpublished pages ([4d6a3469](https://github.com/dpc-sdp/ripple-framework/commit/4d6a3469))

### 💅 Refactors

  - **nuxt-ripple:** ♻️  update 500 template to match platform ([76e2cac9](https://github.com/dpc-sdp/ripple-framework/commit/76e2cac9))
  - ♻️  add 401 support, use error comp ([0912a4d7](https://github.com/dpc-sdp/ripple-framework/commit/0912a4d7))
  - **@dpc-sdp/nuxt-ripple:** ♻️  refactor to call head functions from plugins ([8939c97a](https://github.com/dpc-sdp/ripple-framework/commit/8939c97a))

### 🏡 Chore

  - **@dpc-sdp/nuxt-ripple-cli:** ✨  add template for new UI library ([47353eb7](https://github.com/dpc-sdp/ripple-framework/commit/47353eb7))

### ✅ Tests

  - **nuxt-app:** ✅  update data table test ([f7649190](https://github.com/dpc-sdp/ripple-framework/commit/f7649190))
  - ✅  add default contentType prop, tests ([7eb8c3e9](https://github.com/dpc-sdp/ripple-framework/commit/7eb8c3e9))

### 🎨 Styles

  - **nuxt-ripple:** 🔥  remove debug ([974c0b67](https://github.com/dpc-sdp/ripple-framework/commit/974c0b67))
  - 🚨  fix linter warnings ([3624b6dd](https://github.com/dpc-sdp/ripple-framework/commit/3624b6dd))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>
- David Featherston <david.featherstone@dpc.vic.gov.au>
- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>

## v2.1.7

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.4...v2.1.7)


### 🚀 Enhancements

  - **@dpc-sdp/ripple-tide-event:** Add event search result card ([67f6c95f](https://github.com/dpc-sdp/ripple-framework/commit/67f6c95f))

### 🩹 Fixes

  - **@dpc-sdp/ripple-ui-core:** 💄  remove overflowing padding ([bbdef3be](https://github.com/dpc-sdp/ripple-framework/commit/bbdef3be))
  - **nuxt-ripple:** 🐛  fix css load order on build ([9bd2f8b4](https://github.com/dpc-sdp/ripple-framework/commit/9bd2f8b4))

### 🏡 Chore

  - 🔖  release 2.1.5 ([3f77f7fb](https://github.com/dpc-sdp/ripple-framework/commit/3f77f7fb))
  - 🔖  release 2.1.6 ([57d44abb](https://github.com/dpc-sdp/ripple-framework/commit/57d44abb))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>
- David Featherston <david.featherstone@dpc.vic.gov.au>

## v2.1.6

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.4...v2.1.6)


### 🚀 Enhancements

  - **@dpc-sdp/ripple-tide-event:** Add event search result card ([67f6c95f](https://github.com/dpc-sdp/ripple-framework/commit/67f6c95f))

### 🩹 Fixes

  - **@dpc-sdp/ripple-ui-core:** 💄  remove overflowing padding ([bbdef3be](https://github.com/dpc-sdp/ripple-framework/commit/bbdef3be))

### 🏡 Chore

  - 🔖  release 2.1.5 ([3f77f7fb](https://github.com/dpc-sdp/ripple-framework/commit/3f77f7fb))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>
- David Featherston <david.featherstone@dpc.vic.gov.au>

## v2.1.5

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.4...v2.1.5)


### 🚀 Enhancements

  - **@dpc-sdp/ripple-tide-event:** Add event search result card ([67f6c95f](https://github.com/dpc-sdp/ripple-framework/commit/67f6c95f))

### 🩹 Fixes

  - **@dpc-sdp/ripple-ui-core:** 💄  remove overflowing padding ([bbdef3be](https://github.com/dpc-sdp/ripple-framework/commit/bbdef3be))

### ❤️  Contributors

- Jason Smith <jason.smith@dpc.vic.gov.au>
- David Featherston <david.featherstone@dpc.vic.gov.au>

## v2.1.4

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.3...v2.1.4)


### 🩹 Fixes

  - **@dpc-sdp/ripple-ui-core:** Fix divider displaying when no cobrand ([f23bc0b5](https://github.com/dpc-sdp/ripple-framework/commit/f23bc0b5))

### ✅ Tests

  - **@dpc-sdp/ripple-ui-core:** ✅  add test for cobrand logo ([dc6806ca](https://github.com/dpc-sdp/ripple-framework/commit/dc6806ca))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.1.3

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.2...v2.1.3)


### 🚀 Enhancements

  - **@dpc-sdp/ripple-ui-core:** ✨  add ability to disable primary vic logo via flag ([c4a1b981](https://github.com/dpc-sdp/ripple-framework/commit/c4a1b981))

### 🩹 Fixes

  - **nuxt-ripple:** 🐛  use RplTextLink ([c95a3ac9](https://github.com/dpc-sdp/ripple-framework/commit/c95a3ac9))
  - **@dpc-sdp/ripple-tide-publication:** 🐛  use li for card element ([5be7e137](https://github.com/dpc-sdp/ripple-framework/commit/5be7e137))

### ✅ Tests

  - **@dpc-sdp/ripple-ui-core:** ✅  add missing import ([b40e2fdc](https://github.com/dpc-sdp/ripple-framework/commit/b40e2fdc))

### 🎨 Styles

  - **@dpc-sdp/ripple-ui-core:** ✏️  use sentence case ([b4c18149](https://github.com/dpc-sdp/ripple-framework/commit/b4c18149))

### ❤️  Contributors

- Jason Smith <jason.smith@dpc.vic.gov.au>
- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.1.2

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.1...v2.1.2)


### 🚀 Enhancements

  - ✨  move config out of public env ([17fb86b3](https://github.com/dpc-sdp/ripple-framework/commit/17fb86b3))
  - **@dpc-sdp/ripple-test-utils:** ✨  use wildcard for search url ([66da5976](https://github.com/dpc-sdp/ripple-framework/commit/66da5976))
  - **@dpc-sdp/ripple-ui-core:** Add default primary logo inline ([7def1aa1](https://github.com/dpc-sdp/ripple-framework/commit/7def1aa1))
  - **@dpc-sdp/nuxt-ripple-analytics:** Add support for site-specific gtm containers ([d239ca48](https://github.com/dpc-sdp/ripple-framework/commit/d239ca48))
  - **@dpc-sdp/nuxt-ripple:** Add support for new print logo cms field ([e321cb6c](https://github.com/dpc-sdp/ripple-framework/commit/e321cb6c))
  - **@dpc-sdp/nuxt-ripple:** Add custom loading indicator ([258ea4ba](https://github.com/dpc-sdp/ripple-framework/commit/258ea4ba))
  - **@dpc-sdp/ripple-tide-search:** Added domain to display for relative urls in search results ([fde956c4](https://github.com/dpc-sdp/ripple-framework/commit/fde956c4))
  - **@dpc-sdp/nuxt-ripple-analytics:** Add link to vertical nav, prepend relative urls ([984d07bb](https://github.com/dpc-sdp/ripple-framework/commit/984d07bb))
  - **@dpc-sdp/ripple-ui-forms:** Debounce input change event (primarily for numbers) ([af6686d9](https://github.com/dpc-sdp/ripple-framework/commit/af6686d9))
  - **@dpc-sdp/nuxt-ripple:** Add flag to disable primary nav search ([89aa0465](https://github.com/dpc-sdp/ripple-framework/commit/89aa0465))
  - **@dpc-sdp/nuxt-ripple-analytics:** Update search click event name ([df925cbf](https://github.com/dpc-sdp/ripple-framework/commit/df925cbf))
  - **@dpc-sdp/nuxt-ripple-cli:** Update jest config to fix unit tests in layers running nuxt 3.6+ ([93bf9e04](https://github.com/dpc-sdp/ripple-framework/commit/93bf9e04))
  - **@dpc-sdp/nuxt-ripple-cli:** Update package.json scripts to include ci mode tests ([469818a5](https://github.com/dpc-sdp/ripple-framework/commit/469818a5))
  - **@dpc-sdp/ripple-ui-forms:** Add throttle prop ([a74ac8b6](https://github.com/dpc-sdp/ripple-framework/commit/a74ac8b6))

### 🩹 Fixes

  - Upgrade nuxt to 3.6.5 to fix FOUC in 404 page ([d2a76bb9](https://github.com/dpc-sdp/ripple-framework/commit/d2a76bb9))
  - **@dpc-sdp/ripple-tide-api:** 🐛  add default value for baseUrl ([9bbaca0c](https://github.com/dpc-sdp/ripple-framework/commit/9bbaca0c))
  - **@dpc-sdp/ripple-tide-search:** Fixed reactivity of useRoute after nuxt upgrade ([c893679c](https://github.com/dpc-sdp/ripple-framework/commit/c893679c))
  - **@dpc-sdp/nuxt-ripple-analytics:** Send all falsely values as undefined ([17420c57](https://github.com/dpc-sdp/ripple-framework/commit/17420c57))
  - **@dpc-sdp/ripple-tide-search:** Fixed site search filter not clearing properly ([eb0494da](https://github.com/dpc-sdp/ripple-framework/commit/eb0494da))
  - **@dpc-sdp/ripple-tide-search:** Pass site to base layout ([a6cf69de](https://github.com/dpc-sdp/ripple-framework/commit/a6cf69de))
  - **@dpc-sdp/ripple-tide-landing-page:** Add custom heading gap for category grid, fix alt urls ([d70cf4ab](https://github.com/dpc-sdp/ripple-framework/commit/d70cf4ab))
  - **@dpc-sdp/ripple-ui-core:** 🐛  missing , ([7e8d2ed5](https://github.com/dpc-sdp/ripple-framework/commit/7e8d2ed5))
  - **@dpc-sdp/ripple-tide-search:** Fixed search filter row gap ([a2f15c72](https://github.com/dpc-sdp/ripple-framework/commit/a2f15c72))
  - **@dpc-sdp/ripple-tide-search:** Send app search key on server to fix basic auth ([636b368a](https://github.com/dpc-sdp/ripple-framework/commit/636b368a))
  - **@dpc-sdp/nuxt-ripple:** Added site url to nuxt-ripple nuxt.config ([27c7bba1](https://github.com/dpc-sdp/ripple-framework/commit/27c7bba1))

### 💅 Refactors

  - ♻️  merge config at runtime ([22e0d74d](https://github.com/dpc-sdp/ripple-framework/commit/22e0d74d))
  - **@dpc-sdp/ripple-ui-core:** ♻️  move icons to core, update generate script ([9489903f](https://github.com/dpc-sdp/ripple-framework/commit/9489903f))
  - ♻️  move social share url concern to caller ([615b8a9a](https://github.com/dpc-sdp/ripple-framework/commit/615b8a9a))

### 📦 Build

  - **nuxt-app:** 🔧  disable basic auth by default ([2f320938](https://github.com/dpc-sdp/ripple-framework/commit/2f320938))

### 🏡 Chore

  - Add git config in publish step ([42815a76](https://github.com/dpc-sdp/ripple-framework/commit/42815a76))
  - Empty commit to test deploy ([112685d7](https://github.com/dpc-sdp/ripple-framework/commit/112685d7))
  - Fix canary publish step ([c89de863](https://github.com/dpc-sdp/ripple-framework/commit/c89de863))
  - Remove all usage of deprecated vm2 package ([cb7e2c72](https://github.com/dpc-sdp/ripple-framework/commit/cb7e2c72))
  - **@dpc-sdp/nuxt-ripple-cli:** Added github package registry to npmrc template ([1e34c163](https://github.com/dpc-sdp/ripple-framework/commit/1e34c163))
  - Added topic package to site generator template ([e002f17f](https://github.com/dpc-sdp/ripple-framework/commit/e002f17f))
  - **@dpc-sdp/nuxt-ripple-cli:** Update github action ([c1afc460](https://github.com/dpc-sdp/ripple-framework/commit/c1afc460))
  - **@dpc-sdp/nuxt-ripple-cli:** Added missing files to layer ci command ([b4823502](https://github.com/dpc-sdp/ripple-framework/commit/b4823502))
  - **@dpc-sdp/nuxt-ripple-cli:** Fixed incorrect file extension for PR template ([53e5bafb](https://github.com/dpc-sdp/ripple-framework/commit/53e5bafb))
  - **@dpc-sdp/nuxt-ripple-cli:** Fixed cypress tests not running locally in scaffold projects ([44912d86](https://github.com/dpc-sdp/ripple-framework/commit/44912d86))
  - Merge in develop ([bac6c728](https://github.com/dpc-sdp/ripple-framework/commit/bac6c728))

### ✅ Tests

  - Refactor page and site mocking step definitions ([1c933492](https://github.com/dpc-sdp/ripple-framework/commit/1c933492))
  - Fix incorrectly named step ([1493fd9f](https://github.com/dpc-sdp/ripple-framework/commit/1493fd9f))
  - Brought back generic api mock step for publication tests ([dcbae1b2](https://github.com/dpc-sdp/ripple-framework/commit/dcbae1b2))
  - Fixed broken test ([e26565bb](https://github.com/dpc-sdp/ripple-framework/commit/e26565bb))
  - Add generic site and base url for tests ([49ab2a1e](https://github.com/dpc-sdp/ripple-framework/commit/49ab2a1e))
  - **@dpc-sdp/ripple-tide-grant:** Fixed cypress tests after search change ([168439f2](https://github.com/dpc-sdp/ripple-framework/commit/168439f2))

### 🤖 CI

  - Run actions if action config changes ([cfe8a30d](https://github.com/dpc-sdp/ripple-framework/commit/cfe8a30d))
  - Re-run actions when the action is modified ([43e9c358](https://github.com/dpc-sdp/ripple-framework/commit/43e9c358))
  - Fix action paths ([512e1074](https://github.com/dpc-sdp/ripple-framework/commit/512e1074))
  - Wait for correct site id ([52ff7c54](https://github.com/dpc-sdp/ripple-framework/commit/52ff7c54))
  - Try waiting on an asset instead of api endpoint ([96367702](https://github.com/dpc-sdp/ripple-framework/commit/96367702))
  - Removed hardcoded site id from tests ([ab891824](https://github.com/dpc-sdp/ripple-framework/commit/ab891824))
  - Removed search engine name from cypres env var ([7dfed15c](https://github.com/dpc-sdp/ripple-framework/commit/7dfed15c))
  - **@dpc-sdp/nuxt-ripple-cli:** Updated cypress test action template to be more generic ([f98c8589](https://github.com/dpc-sdp/ripple-framework/commit/f98c8589))

### ❤️  Contributors

- David Featherston <david.featherstone@dpc.vic.gov.au>
- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>
- Dylankelly <dylan.kelly@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>
- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>

## v2.1.0...release/2.1.1

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0...release/2.1.1)


### 🚀 Enhancements

  - **@dpc-sdp/ripple-tide-search:** Add tide search page events ([5db04e13](https://github.com/dpc-sdp/ripple-framework/commit/5db04e13))
  - **@dpc-sdp/ripple-tide-search:** Get URL from urlManager ([9f534cc5](https://github.com/dpc-sdp/ripple-framework/commit/9f534cc5))
  - **@dpc-sdp/ripple-tide-search:** Add search listing events ([581fa166](https://github.com/dpc-sdp/ripple-framework/commit/581fa166))
  - **@dpc-sdp/ripple-tide-landing-page:** Add compact card collection i.e. category grid support ([9f9b2ff4](https://github.com/dpc-sdp/ripple-framework/commit/9f9b2ff4))
  - **@dpc-sdp/ripple-ui-core:** Move default alt above image attrs so it can be overridden ([f572cdf7](https://github.com/dpc-sdp/ripple-framework/commit/f572cdf7))
  - **@dpc-sdp/ripple-tide-search:** Add type to search events ([037f1c65](https://github.com/dpc-sdp/ripple-framework/commit/037f1c65))
  - **@dpc-sdp/ripple-ui-core:** Make header content 10 cols when there's no 'sidebar' ([09a49182](https://github.com/dpc-sdp/ripple-framework/commit/09a49182))

### 🩹 Fixes

  - **@dpc-sdp/ripple-tide-search:** 🐛  flatten filterval if an array is found ([e8f2830f](https://github.com/dpc-sdp/ripple-framework/commit/e8f2830f))
  - **@dpc-sdp/ripple-ui-core:** Add min-width to fieldsets, this fixes overflowing dropdowns ([4cd64d7d](https://github.com/dpc-sdp/ripple-framework/commit/4cd64d7d))
  - **@dpc-sdp/ripple-ui-core:** Ensure wysiwyg images aren't all full width ([2eabe11f](https://github.com/dpc-sdp/ripple-framework/commit/2eabe11f))
  - **@dpc-sdp/ripple-ui-core:** Allow tables and media elements to span full width ([b54b6cce](https://github.com/dpc-sdp/ripple-framework/commit/b54b6cce))
  - **@dpc-sdp/ripple-ui-core:** Fix quick exit positioning in build mode ([b779e9b9](https://github.com/dpc-sdp/ripple-framework/commit/b779e9b9))

### 💅 Refactors

  - **@dpc-sdp/ripple-tide-search:** ♻️  add separate case for prefix filter ([ebad0ac6](https://github.com/dpc-sdp/ripple-framework/commit/ebad0ac6))
  - **@dpc-sdp/ripple-tide-search:** ♻️  add separate case for prefix filter ([1df527c4](https://github.com/dpc-sdp/ripple-framework/commit/1df527c4))

### 🏡 Chore

  - **@dpc-sdp/ripple-ui-core:** Swap search bar event names ([db260750](https://github.com/dpc-sdp/ripple-framework/commit/db260750))
  - **@dpc-sdp/ripple-tide-search:** Update search bar related events following name change ([8425b87d](https://github.com/dpc-sdp/ripple-framework/commit/8425b87d))
  - Fix publish step ([da7a3dbf](https://github.com/dpc-sdp/ripple-framework/commit/da7a3dbf))

### ❤️  Contributors

- David Featherston <david.featherstone@dpc.vic.gov.au>
- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>

## v2.1.0

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.0.0-rc.1...v2.1.0)


### 🚀 Enhancements

  - ✨  storybook 7 ([5bb48570](https://github.com/dpc-sdp/ripple-framework/commit/5bb48570))
  - **@dpc-sdp/nuxt-ripple-cli:** Required user to specify ripple version when scafolding sites/layers ([fde24a2d](https://github.com/dpc-sdp/ripple-framework/commit/fde24a2d))
  - **docs:** Added google analytics scripts to docs site ([e4063672](https://github.com/dpc-sdp/ripple-framework/commit/e4063672))
  - **@dpc-sdp/nuxt-ripple-analytics:** Update dataLayer events ([a6df3954](https://github.com/dpc-sdp/ripple-framework/commit/a6df3954))
  - **@dpc-sdp/ripple-ui-core:** Add file size to download event ([e09a114f](https://github.com/dpc-sdp/ripple-framework/commit/e09a114f))
  - **@dpc-sdp/ripple-ui-forms:** Add rplEvents to all field types ([fe8c9d23](https://github.com/dpc-sdp/ripple-framework/commit/fe8c9d23))
  - **@dpc-sdp/ripple-ui-forms:** Removed 'live' validation functionality from forms ([48f314ad](https://github.com/dpc-sdp/ripple-framework/commit/48f314ad))
  - **@dpc-sdp/nuxt-ripple-analytics:** Adding core ui events and updating form events ([c79c7afe](https://github.com/dpc-sdp/ripple-framework/commit/c79c7afe))
  - **@dpc-sdp/ripple-ui-core:** Adding component events ([b0bb73c3](https://github.com/dpc-sdp/ripple-framework/commit/b0bb73c3))
  - **@dpc-sdp/ripple-ui-forms:** Adding component events ([545c71da](https://github.com/dpc-sdp/ripple-framework/commit/545c71da))
  - **@dpc-sdp/ripple-tide-search:** Merge search listing, allow it to work alongside app search ([0795fdf1](https://github.com/dpc-sdp/ripple-framework/commit/0795fdf1))
  - **@dpc-sdp/ripple-tide-search:** Updated site search page to use 'complex' pagination variant ([12e2152b](https://github.com/dpc-sdp/ripple-framework/commit/12e2152b))
  - **@dpc-sdp/ripple-tide-search:** ✨  adds support for card meta in search listing ([6a3b09a5](https://github.com/dpc-sdp/ripple-framework/commit/6a3b09a5))
  - **@dpc-sdp/ripple-tide-search:** Added pagination, errors and url flow to search listing page ([750c02fd](https://github.com/dpc-sdp/ripple-framework/commit/750c02fd))
  - **@dpc-sdp/ripple-tide-search:** ✨  add configurable search listing items per page ([b0e722c6](https://github.com/dpc-sdp/ripple-framework/commit/b0e722c6))
  - **@dpc-sdp/nuxt-ripple-analytics:** Adding routeChange/view event ([1c4ff349](https://github.com/dpc-sdp/ripple-framework/commit/1c4ff349))
  - **@dpc-sdp/nuxt-ripple-cli:** Add rplVersion, adding support for content type names with numbers ([8592b867](https://github.com/dpc-sdp/ripple-framework/commit/8592b867))
  - **@dpc-sdp/ripple-tide-search:** Added scroll to results behaviour when changing page ([0d4d4c37](https://github.com/dpc-sdp/ripple-framework/commit/0d4d4c37))
  - **@dpc-sdp/ripple-ui-core:** ✨  add support in datatable for custom cell comp ([b511afcb](https://github.com/dpc-sdp/ripple-framework/commit/b511afcb))
  - **@dpc-sdp/ripple-tide-search:** ✨  add datatable layout for search listing ([7d1961e3](https://github.com/dpc-sdp/ripple-framework/commit/7d1961e3))
  - **@dpc-sdp/ripple-tide-search:** Got filter form working correctly with URL ([a4893700](https://github.com/dpc-sdp/ripple-framework/commit/a4893700))
  - **nuxt-ripple:** ✨  implement 301 redirect ([97da41c8](https://github.com/dpc-sdp/ripple-framework/commit/97da41c8))
  - **@dpc-sdp/ripple-tide-landing-page:** Add support for site corner graphics ([9ebda9d0](https://github.com/dpc-sdp/ripple-framework/commit/9ebda9d0))
  - **@dpc-sdp/nuxt-ripple:** Add support for site corner graphics ([7fd06e86](https://github.com/dpc-sdp/ripple-framework/commit/7fd06e86))
  - **@dpc-sdp/nuxt-ripple-cli:** ✨  default rplVersion to latest from pkg ([b7a5992d](https://github.com/dpc-sdp/ripple-framework/commit/b7a5992d))
  - **@dpc-sdp/nuxt-ripple-cli:** ✨  add ability to set .env values from cli ([98bc213a](https://github.com/dpc-sdp/ripple-framework/commit/98bc213a))
  - **@dpc-sdp/ripple-tide-search:** Added support for function filters, grantStatus function filter ([33f42b2b](https://github.com/dpc-sdp/ripple-framework/commit/33f42b2b))
  - **@dpc-sdp/ripple-tide-search:** Added expand/collapse toggle for search filters sections ([c9b6c3f8](https://github.com/dpc-sdp/ripple-framework/commit/c9b6c3f8))
  - **@dpc-sdp/ripple-tide-search:** ✨  use content managed page features ([a5978806](https://github.com/dpc-sdp/ripple-framework/commit/a5978806))
  - **@dpc-sdp/nuxt-ripple-analytics:** Update route and components events, add dropdown toggle ([6404ffbf](https://github.com/dpc-sdp/ripple-framework/commit/6404ffbf))
  - **@dpc-sdp/nuxt-ripple:** Add contact types ([9035f12e](https://github.com/dpc-sdp/ripple-framework/commit/9035f12e))
  - **@dpc-sdp/ripple-ui-forms:** Update event actions, add dropdown toggle event ([bd5a5f31](https://github.com/dpc-sdp/ripple-framework/commit/bd5a5f31))
  - **@dpc-sdp/ripple-tide-search:** Ensured that filters are applied when submitting search query ([dfbcdc26](https://github.com/dpc-sdp/ripple-framework/commit/dfbcdc26))
  - **@dpc-sdp/nuxt-ripple-analytics:** Add search result, form actions events, minor spec updates ([549bb351](https://github.com/dpc-sdp/ripple-framework/commit/549bb351))
  - **@dpc-sdp/ripple-ui-core:** Event updates from dataLayer spec ([0da1e86f](https://github.com/dpc-sdp/ripple-framework/commit/0da1e86f))
  - **@dpc-sdp/ripple-ui-forms:** Add reset form event ([581400ea](https://github.com/dpc-sdp/ripple-framework/commit/581400ea))
  - **@dpc-sdp/ripple-ui-core:** Add pagination labels and swipe events ([38e0ff44](https://github.com/dpc-sdp/ripple-framework/commit/38e0ff44))
  - **@dpc-sdp/ripple-ui-core:** Add pagination text and swipe events ([197ace4d](https://github.com/dpc-sdp/ripple-framework/commit/197ace4d))
  - **@dpc-sdp/ripple-tide-search:** Updated date formatting for search results ([72c100a4](https://github.com/dpc-sdp/ripple-framework/commit/72c100a4))
  - **@dpc-sdp/nuxt-ripple:** Add default tide header, fix site data loading on 404 pages ([491b3068](https://github.com/dpc-sdp/ripple-framework/commit/491b3068))
  - **@dpc-sdp/nuxt-ripple-preview:** Add site wide corner graphics ([27348ec8](https://github.com/dpc-sdp/ripple-framework/commit/27348ec8))
  - **@dpc-sdp/ripple-tide-api:** Add cornerGraphic to site data type ([40d44e03](https://github.com/dpc-sdp/ripple-framework/commit/40d44e03))
  - **@dpc-sdp/ripple-tide-event:** Remove custom header ([b372d29f](https://github.com/dpc-sdp/ripple-framework/commit/b372d29f))
  - **@dpc-sdp/ripple-tide-grant:** Remove custom header ([3667165a](https://github.com/dpc-sdp/ripple-framework/commit/3667165a))
  - **@dpc-sdp/ripple-tide-media:** Remove custom header ([e119e212](https://github.com/dpc-sdp/ripple-framework/commit/e119e212))
  - **@dpc-sdp/ripple-tide-news:** Remove custom header ([508ef6c4](https://github.com/dpc-sdp/ripple-framework/commit/508ef6c4))
  - **@dpc-sdp/ripple-tide-publication:** Remove custom header ([651575fb](https://github.com/dpc-sdp/ripple-framework/commit/651575fb))
  - **@dpc-sdp/ripple-tide-search:** Add site wide corner top graphic ([8143e80f](https://github.com/dpc-sdp/ripple-framework/commit/8143e80f))
  - **@dpc-sdp/ripple-tide-landing-page:** Use TideHeroHeader, update mapping to match content types ([60fea078](https://github.com/dpc-sdp/ripple-framework/commit/60fea078))
  - **@dpc-sdp/ripple-tide-topic:** Added new content type for topics and tags listing ([b4a1a4bc](https://github.com/dpc-sdp/ripple-framework/commit/b4a1a4bc))
  - ✨  separate linter config into packages ([cbc214d3](https://github.com/dpc-sdp/ripple-framework/commit/cbc214d3))
  - **@dpc-sdp/ripple-tide-search:** Added first pass at mapping search listing drupal UI ([e58eef24](https://github.com/dpc-sdp/ripple-framework/commit/e58eef24))
  - **@dpc-sdp/ripple-ui-core:** Event updates, add withOptions helper ([6aec24bd](https://github.com/dpc-sdp/ripple-framework/commit/6aec24bd))
  - **@dpc-sdp/nuxt-ripple-analytics:** Update events, add measurement ids ([67361c05](https://github.com/dpc-sdp/ripple-framework/commit/67361c05))
  - **@dpc-sdp/ripple-ui-core:** Adding different language fonts ([d846578e](https://github.com/dpc-sdp/ripple-framework/commit/d846578e))
  - **@dpc-sdp/ripple-ui-core:** Minor event updates ([2b6b84bd](https://github.com/dpc-sdp/ripple-framework/commit/2b6b84bd))
  - **@dpc-sdp/ripple-tide-search:** Changed elastic aggregations to only fetch once on mount ([61df4924](https://github.com/dpc-sdp/ripple-framework/commit/61df4924))
  - **@dpc-sdp/ripple-ui-core:** ✨  add debounce option to search bar ([2badcc42](https://github.com/dpc-sdp/ripple-framework/commit/2badcc42))
  - **@dpc-sdp/ripple-tide-search:** ✨  add afterResults content ([7af1f687](https://github.com/dpc-sdp/ripple-framework/commit/7af1f687))
  - **@dpc-sdp/ripple-tide-search:** ✨  enable untyped search results ([a493aa73](https://github.com/dpc-sdp/ripple-framework/commit/a493aa73))
  - **@dpc-sdp/nuxt-ripple:** Allow languages to be added via app.config ([9eeb0011](https://github.com/dpc-sdp/ripple-framework/commit/9eeb0011))
  - **@dpc-sdp/ripple-tide-search:** Updated search mapping based on backend changes ([ad10db58](https://github.com/dpc-sdp/ripple-framework/commit/ad10db58))
  - **@dpc-sdp/ripple-ui-forms:** Pass arrays as strings in events ([28245847](https://github.com/dpc-sdp/ripple-framework/commit/28245847))
  - **@dpc-sdp/ripple-tide-search:** Cleaned up table listing view ([9996fb02](https://github.com/dpc-sdp/ripple-framework/commit/9996fb02))
  - **@dpc-sdp/nuxt-ripple:** Fix error when page meta isn't set ([c35ad6e6](https://github.com/dpc-sdp/ripple-framework/commit/c35ad6e6))

### 🔥 Performance

  - **@dpc-sdp/ripple-tide-search:** ⚡️  remove unused imports ([49c272f1](https://github.com/dpc-sdp/ripple-framework/commit/49c272f1))

### 🩹 Fixes

  - **@dpc-sdp/ripple-ui-forms:** Prepend checkbox/radio option ids ([e3888784](https://github.com/dpc-sdp/ripple-framework/commit/e3888784))
  - **@dpc-sdp/ripple-tide-landing-page:** Prepend ids to avoid clashes with other forms ([88442105](https://github.com/dpc-sdp/ripple-framework/commit/88442105))
  - **docs:** Updated build command after storybook 7 update ([752c7c08](https://github.com/dpc-sdp/ripple-framework/commit/752c7c08))
  - Fixed storybook 7 update merge conflict issues ([7a3816a4](https://github.com/dpc-sdp/ripple-framework/commit/7a3816a4))
  - **@dpc-sdp/ripple-tide-landing-page:** Hide form so RplForm can emit events when hideFormOnSubmit ([eb42f38c](https://github.com/dpc-sdp/ripple-framework/commit/eb42f38c))
  - **@dpc-sdp/ripple-ui-forms:** Changed to use field name instead of ids to match errors ([c0d4677e](https://github.com/dpc-sdp/ripple-framework/commit/c0d4677e))
  - **@dpc-sdp/ripple-ui-forms:** Prepend form id to the error summary link ids ([679ae218](https://github.com/dpc-sdp/ripple-framework/commit/679ae218))
  - **@dpc-sdp/ripple-tide-landing-page:** Add sort "override" for news content type ([c8ef5c2e](https://github.com/dpc-sdp/ripple-framework/commit/c8ef5c2e))
  - 🐛  restore reactivity to theme ([8dcb636d](https://github.com/dpc-sdp/ripple-framework/commit/8dcb636d))
  - **@dpc-sdp/ripple-ui-forms:** ✏️  argstable using the wrong component ([8ac8bbd8](https://github.com/dpc-sdp/ripple-framework/commit/8ac8bbd8))
  - **@dpc-sdp/ripple-ui-forms:** Fixed error message not linked properly to input ([2d268768](https://github.com/dpc-sdp/ripple-framework/commit/2d268768))
  - **@dpc-sdp/ripple-ui-forms:** Removed live updating of aria-describedby attribute ([245ae662](https://github.com/dpc-sdp/ripple-framework/commit/245ae662))
  - **@dpc-sdp/ripple-ui-forms:** Fixed errors/help text not connected to date inputs properly ([e4876bfa](https://github.com/dpc-sdp/ripple-framework/commit/e4876bfa))
  - **@dpc-sdp/ripple-ui-forms:** Used id instead of name for error summary links ([df7d2f5f](https://github.com/dpc-sdp/ripple-framework/commit/df7d2f5f))
  - **nuxt-app:** Update accordion text ids ([2c9bba47](https://github.com/dpc-sdp/ripple-framework/commit/2c9bba47))
  - **@dpc-sdp/ripple-ui-forms:** Update date input event name ([2a85d354](https://github.com/dpc-sdp/ripple-framework/commit/2a85d354))
  - **@dpc-sdp/ripple-tide-search:** Add correct name for filter inputs ([43a5631a](https://github.com/dpc-sdp/ripple-framework/commit/43a5631a))
  - **@dpc-sdp/nuxt-ripple:** Correctly case content types with numbers ([ba7ef041](https://github.com/dpc-sdp/ripple-framework/commit/ba7ef041))
  - **@dpc-sdp/ripple-tide-search:** Removed aggs from request when it's empty ([e10e1015](https://github.com/dpc-sdp/ripple-framework/commit/e10e1015))
  - **@dpc-sdp/ripple-tide-landing-page:** Include siteId in search filters, fix filter type ([051234f9](https://github.com/dpc-sdp/ripple-framework/commit/051234f9))
  - **@dpc-sdp/ripple-ui-core:** Make data table row items computed ([67c27fae](https://github.com/dpc-sdp/ripple-framework/commit/67c27fae))
  - **@dpc-sdp/ripple-tide-search:** Fixed dropdown options not updating ([295d3d1b](https://github.com/dpc-sdp/ripple-framework/commit/295d3d1b))
  - **@dpc-sdp/ripple-tide-search:** Ensured that all filters are sent in DSL query ([8a850398](https://github.com/dpc-sdp/ripple-framework/commit/8a850398))
  - **@dpc-sdp/ripple-tide-landing-page:** Use siteID from TidePageApi ([5433389f](https://github.com/dpc-sdp/ripple-framework/commit/5433389f))
  - **@dpc-sdp/ripple-ui-core:** Use "dynamic" height for menu/search ([d621a114](https://github.com/dpc-sdp/ripple-framework/commit/d621a114))
  - **@dpc-sdp/ripple-tide-landing-page:** Update collection test ([20629081](https://github.com/dpc-sdp/ripple-framework/commit/20629081))
  - **@dpc-sdp/ripple-tide-search:** Fixed up term/s filter type dsl mapping ([89655f53](https://github.com/dpc-sdp/ripple-framework/commit/89655f53))
  - **@dpc-sdp/nuxt-ripple-cli:** Fix tsconfig path ([f612b5e5](https://github.com/dpc-sdp/ripple-framework/commit/f612b5e5))
  - **@dpc-sdp/nuxt-ripple-cli:** 🚨  fix lint issues ([7c8502c7](https://github.com/dpc-sdp/ripple-framework/commit/7c8502c7))
  - **@dpc-sdp/ripple-tide-api:** 🐛  check for field, add mapping util interfaces for ts ([d3b56274](https://github.com/dpc-sdp/ripple-framework/commit/d3b56274))
  - **@dpc-sdp/ripple-tide-search:** 🐛  restore missing route ([3ac94218](https://github.com/dpc-sdp/ripple-framework/commit/3ac94218))
  - **@dpc-sdp/ripple-ui-core:** Add list types ([114c9a9c](https://github.com/dpc-sdp/ripple-framework/commit/114c9a9c))
  - **@dpc-sdp/ripple-tide-grant:** Fixed grant result crashing when from date was after to date ([1b55e1a0](https://github.com/dpc-sdp/ripple-framework/commit/1b55e1a0))
  - **@dpc-sdp/ripple-tide-api:** Remove stray 3 ([349b3767](https://github.com/dpc-sdp/ripple-framework/commit/349b3767))
  - **@dpc-sdp/nuxt-ripple:** Remove stray 3 ([48720543](https://github.com/dpc-sdp/ripple-framework/commit/48720543))
  - **@dpc-sdp/ripple-tide-api:** Add iframe markup plugin ([045757ec](https://github.com/dpc-sdp/ripple-framework/commit/045757ec))
  - **@dpc-sdp/ripple-ui-core:** Add iframe 'markup' styles ([62867a70](https://github.com/dpc-sdp/ripple-framework/commit/62867a70))
  - **nuxt-app:** Update full-form.json header ([d1ecffce](https://github.com/dpc-sdp/ripple-framework/commit/d1ecffce))
  - **@dpc-sdp/nuxt-ripple-analytics:** Allow routeChange events to be extended across layers ([77da8ac4](https://github.com/dpc-sdp/ripple-framework/commit/77da8ac4))
  - **@dpc-sdp/ripple-tide-search:** Update pagination ([eb18847a](https://github.com/dpc-sdp/ripple-framework/commit/eb18847a))
  - **@dpc-sdp/nuxt-ripple-analytics:** Update import path ([aff17fb2](https://github.com/dpc-sdp/ripple-framework/commit/aff17fb2))
  - **@dpc-sdp/nuxt-ripple-analytics:** Remove routeChange: true to support layers ([d4f7935b](https://github.com/dpc-sdp/ripple-framework/commit/d4f7935b))
  - **@dpc-sdp/nuxt-ripple-cli:** Fix package export ([c6d5bd3b](https://github.com/dpc-sdp/ripple-framework/commit/c6d5bd3b))
  - **@dpc-sdp/ripple-tide-search:** Fixed display of search listing intro text ([6cc389a0](https://github.com/dpc-sdp/ripple-framework/commit/6cc389a0))
  - **@dpc-sdp/nuxt-ripple-cli:** 🐛  fix baseurl and siteid vars undefined ([6e63f5d7](https://github.com/dpc-sdp/ripple-framework/commit/6e63f5d7))
  - **@dpc-sdp/ripple-tide-search:** Scope site search to site and content types ([8e4ab08d](https://github.com/dpc-sdp/ripple-framework/commit/8e4ab08d))
  - **@dpc-sdp/ripple-ui-core:** Fixed data table column labels on small screens ([811988f3](https://github.com/dpc-sdp/ripple-framework/commit/811988f3))
  - **@dpc-sdp/nuxt-ripple-analytics:** Use LAGOON_ENVIRONMENT_TYPE for production check ([05a8a3a8](https://github.com/dpc-sdp/ripple-framework/commit/05a8a3a8))
  - **@dpc-sdp/ripple-tide-search:** Add key to fetch request so we can reference it elsewhere ([83afd938](https://github.com/dpc-sdp/ripple-framework/commit/83afd938))

### 💅 Refactors

  - **@dpc-sdp/ripple-ui-forms:** Fixed a number of prop type warnings when form is added to page ([4e543693](https://github.com/dpc-sdp/ripple-framework/commit/4e543693))
  - **@dpc-sdp/ripple-tide-search:** Removed unneeded search-new page ([40149827](https://github.com/dpc-sdp/ripple-framework/commit/40149827))
  - **@dpc-sdp/ripple-tide-search:** Removed unnessacary computed 'totalPages' ([be25b349](https://github.com/dpc-sdp/ripple-framework/commit/be25b349))
  - **@dpc-sdp/ripple-tide-search:** ♻️  refactor search listing content type ([f90842ae](https://github.com/dpc-sdp/ripple-framework/commit/f90842ae))
  - **@dpc-sdp/ripple-tide-search:** Removed console log ([8fbcedc8](https://github.com/dpc-sdp/ripple-framework/commit/8fbcedc8))
  - **@dpc-sdp/ripple-tide-search:** Form field options derived from aggs ([62961072](https://github.com/dpc-sdp/ripple-framework/commit/62961072))
  - **nuxt-ripple:** ♻️  respond on all 6 redirect codes, use navigateTo ([fa89b2f2](https://github.com/dpc-sdp/ripple-framework/commit/fa89b2f2))
  - **@dpc-sdp/ripple-tide-search:** ♻️  use page and site from parent ([dc70649f](https://github.com/dpc-sdp/ripple-framework/commit/dc70649f))
  - **@dpc-sdp/ripple-tide-search:** Cleaned up search listing types ([ef2051d2](https://github.com/dpc-sdp/ripple-framework/commit/ef2051d2))
  - **@dpc-sdp/ripple-tide-search:** Fixed minor type errors ([7bbd0672](https://github.com/dpc-sdp/ripple-framework/commit/7bbd0672))
  - **@dpc-sdp/ripple-tide-grant:** Removed duplicate utils and refactored grants meta display ([3026b6ef](https://github.com/dpc-sdp/ripple-framework/commit/3026b6ef))
  - **@dpc-sdp/ripple-tide-search:** Consolidated common results values into composable ([7f49d7f0](https://github.com/dpc-sdp/ripple-framework/commit/7f49d7f0))
  - **nuxt-ripple:** Reshuffled mapping utils to be less confusingly named ([9eef9437](https://github.com/dpc-sdp/ripple-framework/commit/9eef9437))
  - **@dpc-sdp/ripple-tide-search:** Removed unused 'index' value from mapping ([f16758d8](https://github.com/dpc-sdp/ripple-framework/commit/f16758d8))
  - ♻️  match existing CI state ([8f178e02](https://github.com/dpc-sdp/ripple-framework/commit/8f178e02))
  - **@dpc-sdp/ripple-tide-search:** Moved more fields into composible and fixed grid display ([eb7e587c](https://github.com/dpc-sdp/ripple-framework/commit/eb7e587c))

### 📖 Documentation

  - **docs:** Formatted focus state table ([6b8631dd](https://github.com/dpc-sdp/ripple-framework/commit/6b8631dd))
  - **docs:** Added dynamic component docs ([79d5da1d](https://github.com/dpc-sdp/ripple-framework/commit/79d5da1d))
  - **docs:** Added concepts page for dynamic components ([3c56d5d4](https://github.com/dpc-sdp/ripple-framework/commit/3c56d5d4))
  - Add image header for ripple framework ([08633ca9](https://github.com/dpc-sdp/ripple-framework/commit/08633ca9))
  - 📝  update project README.md ([d901d20c](https://github.com/dpc-sdp/ripple-framework/commit/d901d20c))
  - Add circle build status badge ([1b96c735](https://github.com/dpc-sdp/ripple-framework/commit/1b96c735))
  - **docs:** Update about page header ([94207ea9](https://github.com/dpc-sdp/ripple-framework/commit/94207ea9))
  - Add content types guide ([d2f1bb8d](https://github.com/dpc-sdp/ripple-framework/commit/d2f1bb8d))
  - **docs:** Fixed broken links when deployed ([89ab985c](https://github.com/dpc-sdp/ripple-framework/commit/89ab985c))
  - **@dpc-sdp/nuxt-ripple:** Update readme ([0a4c7dbb](https://github.com/dpc-sdp/ripple-framework/commit/0a4c7dbb))
  - **@dpc-sdp/nuxt-ripple-analytics:** Update readme ([bb6e8994](https://github.com/dpc-sdp/ripple-framework/commit/bb6e8994))
  - **@dpc-sdp/ripple-ui-core:** Tweaked alert story display ([3d5e3e2c](https://github.com/dpc-sdp/ripple-framework/commit/3d5e3e2c))
  - **docs:** Updated support link ([679fc966](https://github.com/dpc-sdp/ripple-framework/commit/679fc966))
  - **docs:** 📝  document framework theming ([c484e4e0](https://github.com/dpc-sdp/ripple-framework/commit/c484e4e0))
  - **docs:** 📝  update theming docs ([657cfba8](https://github.com/dpc-sdp/ripple-framework/commit/657cfba8))
  - **docs:** 📝  remove style dictionary mention ([3aaa3aeb](https://github.com/dpc-sdp/ripple-framework/commit/3aaa3aeb))
  - **docs:** 📝  update and enable framework docs ([c439a31e](https://github.com/dpc-sdp/ripple-framework/commit/c439a31e))
  - **docs:** 📝  add favicon for docs site ([cb15ae33](https://github.com/dpc-sdp/ripple-framework/commit/cb15ae33))
  - **docs:** Cleaned up modules section content and added core module listing ([d5a84ae5](https://github.com/dpc-sdp/ripple-framework/commit/d5a84ae5))
  - Minor content tweaks ([ada93f91](https://github.com/dpc-sdp/ripple-framework/commit/ada93f91))
  - **docs:** 📝  enable framework docs ([c87967fe](https://github.com/dpc-sdp/ripple-framework/commit/c87967fe))
  - **docs:** Fixed broken links in docs ([33f968a8](https://github.com/dpc-sdp/ripple-framework/commit/33f968a8))
  - **@dpc-sdp/ripple-ui-forms:** Fixed storybook argstable pointing to wrong components ([e4412c26](https://github.com/dpc-sdp/ripple-framework/commit/e4412c26))
  - **docs:** 💄  add openforms css ([f100fc5e](https://github.com/dpc-sdp/ripple-framework/commit/f100fc5e))
  - **@dpc-sdp/ripple-ui-forms:** Fixed radio group storybook example ([04340357](https://github.com/dpc-sdp/ripple-framework/commit/04340357))
  - **docs:** 📝  adds contributing doc and link to gh on page ([fe79b618](https://github.com/dpc-sdp/ripple-framework/commit/fe79b618))

### 📦 Build

  - 👷  pin deps for sb, test-runner, jest-axe ([c910e5fb](https://github.com/dpc-sdp/ripple-framework/commit/c910e5fb))
  - 👷  set node version, update CI image ([a6b5ce66](https://github.com/dpc-sdp/ripple-framework/commit/a6b5ce66))
  - 🔖  change pre alpha publish step ([e5904bea](https://github.com/dpc-sdp/ripple-framework/commit/e5904bea))
  - **@dpc-sdp/ripple-ui-forms:** 📝  import ui-core styles on form stories ([b825d7d0](https://github.com/dpc-sdp/ripple-framework/commit/b825d7d0))
  - ⬆️  upgrade to latest storybook ([f6644741](https://github.com/dpc-sdp/ripple-framework/commit/f6644741))
  - **@dpc-sdp/ripple-ui-forms:** 📝  add RplForm css to stories ([72248668](https://github.com/dpc-sdp/ripple-framework/commit/72248668))
  - **deps:** Bump word-wrap from 1.2.3 to 1.2.5 ([8c6973c7](https://github.com/dpc-sdp/ripple-framework/commit/8c6973c7))

### 🏡 Chore

  - **release:** Disable version step ([a368de2d](https://github.com/dpc-sdp/ripple-framework/commit/a368de2d))
  - Update vite versions ([a1815094](https://github.com/dpc-sdp/ripple-framework/commit/a1815094))
  - Updated packages after pnpm audit ([1239d391](https://github.com/dpc-sdp/ripple-framework/commit/1239d391))
  - Replaced vite-content-plugin with vite-plugin-yaml ([28c42dde](https://github.com/dpc-sdp/ripple-framework/commit/28c42dde))
  - Updated unlighthouse packages ([ce7972f3](https://github.com/dpc-sdp/ripple-framework/commit/ce7972f3))
  - Remove elasticsearch patch ([694b2a0d](https://github.com/dpc-sdp/ripple-framework/commit/694b2a0d))
  - **release:** Update changelog commands ([514ec9cf](https://github.com/dpc-sdp/ripple-framework/commit/514ec9cf))
  - 🔖  release v2.0.0 ([450abca8](https://github.com/dpc-sdp/ripple-framework/commit/450abca8))
  - **@dpc-sdp/nuxt-ripple:** Add title (not displayed) to tideContentRating form ([c295d27b](https://github.com/dpc-sdp/ripple-framework/commit/c295d27b))
  - **@dpc-sdp/ripple-tide-landing-page:** Remove accordion title prop ([35557b84](https://github.com/dpc-sdp/ripple-framework/commit/35557b84))
  - **@dpc-sdp/ripple-tide-event:** Remove unneeded breadcrumb mapping in events package ([47c163ce](https://github.com/dpc-sdp/ripple-framework/commit/47c163ce))
  - **@dpc-sdp/ripple-tide-search:** ✅  fix search test failures ([81a9c67d](https://github.com/dpc-sdp/ripple-framework/commit/81a9c67d))
  - **@dpc-sdp/nuxt-ripple-cli:** Use node 18 for new projects ([999a778a](https://github.com/dpc-sdp/ripple-framework/commit/999a778a))
  - **@dpc-sdp/nuxt-ripple-cli:** Add lint and prettier for new sites ([a665c2e8](https://github.com/dpc-sdp/ripple-framework/commit/a665c2e8))
  - **@dpc-sdp/nuxt-ripple-cli:** Add tsconfig for new sites ([d95a99bb](https://github.com/dpc-sdp/ripple-framework/commit/d95a99bb))
  - **@dpc-sdp/nuxt-ripple-cli:** Use example dotenv ([fa8c65b8](https://github.com/dpc-sdp/ripple-framework/commit/fa8c65b8))
  - **@dpc-sdp/nuxt-ripple-cli:** Change default site id to reference default ([5e13c8c1](https://github.com/dpc-sdp/ripple-framework/commit/5e13c8c1))
  - 🚀  add package script for alpha npm release ([b59e22d5](https://github.com/dpc-sdp/ripple-framework/commit/b59e22d5))
  - **nuxt-app:** Update landing page fixture ([c9ec8b91](https://github.com/dpc-sdp/ripple-framework/commit/c9ec8b91))
  - Fix curl issue in reference update ([b7a9e5a5](https://github.com/dpc-sdp/ripple-framework/commit/b7a9e5a5))
  - **@dpc-sdp/ripple-tide-api:** Update feature flags type ([b991cef3](https://github.com/dpc-sdp/ripple-framework/commit/b991cef3))
  - **@dpc-sdp/nuxt-ripple:** Add index ([ea155f46](https://github.com/dpc-sdp/ripple-framework/commit/ea155f46))
  - Fix feature issue template ([bd7e1d66](https://github.com/dpc-sdp/ripple-framework/commit/bd7e1d66))
  - Update feature-request.yml ([19e756ea](https://github.com/dpc-sdp/ripple-framework/commit/19e756ea))
  - Update feature-request.yml ([86ed3d35](https://github.com/dpc-sdp/ripple-framework/commit/86ed3d35))
  - Update feature-request.yml ([c02fca5c](https://github.com/dpc-sdp/ripple-framework/commit/c02fca5c))
  - **@dpc-sdp/nuxt-ripple-cli:** 🔧  update CLI tool to include cypress config ([b7f0f9bf](https://github.com/dpc-sdp/ripple-framework/commit/b7f0f9bf))
  - **@dpc-sdp/nuxt-ripple-cli:** Remove ui libraries from layer starter ([e99443c1](https://github.com/dpc-sdp/ripple-framework/commit/e99443c1))
  - **@dpc-sdp/nuxt-ripple-cli:** Add other package managers to gitignore ([3c434dfe](https://github.com/dpc-sdp/ripple-framework/commit/3c434dfe))
  - **@dpc-sdp/nuxt-ripple-cli:** 🚨  fix lint ([9b7b0cf1](https://github.com/dpc-sdp/ripple-framework/commit/9b7b0cf1))
  - **@dpc-sdp/nuxt-ripple-cli:** Fix missing start command ([bb075eda](https://github.com/dpc-sdp/ripple-framework/commit/bb075eda))
  - **@dpc-sdp/nuxt-ripple-cli:** Fix missing package script ([54b9161d](https://github.com/dpc-sdp/ripple-framework/commit/54b9161d))
  - **@dpc-sdp/nuxt-ripple-cli:** Add missing dist files ([11c9728e](https://github.com/dpc-sdp/ripple-framework/commit/11c9728e))
  - **@dpc-sdp/ripple-test-utils:** Fix cypress config importing from module ([cf64e63d](https://github.com/dpc-sdp/ripple-framework/commit/cf64e63d))
  - **@dpc-sdp/ripple-test-utils:** 🐛  add missing search config ([5abb4707](https://github.com/dpc-sdp/ripple-framework/commit/5abb4707))
  - **@dpc-sdp/nuxt-ripple:** Revert use of inject in favour of props ([d001dee5](https://github.com/dpc-sdp/ripple-framework/commit/d001dee5))
  - Add repository field to all packages ([af44d7f9](https://github.com/dpc-sdp/ripple-framework/commit/af44d7f9))
  - **release:** V2.0.1 ([d11200ba](https://github.com/dpc-sdp/ripple-framework/commit/d11200ba))
  - **release:** V2.1.0 ([30e6079d](https://github.com/dpc-sdp/ripple-framework/commit/30e6079d))
  - Update release commands ([4da838fc](https://github.com/dpc-sdp/ripple-framework/commit/4da838fc))

### ✅ Tests

  - **@dpc-sdp/ripple-ui-core:** Adding component tests ([030817a0](https://github.com/dpc-sdp/ripple-framework/commit/030817a0))
  - **@dpc-sdp/ripple-ui-core:** Remove rplEvent for now ([4d69b065](https://github.com/dpc-sdp/ripple-framework/commit/4d69b065))
  - **nuxt-app:** Fixed form tests after live validation removal ([e080eb22](https://github.com/dpc-sdp/ripple-framework/commit/e080eb22))
  - **@dpc-sdp/ripple-tide-search:** ✅  add mocking for elastic results ([c18f54db](https://github.com/dpc-sdp/ripple-framework/commit/c18f54db))
  - **@dpc-sdp/ripple-tide-search:** ✅  add search response mocking test steps ([27eb08c4](https://github.com/dpc-sdp/ripple-framework/commit/27eb08c4))
  - **@dpc-sdp/ripple-tide-search:** ✅  fix grants listing test result count ([6a695d31](https://github.com/dpc-sdp/ripple-framework/commit/6a695d31))
  - **nuxt-app:** ✅  fix fixture path for listing performance test ([7c2b6a00](https://github.com/dpc-sdp/ripple-framework/commit/7c2b6a00))
  - **@dpc-sdp/ripple-tide-search:** Added tests for search listing pagination ([cf421467](https://github.com/dpc-sdp/ripple-framework/commit/cf421467))
  - **@dpc-sdp/ripple-tide-search:** Added tests for no results and seach erros ([f3ccad3b](https://github.com/dpc-sdp/ripple-framework/commit/f3ccad3b))
  - **@dpc-sdp/ripple-tide-search:** Fixed broken tests ([b1e73a78](https://github.com/dpc-sdp/ripple-framework/commit/b1e73a78))
  - **@dpc-sdp/ripple-tide-search:** Refactored some tests to isolate aggregations feature from grants ([4ff7d18c](https://github.com/dpc-sdp/ripple-framework/commit/4ff7d18c))
  - **@dpc-sdp/ripple-tide-search:** Stubbed search autocomplete requests ([22d54399](https://github.com/dpc-sdp/ripple-framework/commit/22d54399))
  - **@dpc-sdp/ripple-tide-search:** Added tests for term/s and raw filter types ([f6c02a2f](https://github.com/dpc-sdp/ripple-framework/commit/f6c02a2f))
  - **@dpc-sdp/ripple-tide-search:** Removed some noise from filters tests ([eed4c531](https://github.com/dpc-sdp/ripple-framework/commit/eed4c531))
  - **@dpc-sdp/ripple-tide-search:** Added clear filters tests and fixed behaviour ([2682c66b](https://github.com/dpc-sdp/ripple-framework/commit/2682c66b))
  - **@dpc-sdp/ripple-tide-search:** Added test for custom sort option ([1df99447](https://github.com/dpc-sdp/ripple-framework/commit/1df99447))
  - **@dpc-sdp/ripple-tide-search:** ✅  fix filter test for URL update ([7e441359](https://github.com/dpc-sdp/ripple-framework/commit/7e441359))
  - **@dpc-sdp/nuxt-ripple:** Fixed broken import in tests ([94bd9868](https://github.com/dpc-sdp/ripple-framework/commit/94bd9868))
  - **@dpc-sdp/ripple-ui-core:** Remove unused imports, add extra media gallery tests ([9f2c60eb](https://github.com/dpc-sdp/ripple-framework/commit/9f2c60eb))
  - **@dpc-sdp/ripple-tide-search:** Updated tests for grant listing page mock ([8f96fdc0](https://github.com/dpc-sdp/ripple-framework/commit/8f96fdc0))
  - **@dpc-sdp/ripple-tide-grant:** Fixed grant page cypress tests ([099fcddd](https://github.com/dpc-sdp/ripple-framework/commit/099fcddd))
  - **@dpc-sdp/ripple-ui-core:** Remove unused test ([9527e92a](https://github.com/dpc-sdp/ripple-framework/commit/9527e92a))
  - **nuxt-app:** Add basic language tests ([30fe7d52](https://github.com/dpc-sdp/ripple-framework/commit/30fe7d52))
  - **@dpc-sdp/ripple-tide-search:** Fixed aggregations request interfering with tests ([d98939e5](https://github.com/dpc-sdp/ripple-framework/commit/d98939e5))
  - **@dpc-sdp/ripple-ui-core:** ✅  adds tests for debounced input ([4473c852](https://github.com/dpc-sdp/ripple-framework/commit/4473c852))
  - **@dpc-sdp/ripple-tide-search:** Fixed search listing tests ([683c497a](https://github.com/dpc-sdp/ripple-framework/commit/683c497a))
  - **@dpc-sdp/ripple-tide-search:** Updated fixtures after search listing mapping refactor ([427495f0](https://github.com/dpc-sdp/ripple-framework/commit/427495f0))

### 🎨 Styles

  - **@dpc-sdp/nuxt-ripple:** Removed console log ([080badb5](https://github.com/dpc-sdp/ripple-framework/commit/080badb5))
  - **@dpc-sdp/ripple-tide-landing-page:** Removed outdated todo ([86a2d8c7](https://github.com/dpc-sdp/ripple-framework/commit/86a2d8c7))
  - **@dpc-sdp/ripple-tide-search:** Cleaned up console logs ([1566a585](https://github.com/dpc-sdp/ripple-framework/commit/1566a585))
  - **@dpc-sdp/ripple-tide-search:** Fixed linting and prop type warnings ([8402ab0c](https://github.com/dpc-sdp/ripple-framework/commit/8402ab0c))

### 🤖 CI

  - **nuxt-app:** ✅  add app search env var for search tests ([bd9adec6](https://github.com/dpc-sdp/ripple-framework/commit/bd9adec6))
  - Add cypress cloud record flag ([75ce90a1](https://github.com/dpc-sdp/ripple-framework/commit/75ce90a1))
  - Move cypress record flag to run step ([f20719ba](https://github.com/dpc-sdp/ripple-framework/commit/f20719ba))
  - 💚  switch to GitHub actions for tests ([9acd3072](https://github.com/dpc-sdp/ripple-framework/commit/9acd3072))
  - **@dpc-sdp/nuxt-ripple-analytics:** Test process check for ci ([9213f64b](https://github.com/dpc-sdp/ripple-framework/commit/9213f64b))
  - Fix Github release workflow steps ([900a6495](https://github.com/dpc-sdp/ripple-framework/commit/900a6495))
  - Fix trailing slash in registry ([79ab336f](https://github.com/dpc-sdp/ripple-framework/commit/79ab336f))
  - Fix missing trail in publish step ([53a4ef69](https://github.com/dpc-sdp/ripple-framework/commit/53a4ef69))
  - Remove circle ([ab0b860e](https://github.com/dpc-sdp/ripple-framework/commit/ab0b860e))
  - Remove build step ([c4442386](https://github.com/dpc-sdp/ripple-framework/commit/c4442386))
  - Set git creds ([919e3a26](https://github.com/dpc-sdp/ripple-framework/commit/919e3a26))
  - Changelog permissions ([139d3d00](https://github.com/dpc-sdp/ripple-framework/commit/139d3d00))
  - Update release commands ([8326d4d5](https://github.com/dpc-sdp/ripple-framework/commit/8326d4d5))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>
- SDP Deploy <sdp.devs@dpc.vic.gov.au>
- David Featherston <david.featherstone@dpc.vic.gov.au>
- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>
- Dylankelly <dylan.kelly@dpc.vic.gov.au>

## v2.0.0

[compare changes](https://github.com/dpc-sdp/ripple-framework/compare/v2.0.0-rc.1...v2.0.0)


### 🚀 Enhancements

  - **@dpc-sdp/nuxt-ripple-cli:** Required user to specify ripple version when scafolding sites/layers ([fde24a2d](https://github.com/dpc-sdp/ripple-framework/commit/fde24a2d))
  - **docs:** Added google analytics scripts to docs site ([e4063672](https://github.com/dpc-sdp/ripple-framework/commit/e4063672))

### 📖 Documentation

  - **docs:** Formatted focus state table ([6b8631dd](https://github.com/dpc-sdp/ripple-framework/commit/6b8631dd))
  - **docs:** Added dynamic component docs ([79d5da1d](https://github.com/dpc-sdp/ripple-framework/commit/79d5da1d))
  - **docs:** Added concepts page for dynamic components ([3c56d5d4](https://github.com/dpc-sdp/ripple-framework/commit/3c56d5d4))
  - Add image header for ripple framework ([08633ca9](https://github.com/dpc-sdp/ripple-framework/commit/08633ca9))
  - 📝  update project README.md ([d901d20c](https://github.com/dpc-sdp/ripple-framework/commit/d901d20c))
  - Add circle build status badge ([1b96c735](https://github.com/dpc-sdp/ripple-framework/commit/1b96c735))
  - **docs:** Update about page header ([94207ea9](https://github.com/dpc-sdp/ripple-framework/commit/94207ea9))
  - Add content types guide ([d2f1bb8d](https://github.com/dpc-sdp/ripple-framework/commit/d2f1bb8d))
  - **docs:** Fixed broken links when deployed ([89ab985c](https://github.com/dpc-sdp/ripple-framework/commit/89ab985c))
  - **@dpc-sdp/nuxt-ripple:** Update readme ([0a4c7dbb](https://github.com/dpc-sdp/ripple-framework/commit/0a4c7dbb))
  - **@dpc-sdp/nuxt-ripple-analytics:** Update readme ([bb6e8994](https://github.com/dpc-sdp/ripple-framework/commit/bb6e8994))
  - **@dpc-sdp/ripple-ui-core:** Tweaked alert story display ([3d5e3e2c](https://github.com/dpc-sdp/ripple-framework/commit/3d5e3e2c))
  - **docs:** Updated support link ([679fc966](https://github.com/dpc-sdp/ripple-framework/commit/679fc966))
  - **docs:** 📝  document framework theming ([c484e4e0](https://github.com/dpc-sdp/ripple-framework/commit/c484e4e0))
  - **docs:** 📝  update theming docs ([657cfba8](https://github.com/dpc-sdp/ripple-framework/commit/657cfba8))
  - **docs:** 📝  remove style dictionary mention ([3aaa3aeb](https://github.com/dpc-sdp/ripple-framework/commit/3aaa3aeb))
  - **docs:** 📝  update and enable framework docs ([c439a31e](https://github.com/dpc-sdp/ripple-framework/commit/c439a31e))
  - **docs:** 📝  add favicon for docs site ([cb15ae33](https://github.com/dpc-sdp/ripple-framework/commit/cb15ae33))
  - **docs:** Cleaned up modules section content and added core module listing ([d5a84ae5](https://github.com/dpc-sdp/ripple-framework/commit/d5a84ae5))
  - Minor content tweaks ([ada93f91](https://github.com/dpc-sdp/ripple-framework/commit/ada93f91))
  - **docs:** 📝  enable framework docs ([c87967fe](https://github.com/dpc-sdp/ripple-framework/commit/c87967fe))
  - **docs:** Fixed broken links in docs ([33f968a8](https://github.com/dpc-sdp/ripple-framework/commit/33f968a8))

### 📦 Build

  - 🔖  change pre alpha publish step ([e5904bea](https://github.com/dpc-sdp/ripple-framework/commit/e5904bea))

### 🏡 Chore

  - **release:** Disable version step ([a368de2d](https://github.com/dpc-sdp/ripple-framework/commit/a368de2d))
  - Update vite versions ([a1815094](https://github.com/dpc-sdp/ripple-framework/commit/a1815094))
  - Updated packages after pnpm audit ([1239d391](https://github.com/dpc-sdp/ripple-framework/commit/1239d391))
  - Replaced vite-content-plugin with vite-plugin-yaml ([28c42dde](https://github.com/dpc-sdp/ripple-framework/commit/28c42dde))
  - Updated unlighthouse packages ([ce7972f3](https://github.com/dpc-sdp/ripple-framework/commit/ce7972f3))
  - **release:** Update changelog commands ([514ec9cf](https://github.com/dpc-sdp/ripple-framework/commit/514ec9cf))
  - 🔖  release v2.0.0 ([24d9de0a](https://github.com/dpc-sdp/ripple-framework/commit/24d9de0a))

### ✅ Tests

  - **@dpc-sdp/ripple-ui-core:** Adding component tests ([030817a0](https://github.com/dpc-sdp/ripple-framework/commit/030817a0))
  - **@dpc-sdp/ripple-ui-core:** Remove rplEvent for now ([4d69b065](https://github.com/dpc-sdp/ripple-framework/commit/4d69b065))

### ❤️  Contributors

- Dylan Kelly <dylan.kelly@dpc.vic.gov.au>
- Jeffrey Dowdle <jeffrey.dowdle@dpc.vic.gov.au>
- David Featherston <david.featherstone@dpc.vic.gov.au>
- Jason Smith <jason.smith@dpc.vic.gov.au>
- Dylankelly <dylan.kelly@dpc.vic.gov.au>

