import type { Meta, StoryObj } from '@storybook/vue3'
import RplContent from './RplContent.vue'
// @ts-ignore: Cannot find module
import testcontent from './fixtures/testcontent.html?raw'
import '@dpc-sdp/ripple-ui-core/style/components'

export default {
  title: 'Core/Containers/Content',
  component: RplContent,
  parameters: {
    source: 'html'
  }
} satisfies Meta<typeof RplContent>

type Story = StoryObj<typeof RplContent>

export const AllContent: Story = {
  args: {
    html: testcontent
  }
}

export const Callout: Story = {
  args: {
    html: `<div class="rpl-callout">
      <h3>H3 Heading</h3>
      <p>
        Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </p>
    </div>`
  }
}

export const CalloutNeutral: Story = {
  name: 'Callout - Neutral',
  args: {
    html: `<div class="rpl-callout rpl-callout--neutral">
      <p>
        Paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </p>
    </div>`
  }
}

export const Blockquote: Story = {
  args: {
    html: `<figure class="rpl-blockquote">
        <blockquote class="rpl-blockquote__quote">
          <p class="rpl-type-p-large-fixed">
            "Berios sim destrum facientota nis ex eost aut prae vendis explam aliquis dolorpo rrorem reptaep elenis net."
          </p>
        </blockquote>
        <figcaption class="rpl-blockquote__author rpl-type-label-small">
          <span class="rpl-blockquote__author-name">Her Excellency the Honourable Linda Dessau AC</span>
          <span class="rpl-blockquote__author-title">Governor of Victoria</span>
        </figcaption>
      </figure>`
  }
}

export const BlockquoteMultiline: Story = {
  name: 'Blockquote - Multiline',
  args: {
    html: `<figure class="rpl-blockquote">
        <blockquote class="rpl-blockquote__quote">
          <p class="rpl-type-p-large-fixed">
            "Berios sim destrum facientota nis ex eost aut prae vendis explam aliquis dolorpo rrorem reptaep elenis net."
          </p>
          <p class="rpl-type-p-large-fixed">
            "Destrum facientota nis ex eost aut prae vendis explam aliquis dolorpo rrorem reptaep elenis net."
          </p>
        </blockquote>
        <figcaption class="rpl-blockquote__author rpl-type-label-small">
          <span class="rpl-blockquote__author-name">Her Excellency the Honourable Linda Dessau AC</span>
          <span class="rpl-blockquote__author-title">Governor of Victoria</span>
        </figcaption>
      </figure>`
  }
}

export const File: Story = {
  args: {
    html: `<figure class="rpl-document">
        <a
         class="rpl-document__link rpl-u-focusable-within"
         aria-label="Example file File type: PDF. Size: 1.5 mb."
         href="http://vic.gov.au/"
         target="_blank">
          <span class="rpl-document__icon rpl-icon rpl-icon--size-l rpl-icon--colour-default rpl-icon--icon-document-lined">
            <svg role="presentation"><use xlink:href="#icon-document-lined"></use></svg>
          </span>
          <div class="rpl-document__content">
            <span class="rpl-document__name rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline">This is an example of a document title</span>
            <div class="rpl-document__info rpl-type-label-small">
              <span class="rpl-file__meta">PDF</span>
              <span class="rpl-file__meta">1.5 mb</span>
            </div>
          </div>
          <span class="rpl-u-visually-hidden">(opens in a new window)</span>
        </a>
      </figure>`
  }
}

