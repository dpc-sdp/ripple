import { anchorUtils } from '../../lib/core/anchorlinks'

const html = `<h1>First Heading</h1>
<h2>Second Heading</h2>
<h3>Third Heading</h3>
<h4>Fourth Heading</h4>
<h5>Fifth Heading</h5>
<h6>First Heading</h6>
<p>Paragraph <span>With Span</span></p>
<ul><li>List item</li></ul>
<ol><li>List item</li></ol>
<table><tbody><tr><td>Table</td></tr></tbody></table>
<hr />
<h2></h2>
<h2> </h2>
<h2>

</h2>
<h2>&nbsp;</h2>
<h2>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</h2>
<h2>Special Character &amp; &lt; &gt; Heading</h2>
<h2><span>Heading 2 with inner SPAN</span></h2>
<!-- comment -->
<h2><a href="/">Heading 2 with inner LINK</a></h2>`

const testName = '   ANCHOR &amp;   `~!@#$%^&*()-_=+{}[]\\|;:\'"<>,.?/\n   link&nbsp;NAme   &copy; '

describe('anchor link utilities', () => {
  test(`returns "anchor-link-name" for "${testName}"`, async () => {
    expect(anchorUtils.getAnchorLinkName(testName, {})).toBe('anchor-link-name')
  })

  test('should get heading name occurrence count', async () => {
    let existing = {}
    anchorUtils.getAnchorLinkName('duplicate heading', existing)
    anchorUtils.getAnchorLinkName('original heading', existing)
    anchorUtils.getAnchorLinkName('duplicate heading', existing)
    anchorUtils.getAnchorLinkName('duplicate heading', existing)
    expect(existing).toEqual({
      'duplicate-heading': 3,
      'original-heading': 1
    })
  })

  test('should add id to h2 elements', async () => {
    expect(anchorUtils.getAnchorLinkHTML(html)).toEqual(`<h1>First Heading</h1>
<h2 id="second-heading">Second Heading</h2>
<h3>Third Heading</h3>
<h4>Fourth Heading</h4>
<h5>Fifth Heading</h5>
<h6>First Heading</h6>
<p>Paragraph <span>With Span</span></p>
<ul><li>List item</li></ul>
<ol><li>List item</li></ol>
<table><tbody><tr><td>Table</td></tr></tbody></table>
<hr />
<h2></h2>
<h2> </h2>
<h2>

</h2>
<h2>&nbsp;</h2>
<h2>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;</h2>
<h2 id="special-character-heading">Special Character &amp; &lt; &gt; Heading</h2>
<h2 id="heading-2-with-inner-span"><span>Heading 2 with inner SPAN</span></h2>
<!-- comment -->
<h2 id="heading-2-with-inner-link"><a href="/">Heading 2 with inner LINK</a></h2>`)
  })

  test('should get list of links with text', async () => {
    expect(anchorUtils.getAnchorLinks(html)).toEqual([
      { 'text': 'Second Heading', 'url': '#second-heading' },
      { 'text': 'Special Character & < > Heading', 'url': '#special-character-heading' },
      { 'text': 'Heading 2 with inner SPAN', 'url': '#heading-2-with-inner-span' },
      { 'text': 'Heading 2 with inner LINK', 'url': '#heading-2-with-inner-link' }
    ])
  })

  test('should get list of headings with indexStart', async () => {
    expect(anchorUtils.getAnchorHeadings(html)).toEqual([
      { 'indexStart': 23, 'text': 'Second Heading' },
      { 'indexStart': 387, 'text': 'Special Character &amp; &lt; &gt; Heading' },
      { 'indexStart': 438, 'text': 'Heading 2 with inner SPAN' },
      { 'indexStart': 503, 'text': 'Heading 2 with inner LINK' }
    ])
  })
})
