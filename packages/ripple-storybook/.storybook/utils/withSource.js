/**
 * Adds proper support for Vue 3 code snippets in Storybook 9.
 */

import { addons } from 'storybook/preview-api'
import kebabCase from 'lodash.kebabcase'
import { h, onMounted } from 'vue'

// this value doesn't seem to be exported by addons-docs
export const SNIPPET_RENDERED = `storybook/docs/snippet-rendered`

const propToSource = (key, val) => {
  const type = typeof val
  switch (type) {
    case 'function':
      return val ? key : ''
    case 'boolean':
      return val ? key : ''
    case 'string':
      return `${key}="${val}"`
    case 'object':
      return `${key}="${JSON.stringify(val, null, 4)
        .replace(/"(\w+)"\s*:/g, '$1:')
        .replaceAll('"', "'")}"` // here
    default:
      return `:${key}="${val}"`
  }
}

function templateSourceCode(
  templateSource,
  args,
  argTypes,
  replacing = 'v-bind="args"'
) {
  const componentArgs = {}
  for (const [k, t] of Object.entries(argTypes)) {
    const val = args[k]
    if (
      typeof val !== 'undefined' &&
      t.table &&
      t.table.category === 'props' &&
      val !== t.defaultValue
    ) {
      componentArgs[k] = val
    }
  }

  return templateSource.replace(
    replacing,
    Object.keys(componentArgs)
      .map((key) => ' ' + propToSource(kebabCase(key), args[key]))
      .join('')
  )
}

async function getSnippet(prettier, code, prettierHtml) {
  let snippet = ''

  try {
    snippet = await prettier.format(`<template>${code}</template>`, {
      parser: 'vue',
      plugins: [prettierHtml],
      htmlWhitespaceSensitivity: 'ignore'
    })
  } catch (e) {
    console.warn('Failed to get snippet', e)
  }

  return snippet
}

export const withSource = (storyFn, context) => {
  const story = storyFn(context)

  // this returns a new component that computes the source code when mounted
  // and emits an event that is handled by addons-docs
  return {
    components: {
      Story: story
    },

    setup() {
      onMounted(async () => {
        // set overflow hidden when embedding in the docs site,
        // this is to avoid the scrollbar jumping in and out as content expands
        const searchParams = new URLSearchParams(window.location.search)
        if (searchParams.get('rplDocs')) {
          document.body.style.overflow = 'hidden'
        }

        try {
          let code = ''
          const originalStory = context.originalStoryFn(context.args, context)
          // get the story source
          let src = originalStory?.template

          if (context.parameters?.source) {
            // optionally render a parameter as is, i.e., HTML prop
            code = context.args[context.parameters?.source]
          } else if (src) {
            // generate the source code based on the current args
            code = templateSourceCode(src, context.args, context.argTypes)
          } else {
            const rawStory = originalStory()
            const propsString = Object.entries(rawStory.props || {})
              .map(([key, val]) => propToSource(kebabCase(key), val))
              .join(' ')

            code = `<${rawStory.type.__name}${propsString ? ' ' + propsString : ''} />`
          }

          const channel = addons.getChannel()

          const emitFormattedTemplate = async () => {
            const prettier = await import('prettier/standalone')
            const prettierHtml = await import('prettier/parser-html')

            const snippet = await getSnippet(prettier, code, prettierHtml)

            // We need to add wrapping template tags to render the actual code snippet otherwise
            // certain examples will break, however, we don't want to display the template
            // tags in the code example, so we manually remove them here.
            const snippetWithoutTemplateTags = snippet
              .replace(/^<template>/, '')
              .replace(/<\/template>\s*$/, '')
              .trim()

            // emits an event when the transformation is completed
            channel.emit(
              SNIPPET_RENDERED,
              (context || {}).id,
              snippetWithoutTemplateTags
            )
          }

          setTimeout(emitFormattedTemplate, 0)
        } catch (e) {
          console.warn('Failed to render code', e)
        }
      })

      return () => h(story)
    }
  }
}
