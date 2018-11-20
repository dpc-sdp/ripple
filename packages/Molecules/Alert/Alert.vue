<template>
  <rpl-alert-base class="rpl-alert" :backgroundColor="typeProp('backgroundColor')" :iconSymbol="typeProp('iconSymbol')" @rplAlertClose="close()">
    <span v-if="title" class="rpl-alert__title">{{ title }}</span>
    <rpl-text-link v-if="link" class="rpl-alert__link" :text="link.text" :url="link.url" iconSymbol="right" iconColor="white" theme="dark" />
  </rpl-alert-base>
</template>

<script>
import { RplTextLink } from '@dpc-sdp/ripple-link'
import RplAlertBase from './AlertBase.vue'

export default {
  name: 'RplAlert',
  props: {
    title: String,
    type: String,
    link: Object,
    alertId: String
  },
  components: {
    RplTextLink,
    RplAlertBase
  },
  data () {
    return {
      types: {
        'Emergency': {
          backgroundColor: 'danger',
          iconSymbol: 'alert_information'
        },
        'Fire': {
          backgroundColor: 'danger',
          iconSymbol: 'alert_fire'
        },
        'Flood': {
          backgroundColor: 'danger',
          iconSymbol: 'alert_flood'
        },
        'Medical': {
          backgroundColor: 'danger',
          iconSymbol: 'alert_medical'
        },
        'Lightening': {
          backgroundColor: 'warning',
          iconSymbol: 'alert_lightning'
        },
        'Pollution': {
          backgroundColor: 'warning',
          iconSymbol: 'alert_smoke'
        },
        'Heat wave': {
          backgroundColor: 'warning',
          iconSymbol: 'alert_high_temperature'
        },
        'Traffic': {
          backgroundColor: 'dark_neutral',
          iconSymbol: 'alert_transport'
        }
      }
    }
  },
  methods: {
    close () {
      this.$emit('rplAlertClose', this.alertId)
    },
    typeProp (property) {
      return this.types[this.type] ? this.types[this.type][property] : null
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/style";

  .rpl-alert {
    &__title {
      margin-right: $rpl-space-2;
    }

    &__link {
      margin-top: $rpl-space;
      display: block;

      @include rpl_breakpoint('s') {
        margin: auto;
        display: inline;
      }

      &.rpl-text-link {
        text-decoration: underline;

        &:focus, &:hover {
          text-decoration: none;
        }
      }
    }
  }
</style>
