/* eslint-disable no-irregular-whitespace */
const html = `
<!-- Basic HTML elements -->
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
<a href="http://google.com">&lt;&gt;&amp;'"©. ½ € 中文</a>
<h4>Sort out your'><&'"s finances</h4>\n\n<p><a href="https://www.test.dev/test">Here is a irregular white space</a> Another irregular white space.</p>
<p>&nbsp;</p>
<img src="https://test.dev/test.jpeg" title="&quot;Needles, Knots &amp; Threads&quot;- an Exhibition of Embroidery &amp; Quilting">
<p>&nbsp;</p>

<!-- parseForLinks -->
<h2>This is a heading 2</h2>

<!-- pluginLinks -->
<a href="/test" title="test-link">A test link <&'"</a>

<!-- pluginIframe -->
<iframe src="https://ripple.sdp.vic.gov.au"></iframe>

<!-- pluginTables -->
<table>
  <tr>
    <th>Month</th>
    <th>Savings</th>
  </tr>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
</table>

<!-- pluginEmbeddedMediaVideo -->
<figure role="group" class="caption caption-div embedded-entity embedded-entity--media embedded-entity--media--embedded-video">
  <div data-embed-button="tide_media" data-entity-embed-display="view_mode:media.embedded_with_transcript" data-entity-type="media" data-entity-uuid="12345" data-langcode="en">
    <article class="media media--type-embedded-video media--view-mode-embedded-with-transcript">
      <div class="field field--name-field-media-video-embed-field field--type-video-embed-field field--label-hidden field__item">
        <div class="video-embed-field-provider-youtube video-embed-field-responsive-video">
          <iframe allowfullscreen="allowfullscreen" frameborder="0" height="480" src="https://www.youtube.com/embed/Xb4ElZqit8k?autoplay=0&amp;start=0&amp;rel=0" width="854"></iframe>
        </div>
      </div>
      <div class="field field--name-field-media-link field--type-string field--label-hidden field__item">
        <a href="/media/1" hreflang="en">View transcript</a>
      </div>
    </article>
  </div>
  <figcaption>Some video caption text <&'"</figcaption>
</figure>

<!-- blockquote -->
<blockquote class="quotation">
  <p>Berios sim destrum facientota nis ex eost aut prae vendis explam aliquis dolorpo rrorem reptaep elenis net.</p>

  <footer><cite><span class="quotation__author">Her Excellency the Honourable Linda Dessau AC</span><br>
  <span class="quotation__author-title">Governor of Victoria</span> </cite></footer>
</blockquote>

<!-- pluginButton -->
<p><a class="button" href="Primary-button-link">Primary button text</a></p>
<p><a class="button button--secondary" href="Secondary-button-link">Secondary button text</a></p>

<!-- Embedded image -->
<article
    class="embedded-entity embedded-entity--media embedded-entity--media--image"
  >
  <article class="media media--type-image media--view-mode-embedded">
    <div
      class="field field--name-field-media-image field--type-image field--label-hidden field__item"
    >
      <img
      src="https://test.dev/sites/default/files/2018-06/call-to-action.jpg"
      width="275" height="183" alt="" title="A dummy call to action image (title)">
    </div>
  </article>
</article>

<!-- pluginEmbeddedDocument -->
<article
  class="embedded-entity embedded-entity--media embedded-entity--media--document"
>
  <article class="media media--type-document media--view-mode-embedded">
    <div
      class="field field--name-field-media-file field--type-file field--label-hidden field__item"
    >
      <span class="file file--mime-application-zip file--package-x-generic"
        ><a
          href="https://www.test.dev/sites/default/files/2018-12/Screen%20Shot%202018-12-05%20at%2010.17.01%20am.zip"
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
          href="https://www.test.dev/sites/default/files/2018-12/180629SSP%20User%20Research%20%26%20Testing%20Playbook%20Final.docx"
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
          href="https://www.test.dev/sites/default/files/2018-12/list_one.xls"
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
          href="https://www.test.dev/sites/default/files/2018-12/samplepptx.pptx"
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
          href="https://www.test.dev/sites/default/files/2018-12/C2ImportCalEventSample.csv"
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
          href="https://www.test.dev/sites/default/files/2018-12/TestWordDoc.doc"
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
          href="https://www.test.dev/sites/default/files/2018-12/tests-example.xls"
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
          href="https://www.test.dev/sites/default/files/2018-12/Copy.txt"
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
          <a aria-label="ICS as Doc File type: Text. Size: 24.28 KB." class="text" href="https://test.dev/sites/default/files/2019-02/AAA10am%20to%201015am%20on%20weekdays%20%28AEDT%29%20_0.ics"><span class="file--title">ICS as Doc</span><span class="file--type">Text</span><span class="file--size">24.28 KB</span></a></span>
      </div>  
    </article>
  </article>
  <figcaption>Caption</figcaption>
</figure>


<!-- Callout -->
<p class="wysiwyg-callout">A callout test.</p>
<p class="wysiwyg-callout">Another callout test.</p>
`

export default html
