<template>
  <div
    ref="target"
    :class="{ 'docs-example': true, 'with-padding': withPadding }"
  >
    <div class="docs-example-header" v-if="!hideNewTab">
      <DocsLink
        :url="storyPreviewUrl"
        target="_blank"
        isExternal
        isSmall
        iconPosition="end"
        >Open this example in a new tab</DocsLink
      >
      <DocsLink
        :url="storyUrl"
        target="_blank"
        isExternal
        isSmall
        iconPosition="end"
        >View in storybook</DocsLink
      >
    </div>
    <div class="docs-example-body">
      <iframe
        v-if="hasAppeared"
        :src="storyPreviewUrl"
        ref="iframeRef"
        class="frame"
        :style="`height: ${height}px`"
      ></iframe>
      <div v-else class="frame"></div>
    </div>
    <div class="docs-example-footer" v-if="!hideCode">
      <button
        @click="handleToggleCode"
        class="docs-example-code-btn rpl-type-p-small"
      >
        Show code
        <RplIcon
          :name="isCodeOpen ? 'icon-chevron-up' : 'icon-chevron-down'"
          size="xs"
          class="docs-example-code-btn-icon"
        />
      </button>
    </div>
    <div v-if="isCodeOpen" class="docs-example-code">
      <code class="hljs xml" v-html="highlightedCode" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useElementVisibility } from '@vueuse/core'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('xml', xml)

interface Props {
  id: string
  hideNewTab?: boolean
  hideCode?: boolean
  withPadding?: boolean
  theme?: string
  useNeutralButtons?: boolean
  argsString?: string
}

const props = withDefaults(defineProps<Props>(), {
  withPadding: false,
  theme: undefined,
  useNeutralButtons: false,
  argsString: ''
})

const SNIPPET_RENDERED = `storybook/docs/snippet-rendered`

const uid = ref<number | undefined>(0)
const iframeRef = ref<HTMLElement | null>(null)
const height = ref(100)
const isCodeOpen = ref(false)
const sourceCode = ref('')
const hasAppeared = ref(false)

const target = ref(null)
const targetIsVisible = useElementVisibility(target)

const handleToggleCode = () => {
  isCodeOpen.value = !isCodeOpen.value
}

onMounted(() => {
  uid.value = getCurrentInstance()?.uid
  // Here we hook into the 'snippet rendered' hook from storybook, which will
  // give us the code snippet for the example. This hook is trigger using
  // window.postMessage from inside the iframe.
  window.addEventListener(
    'message',
    async (event) => {
      let parsedData
      try {
        parsedData = JSON.parse(event.data)
      } catch {
        return
      }
      if (parsedData.event?.type === SNIPPET_RENDERED) {
        if (parsedData.event.args[0] === props.id) {
          sourceCode.value = parsedData.event.args[1]
        }
      }
      if (
        parsedData?.iframeSize &&
        parsedData.id === props.id &&
        parsedData.uid === uid.value
      ) {
        height.value = parsedData.iframeSize + 12
      }
    },
    false
  )
})

const highlightedCode = computed((): string => {
  const result = hljs.highlight(sourceCode.value, {
    language: 'xml'
  })

  return result.value
})

const { storybookBaseUrl } = useAppConfig()

const injectedTheme = inject('exampleTheme', 'default')

const computedTheme = computed(() => {
  return props.theme ? props.theme : injectedTheme.value
})
const buttonTheme = computed(() => {
  return props.useNeutralButtons ? 'neutral' : 'default'
})

const sharedParams = computed(
  () =>
    `args=${props.argsString}&viewMode=story&globals=theme:${computedTheme.value};buttonTheme:${buttonTheme.value}&uid=${uid.value}`
)

const storyUrl = computed(
  () => `${storybookBaseUrl}/?path=/story/${props.id}&${sharedParams.value}`
)

const storyPreviewUrl = computed(
  () => `${storybookBaseUrl}/iframe.html?id=${props.id}&${sharedParams.value}`
)

watch(targetIsVisible, (visible, wasVisible) => {
  if (visible && !wasVisible) {
    hasAppeared.value = true
  }
})
</script>

<style scoped>
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';
.docs-example {
  border: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  background: white;

  margin: var(--rpl-sp-3) 0;

  @media (--rpl-bp-l) {
    margin: var(--rpl-sp-4) 0;
  }
}

.frame {
  width: 100%;
  height: 100px;
  border: none;
  overflow: hidden;
  vertical-align: bottom;
  margin-bottom: calc(-1 * var(--rpl-sp-3));
}

.with-padding .docs-example-body {
  padding: var(--rpl-sp-5);
}

.docs-example-header {
  border-bottom: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  padding: var(--rpl-sp-3) var(--rpl-sp-5);

  display: flex;
  flex-direction: column;
  gap: var(--rpl-sp-3);

  @media (--rpl-bp-s) {
    align-items: center;
    flex-direction: row;
    gap: var(--rpl-sp-4);
  }
}

.docs-example-footer {
  position: relative;
  border-top: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  padding: var(--rpl-sp-3) var(--rpl-sp-5);
}

.docs-example-code {
  border-top: var(--rpl-border-1) solid var(--rpl-clr-neutral-300);
  background: var(--rpl-clr-neutral-100);
}

.docs-example-code-btn {
  display: flex;
  align-items: center;
  gap: var(--rpl-sp-2);
  text-decoration: underline;
}

.docs-example-code-btn:hover {
  text-decoration: none;
}

.docs-example-code-btn-icon {
  color: var(--rpl-clr-neutral-600);
}
</style>

<style>
.docs-example-code .hljs {
  background: var(--rpl-clr-neutral-100);
  padding: var(--rpl-sp-5);
  white-space: pre;
  overflow-x: auto;
  display: block;
}
</style>
