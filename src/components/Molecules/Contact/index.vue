<template>
  <div class="rpl-contact">
    <h2 v-if="title" class="rpl-contact__title">{{ title }}</h2>
    <p class="rpl-contact__contact-details">
      <span v-if="name" class="rpl-contact__name">{{ name }}</span>
      <span v-if="department" class="rpl-contact__department">{{ department }}</span>
      <span v-if="postal" class="rpl-contact__postal">{{ postal }}</span>
    </p>
    <p v-if="address" class="rpl-contact__address">
      <span class="rpl-contact__icon"><rpl-icon symbol="map_marker" color="primary" /></span><rpl-link :href="addressLink">{{ address }}</rpl-link>
    </p>
    <p v-if="phone" v-for="(phone_number, index) in phone" :key="index" class="rpl-contact__phone">
      <span class="rpl-contact__icon"><rpl-icon symbol="phone_number" color="primary" size="0.857" /></span><rpl-link :href="'tel:' + phone_number">{{ phone_number }}</rpl-link>
    </p>
    <p v-if="email" class="rpl-contact__email">
      <span class="rpl-contact__icon"><rpl-icon symbol="email_solid" color="primary" size="0.65" /></span><rpl-link :href="'mailto:' + email">{{ email }}</rpl-link>
    </p>
    <p v-if="social" v-for="(link, index) in social" :key="index" class="rpl-contact__social">
      <span class="rpl-contact__icon"><rpl-icon :symbol="link.icon" color="primary" :size="socialIconScale[link.icon] || 1" /></span><rpl-link :href="link.url">{{ link.title }}</rpl-link>
    </p>
  </div>
</template>

<script>
import RplLink from '@dpc-sdp/ripple-link'
import RplIcon from '@dpc-sdp/ripple-icon'

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
    RplLink,
    RplIcon
  },
  data: function () {
    return {
      socialIconScale: {
        'facebook': '1',
        'instagram': '0.81',
        'twitter': '0.81'
      }
    }
  },
  computed: {
    addressLink: function () {
      return `https://www.google.com.au/maps?q=${encodeURI(this.address)}`
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  $rpl-contact-background: transparent;
  $rpl-contact-title-ruleset: ('l', 1.2em, 'bold');
  $rpl-contact-title-margin: 0 0 $rpl-space-4;
  $rpl-contact-text-color: rpl_color('extra_dark_neutral');
  $rpl-contact-link-color: rpl_color('extra_dark_neutral');
  $rpl-contact-name-ruleset: ('xs', 1.4em, 'medium');
  $rpl-contact-ruleset: ('xs', 1.4em, 'regular');
  $rpl-contact-department-ruleset: ('xs', 1.4em, 'regular');
  $rpl-contact-postal-ruleset: ('xs', 1.4em, 'regular');
  $rpl-contact-address-ruleset: ('xs', 1.4em, 'medium');
  $rpl-contact-phone-ruleset: ('xs', 1.4em, 'medium');
  $rpl-contact-email-ruleset: ('xs', 1.4em, 'medium');
  $rpl-contact-social-ruleset: ('xs', 1.4em, 'medium');
  $rpl-contact-details-padding: 0 0 0 ($rpl-space * 5);
  $rpl-contact-details-border-image: rpl-gradient('decorative_gradient_90');
  $rpl-contact-paragraph-margin: $rpl-space-3 0;
  $rpl-contact-icon-width: $rpl-space-3;
  $rpl-contact-icon-margin: 0 $rpl-space-2 0 0;

  .rpl-contact {
    @include rpl_mobile_padding;
    padding-top: $rpl-space-4;
    background: $rpl-contact-background;
    color: $rpl-contact-text-color;
    position: relative;

    @include rpl_breakpoint('l') {
      padding-left: 0;
      padding-right: 0;
    }

    &__title {
      @include rpl_typography_ruleset($rpl-contact-title-ruleset);
      margin: $rpl-contact-title-margin;
    }

    p {
      margin: $rpl-contact-paragraph-margin;

      &:first-of-type {
        margin-top: 0;
      }
    }

    &__contact-details {
      position: relative;
      padding: $rpl-contact-details-padding;

      &::before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: rem(4px);
        background-image: $rpl-contact-details-border-image;
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

    &__address {
      @include rpl_typography_ruleset($rpl-contact-address-ruleset);
    }

    &__phone {
      @include rpl_typography_ruleset($rpl-contact-phone-ruleset);
    }

    &__email {
      @include rpl_typography_ruleset($rpl-contact-email-ruleset);
    }

    &__social {
      @include rpl_typography_ruleset($rpl-contact-social-ruleset);
    }

    &__icon {
      display: inline-block;
      vertical-align: middle;
      text-align: center;
      width: $rpl-contact-icon-width;
      margin: $rpl-contact-icon-margin;
    }

    .rpl-link {
      color: $rpl-contact-link-color;
    }
  }
</style>
