import { storiesOf } from '@storybook/vue'
import RplMarkup from './Markup.vue'

import {
  withKnobs,
  text
} from '@storybook/addon-knobs'

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
                  src="https://develop.content.vic.gov.au/sites/default/files/2019-03/womens-honour-roll-2019-Judy-Tegart-Dalton.png"
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
