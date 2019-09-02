# Contributing to this project

- [Introduction](#introduction)
- [How it works](#how-it-works)
- [Important things before start](#important-things-before-start)
- [Dev tools](#dev-tools)
- [How to add new components](#how-to-add-new-components)
- [How to add content type](#how-to-add-conent-type)
- [Get support](#get-support)

## Introduction

This guide is for development work on the work for add/update components and content types.
For simple branding theming work(e.g color, assets changes), please refer to [README.md](/README.md).

## How it works

This project is a Nuxt app, for understanding what it is and how to build a Nuxt app, please check Nuxt official site documentation [https://nuxtjs.org/](https://nuxtjs.org/)

The below flowchart shows how an incoming http request is handled by a site implementing Nuxt, Ripple and Nuxt Tide modules and how it works with the Tide content API.

![frontend-integration](/static/img/frontend-integration.png)

## Important things before starting

At this stage, we are working on splitting this app and moving the distribution code into separated repository. Which will contain our custom Nuxt modules. So that other projects can share the same code base and contribute back.

There are two Nuxt custom modules at the moment, see them in [/modules](/modules):

- nuxt-ripple (Add Ripple pattern library)
- nuxt-tide (Add Tide API integration, glue Tide data and Ripple UI together)

Inside `nuxt-tide` module, we have core [/lib](/modules/nuxt-tide/lib) and its own module extensions [/modules](/modules/nuxt-tide/modules). These module extensions should identical to Drupal [Tide modules](https://github.com/dpc-sdp/tide#tide-modules).

- alert (missing in FE at this stage, will move it from core to alert module)
- event
- grant
- landing-page
- media
- monsido
- news
- page
- search
- site
- webform

## Dev tools

We recommend installing the [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools) in your browser.

Server side debug is also helpful. You can set up node.js debug in your IDE before starting dev works. Follow this [Nuxt.js issue](https://github.com/nuxt/nuxt.js/issues/2734#issuecomment-410135071) for guidance on setting this up.

We also recommend installing Vue and ESLint plugins for your IDE.

## How to add new components

This Nuxt app is just a frontend, so if you are going to add/update some new components, you may need to add/update them in the API backend ([tide](https://github.com/dpc-sdp/tide)) first. Test them and make sure they work in Tide API by using tools like Postman. For more contributing information, please check Tide project.

After confirming the API changes work, you need to add/update them in [Ripple pattern library](https://github.com/dpc-sdp/ripple). Discuss this with the SDP team to find the right place to add them. Send them to QA after the development and publish them in [npm](https://www.npmjs.com/org/dpc-sdp). For more contributing information, please check Ripple project.

After all of the above are done, you can then use the new component in this Nuxt app. At this stage you need to follow the steps below:

- Including new Ripple/Tide changes

1. Adding/updating components
  
    1. For new Ripple packages

        Install the new Ripple component as a dependency. Also all Ripple package versions need to be incremented with your new added component. As we are using [Fixed/Locked mode](https://github.com/lerna/lerna#fixedlocked-mode-default) to manage Ripple packages' version.

        Steps:
        1. Remove package lock file `rm package-lock.json`.
        2. Remove all node_modules locally. If you are in mac/linux run `find . -name "node_modules" -exec rm -rf '{}' +`
        3. Add new ripple package in [/modules/nuxt-tide/package.json](/modules/nuxt-tide/package.json) "dependencies" section and make sure all Ripple packages are in same version.
        4. Run `npm i` to reinstall all and regenerate lock file.

    2. For updates to Ripple packages

        Just update all Ripple package versions to the version you added changes.

        Steps:
        1. Remove package lock file `rm package-lock.json`.
        2. Remove all node_modules locally. If you are in mac/linux run `find . -name "node_modules" -exec rm -rf '{}' +`
        3. Update ripple package version in [/modules/nuxt-tide/package.json](/modules/nuxt-tide/package.json) "dependencies" section and make sure all Ripple packages are in same version.
        4. Run `npm i` to reinstall all and regenerate lock file.

2. If there are new referenced entities fields in above Tide changes, update JSON:API include query in the related Nuxt Tide module. For example, a page field, should be in `nuxt-tide/modules/page` module: [/modules/nuxt-tide/modules/page/tide.config.js](/modules/nuxt-tide/modules/page/tide.config.js). You can also put site specific custom configs in Nuxt root dir [/tide.config.js](/tide.config.js) if you can't put them in nuxt tide modules.
3. The field data will be available in Vue data `page` object. You will able to use it in Nuxt vue components.

- Landing page component

  1. If it's a landing page paragraph component, you will need to update field mapping in Tide module [/modules/nuxt-tide/modules/landing-page/tide.config.js](/modules/nuxt-tide/modules/landing-page/tide.config.js), below is a `Tide` to `Ripple` component mapping example. But you will find existing mapping configs are best examples.

```javascript
'paragraph--card_promotion': { // Tide field name.
   component: '', // Ripple component.
   props: { // Ripple properties.
        'title': {
          value: 'Key calendar dates' // Static (hard-coded) value.
        },
        'html': ['field_paragraph_body', 'processed'], // Field value.
        'link': { // Computed field.
          field: 'field_paragraph_cta', // Computed field parameter.
          filters: ['paragraphCta'] // Computed field method.
        'summary': [ // Conditional field value
          ['field_paragraph_reference', 'body', 'summary'], // if set
          ['field_paragraph_reference', 'field_landing_page_summary']  // else
        ],
      }
     }
  cols: { // Optional, Ripple grid cols setting.
     wide: { l: 6 },
     narrow: {}
   },
   class: ['class-a', 'class-b'] // Optional, classes you want to add if any.
},
```

  If you need to preprocess the API field value during the map, you can use existing mapping filters or create new filter in [/modules/nuxt-tide-landing-page/lib/core/mapping-filters.js](/modules/nuxt-tide-landing-page/lib/core/mapping-filters.js)
  2. If you've made the above mapping changes, update test for new mapping changes in [/modules/nuxt-tide-landing-page/test/unit/mapping.test.js](/modules/nuxt-tide-landing-page/test/unit/mapping.test.js). It's outdated but we should keep adding/updating mapping tests from now on.

- Other component

  1. If it's not a landing page component, you may or may not add them in mapping. Please check with SDP team to address the right solution.
  2. There is a `tide.config.js` and `tide.mapping-filters.js` in the Nuxt project root, you can add custom config and filters without modify the core.

- Place new component into page

  1. For component in sidebar, import the component and add it in template in [/components/AppSidebar.vue](/components/AppSidebar.vue). Pass the related field data from `page` data into Ripple component props.
  2. For component in pages, import the component in [/components/AppPage.vue](/components/AppPage.vue). If it's landing page component, you don't need to update template. Otherwise add it in the template. Pass the related field data from `page` data into Ripple component props.
  3. If any field data you need to add some extra work before pass into the component, you can add Vue method or computed properties to help it.

## How to add content type

TODO : update this to include nuxt-tide submodule instructions

Same thing as component, you need have that new content type working in Tide Backend first.

Then you need to add it [/modules/tide/config/core/tide.config.js](/modules/tide/config/core/tide.config.js) and update the  `getEntityByPathData` method in [/modules/tide/lib/core/module.js](/modules/tide/lib/core/module.js).

Then create a page in Backend and test it in your app.

## Get support

For more complicated scenarios, always ask help on slack channel so SDP team can work together on the solutions.