export const FileAllProps: Story = {
  name: 'File - All Props',
  args: {
    html: `<figure class="rpl-document">
        <a
         class="rpl-document__link rpl-u-focusable-within"
         aria-label="Example file File type: PDF. Size: 1.5 mb."
         href="http://vic.gov.au/"
         target="_blank">
          <span class="rpl-document__icon rpl-icon rpl-icon--size-l rpl-icon--colour-default rpl-icon--icon-document-lined">
            <svg role="presentation"><use xlink:href="#icon-document-lined"></use></svg>
          </span>
          <div class="rpl-document__content">
            <span class="rpl-document__name rpl-type-p rpl-type-weight-bold rpl-u-focusable-inline"">This is an example of a document title</span>
            <div class="rpl-document__info rpl-type-label-small">
              <span class="rpl-file__meta">PDF</span>
              <span class="rpl-file__meta">1.5 mb</span>
              <div class="rpl-file__updated">Updated July 17, 2022</div>
            </div>
          </div>
          <span class="rpl-u-visually-hidden">(opens in a new window)</span>
        </a>
        <figcaption v-if="caption" class="rpl-document__caption rpl-type-p-small">
          And this is example of a longer description of the document, this one seems very descriptive.
        </figcaption>
      </figure>`
  }
}

export const Table: Story = {
  args: {
    html: `<div class="rpl-table"><div class="rpl-table__scroll-container" tabindex="0"><table><tbody><tr><td>Lorem quis do ea aliqua est.</td><td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td><td>Lorem quis do ea aliqua est, quis.</td><td>Lorem quis do ea aliqua est commodo et laborum.</td></tr><tr><td>Lorem quis do ea aliqua est.</td><td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td><td>Lorem quis do ea aliqua est, quis.</td><td>Lorem quis do ea aliqua est commodo et laborum.</td></tr><tr><td>Lorem quis do ea aliqua est.</td><td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td><td>Lorem quis do ea aliqua est, quis.</td><td>Lorem quis do ea aliqua est commodo et laborum.</td></tr><tr><td>Lorem quis do ea aliqua est.</td><td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td><td>Lorem quis do ea aliqua est, quis.</td><td>Lorem quis do ea aliqua est commodo et laborum.</td></tr><tr><td>Lorem quis do ea aliqua est.</td><td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td><td>Lorem quis do ea aliqua est, quis.</td><td>Lorem quis do ea aliqua est commodo et laborum.</td></tr></tbody></table></div></div>`
  }
}

export const TableHeader: Story = {
  name: 'Table - Header',
  args: {
    html: `<div class="rpl-table">
      <div class="rpl-table__scroll-container" tabindex="0">
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
              <th>Column 4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lorem quis do ea aliqua est.</td>
              <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quis do ea aliqua est, quis.</td>
              <td>Lorem quis do ea aliqua est commodo et laborum.</td>
            </tr>
            <tr>
              <td>Lorem quis do ea aliqua est.</td>
              <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quis do ea aliqua est, quis.</td>
              <td>Lorem quis do ea aliqua est commodo et laborum.</td>
            </tr>
            <tr>
              <td>Lorem quis do ea aliqua est.</td>
              <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quis do ea aliqua est, quis.</td>
              <td>Lorem quis do ea aliqua est commodo et laborum.</td>
            </tr>
            <tr>
              <td>Lorem quis do ea aliqua est.</td>
              <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quis do ea aliqua est, quis.</td>
              <td>Lorem quis do ea aliqua est commodo et laborum.</td>
            </tr>
            <tr>
              <td>Lorem quis do ea aliqua est.</td>
              <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quis do ea aliqua est, quis.</td>
              <td>Lorem quis do ea aliqua est commodo et laborum.</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">Optional table footer</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>`
  }
}

export const TableCaption: Story = {
  name: 'Table - Caption',
  args: {
    html: `<div class="rpl-table">
      <div class="rpl-table__scroll-container" tabindex="0">
        <table>
          <caption>Optional table caption</caption>
          <tbody>
            <tr>
              <th>Lorem quis do ea aliqua est.</th>
              <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quis do ea aliqua est, quis.</td>
              <td>Lorem quis do ea aliqua est commodo et laborum.</td>
            </tr>
            <tr>
              <th>Lorem quis do ea aliqua est.</th>
              <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quis do ea aliqua est, quis.</td>
              <td>Lorem quis do ea aliqua est commodo et laborum.</td>
            </tr>
            <tr>
              <th>Lorem quis do ea aliqua est.</th>
              <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quis do ea aliqua est, quis.</td>
              <td>Lorem quis do ea aliqua est commodo et laborum.</td>
            </tr>
            <tr>
              <th>Lorem quis do ea aliqua est.</th>
              <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quis do ea aliqua est, quis.</td>
              <td>Lorem quis do ea aliqua est commodo et laborum.</td>
            </tr>
            <tr>
              <th>Lorem quis do ea aliqua est.</th>
              <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quis do ea aliqua est, quis.</td>
              <td>Lorem quis do ea aliqua est commodo et laborum.</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">Optional table footer</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>`
  }
}

