<template>
  <section class="hello-ripple">
    <h3>Ripple link</h3>
    <rpl-link href="https://ripple.sdp.vic.gov.au">Ripple</rpl-link>
    <rpl-divider />

    <h3>Ripple text link</h3>
    <rpl-text-link
      url="https://ripple.sdp.vic.gov.au"
      text="Ripple"
      iconSymbol="arrow_right_primary"
      size="small"
      />
    <rpl-divider />

    <h3>Ripple button</h3>
    <rpl-button href="https://ripple.sdp.vic.gov.au" theme="primary">Ripple</rpl-button>
    <rpl-divider />

    <h3>Ripple Markup</h3>
    <rpl-markup
      :html="html"
    />
    <rpl-divider />

    <h3>Ripple Accordion</h3>
    <rpl-accordion
      title="Accordion set"
      :accordions='[
        {
          "title": "Accordion Item",
          "content": "<p>Lorem ipsum dolor sit amet, consectet adipiscing elit, seddo eiusmod tempore incididunt ut labore et dolore.</p>"
        },
        {
          "title": "Accordion Item",
          "content": "<p><img src=\"https://via.placeholder.com/150\" /></p>"
        }
      ]'
      :single="false"
    />
    <rpl-divider />

    <h3>Ripple icon</h3>
    <rpl-icon symbol="search" color="primary" size="m" />
    <rpl-divider />

    <h3>Ripple card</h3>
    <rpl-card-nav
      title="Card nav title"
      :image='{"src":"https://placehold.it/580x340","focalPoint":{"x":"290","y":"170"},"width":580,"height":340}'
      summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      :link='{"text":"Read more","url":"#"}'
      topic="Arts, Culture and Humanities"
      contentType="Event"
      showMeta
      dateStart="Sun, 21 Feb 2021 03:38:51 GMT"
      dateEnd="Wed, 03 Mar 2021 03:38:51 GMT"
      displayStyle="noImage"
    />
  </section>
</template>

<script>
import { RplDivider } from '@dpc-sdp/ripple-global'
import RplLink from '@dpc-sdp/ripple-link'
import { RplTextLink } from '@dpc-sdp/ripple-link'
import RplButton from '@dpc-sdp/ripple-button'
import RplIcon from '@dpc-sdp/ripple-icon'
import { RplCardNav } from '@dpc-sdp/ripple-card'
import { RplMarkup } from '@dpc-sdp/ripple-markup'
import { RplAccordion } from '@dpc-sdp/ripple-accordion'

export default {
  name: 'HelloRipple',
  components: {
    RplDivider,
    RplLink,
    RplTextLink,
    RplButton,
    RplIcon,
    RplCardNav,
    RplMarkup,
    RplAccordion
  },
  data () {
    return {
      html: `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut mauris magna. Nulla scelerisque maximus purus eu lacinia. In vestibulum elit augue, aliquet lobortis tellus interdum eu.</p>
<p><img src="https://via.placeholder.com/150" /></p>
<rpl-button href="https://ripple.sdp.vic.gov.au" theme="primary">Ripple</rpl-button>
`
    }
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
}
</style>
