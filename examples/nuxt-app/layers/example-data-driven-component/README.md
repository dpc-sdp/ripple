## About this layer

An example of setting up a data driven component for testing purposes

Data driven components can be registered in the Nuxt `app.config` file:

```ts
export default defineAppConfig({
  ripple: {
    dataDrivenComponents: {
      // add key of field_data_driven_component and value of component name to render
      // eg: find_a_council_map: 'VicCouncilLookup'
      example_ddc: 'ExampleDDC'
    }
  }
})
```

Note that the vue component (e.g. ExampleDDC) must be declared globally for this to work, see https://nuxt.com/docs/guide/directory-structure/components.
