import { storiesOf } from '@storybook/vue'
import RplMarkup from './Markup.vue'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/Markup', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    components: { RplMarkup },
    template: `<rpl-markup :html="html" />`,
    props: {
      html: {
        default: text('Html', `
        <h2>Embedded document</h2>
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
                  href="https://nginx-php-content-vic-develop.lagoon.vicsdp.amazee.io/sites/default/files/2018-10/Detailed%20Guide%20on%20the%20mandatory%20IR%20management%20criteria.docx"
                  aria-label=" Detailed Guide on the mandatory IR management criteria  File type: Word. Size: 75.22 KB."
                  class="x-office-document tide-external-link"
                  target="_blank"
                  ><span class="file--title">
                    Detailed Guide on the mandatory IR management criteria </span
                  ><span class="file--type">Word</span
                  ><span class="file--size">75.22 KB</span></a
                ></span
              >
            </div>
          </article>
        </article>
        <h2>Link</h2>
        <p>
          A paragraph of <strong>text</strong> with a
          <a href="https://vic.gov.au">link</a>.
        </p>
        <h2>Button</h2>
        <a href="http://www.google.com" class="button">go to google</a>
        <h2>Quotation</h2>
        <blockquote class="quotation">
          <p>
            Berios sim destrum facientota nis ex eost aut prae vendis explam aliquis
            dolorpo rrorem reptaep elenis net.
          </p>
          <footer>
            <cite
              ><span class="quotation__author"
                >Her Excellency the Honourable Linda Dessau AC</span
              ><br />
              <span class="quotation__author-title">Governor of Victoria</span></cite
            >
          </footer>
        </blockquote>
        <h2>Image</h2>
        <figure
          role="group"
          class="caption caption-article embedded-entity embedded-entity--media embedded-entity--media--image"
        >
          <article>
            <article class="media media--type-image media--view-mode-embedded">
              <div
                class="field field--name-field-media-image field--type-image field--label-hidden field__item"
              >
                <img
                  alt=" Judy Tegart-Dalton AM - 2019 Victorian Honour Roll of Women inductee"
                  height="150"
                  src="https://www.develop.content.vic.gov.au/sites/default/files/2019-03/womens-honour-roll-2019-Judy-Tegart-Dalton.png"
                  title=" Judy Tegart-Dalton AM - 2019 Victorian Honour Roll of Women inductee"
                  width="150"
                />
              </div>
            </article>
          </article>
          <figcaption>caption</figcaption>
        </figure>
        `)
      }
    }
  }))
  .add('Markup/Button', () => ({
    components: { RplMarkup },
    template: `<rpl-markup :html="html" />`,
    data () {
      return {
        html: `
          <a href="http://www.google.com" class="button">go to google</a>
        `
      }
    }
  }))
  .add('Markup/Iframe', () => ({
    components: { RplMarkup },
    template: `<rpl-markup :html="html" />`,
    data () {
      return {
        html: `
          <iframe frameborder="0" height="200" scrolling="no" src="https://mazzanet.net.au/cfa/?magickey=cfamonitor&amp;reg=13" width="80"></iframe>
        `
      }
    }
  }))
  .add('Markup/Embedded video', () => ({
    components: { RplMarkup },
    template: `<rpl-markup :html="html" />`,
    data () {
      return {
        html: `
        <figure
        role="group"
        class="caption caption-article embedded-entity embedded-entity--media embedded-entity--media--embedded-video"
      >
        <article>
          <article
            class="media media--type-embedded-video media--view-mode-embedded-with-transcript"
          >
            <div
              class="field field--name-field-media-video-embed-field field--type-video-embed-field field--label-hidden field__item"
            >
              <div
                class="video-embed-field-provider-youtube video-embed-field-responsive-video"
              >
                <iframe
                  allowfullscreen="allowfullscreen"
                  frameborder="0"
                  height="480"
                  src="https://www.youtube.com/embed/bSlnfyGTiss?autoplay=0&amp;start=0&amp;rel=0"
                  width="854"
                ></iframe>
              </div>
            </div>
            <div
              class="field field--name-field-media-link field--type-string field--label-hidden field__item"
            >
              <a href="/media/1665" class="rpl-link rpl-link--nuxt rpl-text-link"
                ><span
                  ><span>View</span
                  ><span class="rpl-text-icon__group"> transcript<!----></span
                  ><!----></span
                ></a
              >
            </div>
          </article>
        </article>
        <figcaption>This is a caption</figcaption>
      </figure>
        `
      }
    }
  }))
  .add('Markup/Image', () => ({
    components: { RplMarkup },
    template: `<rpl-markup :html="html" />`,
    data () {
      return {
        html: `
          <figure
          role="group"
          class="caption caption-article embedded-entity embedded-entity--media embedded-entity--media--image"
        >
          <article>
            <article class="media media--type-image media--view-mode-embedded">
              <div
                class="field field--name-field-media-image field--type-image field--label-hidden field__item"
              >
                <img
                  alt=" Judy Tegart-Dalton AM - 2019 Victorian Honour Roll of Women inductee"
                  height="150"
                  src="https://www.develop.content.vic.gov.au/sites/default/files/2019-03/womens-honour-roll-2019-Judy-Tegart-Dalton.png"
                  title=" Judy Tegart-Dalton AM - 2019 Victorian Honour Roll of Women inductee"
                  width="150"
                />
              </div>
            </article>
          </article>
          <figcaption>caption</figcaption>
        </figure>
        `
      }
    }
  }))
  .add('Markup/Link', () => ({
    components: { RplMarkup },
    template: `<rpl-markup :html="html" />`,
    data () {
      return {
        html: `
          <p>
            A paragraph of <strong>text</strong> with a
            <a href="#">relative link</a> and
            <a href="https://vic.gov.au">external link</a>.
          </p>
        `
      }
    }
  }))
  .add('Markup/Quotation', () => ({
    components: { RplMarkup },
    template: `<rpl-markup :html="html" />`,
    data () {
      return {
        html: `
        <blockquote class="quotation">
          <p>
            Berios sim destrum facientota nis ex eost aut prae vendis explam aliquis
            dolorpo rrorem reptaep elenis net.
          </p>
          <footer>
            <cite
              ><span class="quotation__author"
                >Her Excellency the Honourable Linda Dessau AC</span
              ><br />
              <span class="quotation__author-title">Governor of Victoria</span></cite
            >
          </footer>
        </blockquote>
        `
      }
    }
  }))
  .add('Markup/Embedded document', () => ({
    components: { RplMarkup },
    template: `<rpl-markup :html="html" />`,
    data () {
      return {
        html: `
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
                href="https://nginx-php-content-vic-develop.lagoon.vicsdp.amazee.io/sites/default/files/2018-10/Detailed%20Guide%20on%20the%20mandatory%20IR%20management%20criteria.docx"
                aria-label=" Detailed Guide on the mandatory IR management criteria  File type: Word. Size: 75.22 KB."
                class="x-office-document tide-external-link"
                target="_blank"
                ><span class="file--title">
                  Detailed Guide on the mandatory IR management criteria </span
                ><span class="file--type">Word</span
                ><span class="file--size">75.22 KB</span></a
              ></span
            >
          </div>
        </article>
      </article>
        `
      }
    }
  }))
  .add('Markup/Tables', () => ({
    components: { RplMarkup },
    template: `<rpl-markup :html="html" />`,
    data () {
      return {
        html: `
        <div class="rpl-markup__table">
          <table><caption>This is the table caption</caption> <thead><tr><th>Column 1</th> <th>Column 2</th> <th>Column 3 has quite a long heading</th> <th>Column 4<br>
          $000</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1 content</td>
              <td>row 1 content</td>
              <td>
                <p>asymmetrical beard. Waistcoat photo booth synth drinking vinegar gastropub. Tilde pork belly gastropub, tacos
                  heirloom cold-pressed trust fund cred iPhone listicle succulents pok pok twee. Hell of vinyl tofu portland.
                  Sustainable woke pour-over man braid lyft lumbersexual crucifix iPhone, franzen subway tile four dollar toast
                  hoodie artisan. Retro hoodie occupy waistcoat narwhal. Succulents portland squid narwhal small batch</p>
                <p>asymmetrical beard. Waistcoat photo booth synth drinking vinegar gastropub. Tilde pork belly gastropub, tacos
                  heirloom cold-pressed trust fund cred iPhone listicle succulents pok pok twee. Hell of vinyl tofu portland.
                  Sustainable woke pour-over man braid lyft lumbersexual crucifix iPhone, franzen subway tile four dollar toast
                  hoodie artisan. Retro hoodie occupy waistcoat narwhal. Succulents portland squid narwhal small batch.</p>
                <ul>
                  <li>sometimes tables have lists</li>
                  <li>sometimes tables have lists</li>
                  <li>sometimes tables have lists</li>
                </ul>
              </td>
              <td>1,234,567</td>
            </tr>
            <tr>
              <td>Row 2 content</td>
              <td>row 2 content</td>
              <td>
                <p>asymmetrical beard. Waistcoat photo booth synth drinking vinegar gastropub. Tilde pork belly gastropub, tacos
                  heirloom cold-pressed trust fund cred iPhone listicle succulents pok pok twee. Hell of vinyl tofu portland.
                  Sustainable woke pour-over man braid lyft lumbersexual crucifix iPhone, franzen subway tile four dollar toast
                  hoodie artisan. Retro hoodie occupy waistcoat narwhal. Succulents portland squid narwhal small batch.</p>
              </td>
              <td>384</td>
            </tr>
            <tr>
              <td>Row 3 content</td>
              <td>row 3 content</td>
              <td>
                <p>asymmetrical beard. Waistcoat photo booth synth drinking vinegar gastropub. Tilde pork belly gastropub, tacos
                  heirloom cold-pressed trust fund cred iPhone listicle succulents pok pok twee. Hell of vinyl tofu portland.
                  Sustainable woke pour-over man braid lyft lumbersexual crucifix iPhone, franzen subway tile four dollar toast
                  hoodie artisan. Retro hoodie occupy waistcoat narwhal. Succulents portland squid narwhal small batch.</p>
              </td>
              <td>568,658</td>
            </tr>
            <tr>
              <td>x</td>
              <td>y</td>
              <td>z</td>
              <td>zz</td>
            </tr>
          </tbody>
          </table>
        </div>
        `
      }
    }
  }))
