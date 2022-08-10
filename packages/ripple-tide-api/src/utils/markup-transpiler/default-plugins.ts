/// <reference types="cheerio" />

// Note: for add obj type prop in template, please return data instead of set them in template otherwise it won't work properly.
// e.g You have something like in your plugin: `<component-obj-prop :author="{name: 'Veronica', company: 'Veridian Dynamics'}"></component-obj-prop>`
// You should make template: `<component-obj-prop :author="myPluginData1.author"></component-obj-prop>`
// Then set myPluginData1.author = {name: 'Veronica', company: 'Veridian Dynamics'} and return {myPluginData1, myPluginData2 ... } in your plugin.
// See a example in `pluginEmbeddedMediaVideo` plugin below.

export const isRelativeUrl = (str: string): boolean => {
  if (str) {
    return true
  }
  return false
}

const pluginTables = function (this: any) {
  // Wrap tables with a div.
  this.find('table').map((i: any, el: any) => {
    const $table = this.find(el)
    return $table.wrap(`<div class="rpl-table"></div>`)
  })
}

const pluginCallout = function (this: any) {
  // replace drupal class with rpl class
  this.find('.wysiwyg-callout').map((i: any, el: any) => {
    const $callout = this.find(el)
    return $callout.removeClass().addClass('rpl-callout')
  })
}

const pluginImages = function (this: any) {
  // Find all drupal image embeds
  this.find('.embedded-entity--media--image').map((i: any, el: any) => {
    const $img = this.find('img')
    const width = $img.attr('width')
    const src = $img.attr('src')
    const alt = $img.attr('alt')
    // this is the max width of the content area
    const contentWidth = 606
    return this.find(el).replaceWith(
      `<img src="${src}" class="rpl-img" width="${width}" alt="${alt}" srcset="${src}?width=${contentWidth},
      ${src}?width=${contentWidth * 2} 2x"></img>`
    )
  })
}

export default [pluginCallout, pluginTables, pluginImages]
