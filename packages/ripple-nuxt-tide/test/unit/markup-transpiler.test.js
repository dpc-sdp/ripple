import markupTranspiler from '@dpc-sdp/ripple-markup/markup-transpiler.js'
import markupPlugins from '../../lib/core/markup-plugins-loader.js'

describe('Markup transpiler', () => {
  test('should able transpile html into vue template', () => {
    const html = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

<blockquote class="quotation">
  <p>Berios sim destrum facientota nis ex eost aut prae vendis explam aliquis dolorpo rrorem reptaep elenis net.</p>

  <footer><cite><span class="quotation__author">Her Excellency the Honourable Linda Dessau AC</span><br>
  <span class="quotation__author-title">Governor of Victoria</span> </cite></footer>
</blockquote>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sodales egestas efficitur.</p>

<p><a class="button" href="Primary-button-link">Primary button text</a></p>
<p><a class="button button--secondary" href="Secondary-button-link">Secondary button text</a></p>

<article
    class="embedded-entity embedded-entity--media embedded-entity--media--image"
  >
    <article class="media media--type-image media--view-mode-embedded">
      <div
        class="field field--name-field-media-image field--type-image field--label-hidden field__item"
      >
        <img
        src="https://nginx-php-content-vic-develop.lagoon.vicsdp.amazee.io/sites/default/files/2018-06/call-to-action.jpg"
        width="275" height="183" alt="" title="A dummy call to action image (title)">
      </div>
    </article>
  </article>
  <article
    class="embedded-entity embedded-entity--media embedded-entity--media--document"
  >
    <article class="media media--type-document media--view-mode-embedded">
      <div
        class="field field--name-field-media-file field--type-file field--label-hidden field__item"
      >
        <span class="file file--mime-application-zip file--package-x-generic"
          ><a
            href="https://www.develop.content.vic.gov.au/sites/default/files/2018-12/Screen%20Shot%202018-12-05%20at%2010.17.01%20am.zip"
            aria-label="test zip File type: Other. Size: 787.53 KB."
            class="package-x-generic tide-external-link"
            target="_blank"
            ><span class="file--title">test zip</span
            ><span class="file--type">Other</span
            ><span class="file--size">787.53 KB</span></a
          ></span
        >
      </div>
    </article>
  </article>
  <article
    class="embedded-entity embedded-entity--media embedded-entity--media--document"
  >
    <article class="media media--type-document media--view-mode-embedded">
      <div
        class="field field--name-field-media-file field--type-file field--label-hidden field__item"
      >
        <span
          class="file file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document file--x-office-document"
          ><a
            href="https://www.develop.content.vic.gov.au/sites/default/files/2018-12/180629SSP%20User%20Research%20%26%20Testing%20Playbook%20Final.docx"
            aria-label="docx File type: Word. Size: 60.17 KB."
            class="x-office-document tide-external-link"
            target="_blank"
            ><span class="file--title">docx</span
            ><span class="file--type">Word</span
            ><span class="file--size">60.17 KB</span></a
          ></span
        >
      </div>
    </article>
  </article>
  <article
    class="embedded-entity embedded-entity--media embedded-entity--media--document"
  >
    <article class="media media--type-document media--view-mode-embedded">
      <div
        class="field field--name-field-media-file field--type-file field--label-hidden field__item"
      >
        <span
          class="file file--mime-application-vnd-ms-excel file--x-office-spreadsheet"
          ><a
            href="https://www.develop.content.vic.gov.au/sites/default/files/2018-12/list_one.xls"
            aria-label="xls File type: Excel. Size: 93 KB."
            class="x-office-spreadsheet tide-external-link"
            target="_blank"
            ><span class="file--title">xls</span
            ><span class="file--type">Excel</span
            ><span class="file--size">93 KB</span></a
          ></span
        >
      </div>
    </article>
  </article>
  <article
    class="embedded-entity embedded-entity--media embedded-entity--media--document"
  >
    <article class="media media--type-document media--view-mode-embedded">
      <div
        class="field field--name-field-media-file field--type-file field--label-hidden field__item"
      >
        <span
          class="file file--mime-application-vnd-openxmlformats-officedocument-presentationml-presentation file--x-office-presentation"
          ><a
            href="https://www.develop.content.vic.gov.au/sites/default/files/2018-12/samplepptx.pptx"
            aria-label="pptx File type: PPT. Size: 404.19 KB."
            class="x-office-presentation tide-external-link"
            target="_blank"
            ><span class="file--title">pptx</span
            ><span class="file--type">PPT</span
            ><span class="file--size">404.19 KB</span></a
          ></span
        >
      </div>
    </article>
  </article>
  <article
    class="embedded-entity embedded-entity--media embedded-entity--media--document"
  >
    <article class="media media--type-document media--view-mode-embedded">
      <div
        class="field field--name-field-media-file field--type-file field--label-hidden field__item"
      >
        <span class="file file--mime-text-csv file--text"
          ><a
            href="https://www.develop.content.vic.gov.au/sites/default/files/2018-12/C2ImportCalEventSample.csv"
            aria-label="csv File type: Text. Size: 545 bytes."
            class="text tide-external-link"
            target="_blank"
            ><span class="file--title">csv</span
            ><span class="file--type">Text</span
            ><span class="file--size">545 bytes</span></a
          ></span
        >
      </div>
    </article>
  </article>
  <article
    class="embedded-entity embedded-entity--media embedded-entity--media--document"
  >
    <article class="media media--type-document media--view-mode-embedded">
      <div
        class="field field--name-field-media-file field--type-file field--label-hidden field__item"
      >
        <span class="file file--mime-application-msword file--x-office-document"
          ><a
            href="https://www.develop.content.vic.gov.au/sites/default/files/2018-12/TestWordDoc.doc"
            aria-label="doc File type: Word. Size: 19 KB."
            class="x-office-document tide-external-link"
            target="_blank"
            ><span class="file--title">doc</span
            ><span class="file--type">Word</span
            ><span class="file--size">19 KB</span></a
          ></span
        >
      </div>
    </article>
  </article>
  <article
    class="embedded-entity embedded-entity--media embedded-entity--media--document"
  >
    <article class="media media--type-document media--view-mode-embedded">
      <div
        class="field field--name-field-media-file field--type-file field--label-hidden field__item"
      >
        <span
          class="file file--mime-application-vnd-ms-excel file--x-office-spreadsheet"
          ><a
            href="https://www.develop.content.vic.gov.au/sites/default/files/2018-12/tests-example.xls"
            aria-label="xls File type: Excel. Size: 16 KB."
            class="x-office-spreadsheet tide-external-link"
            target="_blank"
            ><span class="file--title">xls</span
            ><span class="file--type">Excel</span
            ><span class="file--size">16 KB</span></a
          ></span
        >
      </div>
    </article>
  </article>
  <article
    class="embedded-entity embedded-entity--media embedded-entity--media--document"
  >
    <article class="media media--type-document media--view-mode-embedded">
      <div
        class="field field--name-field-media-file field--type-file field--label-hidden field__item"
      >
        <span class="file file--mime-text-plain file--text"
          ><a
            href="https://www.develop.content.vic.gov.au/sites/default/files/2018-12/Copy.txt"
            aria-label="Text doc File type: Text. Size: 374 bytes."
            class="text tide-external-link"
            target="_blank"
            ><span class="file--title">Text doc</span
            ><span class="file--type">Text</span
            ><span class="file--size">374 bytes</span></a
          ></span
        >
      </div>
    </article>
  </article>
  <figure role="group" class="caption caption-article embedded-entity embedded-entity--media embedded-entity--media--document">
    <article>
      <article class="media media--type-document media--view-mode-embedded">
        <div class="field field--name-field-media-file field--type-file field--label-hidden field__item">
          <span class="file file--mime-text-calendar file--text">
            <a aria-label="ICS as Doc File type: Text. Size: 24.28 KB." class="text" href="https://nginx-php-content-vic-develop.lagoon.vicsdp.amazee.io/sites/default/files/2019-02/AAA10am%20to%201015am%20on%20weekdays%20%28AEDT%29%20_0.ics"><span class="file--title">ICS as Doc</span><span class="file--type">Text</span><span class="file--size">24.28 KB</span></a></span>
        </div>  
      </article>
    </article>
    <figcaption>Caption</figcaption>
  </figure>

<p class="wysiwyg-callout">A callout test.</p>
<p class="wysiwyg-callout">Another callout test.</p>

<p>&nbsp;</p>

<p>&nbsp;</p>`

    const result = markupTranspiler(html, markupPlugins)
    expect(result).toMatchSnapshot()
  })
})
