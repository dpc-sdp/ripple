# Ripple UI Forms

> A Vue 3 form component library built with [Formkit](https://formkit.com/). [View the Ripple storybook](https://www.ripple.sdp.vic.gov.au/storybook/?path=/story/forms-form--default-story) to start exploring available components.

Form fields can be used individually `<RplFormInput>` to handcraft form experiences. However, using the `<RplForm>` component and providing a form schema provides a simpler way to define and generate forms.

```vue
<template>
  <RplForm
    id="shorten-url"
    title="URL Shorten"
    :schema="[
      {
        $formkit: 'RplFormEmail',
        label: 'Email Address',
        id: 'email',
        name: 'email',
        validation: 'required'
      },
      {
        $formkit: 'RplFormActions',
        label: 'Subscribe',
        id: 'submit'
      }
    ]"
    :submissionState="{
      status: 'error',
      title: 'Error',
      message: 'Sorry, something went wrong.'
    }"
    @submit="({ data }) => { postFormData(data) }"
  >
  </RplForm>
</template>
```

## SDP Platform (Tide)

If you're using this package within a Tide environment you don't need to directly install it, it will be installed as a dependency of `@dpc-sdp/nuxt-ripple` and all components will be available globally, if you wish to be explicit you can import them from `#components`.

The details below relate to using this package outside of Tide.

## Installation

```bash
npm install @dpc-sdp/ripple-ui-forms
```

## Usage (Nuxt)

Ripple UI Forms exports a Nuxt 3 module that you can add to your nuxt config, note the addition of `/nuxt`.

```js
export default defineNuxtConfig({
  modules: [
    '@dpc-sdp/ripple-ui-forms/nuxt'
  ]
})
```

Note: Nuxt 2 is not supported.

There is no need to import the components as they will be registered globally by the nuxt module.

```vue
<template>
  <RplFormInput id="name" name="name" type="text" />
</template>
```

## Usage (Vue)

Usage in a Vue app is unfortunately not currently possible, we hope to support this in the future.
