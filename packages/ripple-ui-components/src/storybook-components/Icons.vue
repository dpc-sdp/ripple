<template>
  <ul class="icons">
    <li v-for="(icon, index) in icons" :key="index">
      <rpl-icon :symbol="icon" :color="color" :size="size" />
      <code>{{ icon }}</code>
    </li>
  </ul>
</template>

<script>
import RplIcon from '@dpc-sdp/ripple-icon'

export default {
  name: 'icons',
  components: {
    RplIcon
  },
  props: {
    icons: Array,
    color: String,
    size: String
  }
}
</script>

<style lang="scss" scoped>
  @import "~@dpc-sdp/ripple-global/scss/settings";
  @import "~@dpc-sdp/ripple-global/scss/tools";

  .rpl-icon {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .icons {
    display: flex;
    flex-wrap: wrap;
    list-style: none;

    li {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      box-sizing: border-box;
      text-align: center;
      border: 1px solid rpl_color('mid_neutral_2');
      border-radius: 4px;
      padding: $rpl-space-2;
      margin: 0 $rpl-space-2 $rpl-space-2 $rpl-space-2;
      width: 100%;
      @include rpl-breakpoint('s') {
        width: calc(50% - #{$rpl-space-4} - 2px);
      }
      @include rpl-breakpoint('l') {
        width: calc(25% - #{$rpl-space-4} - 2px);
      }
      @include rpl-breakpoint('xxl') {
        width: calc(12.5% - #{$rpl-space-4} - 2px);
      }
    }

    code {
      width: 100%;
      font-size: rpl-font-size('xxs');
    }
  }
</style>
