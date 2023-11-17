<script setup lang="ts">
import { useBreakpoints } from '@vueuse/core'
import { computed, onMounted, ref } from 'vue'
import { bpMin } from '../../lib/breakpoints'
import RplAcknowledgement from '../acknowledgement/RplAcknowledgement.vue'
import RplTextLink from '../text-link/RplTextLink.vue'
import VicGovLogo from './../../assets/logos/logo-victoria-state-government.svg?component'
import {
  ICoreLink,
  ILogoLink,
  INavSectionItem,
  RplFooterVariants,
  vicGovHomeLabel,
  vicGovHomeUrl
} from './constants'
import RplNavSection from './RplNavSection.vue'
import RplImage from '../image/RplImage.vue'
import {
  useRippleEvent,
  rplEventPayload
} from '../../composables/useRippleEvent'

interface Props {
  variant?: (typeof RplFooterVariants)[number]
  nav?: INavSectionItem[]
  links?: ICoreLink[]
  logos?: ILogoLink[]
  credit?: string
  acknowledgement?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  nav: () => [],
  links: () => [],
  logos: () => [],
  credit: undefined,
  acknowledgement: undefined
})

const emit = defineEmits<{
  (e: 'navigate', payload: rplEventPayload & { action: 'click' }): void
}>()

const { emitRplEvent } = useRippleEvent('rpl-footer', emit)

const isMounted = ref(false)

onMounted(() => {
  // We need to know if the component has mounted so that we can avoid SSR hydration mismatches.
  // This is because the rendering of the footer nav is heavily tied to the current breakpoint, which
  // is unknown when rendering on the server.
  isMounted.value = true
})

const breakpoints = useBreakpoints(bpMin)

const isExpandable = breakpoints.smaller('l')
const isMediumScreen = breakpoints.between('m', 'l')
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

  if (isMediumScreen.value) {
    numColumns = 2
  } else if (isLargeScreen.value) {
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

const handleClick = (link) => {
  emitRplEvent(
    'navigate',
    {
      action: 'click',
      value: link.url,
      text: link.text
    },
    { global: true }
  )
}
</script>

<template>
  <footer
    :class="`rpl-footer rpl-footer--${variant} rpl-u-screen-only`"
    data-component-type="site-footer"
  >
    <div class="rpl-container">
      <nav class="rpl-footer__nav" aria-label="Footer navigation">
        <!-- Fallback rendering for SSR, this ensures that the server and client render the same thing initially -->
        <template v-if="!isMounted">
          <RplNavSection
            v-for="(navSection, i) in nav"
            :id="`rpl-footer-nav-${i}`"
            :key="i"
            :index="i"
            :section="navSection"
          />
        </template>
        <!-- Expandable nav items for small screens -->
        <template v-else-if="columns.length <= 1">
          <RplNavSection
            v-for="(navSection, i) in nav"
            :id="`rpl-footer-nav-${i}`"
            :key="i"
            :index="i"
            :section="navSection"
            :is-expandable="isExpandable"
          />
        </template>
        <!-- Non-expandable nav with tricky column setup for larger screens -->
        <template v-else>
          <div v-for="(col, colIndex) in columns" :key="colIndex">
            <RplNavSection
              v-for="(navSection, i) in col"
              :id="`rpl-footer-nav-${colIndex}${i}`"
              :key="i"
              :index="colIndex"
              :section="navSection"
              :is-expandable="isExpandable"
            />
          </div>
        </template>
      </nav>
    </div>
    <div class="rpl-footer__custom-content">
      <div class="rpl-container">
        <slot name="custom-content">
          <div class="rpl-footer__custom-content-inner">
            <RplAcknowledgement :message="acknowledgement" />
          </div>
        </slot>
        <p v-if="credit" class="rpl-footer__credit rpl-type-label-small">
          {{ credit }}
        </p>
      </div>
    </div>
    <div class="rpl-container">
      <div class="rpl-footer-bottom">
        <div class="rpl-footer-bottom__links">
          <ul class="rpl-footer-core-links">
            <li v-for="link in links" :key="link.url">
              <RplTextLink
                class="rpl-type-p-small"
                :url="link.url"
                @click="() => handleClick(link)"
              >
                {{ link.text }}
              </RplTextLink>
            </li>
          </ul>
          <div class="rpl-type-label-small">
            <slot name="copyright">
              <p>© Copyright State Government of Victoria</p>
            </slot>
          </div>
        </div>
        <div class="rpl-footer-bottom__branding">
          <RplLink
            v-for="(logoLink, index) in logos"
            :key="index"
            class="rpl-footer-logo-link rpl-u-focusable-outline rpl-u-focusable--alt-colour"
            :url="logoLink.url"
            @click="
              () => handleClick({ url: logoLink.url, text: logoLink.alt })
            "
          >
            <RplImage
              class="rpl-footer-logo-link__img"
              :src="logoLink.src"
              :alt="logoLink.alt"
            />
          </RplLink>
          <RplLink
            class="rpl-footer-logo-link rpl-u-focusable-outline rpl-u-focusable-outline--no-border rpl-u-focusable--alt-colour"
            :url="vicGovHomeUrl"
            @click="
              () => handleClick({ url: vicGovHomeUrl, text: vicGovHomeLabel })
            "
          >
            <span class="rpl-u-visually-hidden">{{ vicGovHomeLabel }}</span>
            <VicGovLogo class="rpl-footer-vic-gov-logo" />
          </RplLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style src="./RplFooter.css" />
