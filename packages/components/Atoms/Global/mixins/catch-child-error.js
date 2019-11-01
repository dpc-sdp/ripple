/**
 * A Vue mixin to capture child component's error.
 *
 * Useful to e.g. grid col component want to hide itself if the child component has a error.
 *
 * Use within a component:
 *
 *   import catchChildError from '@dpc-sdp/ripple-global/mixins/catch-child-error'
 *
 *   export default {
 *     name: 'my-component',
 *     mixins: [catchChildError],
 *     ...
 *
 * Then you can capture child errors, by set `catchChildError` Boolean prop.
 * If you didn't set `catchChildError`, it won't catch error by default. The error will go to next parent.
 *
 * <my-component catchChildError>
 *   <child-component></child-component>
 * </my-component>
 *
 * Inside component template you can display some error:
 *
 *   <div v-if="gotChildError">
 *     We got a problem!
 *   </div>
 *
 * You can use "RplDevError" component display the error, which will be render in dev mode only.
 *
 *   <rpl-dev-error v-if="gotChildError" :errors="childErrors" />
 *
 * This mixin also provide a error class, add it like below.
 * If there is no error captured, no class will be added, otherwise it will add "rpl-child-component-error".
 * You can then apply your own style when error captured.
 *
 *   <div class="my-component" :class="childErrorClass">
 */

const catchChildError = {
  data: function () {
    return {
      gotChildError: false,
      childErrorClass: '',
      childErrors: []
    }
  },
  props: {
    catchChildError: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    interceptError (error) {
      if (this.catchChildError) {
        this.gotChildError = true
        this.childErrors.push(error)
        this.childErrorClass = 'rpl-child-component-error'
        return false
      } else {
        return true
      }
    }
  },
  errorCaptured (error) {
    return this.interceptError(error)
  }
}

export default catchChildError
