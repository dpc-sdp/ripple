---
to: "<%= locals.createTests ? `${cypressPath}/fixtures/${h.changeCase.kebabCase(name)}/sample-${h.changeCase.kebabCase(name)}.json` : null %>"
---

{
  "title": "Sample <%= name %>",
  "changed": "2022-11-16T16:39:04+11:00",
  "created": "2022-10-10T12:44:43+11:00",
  "type": "<%= h.changeCase.snakeCase(name) %>",
  "nid": "00000000-0000-0000-0000-000000000000",
  "header": {
    "title": "Sample <%= name %>",
    "summary": "Excepteur consectetur amet cillum adipisicing consectetur commodo aliquip velit in."
  },
  "body": {
    "image": {
      "src": "https://develop.content.reference.sdp.vic.gov.au/sites/default/files/tide_demo_content/Melbourne-tram.jpg",
      "alt": "Image of tram",
      "width": 450,
      "height": 270
    },
    "caption": "Caption for image of tram",
    "content": "<p><strong>Some body content text. </strong>Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'de Finibus Bonorum et Malorum' (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.</p>\n\n<p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from 'de Finibus Bonorum et Malorum' by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>"
  },
  "showTopicTags": true,
  "topicTags": [
    {
      "text": "Another Demo Topic",
      "url": "/topic/another-demo-topic"
    },
    {
      "text": "Another Demo Tag",
      "url": "/tags/another-demo-tag"
    },
    {
      "text": "Demo Tag",
      "url": "/tags/demo-tag"
    }
  ],
  "dynamicComponents": [
    {
      "uuid": "00000000-0000-0000-0000-000000000000",
      "component": "RplContent",
      "id": "123",
      "props": {
        "html": "<p>Here is <em>some</em> sample <strong>rich</strong> text content</p>"
      }
    }
  ]
}
