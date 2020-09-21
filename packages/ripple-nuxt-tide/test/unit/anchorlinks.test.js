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
<h2><a href="/">Heading 2 with inner LINK</a></h2>
<h2>camelCaseHeading</h2>
<h3>This is h3 under camelCaseHeading h2</h3>`

describe('anchor link utilities', () => {
  test('should add id to h2 and h3 elements', async () => {
    expect(anchorUtils.getAnchorLinkHTML(html)).toEqual(`<h1>First Heading</h1>
<h2 id="second-heading">Second Heading</h2>
<h3 id="third-heading">Third Heading</h3>
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
<h2 id="heading-2-with-inner-link"><a href="/">Heading 2 with inner LINK</a></h2>
<h2 id="camelcaseheading">camelCaseHeading</h2>
<h3 id="this-is-h3-under-camelcaseheading-h2">This is h3 under camelCaseHeading h2</h3>`)
  })

  test('should get list of links for h2 and h3 with text', async () => {
    expect(anchorUtils.getAnchorLinks(html, true)).toEqual([
      { 'text': 'Second Heading', 'url': '#second-heading', type: 'h2' },
      { 'text': 'Third Heading', 'url': '#third-heading', type: 'h3' },
      { 'text': 'Special Character &amp; &lt; &gt; Heading', 'url': '#special-character-heading', type: 'h2' },
      { 'text': 'Heading 2 with inner SPAN', 'url': '#heading-2-with-inner-span', type: 'h2' },
      { 'text': 'Heading 2 with inner LINK', 'url': '#heading-2-with-inner-link', type: 'h2' },
      { 'text': 'camelCaseHeading', 'url': '#camelcaseheading', type: 'h2' },
      { 'text': 'This is h3 under camelCaseHeading h2', 'url': '#this-is-h3-under-camelcaseheading-h2', type: 'h3' }
    ])
  })

  test('should get the all the list of h2 links', async () => {
    expect(anchorUtils.getAnchorLinks(html)).toEqual([
      { 'text': 'Second Heading', 'url': '#second-heading', type: 'h2' },
      { 'text': 'Special Character &amp; &lt; &gt; Heading', 'url': '#special-character-heading', type: 'h2' },
      { 'text': 'Heading 2 with inner SPAN', 'url': '#heading-2-with-inner-span', type: 'h2' },
      { 'text': 'Heading 2 with inner LINK', 'url': '#heading-2-with-inner-link', type: 'h2' },
      { 'text': 'camelCaseHeading', 'url': '#camelcaseheading', type: 'h2' }
    ])
  })

  test('should get list of h2 and h3 headings with indexStart', async () => {
    expect(anchorUtils.getAnchorHeadings(html, true)).toEqual([
      { 'indexStart': 23, 'text': 'Second Heading', type: 'h2' },
      { 'indexStart': 47, 'text': 'Third Heading', type: 'h3' },
      { 'indexStart': 387, 'text': 'Special Character &amp; &lt; &gt; Heading', type: 'h2' },
      { 'indexStart': 438, 'text': 'Heading 2 with inner SPAN', type: 'h2' },
      { 'indexStart': 503, 'text': 'Heading 2 with inner LINK', type: 'h2' },
      { 'indexStart': 554, 'text': 'camelCaseHeading', type: 'h2' },
      { 'indexStart': 580, 'text': 'This is h3 under camelCaseHeading h2', type: 'h3' }
    ])
  })

  test('should get only the list of h2 headings with indexStart', async () => {
    expect(anchorUtils.getAnchorHeadings(html)).toEqual([
      { 'indexStart': 23, 'text': 'Second Heading', type: 'h2' },
      { 'indexStart': 387, 'text': 'Special Character &amp; &lt; &gt; Heading', type: 'h2' },
      { 'indexStart': 438, 'text': 'Heading 2 with inner SPAN', type: 'h2' },
      { 'indexStart': 503, 'text': 'Heading 2 with inner LINK', type: 'h2' },
      { 'indexStart': 554, 'text': 'camelCaseHeading', type: 'h2' }
    ])
  })
})
