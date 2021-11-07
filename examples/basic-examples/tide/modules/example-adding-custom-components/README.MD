# Ripple with custom nuxt components

This is an example for adding a custom Nuxt component.

## How it works
- Backend configuration below must correct in order the custom component in nuxt can be rendered.
  - Custom component will be rendered when using `Custom component (paragraph--custom_component)` paragraph in Tide (Drupal)
  - The `Custom component` paragraph need a vocabulary with `custom_components` machine name.
- Each taxonomy term's machine name within above vocab will be mapped to the component name in Nuxt.
- You have to build your own custom component and make sure the machine name in Tide is same as the Nuxt component's name

## How to set up
- Map the `paragraph--custom_component` as per example below within `tide.config.js` file
```
'paragraph--custom_component': {
  expression: (item) => {
    return item.field_paragraph_custom_component.field_machine_name
  },
  components: [
    {
      case: 'example-custom-component',
      component: 'my-vue-component',
      props: {
        'exampleParam1': {
          filters: ['customFilter']
        }
      }
    }
  ]
}
```
- Create necessary filter within `mapping-filters.js` file
- Create your custom component and load it, see `tide.load-components.js` for example
