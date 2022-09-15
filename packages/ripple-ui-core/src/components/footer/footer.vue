<script lang="ts">
export default { name: 'RplFooter' }
</script>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { watch } from 'fs'
import { computed, watchEffect } from 'vue'
import { bpMin } from '../../lib/breakpoints'
import Acknowledgement from '../acknowledgement/acknowledgement.vue'
import TextLink from '../text-link/text-link.vue'
import VicGovLogo from './../../assets/logos/logo-victoria.svg?component'
import {
  CoreLink,
  LogoLink,
  NavSectionItem,
  RplFooterVariants,
  vicGovHomeLabel,
  vicGovHomeUrl
} from './constants'
import NavSection from './nav-section.vue'

interface Props {
  variant?: typeof RplFooterVariants[number]
  nav?: NavSectionItem[]
  links?: CoreLink[]
  logos?: LogoLink[]
  copyright?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  nav: () => [],
  links: () => [],
  logos: () => [],
  copyright: '© Copyright State Government of Victoria'
})

const breakpoints = useBreakpoints(bpMin)

const isLargeScreen = breakpoints.between('l', 'xl')
const isXLargeScreen = breakpoints.greater('xl')
const isExpandable = computed(() => {
  return !isLargeScreen && !isXLargeScreen
})

const getColumnBreaks = (numItems: number, numColumns: number): number[] => {
  // Get the number of items that can be evenly distributed across all columns
  const base = Math.floor(numItems / numColumns)

  // Get the number of left over items that couldn't be evenly distributed
  const remainder = numItems % numColumns

  const itemsPerColumn = Array(numColumns)
    .fill(base)
    .map((n, i) => (i < remainder ? n + 1 : n))

  const columnBreaks = itemsPerColumn
    .slice(0, itemsPerColumn.length - 1)
    .reduce(
      (results, n, i) => {
        return [...results, results[i] + n]
      },
      [0]
    )

  return columnBreaks
}

const columns = computed(() => {
  let numColumns

  console.log('asjdnjkasndkjansdkjn')

  if (isLargeScreen.value) {
    numColumns = 3
  } else if (isXLargeScreen.value) {
    numColumns = 4
  } else {
    numColumns = 1
  }

  const columnBreaks = getColumnBreaks(props.nav.length, numColumns)

  return columnBreaks.reduce((results, breakIndex, i) => {
    if (i < columnBreaks.length - 1) {
      return [...results, props.nav.slice(breakIndex, columnBreaks[i + 1])]
    } else {
      return [...results, props.nav.slice(breakIndex)]
    }
  }, [])
})

watchEffect(() => {
  console.log(columns.value)
  console.log(isLargeScreen.value)
  console.log(isXLargeScreen.value)
})
</script>

<template>
  <footer :class="`rpl-footer rpl-footer--${variant}`">
    <div class="rpl-container">
      <nav class="rpl-footer__nav">
        <div v-for="(col, colIndex) in columns" :key="colIndex">
          <NavSection
            v-for="(navSection, i) in col"
            :id="`rpl-footer-nav-${colIndex}${i}`"
            :key="i"
            :section="navSection"
            :is-expandable="isExpandable"
          />
        </div>
      </nav>
    </div>
    <div class="rpl-container rpl-footer__custom-content">
      <slot name="custom-content">
        <Acknowledgement />
      </slot>
    </div>
    <div class="rpl-container">
      <div class="rpl-footer-bottom">
        <div class="rpl-footer-bottom__links">
          <ul class="rpl-footer-core-links">
            <li v-for="link in links" :key="link.url">
              <TextLink class="rpl-type-p-small" :url="link.url">{{
                link.text
              }}</TextLink>
            </li>
          </ul>
          <p class="rpl-type-p-small">
            {{ copyright }}
          </p>
        </div>
        <div class="rpl-footer-bottom__branding">
          <a
            v-for="(logoLink, index) in logos"
            :key="index"
            class="
              rpl-footer-logo-link rpl-u-focusable-outline
              rpl-u-focusable--alt-colour
            "
            :href="logoLink.url"
          >
            <img
              class="rpl-footer-logo-link__img"
              :src="logoLink.src"
              :alt="logoLink.alt"
            />
          </a>
          <a
            class="
              rpl-footer-logo-link rpl-u-focusable-outline
              rpl-u-focusable--alt-colour
            "
            :href="vicGovHomeUrl"
          >
            <span class="rpl-u-visually-hidden">{{ vicGovHomeLabel }}</span>
            <VicGovLogo class="rpl-footer-vic-gov-logo" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style src="./footer.css" />
