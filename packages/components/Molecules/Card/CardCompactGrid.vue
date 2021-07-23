<template>
  <div class="rpl-card-compact-grid">
    <h2 v-if="title" class="rpl-card-compact__title">{{ title }}</h2>
    <rpl-row v-if="cards && cards.length" row-gutter class="rpl-card-compact__cards">
      <rpl-col catchChildError v-for="(card, index) in cards" :key="index" cols="full" :colsBp="cardColsSetting" class="rpl-card-compact__card-col">
        <rpl-card-compact
          class="rpl-card-compact__card"
          :image="card.image"
          :title="card.title"
          :summary="card.summary"
          :link="card.link"
        />
      </rpl-col>
    </rpl-row>
  </div>
</template>

<script>
import { RplRow, RplCol } from '@dpc-sdp/ripple-grid'
import RplCardCompact from './CardCompact'
export default {
  name: 'RplCardCompactGrid',
  components: {
    RplRow,
    RplCol,
    RplCardCompact
  },
  props: {
    title: String,
    cards: Array
  },
  data () {
    return {
      cardColsSetting: {
        s: 6,
        m: 4,
        l: 3
      }
    }
  }
}
</script>
