<template>
  <component
    :is="compName"
    v-bind="compProps"
    class="tide-custom-component"
  >
    {{ compSlotText }}
  </component>
</template>

<script>
/**
 * This component is used for Tide(CMS) to add a custom component without development work.
 * Custom component need to be registered in nuxt.config.js.
 * Check "https://github.com/dpc-sdp/ripple/blob/master/packages/ripple-nuxt-tide/modules/landing-page/README.md" for more usage guide.
 */
export default {
  name: 'TideCustomComponent',
  props: {
    /**
     * The custom component name
     */
    compName: {
      type: String,
      required: true
    },
    /**
     * The custom component props
     *
     * e.g:
     * {
     *   title: 'Hello world',
     *   disabled: true
     * }
     */
    compProps: {
      type: Object,
      default: () => {}
    },
    /**
     * The custom component slot, text only.
     *
     * @TODO html slot can be achieved by adding another prop e.g compSlotHTML.
     * But it's low priority and has security risk.
     */
    compSlotText: {
      type: String,
      default: ''
    }
  }
}
</script>
