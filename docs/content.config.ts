import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['**/_*/**']
      },
      schema: z.object({
        published: z.boolean().default(true),
        path: z.string(),
        title: z.string(),
        layout: z.string(),
        description: z.string(),
        icon: z.string().optional(),
        label: z.string().optional(),
        content: z.record(z.any()).optional(),
        links: z
          .array(
            z.object({
              text: z.string(),
              url: z.string().url()
            })
          )
          .optional(),
        seo: z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          meta: z.array(z.record(z.string(), z.any())).optional(),
          link: z.array(z.record(z.string(), z.any())).optional()
        })
      })
    }),
    modules: defineCollection({
      type: 'data',
      source: 'framework/**/@dpc-sdp-*/module.json',
      schema: z.object({
        name: z.string(),
        description: z.string(),
        packageName: z.string(),
        sourceUrl: z.string().url(),
        issuesUrl: z.string().url(),
        contributor: z.object({
          name: z.string(),
          url: z.string().url()
        }),
        meta: z.object({
          title: z.string(),
          path: z.string()
        })
      })
    })
  }
})
