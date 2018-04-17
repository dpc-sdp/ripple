<template>
  <div class="colors">
    <ul>
      <li v-for="color in colors" :key="color">
        <code>{{color}}</code>
        <div :class="classes(color)"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SColors',
  props: [
    'colors'
  ],
  methods: {
    classes: function (color) {
      let modifier = color.replace(' ', '-')
      return 'colors__item colors__item--' + modifier
    }
  }
}
</script>

<style lang="scss">
@import './../components/Atoms/Global/functions';
@import './../components/Atoms/Global/color';

.colors__item {
  height: 3rem;
  width: 3rem;
}

@each $color-name, $color-value in $rpl-colors {
  .colors__item--#{str-replace($color-name, ' ', '-')} {
    background-color: rpl-color($color-name);
  }
}
</style>
