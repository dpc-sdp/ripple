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

module.exports = {
  dataSel,
  valueSel,
  hrefSel,
  setWysiwygText
}
