<template>
  <rpl-alert-base role="alert" class="rpl-alert" closeText="Dismiss alert" :data-alert-type="type" :backgroundColor="typeProp('backgroundColor')" :iconSymbol="typeProp('iconSymbol')" @rplAlertClose="close()" aria-live="assertive">
    <span v-if="title" class="rpl-alert__title" :id="id">{{ title }}</span>
    <rpl-text-link v-if="link" class="rpl-alert__link" :text="link.text" :url="link.url" iconSymbol="right" iconColor="white" theme="dark" :aria-labelledby="id" />
  </rpl-alert-base>
</template>

<script>
import { RplTextLink } from '@dpc-sdp/ripple-link'
import RplAlertBase from './AlertBase.vue'
import uniqueid from '@dpc-sdp/ripple-global/mixins/uniqueid'

export default {
  name: 'RplAlert',
  props: {
    title: String,
    type: String,
    link: Object,
    id: String
  },
  components: {
    RplTextLink,
    RplAlertBase
  },
  mixins: [uniqueid],
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
        'Lightning': {
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
        },
        id: null
      }
    }
  },
  mounted () {
    this.id = `alert-title-${this.getIdFromLocalRegistry()}`
  },
  methods: {
    close () {
      this.$emit('rplAlertClose', this.id)
    },
    typeProp (property) {
      return this.types[this.type] ? this.types[this.type][property] : null
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

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
