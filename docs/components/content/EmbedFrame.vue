<script setup lang="ts">
import { ref, onMounted } from '#imports'
const props = defineProps({
  figma: {
    type: [String, undefined],
    default: undefined
  },
  storyId: {
    type: [String, undefined],
    default: undefined
  },
  storyViewMode: {
    type: String,
    default: 'docs'
  },
  storyBase: {
    type: String,
    default: 'https://uat--624ac117357335003a84dac3.chromatic.com/iframe.html'
  },
  figmaBase: {
    type: String,
    default: 'https://www.figma.com/embed?embed_host=share&url='
  },
  height: {
    type: Number,
    default: 400
  },
  fullscreen: {
    type: Boolean,
    default: true
  },
  hideTabs: {
    type: Boolean,
    default: false
  }
})

const providers = {}

if (props.storyId) {
  providers['Storybook'] = () =>
    `${props.storyBase}?id=${props.storyId}&viewMode=${props.storyViewMode}`
}
if (props.figma) {
  providers['Figma'] = () => `${props.figmaBase}${props.figma}`
}

const providersTabs = Object.keys(providers).map((p) => ({ label: p }))
const activeTabIndex = ref(-1)
const tabs = ref()
const url = ref('')
const provider = ref('')

const changeProvider = (value) => {
  provider.value = value
  url.value = providers[provider.value]()
}

const updateTab = (i: number) => {
  activeTabIndex.value = i
  changeProvider(providersTabs[i].label)
}

onMounted(() => {
  provider.value = Object.keys(providers)[0]
  url.value = providers[provider.value]()
  // Set active tab
  activeTabIndex.value = Object.keys(providers).indexOf(provider.value)
})
</script>

<template>
  <div :class="`sandbox my-4 min-h-[${height}px] w-full`">
    <div
      v-if="fullscreen"
      class="tabs-header relative text-white bg-gray-700 min-h-[35px]"
    >
      <TabsHeader
        v-if="providersTabs.length > 0"
        ref="tabs"
        :active-tab-index="activeTabIndex"
        :tabs="providersTabs"
        @update:active-tab-index="updateTab"
      >
      </TabsHeader>
      <div class="absolute top-1/2 right-0 -translate-y-1/2 transform px-4">
        <NuxtLink
          class="
            flex
            text-secondary
            hover:text-secondary-hover
            transition-colors transition-base
            items-center
            text-gray-200
            dark:text-gray-400
          "
          :to="url"
          target="_blank"
        >
          <Icon name="heroicons-outline:arrows-expand" class="h-6 w-6" />
        </NuxtLink>
      </div>
    </div>

    <iframe
      v-if="url"
      :src="url"
      title="Figma link"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      :class="`h-full min-h-[${height}px] w-full overflow-hidden`"
      :height="height"
    />
  </div>
</template>
