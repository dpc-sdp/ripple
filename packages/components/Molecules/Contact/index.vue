<template>
  <div class="rpl-contact">
    <rpl-list
      v-if="title || list"
      :title="title"
      :list="list"
    >
      <p slot="above-list" class="rpl-contact__contact-details">
        <span v-if="name" class="rpl-contact__name">{{ name }}</span>
        <span v-if="department" class="rpl-contact__department">{{ department }}</span>
        <span v-if="postal" class="rpl-contact__postal">{{ postal }}</span>
      </p>
    </rpl-list>
  </div>
</template>

<script>
import RplList from '@dpc-sdp/ripple-list'

export default {
  name: 'RplContact',
  props: {
    title: String,
    name: String,
    department: String,
    postal: String,
    address: String,
    phone: Array,
    email: String,
    social: Array
  },
  components: {
    RplList
  },
  data: function () {
    return {
      socialIconScale: {
        'facebook': '1',
        'instagram': '0.81',
        'linkedin': '0.81',
        'twitter': '0.81',
        'youtube': '0.81'
      }
    }
  },
  computed: {
    list () {
      const _list = []
      if (this.address) {
        _list.push({
          link: this.addressLink,
          symbol: 'map_marker',
          text: this.address
        })
      }
      if (this.phone && this.phone.length > 0) {
        this.phone.forEach(phone => {
          if (phone.number) {
            _list.push({
              symbol: 'phone_number',
              link: `tel:${phone.number.replace(/ /g, '')}`,
              size: 0.857,
              text: `${phone.title ? phone.title + ' ' : ''}${phone.number}`
            })
          }
        })
      }
      if (this.email) {
        _list.push({
          symbol: 'email_solid',
          link: `mailto:${this.email}`,
          size: 0.65,
          text: this.email
        })
      }
      if (this.social && this.social.length > 0) {
        this.social.forEach(link => {
          _list.push({
            symbol: link.icon,
            link: link.url,
            size: this.socialIconScale[link.icon],
            text: link.title
          })
        })
      }
      return _list
    },
    addressLink: function () {
      return `https://www.google.com.au/maps?q=${encodeURI(this.address)}`
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  $rpl-contact-background: transparent !default;
  $rpl-contact-title-ruleset: ('l', 1.2em, 'bold');
  $rpl-contact-title-margin: 0 0 $rpl-space-4;
  $rpl-contact-title-color: rpl_color('extra_dark_neutral') !default;
  $rpl-contact-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-contact-link-color: rpl_color('extra_dark_neutral') !default;
  $rpl-contact-name-ruleset: ('xs', 1.4em, 'medium');
  $rpl-contact-ruleset: ('xs', 1.4em, 'regular');
  $rpl-contact-department-ruleset: ('xs', 1.4em, 'regular');
  $rpl-contact-postal-ruleset: ('xs', 1.4em, 'regular');
  $rpl-contact-list-ruleset: ('xs', 1em, 'medium');
  $rpl-contact-details-padding: 0 0 0 ($rpl-space * 5);
  $rpl-contact-details-border-image: rpl-gradient('decorative_gradient_90') !default;
  $rpl-contact-paragraph-margin: $rpl-space-4 0;

  .rpl-contact {
    @include rpl_text_color($rpl-contact-text-color);
    padding-top: $rpl-space-4;
    background: $rpl-contact-background;
    position: relative;

    @include rpl_print {
      page-break-inside: avoid;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-contact-title-ruleset);
      @include rpl_text_color($rpl-contact-title-color);
      margin: $rpl-contact-title-margin;
    }

    .rpl-list__list-item {
      @include rpl_typography_ruleset($rpl-contact-list-ruleset);
    }

    .rpl-list__text {
      @include rpl_typography_ruleset($rpl-contact-list-ruleset);
      margin: $rpl-contact-paragraph-margin;
      vertical-align: bottom;
    }

    &__contact-details {
      position: relative;
      padding: $rpl-contact-details-padding;
      margin: $rpl-contact-paragraph-margin;

      @include rpl_print {
        padding: 0;
      }

      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: rem(4px);
        background-image: $rpl-contact-details-border-image;

        @include rpl_print_hidden;
      }

    }

    &__name {
      @include rpl_typography_ruleset($rpl-contact-name-ruleset);
      display: block;
    }

    &__department {
      @include rpl_typography_ruleset($rpl-contact-department-ruleset);
      display: block;
    }

    &__postal {
      @include rpl_typography_ruleset($rpl-contact-postal-ruleset);
      display: block;
    }

    .rpl-link {
      @include rpl_text_color($rpl-contact-link-color);
    }
  }
</style>
