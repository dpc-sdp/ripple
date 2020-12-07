<template>
  <rpl-card-content :link="link" :border="false" :center="!image" class="rpl-card-profile">
    <div class="rpl-card-profile__inner">
      <img class="rpl-card-profile__image" v-if="image" ref="image" :src="image" alt="" />
      <h2 class="rpl-card-profile__name" :class="{ 'rpl-card-profile__name--no-margin' : lifespan }" v-if="name">{{ name }}</h2>
      <p class="rpl-card-profile__lifespan" v-if="lifespan">({{ lifespan }})</p>
      <p v-if="inductionYear" class="rpl-card-profile__induction">
        <span v-if="inductionPrefix">{{ inductionPrefix }}</span>
        <span>{{ inductionYear }}</span>
      </p>
      <div class="rpl-card-profile__summary" v-if="summary" v-html="summary"></div>
    </div>
  </rpl-card-content>
</template>

<script>
import objectFitImages from 'object-fit-images'
import RplCardContent from './CardContent.vue'

export default {
  name: 'RplCardProfile',
  props: {
    name: String,
    inductionYear: String,
    inductionPrefix: { type: String, default: 'Inducted' },
    lifespan: String,
    summary: String,
    link: Object,
    image: [String, Object]
  },
  components: {
    RplCardContent
  },
  mounted () {
    if (this.image) {
      objectFitImages(this.$refs['image'])
    }
  }
}
</script>

<style lang="scss">
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";
  @import "scss/card";

  $rpl-card-profile-name-ruleset: ('l', 1.2em, 'bold') !default;
  $rpl-card-profile-name-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-profile-name-margin: 0 0 $rpl-space-3 0 !default;
  $rpl-card-profile-summary-ruleset: ('xs', 1.5em, 'regular') !default;
  $rpl-card-profile-summary-text-color: rpl_color('extra_dark_neutral') !default;
  $rpl-card-profile-image-margin: (-$rpl-card-vertical-padding + rem(14px)) 0 ($rpl-space * 6) !default;
  $rpl-card-profile-image-width: rem(148px) !default;
  $rpl-card-profile-image-height: rem(148px) !default;
  $rpl-card-profile-induction-ruleset: ('xxs', 1em, 'medium') !default;
  $rpl-card-profile-induction-color: rpl_color('dark_neutral') !default;

  .rpl-card-profile {

    &__inner {
      text-align: center;
    }

    &__image {
      border-radius: 100%;
      margin: $rpl-card-profile-image-margin;
      width: $rpl-card-profile-image-width;
      height: $rpl-card-profile-image-height;
      @include object_fit_image(cover);
    }

    &__name {
      @include rpl_typography_ruleset($rpl-card-profile-name-ruleset);
      color: $rpl-card-profile-name-text-color;
      margin: $rpl-card-profile-name-margin;

      &--no-margin {
        margin: 0;
      }
    }

    &__lifespan {
      @include rpl_typography_ruleset($rpl-card-profile-name-ruleset);
      color: $rpl-card-profile-name-text-color;
      margin: $rpl-card-profile-name-margin;
    }

    &__induction {
      @include rpl_typography_ruleset($rpl-card-profile-induction-ruleset);
      color: $rpl-card-profile-induction-color;
      text-transform: uppercase;
    }

    &__summary {
      @include rpl_typography_ruleset($rpl-card-profile-summary-ruleset);
      color: $rpl-card-profile-summary-text-color;
      margin: 0;
      margin-bottom: $rpl-space-4;
    }
  }
</style>
