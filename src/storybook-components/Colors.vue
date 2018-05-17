<template>
  <div class="colors">
    <h2>Colors</h2>
    <ul>
      <li v-for="color in colors" :key="color">
        <code>{{ color.replace(/\_/gi, ' ') }}</code>
        <div :class="classes(color)"></div>
      </li>
    </ul>

    <h2>Gradients</h2>
    <ul>
      <li v-for="gradient in gradients" :key="gradient">
        <code>{{ gradient.replace(/\_/gi, ' ') }}</code>
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
      return 'colors__item colors__item--' + modifier
    },
    gradientClasses: function (gradient) {
      let modifier = gradient.replace(' ', '-')
      return 'colors__item gradient__item--' + modifier
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../components/Atoms/Global/scss/functions';
@import './../components/Atoms/Global/scss/color';

.colors__item {
  height: 3rem;
  width: 3rem;
}

@each $color-name, $color-value in $rpl-colors {
  .colors__item--#{str-replace($color-name, ' ', '-')} {
    background-color: rpl-color($color-name);
  }
}

@each $gradient-name, $gradient-value in $rpl-gradients {
  .gradient__item--#{str-replace($gradient-name, ' ', '-')} {
    background-image: rpl-gradient($gradient-name);
  }
}

</style>