export const TableHeaderCaption: Story = {
  name: 'Table - Header & Caption',
  args: {
    html: `<div class="rpl-table">
        <div class="rpl-table__scroll-container" tabindex="0">
          <table>
            <caption>Optional table caption</caption>
            <thead>
              <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
                <th>Column 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Lorem quis do ea aliqua est.</td>
                <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
                <td>Lorem quis do ea aliqua est, quis.</td>
                <td>Lorem quis do ea aliqua est commodo et laborum.</td>
              </tr>
              <tr>
                <td>Lorem quis do ea aliqua est.</td>
                <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
                <td>Lorem quis do ea aliqua est, quis.</td>
                <td>Lorem quis do ea aliqua est commodo et laborum.</td>
              </tr>
              <tr>
                <td>Lorem quis do ea aliqua est.</td>
                <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
                <td>Lorem quis do ea aliqua est, quis.</td>
                <td>Lorem quis do ea aliqua est commodo et laborum.</td>
              </tr>
              <tr>
                <td>Lorem quis do ea aliqua est.</td>
                <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
                <td>Lorem quis do ea aliqua est, quis.</td>
                <td>Lorem quis do ea aliqua est commodo et laborum.</td>
              </tr>
              <tr>
                <td>Lorem quis do ea aliqua est.</td>
                <td>Lorem quis do ea aliqua est ea Lorem nostrud tempor.</td>
                <td>Lorem quis do ea aliqua est, quis.</td>
                <td>Lorem quis do ea aliqua est commodo et laborum.</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4">Optional table footer</td>
              </tr>
            </tfoot>
          </table>
        </div>
    </div>`
  }
}

export const TableScrollable: Story = {
  name: 'Table - Scrollable',
  args: {
    html: `<div class="rpl-storybook__page-content rpl-table">
      <div class="rpl-table__scroll-container rpl-u-focusable-outline--visible" tabindex="0">
        <table>
          <caption>Optional table caption</caption>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Column 3</th>
              <th>Column 4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lorem quis do quiceaaliquaest.</td>
              <td>Loremquisdoealiqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quisdoeaaliquaest, quis.</td>
              <td>Lorem quis do ea aliqua est commodoetlaborumetata.</td>
            </tr>
            <tr>
              <td>Lorem quis do quiceaaliquaest.</td>
              <td>Loremquisdoealiqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quisdoeaaliquaest, quis.</td>
              <td>Lorem quis do ea aliqua est commodoetlaborumetata.</td>
            </tr>
            <tr>
              <td>Lorem quis do quiceaaliquaest.</td>
              <td>Loremquisdoealiqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quisdoeaaliquaest, quis.</td>
              <td>Lorem quis do ea aliqua est commodoetlaborumetata.</td>
            </tr>
            <tr>
              <td>Lorem quis do quiceaaliquaest.</td>
              <td>Loremquisdoealiqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quisdoeaaliquaest, quis.</td>
              <td>Lorem quis do ea aliqua est commodoetlaborumetata.</td>
            </tr>
            <tr>
              <td>Lorem quis do quiceaaliquaest.</td>
              <td>Loremquisdoealiqua est ea Lorem nostrud tempor.</td>
              <td>Lorem quisdoeaaliquaest, quis.</td>
              <td>Lorem quis do ea aliqua est commodoetlaborumetata.</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">Optional table footer</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>`
  }
}
