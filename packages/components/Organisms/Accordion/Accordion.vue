<template>
  <div class="rpl-accordion" :class="{'rpl-accordion--rtl': isRtl()}">
    <h2 class="rpl-accordion__title-top" :id="titleId" v-if="title">{{ title }}</h2>
    <div class="rpl-accordion__collapse">
      <button class="rpl-accordion__collapse-btn" @click="closeOpenAll">{{ closeOpenLabel }}</button>
    </div>
    <component :is="isNumbered ? 'ol' : 'ul'" class="rpl-accordion__list">
      <li class="rpl-accordion__list-item" v-for="(accordion, index) in accordions" :key="index" :class="{'rpl-accordion__list-item--expanded': accordionIsOpen(index)}">
        <h2 class="rpl-accordion__title" :class="{'rpl-accordion__title--expanded': accordionIsOpen(index)}">
          <button @click="accordionClick(index)" class="rpl-accordion__button" :class="{'rpl-accordion__button--expanded': accordionIsOpen(index)}" :aria-expanded="accordionIsOpen(index).toString()" :aria-controls="accordionId(index)">
            <span v-if="isNumbered" aria-hidden="true" class="rpl-accordion__title-number">{{ (index + 1) }}</span>
            <span class="rpl-accordion__button-text" :class="{'rpl-accordion__button-text--rtl': isRtl()}">{{ accordion.title }}</span>
            <rpl-icon symbol="arrow_down_tertiary" color="primary" class="rpl-accordion__icon" :class="{'rpl-accordion__icon--expanded': accordionIsOpen(index)}"/>
          </button>
        </h2>
        <div
          class="rpl-accordion__content"
          :id="accordionId(index)"
          :ref="accordionId(index)"
        >
          <rpl-markup class="rpl-accordion__content-inner" :html="accordion.content" />
        </div>
      </li>
    </component>
  </div>
</template>

<script>
import uniqueid from '@dpc-sdp/ripple-global/mixins/uniqueid'
import RplIcon from '@dpc-sdp/ripple-icon'
import RplMarkup from '@dpc-sdp/ripple-markup'
import Vue from 'vue'
import { getAnchorLinkName } from '@dpc-sdp/ripple-global/utils/helpers.js'
import rtl from '@dpc-sdp/ripple-global/mixins/rtl.js'
import { RplAccordionEventBus } from './index.js'

export default {
  name: 'RplAccordion',
  props: {
    title: String,
    type: String,
    accordions: Array,
    single: Boolean
  },
  components: {
    RplIcon,
    RplMarkup
  },
  mixins: [uniqueid, rtl],
  data: function () {
    return {
      itemOpen: {},
      isCollapsed: false,
      closeOpenLabel: 'Open all'
    }
  },
  mounted () {
    for (const index in this.accordions) {
      Vue.set(this.itemOpen, index, false)
    }
    RplAccordionEventBus.$on('open-panel', (item) => {
      // AnchorLinks can't narrow down to a single accordion, so check AnchorLinkName
      if (item.url === `#${this.titleId}`) {
        // Only open if closed
        if (!this.accordionIsOpen(item.index)) {
          this.accordionClick(item.index)
        }
      }
    })
  },
  computed: {
    titleId () {
      if (this.title) {
        return getAnchorLinkName(this.title)
      }
    },
    isAllItemOpen () {
      for (const index in this.itemOpen) {
        if (!this.itemOpen[index]) {
          return false
        }
      }
      return true
    },
    isNumbered () {
      return this.type === 'numbered'
    }
  },
  methods: {
    accordionClick: function (index) {
      if (this.single) {
        let strIndex = index.toString()
        for (let item in this.itemOpen) {
          if (item !== strIndex) {
            this.collapseContent(item)
            Vue.set(this.itemOpen, item, false)
          }
        }
      }
      this.toggleContent(index)
      Vue.set(this.itemOpen, index, !this.itemOpen[index])
      this.isCollapsed = this.isAllItemOpen
    },
    closeOpenAll () {
      this.isCollapsed = !this.isCollapsed

      for (let item in this.itemOpen) {
        Vue.set(this.itemOpen, item, this.isCollapsed)
        if (this.isCollapsed) {
          this.expandContent(item)
        } else {
          this.collapseContent(item)
        }
      }
    },
    accordionIsOpen: function (index) {
      return (this.itemOpen[index] === undefined) ? false : this.itemOpen[index]
    },
    accordionId (index) {
      return `rpl-accordion-${this.getIdFromLocalRegistry(index)}`
    },
    expandContent (index) {
      const ref = this.accordionId(index)
      const section = this.$refs[ref]
      if (section[0]) {
        // Set fixed height for transition
        section[0].style.height = section[0].scrollHeight + 'px'
        section[0].style.visibility = 'visible'
        setTimeout(function () {
          // Only expands if itemOpen is true
          if (this.itemOpen && this.itemOpen[index]) {
            section[0].style.height = 'auto'
          }
        }, 500)
      } else {
        throw new Error('Something is wrong while getting the height of the referred content')
      }
    },
    collapseContent (index) {
      const ref = this.accordionId(index)
      const section = this.$refs[ref]
      if (section[0]) {
        // Set fixed height for transition
        section[0].style.height = section[0].scrollHeight + 'px'
        setTimeout(function () {
          section[0].style.height = ''
          section[0].style.visibility = ''
        }, 1)
      } else {
        throw new Error('Something is wrong while getting the height of the referred content')
      }
    },
    toggleContent (index) {
      if (this.itemOpen[index]) {
        this.collapseContent(index)
      } else {
        this.expandContent(index)
      }
    }
  },
  watch: {
    isCollapsed (val) {
      if (val) {
        this.closeOpenLabel = 'Close all'
      } else {
        this.closeOpenLabel = 'Open all'
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./accordion.scss";
</style>
