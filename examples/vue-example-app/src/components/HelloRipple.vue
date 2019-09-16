<template>
  <section class="hello-ripple">
    <ul>
      <li>
        <h3>Ripple link</h3>
        <rpl-link href="https://ripple.sdp.vic.gov.au">Ripple</rpl-link>
      </li>
      <li>
        <h3>Ripple text link</h3>
        <rpl-text-link
          url="https://ripple.sdp.vic.gov.au"
          text="Ripple"
          iconSymbol="arrow_right_primary"
          size="small"
          />
      </li>
      <li>
        <h3>Ripple icon</h3>
        <rpl-icon symbol="search" color="primary" size="m" />
      </li>
      <li>
        <h3>Ripple card</h3>
        <rpl-card-navigation
          title="Example card"
          summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          :link="{ text: 'Read more', url: '#' }" />
      </li>
      <li>
        <h3>Ripple button</h3>
        <rpl-button href="https://ripple.sdp.vic.gov.au" theme="primary">Ripple</rpl-button>
      </li>
    </ul>
  </section>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import { RplTextLink } from '@dpc-sdp/ripple-link'
import RplButton from '@dpc-sdp/ripple-button'
import RplIcon from '@dpc-sdp/ripple-icon'
import { RplCardNavigation } from '@dpc-sdp/ripple-card'

export default {
  name: 'HelloRipple',
  components: {
    RplLink,
    RplTextLink,
    RplButton,
    RplIcon,
    RplCardNavigation
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "~@dpc-sdp/ripple-global/scss/settings";
@import "~@dpc-sdp/ripple-global/scss/tools";

.hello-ripple {
  text-align: left;
  max-width: 1024px;
  margin: auto;

  ul {
    list-style: none;
  }

  li {
    padding-bottom: 1rem;
  }
}
</style>
