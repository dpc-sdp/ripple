# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.1.0-alpha.180](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.179...v2.1.0-alpha.180) (2023-06-01)

### Features

* upgraded nuxt and vue to latest versions ([dd27f86](https://github.com/dpc-sdp/ripple-framework/commit/dd27f8613d263b1a6337fbc9e253c78954fb6768))

# [2.1.0-alpha.175](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.174...v2.1.0-alpha.175) (2023-05-25)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** fixed integration tests failing because of logging ([4502f65](https://github.com/dpc-sdp/ripple-framework/commit/4502f656a2f143a27865f4afca31aa599cd818b8))

### Features

* **@dpc-sdp/ripple-tide-api:** connect logs to sumologic ([a3a8788](https://github.com/dpc-sdp/ripple-framework/commit/a3a878857ceb877b31dedaced2f0627eb63fd1a5))

# [2.1.0-alpha.169](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.168...v2.1.0-alpha.169) (2023-05-19)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** add 'flag' to support single and paginated endpoints ([88b2b2e](https://github.com/dpc-sdp/ripple-framework/commit/88b2b2e18ddc72f6eb0fd7f68cab5a34493e3e16))
* **@dpc-sdp/ripple-tide-api:** add enabled check for paginated menus ([a8bfca9](https://github.com/dpc-sdp/ripple-framework/commit/a8bfca956aedef6a229bc108a4c6ecca2b8cbe8f))

### Features

* **@dpc-sdp/ripple-tide-api:** add new menu filters ([4a6f403](https://github.com/dpc-sdp/ripple-framework/commit/4a6f403638f573f73b50d484da2fef7c43ebdbd9))

# [2.1.0-alpha.165](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.164...v2.1.0-alpha.165) (2023-05-17)

### Bug Fixes

* **@dpc-sdp/ripple-ui-core:** added hidePromoCardStripe feature flag as many sites want no stripe ([41e206f](https://github.com/dpc-sdp/ripple-framework/commit/41e206fe2489dff1bb543f6545fef5e46b08cdc6))

# [2.1.0-alpha.164](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.163...v2.1.0-alpha.164) (2023-05-15)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** fixed old env var being used ([60fda1b](https://github.com/dpc-sdp/ripple-framework/commit/60fda1bfa3b4d8072186e2283156209918877d09))

# [2.1.0-alpha.163](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.162...v2.1.0-alpha.163) (2023-05-15)

### Bug Fixes

* **@dpc-sdp/ripple-tide-preview:** only send auth header for preview links ([39604e3](https://github.com/dpc-sdp/ripple-framework/commit/39604e3456474b1da3521746618bdaa852157038))

### Features

* **@dpc-sdp/nuxt-ripple:** wip for tide preview links ([df593b4](https://github.com/dpc-sdp/ripple-framework/commit/df593b4957ccca2f329948286776900e27218408))
* **@dpc-sdp/ripple-tide-preview:** store signed oauth state and validate it ([434ea12](https://github.com/dpc-sdp/ripple-framework/commit/434ea122bfcf6ca6101067e961c5d2dc86c42b66))

# [2.1.0-alpha.159](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.158...v2.1.0-alpha.159) (2023-05-11)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** fixed callout markup and added neutral callouts ([52c8016](https://github.com/dpc-sdp/ripple-framework/commit/52c8016b05929b6b73ac723198ca93fe54c0507b))

# [2.1.0-alpha.158](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.157...v2.1.0-alpha.158) (2023-05-10)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** handled case where image url doesn't exist ([20d675f](https://github.com/dpc-sdp/ripple-framework/commit/20d675f598d1905ea36052d8138e2641856a59cd))

# [2.1.0-alpha.157](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.156...v2.1.0-alpha.157) (2023-05-08)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.155](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.154...v2.1.0-alpha.155) (2023-05-08)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** remap all image url to hit tide directly ([b5a1c32](https://github.com/dpc-sdp/ripple-framework/commit/b5a1c32feb4e29d14d91013d09fdd8e82d91ca8d))

# [2.1.0-alpha.154](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.153...v2.1.0-alpha.154) (2023-05-05)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** fixed circular deps breaking publish step ([8b4ef69](https://github.com/dpc-sdp/ripple-framework/commit/8b4ef69d2b63e88afc60f348743345c66467ccbf))

# [2.1.0-alpha.153](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.152...v2.1.0-alpha.153) (2023-05-05)

### Features

* **@dpc-sdp/ripple-tide-api:** add epochToDate function ([fa5be4d](https://github.com/dpc-sdp/ripple-framework/commit/fa5be4d2d0684b60ee3526b71d198efa6825e174))
* **@dpc-sdp/ripple-tide-api:** add updated date to documents ([75cfefe](https://github.com/dpc-sdp/ripple-framework/commit/75cfefe139a04843d82edc6136a91f76330e3e72))
* **@dpc-sdp/ripple-tide-api:** move epochToDate so build doesn't fail ([67bcbda](https://github.com/dpc-sdp/ripple-framework/commit/67bcbdaa3375ae9eac01c870a9f30a260910c904))

# [2.1.0-alpha.152](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.151...v2.1.0-alpha.152) (2023-05-04)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** :bug: use selected image if there are multiple ([bfafb43](https://github.com/dpc-sdp/ripple-framework/commit/bfafb4371aa387d83bc6d768cdbf982c24328f1c))

# [2.1.0-alpha.142](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.141...v2.1.0-alpha.142) (2023-04-17)

### Features

* **@dpc-sdp/ripple-tide-api:** add draft alert ([792990e](https://github.com/dpc-sdp/ripple-framework/commit/792990e3d11c2ddf71fc95efe45adddfc62877ff))
* **@dpc-sdp/ripple-tide-api:** add vid from ripple 1 ([fe75040](https://github.com/dpc-sdp/ripple-framework/commit/fe75040433f2ef7524a68c4c30e2d18cabb3b1f4))
* **@dpc-sdp/ripple-tide-api:** enable preview urls ([23e753b](https://github.com/dpc-sdp/ripple-framework/commit/23e753bc18ae091ef5c2916068d10f38639b9c96))

# [2.1.0-alpha.140](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.139...v2.1.0-alpha.140) (2023-04-14)

### Bug Fixes

* **@dpc-sdp/ripple-ui-core:** print style feedback and additions ([823cc42](https://github.com/dpc-sdp/ripple-framework/commit/823cc42050ed621a3bf1632e44671a778460918e))

# [2.1.0-alpha.135](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.134...v2.1.0-alpha.135) (2023-04-05)

### Bug Fixes

* **@dpc-sdp/ripple-tide-landing-page:** use highlight for promo cards when no image is supplied ([140210a](https://github.com/dpc-sdp/ripple-framework/commit/140210a9e60b177fe17d1aee24fb5c0254bff328))

# [2.1.0-alpha.127](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.126...v2.1.0-alpha.127) (2023-03-31)

### Bug Fixes

* update packageManager to match engines requirement ([8f09a1e](https://github.com/dpc-sdp/ripple-framework/commit/8f09a1ed63d4e8ccabf589f2446c305a85ad6ce9))

# [2.1.0-alpha.126](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.125...v2.1.0-alpha.126) (2023-03-30)

### Features

* **@dpc-sdp/ripple-tide-publication:** setup publication print all page view and apis ([3a46f98](https://github.com/dpc-sdp/ripple-framework/commit/3a46f98cda072c7141f3cf19092a0a545ac5249e))

# [2.1.0-alpha.124](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.123...v2.1.0-alpha.124) (2023-03-29)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.122](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.121...v2.1.0-alpha.122) (2023-03-24)

### Features

* **nuxt-ripple:** :sparkles: implement page head and seo meta ([52afc09](https://github.com/dpc-sdp/ripple-framework/commit/52afc0915ec9a5e789d51c1e8325cd8c0a164ef4))

# [2.1.0-alpha.116](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.115...v2.1.0-alpha.116) (2023-03-17)

### Bug Fixes

* **@dpc-sdp/nuxt-ripple:** fixed content rating still showing when turned off in cms ([8a5c595](https://github.com/dpc-sdp/ripple-framework/commit/8a5c595bf8700f2c8d8415207c75036a8c76e533))

# [2.1.0-alpha.112](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.111...v2.1.0-alpha.112) (2023-03-15)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** update doc plugin and testcontent ([165ee98](https://github.com/dpc-sdp/ripple-framework/commit/165ee98d206f063afd132cd81cc5e1b30e8360ca))
* **@dpc-sdp/ripple-ui-core:** changed 'view transcript' to open in same window ([d208b2a](https://github.com/dpc-sdp/ripple-framework/commit/d208b2a345215f56d5a9c9fdaddc05e36bd040e2))

# [2.1.0-alpha.111](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.110...v2.1.0-alpha.111) (2023-03-15)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** add alternate class to callout plugin ([29a9467](https://github.com/dpc-sdp/ripple-framework/commit/29a94673b7eb6643b8bbadd81d150ad5fd2cf234))

# [2.1.0-alpha.109](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.108...v2.1.0-alpha.109) (2023-03-13)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.107](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.106...v2.1.0-alpha.107) (2023-03-10)

### Features

* **@dpc-sdp/ripple-tide-api:** add embedded video markup plugin ([1c69913](https://github.com/dpc-sdp/ripple-framework/commit/1c69913b821210b4008bea85bad93a73afb6801c))

# [2.1.0-alpha.99](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.98...v2.1.0-alpha.99) (2023-03-07)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** fixed dynamic includes getting added accumulatively ([6f90092](https://github.com/dpc-sdp/ripple-framework/commit/6f90092b3008755d45c7d181231a78bf05cdb285))

# [2.1.0-alpha.98](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.97...v2.1.0-alpha.98) (2023-03-07)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.97](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.96...v2.1.0-alpha.97) (2023-03-07)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** fixed dynamic component includes not being included ([7a3df18](https://github.com/dpc-sdp/ripple-framework/commit/7a3df18cd6efbfbd75b69cafc2e059aec880951a))

# [2.1.0-alpha.96](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.95...v2.1.0-alpha.96) (2023-03-06)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.95](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.94...v2.1.0-alpha.95) (2023-03-02)

### Features

* **@dpc-sdp/ripple-tide-api:** cast strings to real booleans ([5ffa75d](https://github.com/dpc-sdp/ripple-framework/commit/5ffa75d3de7dff1db0b3586547d05799b643b379))
* **@dpc-sdp/ripple-ui-core:** add document print styles, and link markup plugin, fix modal test ([055be12](https://github.com/dpc-sdp/ripple-framework/commit/055be12044121506573d94aa1c16b387e6a4b814))
* **@dpc-sdp/ripple-ui-core:** forgoing design for simpler print links using href ([09da1af](https://github.com/dpc-sdp/ripple-framework/commit/09da1afaa7810e6c9aa36243dc8e13390b76d12c))

# [2.1.0-alpha.90](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.89...v2.1.0-alpha.90) (2023-02-22)

### Features

* **nuxt-ripple:** add feature flag for topics and tags and deepmerge for options ([b31549a](https://github.com/dpc-sdp/ripple-framework/commit/b31549ada18ae1a38c7b4cad68e9879e6c140c83))

# [2.1.0-alpha.87](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.86...v2.1.0-alpha.87) (2023-02-20)

### Bug Fixes

* :bug: unify dateFormat util, move news call to sfc ([97f8d65](https://github.com/dpc-sdp/ripple-framework/commit/97f8d6572e0eeb0e107f9bc887192f4028601bc9))
* **@dpc-sdp/ripple-ui-core:** update sorting, add featureFlag for search connector ([4938b78](https://github.com/dpc-sdp/ripple-framework/commit/4938b7865544ee78db50526872b5d60de61c55d6))

# [2.1.0-alpha.81](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.80...v2.1.0-alpha.81) (2023-02-15)

### Features

* **@dpc-sdp/ripple-tide-api:** adding button content markup plugin ([754df11](https://github.com/dpc-sdp/ripple-framework/commit/754df11f1d57b4e37752c06f2fbeb6c125c5ffab))

# [2.1.0-alpha.76](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.75...v2.1.0-alpha.76) (2023-02-08)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.74](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.73...v2.1.0-alpha.74) (2023-02-07)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** checked that field_node_site exists before finding site section ([06343ef](https://github.com/dpc-sdp/ripple-framework/commit/06343ef02c6e991830d0f952981e16b62f3357c0))

# [2.1.0-alpha.73](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.72...v2.1.0-alpha.73) (2023-02-05)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.69](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.68...v2.1.0-alpha.69) (2023-01-29)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.63](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.62...v2.1.0-alpha.63) (2023-01-24)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.59](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.58...v2.1.0-alpha.59) (2023-01-10)

### Bug Fixes

* remove nuxt.js export from ripple-tide-api ([ec7934f](https://github.com/dpc-sdp/ripple-framework/commit/ec7934f8a3020cf5013c2519df0a57253766ff3f))

# [2.1.0-alpha.57](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.56...v2.1.0-alpha.57) (2023-01-09)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.56](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.55...v2.1.0-alpha.56) (2023-01-06)

### Bug Fixes

* fix package versions ([02536db](https://github.com/dpc-sdp/ripple-framework/commit/02536dbfba12aeb7e88f40ef6fc3efeac714d969))

### Features

* **@dpc-sdp/ripple-tide-api:** :sparkles: give fallback default value of undefined ([d70e298](https://github.com/dpc-sdp/ripple-framework/commit/d70e2986ef5208d9bc7d6b91fcded6166f9a1e7d))

# [2.1.0-alpha.52](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.51...v2.1.0-alpha.52) (2022-12-22)

### Features

* :sparkles: add neutral theme for header via feature flag ([dff7865](https://github.com/dpc-sdp/ripple-framework/commit/dff786541890ff8cfee0670b56f6f8ef7e289825))
* **@dpc-sdp/ripple-tide-api:** :sparkles: adds site feature flags and sets footer theme variant ([05f8cb0](https://github.com/dpc-sdp/ripple-framework/commit/05f8cb03ae892960a427afa2c68f21b9a18c0ddc))
* **@dpc-sdp/ripple-ui-core:** add neutral button theme ([94fcf74](https://github.com/dpc-sdp/ripple-framework/commit/94fcf742778d06f05dc05b694e608752e2d5c4e5))

# [2.1.0-alpha.50](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.49...v2.1.0-alpha.50) (2022-12-21)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.37](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.36...v2.1.0-alpha.37) (2022-12-14)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** :truck: renamed module collection ([ebbeabe](https://github.com/dpc-sdp/ripple-framework/commit/ebbeabe15bbb4cb2a5d5d9a90b3967d5b3968dbc))

### Performance Improvements

* :zap: add nuxt modules via ripple-tide-api ([7ba3a80](https://github.com/dpc-sdp/ripple-framework/commit/7ba3a80685c3b037f0eef22b3fd116c3edc1119e))

# [2.1.0-alpha.36](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.35...v2.1.0-alpha.36) (2022-12-14)

### Features

* **@dpc-sdp/ripple-tide-api:** :sparkles: add blockquote, document to markup ([6696ea3](https://github.com/dpc-sdp/ripple-framework/commit/6696ea3b4db6a95b9e4ee50940cf338edf79ce77))

# [2.1.0-alpha.35](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.34...v2.1.0-alpha.35) (2022-12-14)

### Features

* **@dpc-sdp/ripple-tide-api:** moved webform proxy config to live in api module ([f0c278a](https://github.com/dpc-sdp/ripple-framework/commit/f0c278ad4f9257bc39cdf6fb826e5200c5c35b39))
* **@dpc-sdp/ripple-tide-api:** updated proxy to able to be used for other purposes ([b1809ba](https://github.com/dpc-sdp/ripple-framework/commit/b1809ba0d51d8b292d7a50525b982dd01a206018))
* **@dpc-sdp/ripple-tide-api:** wip for form submit proxy ([91817a2](https://github.com/dpc-sdp/ripple-framework/commit/91817a2b5752d579b67f1899f55542cec13a02a5))

# [2.1.0-alpha.33](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.32...v2.1.0-alpha.33) (2022-12-13)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** fixed issue where alerts would get cached incorrectly ([2f85735](https://github.com/dpc-sdp/ripple-framework/commit/2f85735c4336eb1e4db1125c8b60247078fbfdea))

# [2.1.0-alpha.31](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.30...v2.1.0-alpha.31) (2022-12-09)

### Features

* **@dpc-sdp/ripple-ui-core:** check for topics, use non concatenated format for css, update spacing values, add main container wrapper, use hasSide in aside check ([4724ae2](https://github.com/dpc-sdp/ripple-framework/commit/4724ae275df5c303f6ae5ab37f71617bdd1dd138))

# [2.1.0-alpha.28](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.27...v2.1.0-alpha.28) (2022-12-07)

### Performance Improvements

* **@dpc-sdp/ripple-tide-api:** :zap: supress warning on empty items ([19e9430](https://github.com/dpc-sdp/ripple-framework/commit/19e9430e83eb6e2cb18ddd70eeb77350327443c6))

# [2.1.0-alpha.27](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.26...v2.1.0-alpha.27) (2022-12-06)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** fixed failing build ([3f44d8c](https://github.com/dpc-sdp/ripple-framework/commit/3f44d8c98f1ce448022f3bd782f9291e5abf5010))

### Features

* **@dpc-sdp/ripple-tide-api:** add margin to topic tags (same margin as updated date) ([fd1d16e](https://github.com/dpc-sdp/ripple-framework/commit/fd1d16e2fc2614163a9a691a50204af3a114cb52))
* **@dpc-sdp/ripple-tide-landing-page:** added what's next sidebar component ([c7a966d](https://github.com/dpc-sdp/ripple-framework/commit/c7a966df8214069099715855770355a9a1a541ef))
* **@dpc-sdp/ripple-ui-core:** wip wiring up card carousel ([78afe80](https://github.com/dpc-sdp/ripple-framework/commit/78afe807bed9b8012257bc55dadb43809be07c9f))

# [2.1.0-alpha.26](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.25...v2.1.0-alpha.26) (2022-12-06)

### Features

* **@dpc-sdp/ripple-tide-event:** :sparkles: add event content type ([e079cd5](https://github.com/dpc-sdp/ripple-framework/commit/e079cd5580274f57ec9d082c81a312e349048531))

# [2.1.0-alpha.24](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.23...v2.1.0-alpha.24) (2022-12-02)

### Features

* **@dpc-sdp/ripple-ui-forms:** added mapping for 'webform-term-select' ([a6efdb2](https://github.com/dpc-sdp/ripple-framework/commit/a6efdb281c387bc7deb9b0c0336a1a1d1f459b1f))

# [2.1.0-alpha.20](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.19...v2.1.0-alpha.20) (2022-11-29)

### Bug Fixes

* fixed broken build ([0e94fb6](https://github.com/dpc-sdp/ripple-framework/commit/0e94fb6121dd5f9d6519bc41096b72b95a817b36))

### Features

* **@dpc-sdp/ripple-tide-api:** added site alerts mapping and ui ([fbdbdf2](https://github.com/dpc-sdp/ripple-framework/commit/fbdbdf24cdc30a2216d6b387f3305a0c75e46eca))
* ensure all content types used the 'hasbreadcrumbs' prop for header ([52008a8](https://github.com/dpc-sdp/ripple-framework/commit/52008a8a7d478505ed6d6d0390f80e4be4151498))

# [2.1.0-alpha.19](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.18...v2.1.0-alpha.19) (2022-11-28)

### Features

* **@dpc-sdp/ripple-tide-api:** :sparkles: add publication index api, mapping ([8d393e7](https://github.com/dpc-sdp/ripple-framework/commit/8d393e78dad09bb617e0979f8efd9620ee79bcbe))

# [2.1.0-alpha.18](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.17...v2.1.0-alpha.18) (2022-11-28)

### Features

* **@dpc-sdp/ripple-tide-api:** adding error pages ([f914e92](https://github.com/dpc-sdp/ripple-framework/commit/f914e926955ddb0e7e4d48e4a62e24da893c7c44))
* **@dpc-sdp/ripple-tide-media:** add // [@ts-ignore](https://github.com/ts-ignore) ([2d65248](https://github.com/dpc-sdp/ripple-framework/commit/2d6524806549cdec435915fe7ae6cd5f40b536d5))
* **@dpc-sdp/ripple-tide-media:** add basic tests ([47e315c](https://github.com/dpc-sdp/ripple-framework/commit/47e315c00e3e496cda80b5afe7761c36ac4457e8))

### Reverts

* **@dpc-sdp/ripple-tide-api:** restore 500 test ([8f9f027](https://github.com/dpc-sdp/ripple-framework/commit/8f9f027aa13b1e6db0f1cf06cec096033f1bd6eb))

# [2.1.0-alpha.13](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.12...v2.1.0-alpha.13) (2022-11-21)

### Bug Fixes

* fixed up tests and news template ([7a95029](https://github.com/dpc-sdp/ripple-framework/commit/7a950297a3447c5097be8a024ee776f1c060954a))

### Features

* **@dpc-sdp/ripple-tide-api:** added mapping and ui for last updated and topic tags ([4923a69](https://github.com/dpc-sdp/ripple-framework/commit/4923a693dd182fa5ca50b245c0432509d996452e))
* **@dpc-sdp/ripple-tide-api:** first pass at global element refactor ([16199c6](https://github.com/dpc-sdp/ripple-framework/commit/16199c686f2d80e0e8533309ffdf58ad6e49e80c))
* **@dpc-sdp/ripple-tide-api:** hooked up breadcrumbs ([47b8b2a](https://github.com/dpc-sdp/ripple-framework/commit/47b8b2aff4bb58092a8fe9cda934ed877bdc9b32))
* **@dpc-sdp/ripple-tide-api:** mapped primary nav, footer and acknowledgement ([92684c0](https://github.com/dpc-sdp/ripple-framework/commit/92684c01b2c4393419853457cbddba266f4c77c6))
* added an example page to demonstrate shared layout ([ef93158](https://github.com/dpc-sdp/ripple-framework/commit/ef93158d5bd03b3647770f3dbf16ae271f89892c))

# [2.1.0-alpha.12](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.11...v2.1.0-alpha.12) (2022-11-18)

### Features

* **@dpc-sdp/ripple-ui-core:** adding news content type ([f809df3](https://github.com/dpc-sdp/ripple-framework/commit/f809df3820118688c955a0d386ee2ea32add18e6))

# [2.1.0-alpha.11](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.10...v2.1.0-alpha.11) (2022-11-16)

### Bug Fixes

* **@dpc-sdp/ripple-tide-landing-page:** cleanup console warnings and fix tests ([413f222](https://github.com/dpc-sdp/ripple-framework/commit/413f222be55a35915732772dbf4d1ccf8556f74e))

### Features

* **@dpc-sdp/ripple-tide-landing-page:** added in page navigation to landing page ([b7e7568](https://github.com/dpc-sdp/ripple-framework/commit/b7e75688e071ef060595a7a1061d0b9e44d0be4a))

# [2.1.0-alpha.10](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.9...v2.1.0-alpha.10) (2022-11-16)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.9](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.8...v2.1.0-alpha.9) (2022-11-14)

### Bug Fixes

* **@dpc-sdp/ripple-ui-core:** fixed footer and section nav by changing primary nav to be consistant ([f49e414](https://github.com/dpc-sdp/ripple-framework/commit/f49e4142382a2e31ed92ca142dc0a15e32582695))

# [2.1.0-alpha.7](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.6...v2.1.0-alpha.7) (2022-11-09)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.1.0-alpha.4](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.3...v2.1.0-alpha.4) (2022-11-09)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** add back alerts ([a3997da](https://github.com/dpc-sdp/ripple-framework/commit/a3997dae4f8863579f82bed1fcf959623e43172f))

### Features

* **@dpc-sdp/ripple-tide-api:** wire up site menu ([d20d197](https://github.com/dpc-sdp/ripple-framework/commit/d20d1977aa4cb5c7d8f03e4b7e79515dc33f0cb6))

# [2.1.0-alpha.3](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.2...v2.1.0-alpha.3) (2022-11-09)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** remove stripping of backend url from images ([4b18930](https://github.com/dpc-sdp/ripple-framework/commit/4b189307f7ac019fff2a1bfefb425e1134c764c1))

# [2.1.0-alpha.2](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.1...v2.1.0-alpha.2) (2022-11-09)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** fixed merge issue removing some sidebar components ([540a6a7](https://github.com/dpc-sdp/ripple-framework/commit/540a6a76b0af456a1dd01e598ba444e5d8f2d98e))

# [2.1.0-alpha.1](https://github.com/dpc-sdp/ripple-framework/compare/v2.1.0-alpha.0...v2.1.0-alpha.1) (2022-11-08)

### Features

* **@dpc-sdp/ripple-tide-landing-page:** added support for card grid layout on landing page ([5f2896e](https://github.com/dpc-sdp/ripple-framework/commit/5f2896e2b5062c26c36b6070c71a29658af4598f))

# 2.1.0-alpha.0 (2022-11-08)

### Bug Fixes

* **@dpc-sdp/ripple-tide-api:** :pencil2: should be || ([838f0d2](https://github.com/dpc-sdp/ripple-framework/commit/838f0d22c635abfcc18577cd3ada2965c2291237))
* **@dpc-sdp/ripple-tide-api:** fixed logging imports ([89b7fe8](https://github.com/dpc-sdp/ripple-framework/commit/89b7fe8d95ec73aed62828b32bf98a36c50b422d))
* **@dpc-sdp/ripple-tide-api:** fixed sidebar crashing grants template ([164189f](https://github.com/dpc-sdp/ripple-framework/commit/164189f72dd2bd8d0167d3453a01604ea73d9a19))
* **@dpc-sdp/ripple-ui-core:** fixed hydration mismatch issue in footer ([a0dd662](https://github.com/dpc-sdp/ripple-framework/commit/a0dd662211ecacc5e2c7577bb08b0a5d1db7b545))

### Features

* :sparkles: add grant content type ([9e3a525](https://github.com/dpc-sdp/ripple-framework/commit/9e3a525e310686b15d57ac31c4966ab96d1186b8))
* **@dpc-sdp/ripple-tide-api:** :art: adds dynamic theme functionality ([876b291](https://github.com/dpc-sdp/ripple-framework/commit/876b291222db2cd90a567acd1d6a3e6433d59976))
* **@dpc-sdp/ripple-tide-api:** :sparkles: migrate Ripple Tide API mappings for event content type ([b602f15](https://github.com/dpc-sdp/ripple-framework/commit/b602f1585855fd6052dbcf1c52cbb3fa6ef5b499))
* **@dpc-sdp/ripple-tide-api:** :sparkles: theme values are able to be set from site data in Tide ([4684781](https://github.com/dpc-sdp/ripple-framework/commit/4684781826a238998993cda51718d7a69e2d9e96))
* **@dpc-sdp/ripple-tide-api:** add Tide Page component and useTidePage composables ([914d593](https://github.com/dpc-sdp/ripple-framework/commit/914d59348834cad03b58a584aeec325eca061b48))
* **@dpc-sdp/ripple-tide-api:** added above and below sidebar slots to templates ([bf20f7a](https://github.com/dpc-sdp/ripple-framework/commit/bf20f7ad2a25a30a51ce3456ce3742b027bf0c8f))
* **@dpc-sdp/ripple-tide-api:** added related links sidebar mapping ([b1ae772](https://github.com/dpc-sdp/ripple-framework/commit/b1ae772f32716ce4b9da21d85e671091492517ab))
* **@dpc-sdp/ripple-tide-api:** added sidebar contact us component with fixture ([66d00ee](https://github.com/dpc-sdp/ripple-framework/commit/66d00eeff1927f3357ecd5a1111594e851360f36))
* **@dpc-sdp/ripple-tide-api:** added site section navigation to sidebar ([51e19cb](https://github.com/dpc-sdp/ripple-framework/commit/51e19cb4d04c321382a12447d8e68c763adb4951))
* **@dpc-sdp/ripple-tide-api:** added social share sidebar mapping ([3dcc1b6](https://github.com/dpc-sdp/ripple-framework/commit/3dcc1b6f1bc41c849cdb8cb6d5e6e7c9ea8b2119))
* **@dpc-sdp/ripple-tide-api:** added tide mapping for sidebar contact us ([1752eb8](https://github.com/dpc-sdp/ripple-framework/commit/1752eb8c132431120d8cee537637df63608ff6f9))
* **@dpc-sdp/ripple-tide-api:** improved error logging and error response from api ([4f157b0](https://github.com/dpc-sdp/ripple-framework/commit/4f157b058408e835d60dc12db49469d5af19a41b))
* **@dpc-sdp/ripple-tide-api:** logging cleanup ([c3e20b4](https://github.com/dpc-sdp/ripple-framework/commit/c3e20b408e3e3bef39a1aff7336970ef2bda35b9))
* **@dpc-sdp/ripple-tide-api:** made the active path highlighting work for site section nav ([145f284](https://github.com/dpc-sdp/ripple-framework/commit/145f28485bdf88fef3d39516c30517c7b1c1f6a8))
* **@dpc-sdp/ripple-tide-api:** migrate ripple-tide-api from ripple 1.x ([5bf0dd2](https://github.com/dpc-sdp/ripple-framework/commit/5bf0dd2c4ce3a405cc2b84b4eee8eddeddd6802f))
* **@dpc-sdp/ripple-tide-api:** setup winston logger ([4cb146c](https://github.com/dpc-sdp/ripple-framework/commit/4cb146c10fecd5fc4dfb03a842daae2d0373b12e))
* **@dpc-sdp/ripple-tide-api:** updated ordering of sidebar components to match designs ([cc7d480](https://github.com/dpc-sdp/ripple-framework/commit/cc7d4806fbb15f017932ac1a5bb4da548faf8e12))
* **@dpc-sdp/ripple-tide-landing-page:** :sparkles: adds landing page content type components ([4396276](https://github.com/dpc-sdp/ripple-framework/commit/43962765528ee23ca904ae5c3f2d07180c1b853c))
* **@dpc-sdp/ripple-tide-landing-page:** added first pass at header components, banners and headers ([a64a85b](https://github.com/dpc-sdp/ripple-framework/commit/a64a85b956022abbdb5e9e066ed1b066c233f5dd))
* **@dpc-sdp/ripple-tide-landing-page:** added first pass at landing page components ([8c19a86](https://github.com/dpc-sdp/ripple-framework/commit/8c19a86e8fa75f354cc02d6fe643b89f4cf6a293))
* **@dpc-sdp/ripple-tide-landing-page:** added time page component mapping ([152bcee](https://github.com/dpc-sdp/ripple-framework/commit/152bcee7e1313b16e4b3389da16b5e757237075b))
* **@dpc-sdp/ripple-tide-media:** make 'submodules' top level ([34bda44](https://github.com/dpc-sdp/ripple-framework/commit/34bda449e3b7a73ccda04716518912942e0130d4))
* **@dpc-sdp/ripple-tide-media:** use addComponent functions, remove header summary text ([c699c30](https://github.com/dpc-sdp/ripple-framework/commit/c699c303c0ade85419310f8aded40faee2d85705))
* **@dpc-sdp/ripple-tide-media:** wip adding media package ([0a43097](https://github.com/dpc-sdp/ripple-framework/commit/0a4309716875ee723541866604fc101ea8845c29))
* **@dpc-sdp/ripple-ui-core:** :sparkles: add page layout for nuxt apps and corresponding story ([41c04f4](https://github.com/dpc-sdp/ripple-framework/commit/41c04f4749d031112892f9c97c8e36ef5c9c37f3))
* **@dpc-sdp/ripple-ui-core:** :sparkles: add rpl-content component ([a55be08](https://github.com/dpc-sdp/ripple-framework/commit/a55be087da74f1c78540f5c0c33e12744312abe5))
* **@dpc-sdp/ripple-ui-core:** removed unused styles from tide-page ([c9c965c](https://github.com/dpc-sdp/ripple-framework/commit/c9c965c7495effc2ce6b94cd541746ea60b069e0))

## [2.0.1-alpha.4](https://github.com/dpc-sdp/ripple-framework/compare/v2.0.1-alpha.3...v2.0.1-alpha.4) (2022-11-06)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

## [2.0.1-alpha.3](https://github.com/dpc-sdp/ripple-framework/compare/v2.0.1-alpha.2...v2.0.1-alpha.3) (2022-11-04)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

## [2.0.1-alpha.2](https://github.com/dpc-sdp/ripple-framework/compare/v2.0.1-alpha.1...v2.0.1-alpha.2) (2022-11-04)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

## [2.0.1-alpha.1](https://github.com/dpc-sdp/ripple-framework/compare/v2.0.1-alpha.0...v2.0.1-alpha.1) (2022-11-04)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

## 2.0.1-alpha.0 (2022-11-04)

### Bug Fixes

- **@dpc-sdp/ripple-tide-api:** :pencil2: should be || ([838f0d2](https://github.com/dpc-sdp/ripple-framework/commit/838f0d22c635abfcc18577cd3ada2965c2291237))
- **@dpc-sdp/ripple-tide-api:** fixed logging imports ([89b7fe8](https://github.com/dpc-sdp/ripple-framework/commit/89b7fe8d95ec73aed62828b32bf98a36c50b422d))
- **@dpc-sdp/ripple-tide-api:** fixed sidebar crashing grants template ([164189f](https://github.com/dpc-sdp/ripple-framework/commit/164189f72dd2bd8d0167d3453a01604ea73d9a19))

### Features

- :sparkles: add grant content type ([9e3a525](https://github.com/dpc-sdp/ripple-framework/commit/9e3a525e310686b15d57ac31c4966ab96d1186b8))
- **@dpc-sdp/ripple-tide-api:** :art: adds dynamic theme functionality ([876b291](https://github.com/dpc-sdp/ripple-framework/commit/876b291222db2cd90a567acd1d6a3e6433d59976))
- **@dpc-sdp/ripple-tide-api:** :sparkles: migrate Ripple Tide API mappings for event content type ([b602f15](https://github.com/dpc-sdp/ripple-framework/commit/b602f1585855fd6052dbcf1c52cbb3fa6ef5b499))
- **@dpc-sdp/ripple-tide-api:** :sparkles: theme values are able to be set from site data in Tide ([4684781](https://github.com/dpc-sdp/ripple-framework/commit/4684781826a238998993cda51718d7a69e2d9e96))
- **@dpc-sdp/ripple-tide-api:** add Tide Page component and useTidePage composables ([914d593](https://github.com/dpc-sdp/ripple-framework/commit/914d59348834cad03b58a584aeec325eca061b48))
- **@dpc-sdp/ripple-tide-api:** added above and below sidebar slots to templates ([bf20f7a](https://github.com/dpc-sdp/ripple-framework/commit/bf20f7ad2a25a30a51ce3456ce3742b027bf0c8f))
- **@dpc-sdp/ripple-tide-api:** added related links sidebar mapping ([b1ae772](https://github.com/dpc-sdp/ripple-framework/commit/b1ae772f32716ce4b9da21d85e671091492517ab))
- **@dpc-sdp/ripple-tide-api:** added sidebar contact us component with fixture ([66d00ee](https://github.com/dpc-sdp/ripple-framework/commit/66d00eeff1927f3357ecd5a1111594e851360f36))
- **@dpc-sdp/ripple-tide-api:** added site section navigation to sidebar ([51e19cb](https://github.com/dpc-sdp/ripple-framework/commit/51e19cb4d04c321382a12447d8e68c763adb4951))
- **@dpc-sdp/ripple-tide-api:** added social share sidebar mapping ([3dcc1b6](https://github.com/dpc-sdp/ripple-framework/commit/3dcc1b6f1bc41c849cdb8cb6d5e6e7c9ea8b2119))
- **@dpc-sdp/ripple-tide-api:** added tide mapping for sidebar contact us ([1752eb8](https://github.com/dpc-sdp/ripple-framework/commit/1752eb8c132431120d8cee537637df63608ff6f9))
- **@dpc-sdp/ripple-tide-api:** improved error logging and error response from api ([4f157b0](https://github.com/dpc-sdp/ripple-framework/commit/4f157b058408e835d60dc12db49469d5af19a41b))
- **@dpc-sdp/ripple-tide-api:** logging cleanup ([c3e20b4](https://github.com/dpc-sdp/ripple-framework/commit/c3e20b408e3e3bef39a1aff7336970ef2bda35b9))
- **@dpc-sdp/ripple-tide-api:** made the active path highlighting work for site section nav ([145f284](https://github.com/dpc-sdp/ripple-framework/commit/145f28485bdf88fef3d39516c30517c7b1c1f6a8))
- **@dpc-sdp/ripple-tide-api:** migrate ripple-tide-api from ripple 1.x ([5bf0dd2](https://github.com/dpc-sdp/ripple-framework/commit/5bf0dd2c4ce3a405cc2b84b4eee8eddeddd6802f))
- **@dpc-sdp/ripple-tide-api:** setup winston logger ([4cb146c](https://github.com/dpc-sdp/ripple-framework/commit/4cb146c10fecd5fc4dfb03a842daae2d0373b12e))
- **@dpc-sdp/ripple-tide-api:** updated ordering of sidebar components to match designs ([cc7d480](https://github.com/dpc-sdp/ripple-framework/commit/cc7d4806fbb15f017932ac1a5bb4da548faf8e12))
- **@dpc-sdp/ripple-tide-landing-page:** :sparkles: adds landing page content type components ([4396276](https://github.com/dpc-sdp/ripple-framework/commit/43962765528ee23ca904ae5c3f2d07180c1b853c))
- **@dpc-sdp/ripple-tide-landing-page:** added first pass at landing page components ([8c19a86](https://github.com/dpc-sdp/ripple-framework/commit/8c19a86e8fa75f354cc02d6fe643b89f4cf6a293))
- **@dpc-sdp/ripple-tide-media:** make 'submodules' top level ([34bda44](https://github.com/dpc-sdp/ripple-framework/commit/34bda449e3b7a73ccda04716518912942e0130d4))
- **@dpc-sdp/ripple-tide-media:** use addComponent functions, remove header summary text ([c699c30](https://github.com/dpc-sdp/ripple-framework/commit/c699c303c0ade85419310f8aded40faee2d85705))
- **@dpc-sdp/ripple-tide-media:** wip adding media package ([0a43097](https://github.com/dpc-sdp/ripple-framework/commit/0a4309716875ee723541866604fc101ea8845c29))
- **@dpc-sdp/ripple-ui-core:** :sparkles: add page layout for nuxt apps and corresponding story ([41c04f4](https://github.com/dpc-sdp/ripple-framework/commit/41c04f4749d031112892f9c97c8e36ef5c9c37f3))
- **@dpc-sdp/ripple-ui-core:** :sparkles: add rpl-content component ([a55be08](https://github.com/dpc-sdp/ripple-framework/commit/a55be087da74f1c78540f5c0c33e12744312abe5))
- **@dpc-sdp/ripple-ui-core:** removed unused styles from tide-page ([c9c965c](https://github.com/dpc-sdp/ripple-framework/commit/c9c965c7495effc2ce6b94cd541746ea60b069e0))

# [2.0.0-alpha.2](https://github.com/dpc-sdp/ripple-framework/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2022-11-04)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# [2.0.0-alpha.1](https://github.com/dpc-sdp/ripple-framework/compare/v2.0.0-alpha.0...v2.0.0-alpha.1) (2022-11-04)

**Note:** Version bump only for package @dpc-sdp/ripple-tide-api

# 2.0.0-alpha.0 (2022-11-04)

### Bug Fixes

- **@dpc-sdp/ripple-tide-api:** :pencil2: should be || ([838f0d2](https://github.com/dpc-sdp/ripple-framework/commit/838f0d22c635abfcc18577cd3ada2965c2291237))
- **@dpc-sdp/ripple-tide-api:** fixed logging imports ([89b7fe8](https://github.com/dpc-sdp/ripple-framework/commit/89b7fe8d95ec73aed62828b32bf98a36c50b422d))
- **@dpc-sdp/ripple-tide-api:** fixed sidebar crashing grants template ([164189f](https://github.com/dpc-sdp/ripple-framework/commit/164189f72dd2bd8d0167d3453a01604ea73d9a19))

### Features

- :sparkles: add grant content type ([9e3a525](https://github.com/dpc-sdp/ripple-framework/commit/9e3a525e310686b15d57ac31c4966ab96d1186b8))
- **@dpc-sdp/ripple-tide-api:** :art: adds dynamic theme functionality ([876b291](https://github.com/dpc-sdp/ripple-framework/commit/876b291222db2cd90a567acd1d6a3e6433d59976))
- **@dpc-sdp/ripple-tide-api:** :sparkles: migrate Ripple Tide API mappings for event content type ([b602f15](https://github.com/dpc-sdp/ripple-framework/commit/b602f1585855fd6052dbcf1c52cbb3fa6ef5b499))
- **@dpc-sdp/ripple-tide-api:** :sparkles: theme values are able to be set from site data in Tide ([4684781](https://github.com/dpc-sdp/ripple-framework/commit/4684781826a238998993cda51718d7a69e2d9e96))
- **@dpc-sdp/ripple-tide-api:** add Tide Page component and useTidePage composables ([914d593](https://github.com/dpc-sdp/ripple-framework/commit/914d59348834cad03b58a584aeec325eca061b48))
- **@dpc-sdp/ripple-tide-api:** added above and below sidebar slots to templates ([bf20f7a](https://github.com/dpc-sdp/ripple-framework/commit/bf20f7ad2a25a30a51ce3456ce3742b027bf0c8f))
- **@dpc-sdp/ripple-tide-api:** added related links sidebar mapping ([b1ae772](https://github.com/dpc-sdp/ripple-framework/commit/b1ae772f32716ce4b9da21d85e671091492517ab))
- **@dpc-sdp/ripple-tide-api:** added sidebar contact us component with fixture ([66d00ee](https://github.com/dpc-sdp/ripple-framework/commit/66d00eeff1927f3357ecd5a1111594e851360f36))
- **@dpc-sdp/ripple-tide-api:** added site section navigation to sidebar ([51e19cb](https://github.com/dpc-sdp/ripple-framework/commit/51e19cb4d04c321382a12447d8e68c763adb4951))
- **@dpc-sdp/ripple-tide-api:** added social share sidebar mapping ([3dcc1b6](https://github.com/dpc-sdp/ripple-framework/commit/3dcc1b6f1bc41c849cdb8cb6d5e6e7c9ea8b2119))
- **@dpc-sdp/ripple-tide-api:** added tide mapping for sidebar contact us ([1752eb8](https://github.com/dpc-sdp/ripple-framework/commit/1752eb8c132431120d8cee537637df63608ff6f9))
- **@dpc-sdp/ripple-tide-api:** improved error logging and error response from api ([4f157b0](https://github.com/dpc-sdp/ripple-framework/commit/4f157b058408e835d60dc12db49469d5af19a41b))
- **@dpc-sdp/ripple-tide-api:** logging cleanup ([c3e20b4](https://github.com/dpc-sdp/ripple-framework/commit/c3e20b408e3e3bef39a1aff7336970ef2bda35b9))
- **@dpc-sdp/ripple-tide-api:** made the active path highlighting work for site section nav ([145f284](https://github.com/dpc-sdp/ripple-framework/commit/145f28485bdf88fef3d39516c30517c7b1c1f6a8))
- **@dpc-sdp/ripple-tide-api:** migrate ripple-tide-api from ripple 1.x ([5bf0dd2](https://github.com/dpc-sdp/ripple-framework/commit/5bf0dd2c4ce3a405cc2b84b4eee8eddeddd6802f))
- **@dpc-sdp/ripple-tide-api:** setup winston logger ([4cb146c](https://github.com/dpc-sdp/ripple-framework/commit/4cb146c10fecd5fc4dfb03a842daae2d0373b12e))
- **@dpc-sdp/ripple-tide-api:** updated ordering of sidebar components to match designs ([cc7d480](https://github.com/dpc-sdp/ripple-framework/commit/cc7d4806fbb15f017932ac1a5bb4da548faf8e12))
- **@dpc-sdp/ripple-tide-landing-page:** :sparkles: adds landing page content type components ([4396276](https://github.com/dpc-sdp/ripple-framework/commit/43962765528ee23ca904ae5c3f2d07180c1b853c))
- **@dpc-sdp/ripple-tide-landing-page:** added first pass at landing page components ([8c19a86](https://github.com/dpc-sdp/ripple-framework/commit/8c19a86e8fa75f354cc02d6fe643b89f4cf6a293))
- **@dpc-sdp/ripple-tide-media:** make 'submodules' top level ([34bda44](https://github.com/dpc-sdp/ripple-framework/commit/34bda449e3b7a73ccda04716518912942e0130d4))
- **@dpc-sdp/ripple-tide-media:** use addComponent functions, remove header summary text ([c699c30](https://github.com/dpc-sdp/ripple-framework/commit/c699c303c0ade85419310f8aded40faee2d85705))
- **@dpc-sdp/ripple-tide-media:** wip adding media package ([0a43097](https://github.com/dpc-sdp/ripple-framework/commit/0a4309716875ee723541866604fc101ea8845c29))
- **@dpc-sdp/ripple-ui-core:** :sparkles: add page layout for nuxt apps and corresponding story ([41c04f4](https://github.com/dpc-sdp/ripple-framework/commit/41c04f4749d031112892f9c97c8e36ef5c9c37f3))
- **@dpc-sdp/ripple-ui-core:** :sparkles: add rpl-content component ([a55be08](https://github.com/dpc-sdp/ripple-framework/commit/a55be087da74f1c78540f5c0c33e12744312abe5))
- **@dpc-sdp/ripple-ui-core:** removed unused styles from tide-page ([c9c965c](https://github.com/dpc-sdp/ripple-framework/commit/c9c965c7495effc2ce6b94cd541746ea60b069e0))
