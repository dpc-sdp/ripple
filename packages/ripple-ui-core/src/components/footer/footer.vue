<script lang="ts">
export default { name: 'RplFooter' }
</script>

<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { computed } from 'vue'
import { bpMin } from '../../lib/breakpoints'
import RplAcknowledgement from '../acknowledgement/acknowledgement.vue'
import RplTextLink from '../text-link/text-link.vue'
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
import Image from '../image/image.vue'

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

const isExpandable = breakpoints.smaller('l');
const isLargeScreen = breakpoints.between('l', 'xl')
const isXLargeScreen = breakpoints.greaterOrEqual('xl')

const getColumnBreaks = (numItems: number, numColumns: number): number[] => {
  // Get the number of items that can be evenly distributed across all columns
  const base = Math.floor(numItems / numColumns)

  // Get the number of left over items that couldn't be evenly distributed
  const remainder = numItems % numColumns

  // Figure out the number of items each column should have if all items
  // are distributed as evenly as possible across the columns.
  //
  // For example, if you have 10 items and 4 columns (B=base, r=remainder):
  // | B | B | B | B |
  // | B | B | B | B |
  // | r | r |   |   |
  // Items per column = [3, 3, 2, 2]
  //
  // Or if you have 10 items and 3 columns (B=base, r=remainder):
  // | B | B | B |
  // | B | B | B |
  // | B | B | B |
  // | r |   |   |
  // Items per column = [4, 3, 3]
  const itemsPerColumn = Array(numColumns)
    .fill(base)
    .map((n, i) => (i < remainder ? n + 1 : n))

  // Now figure out, based on the itemsPerColumn, the indexes of the first item in
  // each column (i.e. the column breaks)
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

// Split the nav section items into seperate arrays for each columns so that we can easily
// render them into separate divs
const columns = computed(() => {
  let numColumns

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
</script>

<template>
  <footer :class="`rpl-footer rpl-footer--${variant}`">
    <div class="rpl-container">
      <nav class="rpl-footer__nav">
        <!-- Expandable small screen nav -->
        <template v-if="columns.length <= 1">
          <NavSection
            v-for="(navSection, i) in nav"
            :id="`rpl-footer-nav-${i}`"
            :key="i"
            :section="navSection"
            :is-expandable="isExpandable"
          />
        </template>
        <!-- Non-expandable larger screen nav with tricky column setup -->
        <template v-else>
          <div v-for="(col, colIndex) in columns" :key="colIndex">
            <NavSection
              v-for="(navSection, i) in col"
              :id="`rpl-footer-nav-${colIndex}${i}`"
              :key="i"
              :section="navSection"
              :is-expandable="isExpandable"
            />
          </div>
        </template>
      </nav>
    </div>
    <div class="rpl-container rpl-footer__custom-content">
      <slot name="custom-content">
        <RplAcknowledgement />
      </slot>
    </div>
    <div class="rpl-container">
      <div class="rpl-footer-bottom">
        <div class="rpl-footer-bottom__links">
          <ul class="rpl-footer-core-links">
            <li v-for="link in links" :key="link.url">
              <RplTextLink class="rpl-type-p-small" :url="link.url">{{
                link.text
              }}</RplTextLink>
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
            <Image
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
