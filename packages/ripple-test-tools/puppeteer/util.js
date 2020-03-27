const dataSel = (elName) => `[data-drupal-selector="${elName}"]`
const hrefSel = (href) => `a[href="${href}"]`
const valueSel = (value) => `[value="${value}"]`

const setWysiwygText = async (selector, content, page) => {
  await page.waitForSelector(selector)
  return page.$eval(selector, (el, data) => {
    const ckEditor = el.querySelector('.cke_wysiwyg_frame')
    if (ckEditor) {
      const iframe = ckEditor.contentDocument || ckEditor.contentWindow.document
      const bodyEditor = iframe.querySelector('body')
      if (bodyEditor) {
        bodyEditor.innerHTML = data
      }
    }
  }, content)
}

const addWysiwygMediaEmbed = async (selector, bundle, index, page) => {
  await page.waitForSelector(selector)
  await page.waitFor(1000)
  await page.waitForSelector(selector + ' .cke_button__tide_media')
  await page.click(selector + ' .cke_button__tide_media')
  await page.waitFor(1000)

  // Get iFrame
  const elementHandle = await page.$('iframe#entity_browser_iframe_tide_media_browser_iframe')
  const frame = await elementHandle.contentFrame()

  await frame.select('#edit-bundle', bundle)
  await frame.click(dataSel('edit-submit-tide-media-browser'))
  await page.waitFor(1000)
  await frame.click(`.view-tide-media-browser .views-table tbody > tr:nth-child(${index}) .views-field-entity-browser-select .form-checkbox`)
  await frame.click(dataSel('edit-submit'))
  await page.waitFor(1000)
  await page.click('.ui-dialog-buttonpane .button--primary.form-submit')
  await page.waitFor(1000)
}

module.exports = {
  dataSel,
  valueSel,
  hrefSel,
  setWysiwygText,
  addWysiwygMediaEmbed
}
