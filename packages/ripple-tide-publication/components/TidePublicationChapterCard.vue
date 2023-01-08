<template>
  <RplCard ref="container" class="rpl-col-12 tide-publication-chapter" el="li">
    <h3 class="rpl-type-h3">{{ chapter.title }}</h3>
    <p class="rpl-type-p rpl-u-margin-t-3 rpl-u-margin-b-3">
      {{ chapter.summary }}
    </p>
    <RplTextLink
      ref="trigger"
      :url="chapter.link.url"
      class="tide-publication-chapter__link"
      >{{ chapter.link.text
      }}<RplIcon size="xs" name="icon-arrow-right"></RplIcon
    ></RplTextLink>
  </RplCard>
</template>

<script setup lang="ts">
import { useAccessibleContainer } from '@dpc-sdp/ripple-ui-core'
import { TidePublicationChapter } from '../types'

const { container, trigger } = useAccessibleContainer()

defineProps<{
  chapter: TidePublicationChapter
}>()
</script>

<style>
.tide-publication-chapter__link {
  --local-clr-link: var(--rpl-clr-type-default);
  font-weight: var(--rpl-type-weight-bold);
}
.rpl-text-link.tide-publication-chapter__link .rpl-icon {
  color: var(--rpl-clr-primary);
  margin-left: var(--rpl-sp-1);
}
.rpl-card.tide-publication-chapter:hover .tide-publication-chapter__link {
  --local-clr-link: var(--rpl-clr-primary);
  text-decoration: none;
}
.rpl-card.tide-publication-chapter:hover
  .tide-publication-chapter__link
  .rpl-icon {
  margin-left: var(--rpl-sp-2);
}
</style>
