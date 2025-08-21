<template>
  <AppLayout background="alt">
    <template #aboveHeader>
      <RplAlertsContainer>
        <RplAlert
          message="These Docs are for Ripple version 2.0. If you are looking for the original Ripple Storybook please click below"
          linkText="View Ripple 1 storybook"
          linkUrl="https://master--5e736ff82649250022dd830c.chromatic.com/"
          alert-id="storybook-alert"
          :isDismissible="false"
        />
      </RplAlertsContainer>
    </template>
    <template #aboveBody>
      <DocsHeroHeader :title="title" :description="subheader" />

      <div class="docs-home-getting-started">
        <div class="rpl-container">
          <DocsHomeSection title="Getting Started">
            <div class="rpl-grid">
              <div
                v-if="page.content?.primaryCTA"
                class="rpl-col-12 rpl-col-6-m"
              >
                <RplPromoCard v-bind="page.content.primaryCTA">
                  <p>{{ page.content.primaryCTA.description }}</p>
                </RplPromoCard>
              </div>
              <div
                v-if="page.content?.secondaryCTA"
                class="rpl-col-12 rpl-col-6-m"
              >
                <RplPromoCard v-bind="page.content.secondaryCTA">
                  <p>{{ page.content.secondaryCTA.description }}</p>
                </RplPromoCard>
              </div>
            </div>
          </DocsHomeSection>
        </div>
      </div>
    </template>

    <DocsHomeSection title="Find out more">
      <div class="rpl-grid">
        <div
          v-if="page.content?.quickLink1"
          class="rpl-col-12 rpl-col-6-m rpl-col-4-l docs-home-col-fill"
        >
          <RplPromoCard v-bind="page.content.quickLink1">
            <p>
              {{ page.content.quickLink1.description }}
            </p>
          </RplPromoCard>
        </div>
        <div
          v-if="page.content?.quickLink2"
          class="rpl-col-12 rpl-col-6-m rpl-col-4-l docs-home-col-fill"
        >
          <RplPromoCard v-bind="page.content.quickLink2">
            <p>
              {{ page.content.quickLink2.description }}
            </p>
          </RplPromoCard>
        </div>
        <div
          v-if="page.content?.quickLink3"
          class="rpl-col-12 rpl-col-12-m rpl-col-4-l docs-home-col-fill"
        >
          <RplPromoCard v-bind="page.content.quickLink3">
            <p>
              {{ page.content.quickLink3.description }}
            </p>
          </RplPromoCard>
        </div>
      </div>
    </DocsHomeSection>

    <DocsHomeSection
      v-if="page.content?.framework"
      title="Using Ripple in SDP sites"
    >
      <div
        class="rpl-grid"
        :style="{ '--rpl-clr-gradient-horizontal': 'var(--rpl-clr-dark)' }"
      >
        <div class="rpl-col-12">
          <RplPromoCard v-bind="page.content.framework" highlight>
            <p>
              {{ page.content.framework.description }}
            </p>
          </RplPromoCard>
        </div>
      </div>
    </DocsHomeSection>

    <DocsHomeSection>
      <ContentRenderer
        tag="DocsContent"
        class="content-full"
        v-if="page.body.value.length"
        :key="page.id"
        :value="page"
      />
    </DocsHomeSection>

    <template #belowBody>
      <DocsWhatsNew
        v-if="page.content?.whatsNew"
        :title="page.content.whatsNew.title"
        :links="page.content.whatsNew.links"
      >
        <RplContent>
          <p>{{ page.content.whatsNew.description }}</p>
        </RplContent>
      </DocsWhatsNew>
    </template>
  </AppLayout>
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

type HomeCard = {
  title: string
  description: string
  url: string
  image?: string
  links?: {
    text: string
    url: string
  }[]
}

interface HomeContent {
  primaryCTA?: HomeCard
  secondaryCTA?: HomeCard
  quickLink1?: HomeCard
  quickLink2?: HomeCard
  quickLink3?: HomeCard
  framework?: HomeCard
  whatsNew?: HomeCard
}

interface Props {
  page: ContentCollectionItem & {
    content?: HomeContent
  }
}

defineProps<Props>()

const { title, subheader } = useAppConfig()
</script>

<style scoped>
.docs-home-component {
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  padding-bottom: var(--rpl-sp-9);
  margin-bottom: var(--rpl-sp-9);
}

.docs-home-col-fill {
  display: grid;
}

.docs-home-getting-started {
  padding-top: var(--rpl-sp-8);
  padding-bottom: var(--rpl-sp-9);
  background: var(--rpl-clr-accent-alt);

  @media (--rpl-bp-m) {
    padding-top: var(--rpl-sp-9);
    padding-bottom: var(--rpl-sp-10);
  }
}
</style>
