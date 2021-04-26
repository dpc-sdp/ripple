<template>
  <div id="app">
    <div>
      <img class="logo" alt="Vue logo" src="./assets/logo.png">
      <img class="logo" alt="Ripple logo" src="./assets/sdp-ripple.png">
    </div>
    <h1>Example for using Ripple in Vue.js</h1>
    <p>
      This is a SPA created by <a href="https://cli.vuejs.org/" target="_blank">Vue CLI</a> and <a href="https://www.ripple.sdp.vic.gov.au/" target="_blank">Ripple components</a>
    </p>
    <hello-ripple />
  </div>
</template>

<script>
import HelloRipple from './components/HelloRipple.vue'

export default {
  name: 'app',
  components: {
    HelloRipple
  }
}
</script>

<style lang="scss">
// Import global style in app level.
@import "~@dpc-sdp/ripple-global/style";

#app {
  text-align: center;
  margin-top: 1rem;

  .logo {
    height: 120px;
    padding-right: 40px;
  }
}
</style>
