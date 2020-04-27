<template>
  <div class="colors demo-content">
    <h2>Colors</h2>
    <ul>
      <li class="color" v-for="color in colors" :key="color">
        <p class="color__name">{{ color.replace(/\_/gi, ' ') }}</p>
        <div :class="classes(color)"></div>
      </li>
    </ul>

    <h2>Gradients</h2>
    <ul>
      <li class="color" v-for="gradient in gradients" :key="gradient">
        <p class="color__name">{{ gradient.replace(/\_/gi, ' ') }}</p>
        <div :class="gradientClasses(gradient)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SColors',
  props: [
    'colors',
    'gradients'
  ],
  methods: {
    classes: function (color) {
      let modifier = color.replace(' ', '-')
      return 'color__item color__item--' + modifier
    },
    gradientClasses: function (gradient) {
      let modifier = gradient.replace(' ', '-')
      return 'color__item color__item--' + modifier
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@dpc-sdp/ripple-global/scss/settings";

.color {
  list-style: none;
  width: 20rem;
  padding: 0 .25rem;

  &__item {
    height: 4rem;
    width: 100%;
    max-width: 20rem;
    border: 1px solid #eee;
  }
}

ul {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

$rpl-all-colors: rpl-get-colors();
@each $color-name, $color-value in $rpl-all-colors {
  .color__item--#{str-replace($color-name, ' ', '-')} {
    background-color: rpl-color($color-name);
  }
}

@each $gradient-name, $gradient-value in $rpl-gradients {
  .color__item--#{str-replace($gradient-name, ' ', '-')} {
    background-image: rpl-gradient($gradient-name);
  }
}

</style>
