import { storiesOf } from '@storybook/vue'
import RplGrantsOverview from './GrantsOverview.vue'
import readme from './README.md'

import {
  withKnobs,
  text,
  object,
  boolean
} from '@storybook/addon-knobs/vue'

storiesOf('Organisms/Grants', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme
    }
  })
  .add('Grants Overview', () => ({
    components: { RplGrantsOverview },
    template: `<rpl-grants-overview :title="title" :funding="funding" :audience="audience" :startdate="startdate" :enddate="enddate" :description="description" :link="link" :listing="listing" />`,
    props: {
      title: {
        default: text('Title', 'Program Overview')
      },
      funding: {
        default: object('Funding', {
          from: 10000,
          to: 30000
        })
      },
      audience: {
        default: text('Audience', 'individuals, organisations, local council')
      },
      startdate: {
        default: text('Start Date', '2018-10-10T09:00:00.000+10:00')
      },
      enddate: {
        default: text('End Date', '2018-12-10T09:00:00.000+10:00')
      },
      description: {
        default: text('Description', '<p>This is a description of the grant. Omnis facilis omnis. Quia cumque eius mollitia iusto corporis suscipit aliquid qui et. Ut cumque molestiae qui aperiam totam. Vel consequatur ut at aut ipsum. Quia qui corporis totam ut. Veniam beatae praesentium recusandae.Dolorem praesentium quo molestiae beatae. Eaque natus animi omnis aliquam voluptatibus vel odit voluptatum. Sint et omnis est porro corrupti recusandae. Rem doloribus nam quia est iste. Temporibus velit qui odio et molestiae iure nam magnam. Sit et possimus neque quasi et. Quae necessitatibus debitis cumque libero natus quidem. Architecto nulla est doloremque. Ut excepturi voluptatem. Doloribus dolorem voluptates aut eos vitae ut tenetur enim suscipit. <article class="embedded-entity embedded-entity--media embedded-entity--media--document"><article class="media media--type-document media--view-mode-embedded"><div class="field field--name-field-media-file field--type-file field--label-hidden field__item"><span class="file file--mime-application-vnd-openxmlformats-officedocument-wordprocessingml-document file--x-office-document"><a href="https://nginx-php-content-vic-develop.lagoon.vicsdp.amazee.io/sites/default/files/2018-10/Detailed%20Guide%20on%20the%20mandatory%20IR%20management%20criteria.docx" aria-label=" Detailed Guide on the mandatory IR management criteria  File type: Word. Size: 75.22 KB." class="x-office-document tide-external-link" target="_blank"><span class="file--title"> Detailed Guide on the mandatory IR management criteria </span><span class="file--type">Word</span><span class="file--size">75.22 KB</span></a></span></div></article></article> <p>A paragraph of <strong>text</strong> with a <a href="https://vic.gov.au">link</a>.</p>')
      },
      link: {
        default: object('Call to action', { text: 'Apply Now', url: '#' })
      },
      listing: {
        default: boolean('Listing', false)
      }
    }
  }))
