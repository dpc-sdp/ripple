<template>
  <div>
    <h2>Default grid system</h2>
    <RplContainer class="demo-container rpl-site-constrain--on-all">
      <rpl-row class="demo-row">
        <rpl-col v-for="n in 12" :key="n" cols=1 class="demo-col">{{ n }}</rpl-col>
      </rpl-row>
    </RplContainer>
  </div>
</template>

<script>
import { RplContainer, RplRow, RplCol } from '@dpc-sdp/ripple-grid'

export default {
  components: { RplContainer, RplRow, RplCol }
}
</script>

<style lang="scss" scoped>
@import './../components/Atoms/Global/scss/color';

.demo-col {
  background-color: rpl-color('mid_neutral');
  padding-top: 5rem;
  padding-bottom: 5rem;
  text-align: center;
}

.demo-container {
  background-color: rpl-color('light_neutral');
}
</style>
