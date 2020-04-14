<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Example for using Ripple in Vue.js</h1>
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
}
</style>
