<template>
  <AppLayout>
    <template #aboveBody>
      <DocsHeroHeader :title="title" :description="subheader" />
      <DocsWhatsNew
        title="What's new"
        :links="[
          { text: 'This link goes somewhere', url: '#first' },
          { text: 'So does this one', url: '#second' }
        ]"
      >
        <RplContent html="<p>Ripple release information text</p>" />
      </DocsWhatsNew>
    </template>

    <div class="rpl-container docs-home-container">
      <div class="docs-home-component rpl-grid">
        <div class="rpl-col-12 rpl-col-4-m">
          <RplCardPromoCard title="Who should use it">
            <p>
              Paragraph Default. Cards contain actionable content about a single
              topic. These are usually grouped as similar style sets.
            </p>
          </RplCardPromoCard>
        </div>
        <div class="rpl-col-12 rpl-col-4-m">
          <RplCardPromoCard title="How it works">
            <p>
              Paragraph Default. Cards contain actionable content about a single
              topic. These are usually grouped as similar style sets.
            </p>
          </RplCardPromoCard>
        </div>
        <div class="rpl-col-12 rpl-col-4-m">
          <RplCardPromoCard title="Getting help">
            <p>
              Paragraph Default. Cards contain actionable content about a single
              topic. These are usually grouped as similar style sets.
            </p>
          </RplCardPromoCard>
        </div>
      </div>

      <h2 class="rpl-type-h2">Getting started</h2>
      <div class="docs-home-component rpl-grid">
        <div class="rpl-col-12 rpl-col-6-m">
          <RplCardPromoCard
            :title="page.primaryCTA.title"
            :url="page.primaryCTA.url"
            highlight
          >
            <p>
              Paragraph Default. Cards contain actionable content about a single
              topic. These are usually grouped as similar style sets.
            </p>
          </RplCardPromoCard>
        </div>
        <div class="rpl-col-12 rpl-col-6-m">
          <RplCardPromoCard
            :title="page.secondaryCTA.title"
            :url="page.secondaryCTA.url"
            highlight
          >
            <p>
              Paragraph Default. Cards contain actionable content about a single
              topic. These are usually grouped as similar style sets.
            </p>
          </RplCardPromoCard>
        </div>
      </div>

      <div class="docs-home-component rpl-grid">
        <div class="rpl-col-12 rpl-col-3-m">
          <RplCardCategoryGridCard title="Styles" :image="{ src: '' }">
            <p>
              Paragraph Default. Cards contain actionable content about a single
              topic. These are usually grouped as similar style sets.
            </p>
          </RplCardCategoryGridCard>
        </div>
        <div class="rpl-col-12 rpl-col-3-m">
          <RplCardCategoryGridCard title="Components" :image="{ src: '' }">
            <p>
              Paragraph Default. Cards contain actionable content about a single
              topic. These are usually grouped as similar style sets.
            </p>
          </RplCardCategoryGridCard>
        </div>
        <div class="rpl-col-12 rpl-col-3-m">
          <RplCardCategoryGridCard title="Patterns" :image="{ src: '' }">
            <p>
              Paragraph Default. Cards contain actionable content about a single
              topic. These are usually grouped as similar style sets.
            </p>
          </RplCardCategoryGridCard>
        </div>
        <div class="rpl-col-12 rpl-col-3-m">
          <RplCardCategoryGridCard title="Modules" :image="{ src: '' }">
            <p>
              Paragraph Default. Cards contain actionable content about a single
              topic. These are usually grouped as similar style sets.
            </p>
          </RplCardCategoryGridCard>
        </div>
      </div>

      <ContentRenderer
        tag="RplContent"
        class="content-full"
        v-if="page && !page._empty"
        :key="page._id"
        :value="page"
      >
      </ContentRenderer>

      <footer>
        <a href="https://www.netlify.com">
          <img
            src="https://www.netlify.com/v3/img/components/netlify-light.svg"
            alt="Deploys by Netlify"
            width="114"
            height="51"
          />
        </a>
      </footer>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { useContent, useContentHead } from '#imports'
const { page, toc } = useContent()
const { title, subheader, description } = useAppConfig()
useContentHead(page)
</script>

<style scoped>
.docs-home-component {
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  padding-bottom: var(--rpl-sp-9);
  margin-bottom: var(--rpl-sp-9);
}
</style>
